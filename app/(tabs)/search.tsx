/**
 * Search Screen
 * Main search interface with Songs and Videos tabs
 */

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, SIZES, TYPOGRAPHY } from "../../constants/theme";
import {
  searchSongs,
  searchVideos,
  getTrendingMusic,
} from "../../services/search";
import { Track } from "../../types/track";
import storage from "../../services/storage.platform";

const { width } = Dimensions.get("window");

type SearchTab = "songs" | "videos";

export default function SearchScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchTab>("songs");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [trendingMusic, setTrendingMusic] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);

  // Load trending music on mount
  React.useEffect(() => {
    loadTrendingMusic();
  }, []);

  const loadTrendingMusic = async () => {
    try {
      setIsLoadingTrending(true);
      const trending = await getTrendingMusic("US", 20);
      setTrendingMusic(trending);
    } catch (error) {
      console.error("Failed to load trending music:", error);
    } finally {
      setIsLoadingTrending(false);
    }
  };

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const results =
          activeTab === "songs"
            ? await searchSongs(query)
            : await searchVideos(query);
        setSearchResults(results.tracks);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [activeTab]
  );

  const handleTrackPress = async (track: Track) => {
    try {
      // Add to history
      await storage.addToHistory(track);

      // Navigate to track detail
      router.push(`/track/${track.id}`);
    } catch (error) {
      console.error("Failed to handle track press:", error);
    }
  };

  const renderTrackItem = ({ item }: { item: Track }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => handleTrackPress(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.thumbnailUrl }}
        style={styles.trackThumbnail}
        defaultSource={require("../../assets/images/default-track.png")}
      />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.trackArtist} numberOfLines={1}>
          {item.artist}
        </Text>
        <View style={styles.trackMeta}>
          <Text style={styles.trackDuration}>
            {formatDuration(item.duration)}
          </Text>
          <Text style={styles.trackSource}>
            {item.sourceType.toUpperCase()}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play" size={20} color={COLORS.background} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTrendingSection = () => (
    <View style={styles.trendingSection}>
      <Text style={styles.sectionTitle}>Trending Now</Text>
      {isLoadingTrending ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={trendingMusic}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingList}
        />
      )}
    </View>
  );

  const renderSearchResults = () => {
    if (!searchQuery.trim()) {
      return renderTrendingSection();
    }

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      );
    }

    if (searchResults.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={48} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching for a different song or artist
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={searchResults}
        renderItem={renderTrackItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.searchResultsList}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={COLORS.primary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for songs, artists, or albums..."
            placeholderTextColor={COLORS.textTertiary}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "songs" && styles.activeTab]}
          onPress={() => setActiveTab("songs")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "songs" && styles.activeTabText,
            ]}
          >
            Songs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "videos" && styles.activeTab]}
          onPress={() => setActiveTab("videos")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "videos" && styles.activeTabText,
            ]}
          >
            Videos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>{renderSearchResults()}</View>
    </View>
  );
}

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary + "40",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    color: COLORS.textPrimary,
    fontSize: 16,
    fontFamily: "InterRegular",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
    fontFamily: "InterRegular",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    marginTop: SPACING.md,
    fontSize: 18,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  emptySubtitle: {
    marginTop: SPACING.sm,
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  trendingSection: {
    paddingVertical: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "OswaldBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  trendingList: {
    paddingHorizontal: SPACING.lg,
  },
  searchResultsList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.divider,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  trackThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  trackInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  trackTitle: {
    fontSize: 16,
    fontFamily: "InterSemiBold",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  trackMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  trackDuration: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: COLORS.textTertiary,
    marginRight: SPACING.sm,
  },
  trackSource: {
    fontSize: 10,
    fontFamily: "InterMedium",
    color: COLORS.primary,
    backgroundColor: COLORS.primary + "15",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
