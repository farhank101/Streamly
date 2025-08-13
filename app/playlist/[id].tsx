/**
 * Playlist Detail Screen
 * Shows detailed information about a playlist and its tracks
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, SIZES, SHADOWS } from "../../constants/theme";
import { Track } from "../../types/track";
import { Playlist } from "../../types/user";
import { usePlayer } from "../../hooks/usePlayer";
import { useAuth } from "../../hooks/useAuth";

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { play } = usePlayer();
  const { user, isAuthenticated } = useAuth();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch playlist details and tracks
  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        // In a real app, we would fetch the playlist details from an API
        // For now, we'll simulate the data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock playlist data
        const mockPlaylist: Playlist = {
          id: id,
          name: `Playlist ${id}`,
          description: `This is a description for playlist ${id}`,
          coverImageUrl: null,
          isPublic: true,
          userId: user?.id || "unknown",
          createdAt: new Date(),
          updatedAt: new Date(),
          playCount: 0,
          // trackCount: 5, // TODO: Add trackCount to Playlist type
        };

        // Mock tracks data
        const mockTracks: Track[] = Array(5)
          .fill(null)
          .map((_, index) => ({
            id: `track-${id}-${index}`,
            sourceId: index % 2 === 0 ? `youtube-${index}` : `audius-${index}`,
            sourceType: index % 2 === 0 ? "youtube" : "audius",
            title: `Track ${index + 1}`,
            artist: `Artist ${index + 1}`,
            album: `Album ${index + 1}`,
            duration: 180 + index * 30, // 3-5 minutes
            thumbnailUrl: "https://via.placeholder.com/300",
            createdAt: new Date(),
            playCount: 1000 + index * 100,
          }));

        setPlaylist(mockPlaylist);
        setTracks(mockTracks);
      } catch (err: any) {
        console.error("Error fetching playlist details:", err);
        setError("Failed to load playlist. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id, user]);

  // Handle play all tracks
  const handlePlayAll = () => {
    if (tracks.length === 0) return;
    // TODO: Implement playCollection functionality
    console.log("Play collection:", tracks);
  };

  // Handle track selection
  const handleTrackSelect = (track: Track) => {
    play(track);
  };

  // Handle share
  const handleShare = async () => {
    if (!playlist) return;

    try {
      await Share.share({
        message: `Check out "${playlist.name}" playlist on Streamly!`,
        url: `https://streamly.app/playlist/${id}`,
      });
    } catch (error) {
      console.error("Error sharing playlist:", error);
    }
  };

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Calculate total duration of all tracks
  const totalDuration = tracks.reduce(
    (total, track) => total + track.duration,
    0
  );
  const formattedTotalDuration = () => {
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  };

  // Render a track item
  const renderTrackItem = ({ item, index }: { item: Track; index: number }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => handleTrackSelect(item)}
    >
      <Text style={styles.trackNumber}>{index + 1}</Text>
      <View style={styles.trackImageContainer}>
        <View style={styles.trackImage} />
        <View style={styles.sourceIconContainer}>
          <Ionicons
            name={item.sourceType === "youtube" ? "logo-youtube" : "cloud"}
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

      <Text style={styles.trackDuration}>{formatDuration(item.duration)}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryAccent} />
        <Text style={styles.loadingText}>Loading playlist...</Text>
      </View>
    );
  }

  if (error || !playlist) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Playlist not found"}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Playlist header */}
      <View style={styles.header}>
        <View style={styles.playlistImageContainer}>
          <View style={styles.playlistImage} />
        </View>

        <View style={styles.playlistInfo}>
          <Text style={styles.playlistName}>{playlist.name}</Text>
          {playlist.description && (
            <Text style={styles.playlistDescription} numberOfLines={2}>
              {playlist.description}
            </Text>
          )}
          <Text style={styles.playlistStats}>
            {tracks.length} tracks • {formattedTotalDuration()}
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.playAllButton}
          onPress={handlePlayAll}
          disabled={tracks.length === 0}
        >
          <Ionicons name="play" size={20} color={COLORS.textPrimary} />
          <Text style={styles.playAllText}>Play All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        {isAuthenticated && playlist.userId === user?.id && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push(`/edit-playlist/${id}`)}
          >
            <Ionicons
              name="create-outline"
              size={24}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Tracks list */}
      <FlatList
        data={tracks}
        renderItem={renderTrackItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tracksList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>This playlist is empty</Text>
            {isAuthenticated && playlist.userId === user?.id && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/explore")}
              >
                <Text style={styles.addButtonText}>Add Tracks</Text>
              </TouchableOpacity>
            )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textPrimary,
    fontFamily: "InterRegular",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  errorText: {
    color: COLORS.textPrimary,
    fontFamily: "InterRegular",
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  backButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontFamily: "InterBold",
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  playlistImageContainer: {
    width: 100,
    height: 100,
    borderRadius: SIZES.borderRadius,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginRight: SPACING.md,
    ...SHADOWS.small,
  },
  playlistImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.borderRadius,
  },
  playlistInfo: {
    flex: 1,
    justifyContent: "center",
  },
  playlistName: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  playlistDescription: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  playlistStats: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  playAllButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
    marginRight: SPACING.md,
    ...SHADOWS.small,
  },
  playAllText: {
    color: COLORS.textPrimary,
    fontFamily: "InterBold",
    fontSize: 14,
    marginLeft: SPACING.xs,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING.xs,
  },
  tracksList: {
    paddingBottom: 120, // Space for mini player and tab bar
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  trackNumber: {
    width: 25,
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  trackImageContainer: {
    width: SIZES.miniAvatarSize,
    height: SIZES.miniAvatarSize,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: SPACING.sm,
    position: "relative",
  },
  trackImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  sourceIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 2,
    padding: 2,
  },
  trackInfo: {
    flex: 1,
    marginLeft: SPACING.xs,
  },
  trackTitle: {
    fontSize: 14,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  trackDuration: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    marginLeft: SPACING.md,
    width: 45,
    textAlign: "right",
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontFamily: "InterRegular",
    marginBottom: SPACING.md,
  },
  addButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
    ...SHADOWS.small,
  },
  addButtonText: {
    color: COLORS.textPrimary,
    fontFamily: "InterBold",
    fontSize: 14,
  },
});
