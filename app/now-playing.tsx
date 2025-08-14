/**
 * Now Playing Screen
 * Full-screen player with controls and track information
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, SIZES } from "../constants/theme";
import { usePlayer } from "../context/PlayerContext";
import { useAuth } from "../context/AuthContext";
import ProgressBar from "../components/player/ProgressBar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function NowPlayingScreen() {
  const router = useRouter();
  const { currentTrack, isPlaying, position, duration, play, pause, seek } =
    usePlayer();
  const { isAuthenticated } = useAuth();

  const [isLiked, setIsLiked] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Animation for the slider
  const sliderAnimation = new Animated.Value(0);

  // Update slider position based on current playback time
  useEffect(() => {
    if (!isSeeking && duration > 0) {
      const progress = position / duration;
      setSliderValue(progress);
      sliderAnimation.setValue(progress);
    }
  }, [position, duration, isSeeking]);

  // Pan responder for the slider
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsSeeking(true);
    },
    onPanResponderMove: (_, gestureState) => {
      const newValue = Math.max(
        0,
        Math.min(1, gestureState.moveX / SCREEN_WIDTH)
      );
      setSliderValue(newValue);
      sliderAnimation.setValue(newValue);
    },
    onPanResponderRelease: () => {
      if (duration > 0) {
        seek(sliderValue * duration);
      }
      setIsSeeking(false);
    },
  });

  // Handle like/unlike
  const handleLike = () => {
    if (!isAuthenticated) {
      // Prompt to sign in
      router.push("/(auth)/login");
      return;
    }

    // Toggle like status
    setIsLiked(!isLiked);

    // In a real app, we would call an API to like/unlike the track
    console.log(`${isLiked ? "Unlike" : "Like"} track ${currentTrack?.id}`);
  };

  // Handle add to playlist
  const handleAddToPlaylist = () => {
    if (!isAuthenticated) {
      // Prompt to sign in
      router.push("/(auth)/login");
      return;
    }

    // In a real app, this would open a modal to select a playlist
    console.log(`Add track ${currentTrack?.id} to playlist`);
  };

  // Format time in mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // If no track is playing, show a message
  if (!currentTrack) {
    return (
      <View style={styles.noTrackContainer}>
        <Text style={styles.noTrackText}>No track is currently playing</Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.browseButtonText}>Browse Music</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with close button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Ionicons name="chevron-down" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Now Playing</Text>
        </View>
        <TouchableOpacity style={styles.queueButton} onPress={() => {}}>
          <Ionicons name="list" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Album artwork */}
      <View style={styles.artworkContainer}>
        <Image
          source={
            currentTrack.thumbnailUrl
              ? { uri: currentTrack.thumbnailUrl }
              : {
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
                }
          }
          style={styles.artwork}
          resizeMode="cover"
        />
        <View style={styles.sourceIconContainer}>
          <Ionicons
            name={
              currentTrack.sourceType === "youtube" ? "logo-youtube" : "cloud"
            }
            size={16}
            color={COLORS.textPrimary}
          />
        </View>
      </View>

      {/* Audio Visualizer - TODO: Implement */}
      <View style={styles.visualizerContainer}>
        <Text style={styles.visualizerText}>Audio Visualizer Coming Soon</Text>
      </View>

      {/* Track info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {currentTrack.artist}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: sliderAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.progressThumb,
              {
                left: sliderAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, SCREEN_WIDTH - 80 - 16],
                }),
              },
            ]}
            {...panResponder.panHandlers}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Playback controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <Ionicons name="shuffle" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <Ionicons
            name="play-skip-back"
            size={32}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={() =>
            isPlaying ? pause() : currentTrack ? play(currentTrack) : null
          }
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={32}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <Ionicons
            name="play-skip-forward"
            size={32}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <Ionicons name="repeat" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Additional actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "#FF3B30" : COLORS.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAddToPlaylist}
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push(`/track/${currentTrack.id}`)}
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 50, // Space for home indicator on newer iPhones
  },
  noTrackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  noTrackText: {
    fontSize: 18,
    fontFamily: "InterRegular",
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  browseButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
  },
  browseButtonText: {
    color: COLORS.textPrimary,
    fontFamily: "InterBold",
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  queueButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  artworkContainer: {
    width: SCREEN_WIDTH - 80,
    height: SCREEN_WIDTH - 80,
    alignSelf: "center",
    marginVertical: SPACING.xl,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    position: "relative",
  },
  artwork: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  sourceIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 4,
    padding: 4,
  },
  infoContainer: {
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  artist: {
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  progressContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    marginBottom: SPACING.xs,
    position: "relative",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 2,
    position: "absolute",
    left: 0,
    top: 0,
  },
  progressThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primaryAccent,
    position: "absolute",
    top: -6,
    marginLeft: -8,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  controlButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryAccent,
    justifyContent: "center",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING.md,
  },
  visualizerContainer: {
    alignItems: "center",
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  visualizerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: "InterRegular",
  },
});
