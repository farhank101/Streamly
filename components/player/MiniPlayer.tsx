/**
 * Mini Player Component
 * Modern compact player bar with premium design
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { usePlayer } from "../../context/PlayerContext";
import { COLORS, SPACING, SIZES, SHADOWS, FONTS } from "../../constants/theme";

const { width } = Dimensions.get("window");

export const MiniPlayer: React.FC = () => {
  const router = useRouter();
  const { currentTrack, isPlaying, error, play, pause } = usePlayer();

  // Don't render if no track is loaded
  if (!currentTrack) {
    return null;
  }

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await pause();
      } else if (currentTrack) {
        await play(currentTrack);
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
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={[
          "rgba(15, 15, 35, 0.95)",
          "rgba(26, 26, 46, 0.95)",
          "rgba(15, 15, 35, 0.95)",
        ]}
        style={styles.gradientBackground}
      >
        <View style={styles.content}>
          {/* Track Thumbnail */}
          <View style={styles.thumbnailContainer}>
            <Image
              source={{ uri: currentTrack.thumbnailUrl }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.thumbnailGlow} />
          </View>

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
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[COLORS.primaryAccent, COLORS.secondary]}
              style={styles.playButtonGradient}
            >
              {isPlaying ? (
                <Ionicons name="pause" size={20} color={COLORS.textPrimary} />
              ) : (
                <Ionicons name="play" size={20} color={COLORS.textPrimary} />
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Error Indicator */}
          {error && (
            <View style={styles.errorIndicator}>
              <LinearGradient
                colors={["rgba(239, 68, 68, 0.9)", "rgba(220, 38, 38, 0.9)"]}
                style={styles.errorGradient}
              >
                <Ionicons name="warning" size={14} color={COLORS.textPrimary} />
              </LinearGradient>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: SIZES.miniPlayerHeight + 20,
    zIndex: 1000,
  },
  gradientBackground: {
    flex: 1,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    ...SHADOWS.large,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  thumbnailContainer: {
    position: "relative",
    marginRight: SPACING.md,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  thumbnailGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  trackInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  artist: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    marginLeft: SPACING.sm,
    ...SHADOWS.medium,
  },
  playButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorIndicator: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: "hidden",
  },
  errorGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MiniPlayer;
