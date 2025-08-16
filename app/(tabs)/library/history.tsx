/**
 * History Tab
 * Displays user's listening history with sorting options
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, SIZES, TYPOGRAPHY } from "../../../constants/theme";
import storage from "../../../services/storage.platform";
import { HistoryEntry } from "../../../services/storage";

type SortOption = "date" | "artist" | "title";

export default function HistoryTab() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [sortBy]);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const historyData = await storage.getHistory(sortBy, 50);
      setHistory(historyData);
    } catch (error) {
      console.error("Failed to load history:", error);
      // For UI demo, show some mock data
      setHistory([
        {
          id: "1",
          trackId: "mock_1",
          title: "Bohemian Rhapsody",
          artist: "Queen",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=face",
          duration: 354,
          sourceType: "youtube",
          sourceId: "mock_1",
          playedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          playCount: 1,
        },
        {
          id: "2",
          trackId: "mock_2",
          title: "Hotel California",
          artist: "Eagles",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop&crop=face",
          duration: 391,
          sourceType: "youtube",
          sourceId: "mock_2",
          playedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          playCount: 1,
        },
        {
          id: "3",
          trackId: "mock_3",
          title: "Stairway to Heaven",
          artist: "Led Zeppelin",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=face",
          duration: 482,
          sourceType: "youtube",
          sourceId: "mock_3",
          playedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
          playCount: 1,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear your listening history? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await storage.clearHistory();
              setHistory([]);
            } catch (error) {
              console.error("Failed to clear history:", error);
            }
          },
        },
      ]
    );
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const renderHistoryItem = ({ item }: { item: HistoryEntry }) => (
    <TouchableOpacity style={styles.historyItem} activeOpacity={0.8}>
      <Image
        source={{ uri: item.thumbnailUrl }}
        style={styles.trackThumbnail}
        defaultSource={require("../../../assets/images/default-track.png")}
      />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.trackArtist} numberOfLines={1}>
          {item.artist}
        </Text>
        <View style={styles.trackMeta}>
          <Text style={styles.trackDuration}>
            {formatDuration(item.duration)}
          </Text>
          <Text style={styles.trackTimeAgo}>
            {formatTimeAgo(item.playedAt)}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play" size={20} color={COLORS.background} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSortButton = (option: SortOption, label: string) => (
    <TouchableOpacity
      style={[styles.sortButton, sortBy === option && styles.activeSortButton]}
      onPress={() => setSortBy(option)}
    >
      <Text
        style={[
          styles.sortButtonText,
          sortBy === option && styles.activeSortButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (history.length === 0 && !isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="time-outline" size={48} color={COLORS.textSecondary} />
        <Text style={styles.emptyTitle}>No listening history</Text>
        <Text style={styles.emptySubtitle}>
          Your recently played tracks will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sort options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortButtons}>
          {renderSortButton("date", "Date")}
          {renderSortButton("artist", "Artist")}
          {renderSortButton("title", "Title")}
        </View>
        {history.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
            <Ionicons name="trash-outline" size={16} color={COLORS.error} />
          </TouchableOpacity>
        )}
      </View>

      {/* History list */}
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.historyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  sortLabel: {
    fontSize: 14,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
    marginRight: SPACING.sm,
  },
  sortButtons: {
    flexDirection: "row",
    flex: 1,
  },
  sortButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    marginRight: SPACING.sm,
    borderRadius: 12,
  },
  activeSortButton: {
    backgroundColor: COLORS.primary + "15",
  },
  sortButtonText: {
    fontSize: 12,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
  },
  activeSortButtonText: {
    color: COLORS.primary,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  historyList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  historyItem: {
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
  trackTimeAgo: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: COLORS.textTertiary,
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
});
