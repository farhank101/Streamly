/**
 * Explore Screen
 * Screen for discovering new music, genres, and moods with modern design
 */

import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, SIZES, SHADOWS } from "../../constants/theme";
import { Track } from "../../types/track";
import { searchYouTube } from "../../services/youtube";
import { searchTracks as searchAudius } from "../../services/audius";
import { usePlayer } from "../../hooks/usePlayer";

const { width } = Dimensions.get("window");

import { genreImages } from "../../assets/images/home/index";

// Mock data for genres and moods
const genres = [
  {
    id: "1",
    name: "HIP-HOP",
    imageKey: "hiphop",
    color: "#FF6B6B",
  },
  {
    id: "2",
    name: "DANCE/ELECTRO",
    imageKey: "dance_electro",
    color: "#4ECDC4",
  },
  {
    id: "3",
    name: "POP",
    imageKey: "pop",
    color: "#45B7D1",
  },
  {
    id: "4",
    name: "COUNTRY",
    imageKey: "country",
    color: "#96CEB4",
  },
  {
    id: "5",
    name: "ROCK",
    imageKey: "rock",
    color: "#FECA57",
  },
  {
    id: "6",
    name: "INDIE",
    imageKey: "indie",
    color: "#FF9FF3",
  },
  {
    id: "7",
    name: "LATIN",
    imageKey: "latin",
    color: "#54A0FF",
  },
  {
    id: "8",
    name: "K-POP",
    imageKey: "kpop",
    color: "#5F27CD",
  },
  {
    id: "9",
    name: "METAL",
    imageKey: "metal",
    color: "#00D2D3",
  },
  {
    id: "10",
    name: "RADIO",
    imageKey: "radio",
    color: "#FF9F43",
  },
];

const moods = [
  {
    id: "1",
    name: "PARTY",
    imageKey: "party",
    color: "#FF6B6B",
  },
  {
    id: "2",
    name: "CHILL",
    imageKey: "chill",
    color: "#4ECDC4",
  },
  {
    id: "3",
    name: "WORKOUT",
    imageKey: "workout",
    color: "#45B7D1",
  },
  {
    id: "4",
    name: "ROMANCE",
    imageKey: "romance",
    color: "#96CEB4",
  },
  {
    id: "5",
    name: "SLEEP",
    imageKey: "sleep",
    color: "#FECA57",
  },
  {
    id: "6",
    name: "COMEDY",
    imageKey: "comedy",
    color: "#FF9FF3",
  },
  {
    id: "7",
    name: "FAMILY",
    imageKey: "family",
    color: "#54A0FF",
  },
  {
    id: "8",
    name: "TRAVEL",
    imageKey: "travel",
    color: "#5F27CD",
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { play } = usePlayer();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("GENRES & MOODS");

  // Sync active tab with route param (if present)
  useEffect(() => {
    const tabParam = typeof params.tab === "string" ? params.tab : undefined;
    if (!tabParam) return;
    const normalized = tabParam.toUpperCase();
    const allowed = ["GENRES & MOODS", "PODCASTS", "RECOMMENDATIONS"];
    // Accept RADIO as alias for RECOMMENDATIONS
    const resolved = normalized === "RADIO" ? "RECOMMENDATIONS" : normalized;
    if (allowed.includes(resolved)) {
      setActiveTab(resolved);
    }
  }, [params.tab]);

  const handleSearch = useCallback(async () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    try {
      setIsSearching(true);
      setError(null);

      // Combine results from both services
      const [youtubeResults, audiusResults] = await Promise.all([
        searchYouTube(trimmedQuery),
        searchAudius(trimmedQuery),
      ]);

      const combinedResults = [
        ...youtubeResults.tracks,
        ...audiusResults.tracks,
      ];
      setSearchResults(combinedResults);
    } catch (err) {
      console.error("Error searching tracks:", err);
      setError("Failed to search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleTrackSelect = useCallback(
    (track: Track) => {
      play(track);
      router.push(`/track/${track.id}`);
    },
    [play, router]
  );

  const handleGenreSelect = useCallback(
    (genre: any) => {
      router.push(`/category/${genre.id}`);
    },
    [router]
  );

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const renderGenreCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.genreCard}
      onPress={() => handleGenreSelect(item)}
      activeOpacity={0.8}
    >
      <Image 
        source={genreImages[item.imageKey]} 
        style={styles.genreImage} 
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.genreGradient}
      >
        <Text style={styles.genreName}>{item.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderTrackItem = useCallback(
    ({ item }: { item: Track }) => (
      <TouchableOpacity
        style={styles.trackItem}
        onPress={() => handleTrackSelect(item)}
        activeOpacity={0.7}
      >
        <View style={styles.trackImageContainer}>
          <Image
            source={
              item.thumbnailUrl
                ? { uri: item.thumbnailUrl }
                : {
                    uri: "https://via.placeholder.com/100x100/333333/FFFFFF?text=No+Image",
                  }
            }
            style={styles.trackImage}
          />
          <View style={styles.sourceIconContainer}>
            <Ionicons
              name={
                item.sourceType === "youtube" ? "logo-youtube" : "musical-notes"
              }
              size={12}
              color={COLORS.textPrimary}
            />
          </View>
        </View>

        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>

        <Text style={styles.trackDuration}>
          {formatDuration(item.duration)}
        </Text>
      </TouchableOpacity>
    ),
    [handleTrackSelect, formatDuration]
  );

  const renderContent = () => {
    if (activeTab === "GENRES & MOODS") {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Genres Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Genres</Text>
            <FlatList
              data={genres}
              renderItem={renderGenreCard}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.genreRow}
            />
          </View>

          {/* Moods Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Moods</Text>
            <FlatList
              data={moods}
              renderItem={renderGenreCard}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.genreRow}
            />
          </View>
        </ScrollView>
      );
    }

    if (activeTab === "PODCASTS") {
      return (
        <View style={styles.centerContent}>
          <Ionicons name="mic" size={64} color={COLORS.textSecondary} />
          <Text style={styles.centerText}>Podcasts coming soon!</Text>
        </View>
      );
    }

    if (activeTab === "RECOMMENDATIONS") {
      return (
        <View style={styles.centerContent}>
          <Ionicons name="star" size={64} color={COLORS.textSecondary} />
          <Text style={styles.centerText}>
            Personalized recommendations coming soon!
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Genres & Moods</Text>
      </View>

      {/* Navigation Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navTabs}
      >
        <TouchableOpacity
          style={[
            styles.navTab,
            activeTab === "GENRES & MOODS" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("GENRES & MOODS")}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === "GENRES & MOODS" && styles.activeTabText,
            ]}
          >
            GENRES & MOODS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navTab, activeTab === "PODCASTS" && styles.activeTab]}
          onPress={() => setActiveTab("PODCASTS")}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === "PODCASTS" && styles.activeTabText,
            ]}
          >
            PODCASTS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navTab,
            activeTab === "RECOMMENDATIONS" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("RECOMMENDATIONS")}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === "RECOMMENDATIONS" && styles.activeTabText,
            ]}
          >
            RECOMMENDATIONS
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for tracks, artists..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          {isSearching && (
            <ActivityIndicator size="small" color={COLORS.primaryAccent} />
          )}
        </View>
      </View>

      {/* Content */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.id}
          style={styles.resultsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderContent()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  navTabs: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  navTab: {
    marginRight: SPACING.xl,
    paddingBottom: SPACING.xs,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryAccent,
  },
  navTabText: {
    fontSize: 14,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textPrimary,
  },
  errorContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    fontFamily: "InterRegular",
    textAlign: "center",
  },
  resultsList: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  trackImageContainer: {
    position: "relative",
    marginRight: SPACING.md,
  },
  trackImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  sourceIconContainer: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 2,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontFamily: "InterSemiBold",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  trackDuration: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  genreRow: {
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  genreCard: {
    width: (width - SPACING.lg * 3) / 2,
    height: 120,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    position: "relative",
    marginBottom: SPACING.md,
  },
  genreImage: {
    width: "100%",
    height: "100%",
  },
  genreGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
    padding: SPACING.sm,
  },
  genreName: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  centerText: {
    fontSize: 18,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.md,
  },
});
