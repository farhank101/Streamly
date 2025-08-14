/**
 * Liked Songs Tab
 * Displays user's liked songs in the library section
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING } from "../../../constants/theme";
import { usePlayer } from "../../../hooks/usePlayer";
import { Track } from "../../../types/track";

// Mock data for liked tracks
const MOCK_LIKED_TRACKS = [
  {
    id: "101",
    sourceId: "youtube-101",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: 203, // in seconds
    thumbnailUrl: null,
    sourceType: "youtube",
    likedAt: new Date("2023-10-15"),
  },
  {
    id: "102",
    sourceId: "youtube-102",
    title: "As It Was",
    artist: "Harry Styles",
    duration: 167,
    thumbnailUrl: null,
    sourceType: "youtube",
    likedAt: new Date("2023-10-10"),
  },
  {
    id: "103",
    sourceId: "youtube-103",
    title: "Bad Habit",
    artist: "Steve Lacy",
    duration: 232,
    thumbnailUrl: null,
    sourceType: "youtube",
    likedAt: new Date("2023-09-28"),
  },
  {
    id: "104",
    sourceId: "youtube-104",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    duration: 200,
    thumbnailUrl: null,
    sourceType: "youtube",
    likedAt: new Date("2023-09-20"),
  },
  {
    id: "105",
    sourceId: "youtube-105",
    title: "Unholy",
    artist: "Sam Smith & Kim Petras",
    duration: 156,
    thumbnailUrl: null,
    sourceType: "youtube",
    likedAt: new Date("2023-09-15"),
  },
];

export default function LikedTab() {
  const router = useRouter();
  const { play, currentTrack, isPlaying, pause } = usePlayer();

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Navigate to track detail
  const handleTrackPress = (trackId: string) => {
    router.push(`/track/${trackId}`);
  };

  // Play or pause track
  const handlePlayPause = (track: (typeof MOCK_LIKED_TRACKS)[0]) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        pause();
      } else {
        // Resume current track
        if (currentTrack) {
          play(currentTrack);
        }
      }
    } else {
      // Convert mock track to proper Track object and play
      const trackToPlay: Track = {
        id: track.id,
        sourceId: track.sourceId,
        sourceType: track.sourceType as 'youtube',
        title: track.title,
        artist: track.artist,
        duration: track.duration,
        thumbnailUrl: track.thumbnailUrl,
        createdAt: new Date(),
      };
      play(trackToPlay);
    }
  };

  // Render a track item
  const renderTrackItem = ({
    item,
  }: {
    item: (typeof MOCK_LIKED_TRACKS)[0];
  }) => {
    const isCurrentTrack = currentTrack?.id === item.id;

    return (
      <TouchableOpacity
        style={styles.trackItem}
        onPress={() => handleTrackPress(item.id)}
      >
        <View style={styles.trackCover}>
          {item.thumbnailUrl ? (
            <Image
              source={{ uri: item.thumbnailUrl }}
              style={styles.coverImage}
            />
          ) : (
            <View style={styles.placeholderCover}>
              <Ionicons
                name="musical-note"
                size={20}
                color={COLORS.textSecondary}
              />
            </View>
          )}
        </View>
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
        <View style={styles.trackMeta}>
          <View style={styles.sourceContainer}>
            <Ionicons
              name={item.sourceType === "youtube" ? "logo-youtube" : "cloud"}
              size={14}
              color={COLORS.textSecondary}
              style={styles.sourceIcon}
            />
            <Text style={styles.durationText}>
              {formatDuration(item.duration)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => handlePlayPause(item)}
          >
            <Ionicons
              name={isCurrentTrack && isPlaying ? "pause" : "play"}
              size={20}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with play all button */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Liked Songs</Text>
          <Text style={styles.headerSubtitle}>
            {MOCK_LIKED_TRACKS.length} tracks
          </Text>
        </View>
        <TouchableOpacity
          style={styles.playAllButton}
          onPress={() => console.log("Play all liked songs")}
        >
          <Ionicons name="play" size={18} color={COLORS.textPrimary} />
          <Text style={styles.playAllText}>Play All</Text>
        </TouchableOpacity>
      </View>

      {/* Tracks list */}
      <FlatList
        data={MOCK_LIKED_TRACKS}
        keyExtractor={(item) => item.id}
        renderItem={renderTrackItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="heart-outline"
              size={48}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No liked songs yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the heart icon on any song to add it to your liked songs
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  playAllButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
  },
  playAllText: {
    fontSize: 14,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginLeft: 4,
  },
  listContent: {
    padding: SPACING.lg,
    paddingTop: 0,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  trackCover: {
    width: 50,
    height: 50,
    borderRadius: 4,
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  placeholderCover: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  trackInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  trackTitle: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  trackMeta: {
    alignItems: "flex-end",
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  sourceIcon: {
    marginRight: 4,
  },
  durationText: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
