/**
 * Mini Player Component
 * Compact player bar at the bottom of the screen
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { usePlayer } from "../../context/PlayerContext";
import { COLORS, SPACING, SIZES, SHADOWS, FONTS } from "../../constants/theme";

const { width } = Dimensions.get("window");

export const MiniPlayer: React.FC = () => {
  const router = useRouter();
  const { currentTrack, isPlaying, isLoading, error, play, pause } =
    usePlayer();

  // Don't render if no track is loaded
  if (!currentTrack) {
    return null;
  }

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await pause();
      } else {
        await play();
      }
    } catch (error) {
      console.error("Play/pause error:", error);
    }
  };

  const handlePress = () => {
    // Navigate to full player screen
    router.push("/now-playing");
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {/* Track Thumbnail */}
        <Image
          source={{ uri: currentTrack.thumbnailUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Track Info */}
        <View style={styles.trackInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
        </View>

        {/* Play/Pause Button */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlayPause}
          disabled={isLoading}
        >
          {isLoading ? (
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={COLORS.textPrimary}
            />
          ) : isPlaying ? (
            <Ionicons name="pause" size={24} color={COLORS.textPrimary} />
          ) : (
            <Ionicons name="play" size={24} color={COLORS.textPrimary} />
          )}
        </TouchableOpacity>

        {/* Error Indicator */}
        {error && (
          <View style={styles.errorIndicator}>
            <Ionicons name="warning" size={16} color={COLORS.error} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    ...SHADOWS.large,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    height: SIZES.miniPlayerHeight,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: SIZES.borderRadius,
    marginRight: SPACING.md,
  },
  trackInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontFamily: FONTS.family.interSemiBold,
    marginBottom: 2,
  },
  artist: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONTS.family.interRegular,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryAccent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  errorIndicator: {
    position: "absolute",
    top: SPACING.xs,
    right: SPACING.xs,
  },
});

export default MiniPlayer;
