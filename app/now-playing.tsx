/**
 * Now Playing Screen
 * Premium full-screen player with modern design and smooth animations
 */

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, SIZES, SHADOWS } from "../constants/theme";
import { usePlayer } from "../context/PlayerContext";
import { useAuth } from "../context/AuthContext";
import ProgressBar from "../components/player/ProgressBar";
import { AudioVisualizer } from "../components/player/AudioVisualizer";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function NowPlayingScreen() {
  const router = useRouter();
  const { currentTrack, isPlaying, position, duration, play, pause, seek } =
    usePlayer();
  const { isAuthenticated } = useAuth();

  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "one" | "all">("off");
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const artworkScale = useRef(new Animated.Value(0.8)).current;
  const controlsOpacity = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  // Update slider position based on current playback time
  useEffect(() => {
    if (!isSeeking && duration > 0) {
      const progress = position / duration;
      setSliderValue(progress);
    }
  }, [position, duration, isSeeking]);

  // Start entrance animations
  useEffect(() => {
    const animations = [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(artworkScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(controlsOpacity, {
        toValue: 1,
        duration: 600,
        delay: 400,
        useNativeDriver: true,
      }),
    ];

    Animated.stagger(100, animations).start();
  }, []);

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
    },
    onPanResponderRelease: () => {
      if (duration > 0) {
        seek(sliderValue * duration);
      }
      setIsSeeking(false);
    },
  });

  // Handle like/unlike
  const handleLike = () => setIsLiked(!isLiked);

  // Handle add to playlist
  const handleAddToPlaylist = () => {
    // TODO: Implement add to playlist functionality
    console.log("Add to playlist");
  };

  // Handle shuffle toggle
  const handleShuffle = () => setIsShuffled(!isShuffled);

  // Handle repeat mode toggle
  const handleRepeat = () => {
    const modes: Array<"off" | "one" | "all"> = ["off", "one", "all"];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  // Handle play/pause
  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await pause();
      } else {
        await play(currentTrack);
      }
    } catch (error) {
      console.error("Play/pause error:", error);
    }
  };

  // Handle previous/next track
  const handlePrevious = () => {
    // TODO: Implement previous track
    console.log("Previous track");
  };

  const handleNext = () => {
    // TODO: Implement next track
    console.log("Next track");
  };

  // Get repeat mode icon
  const getRepeatIcon = () => {
    switch (repeatMode) {
      case "off":
        return "repeat-outline";
      case "one":
        return "repeat-one";
      case "all":
        return "repeat";
      default:
        return "repeat-outline";
    }
  };

  // Get repeat mode color
  const getRepeatColor = () => {
    return repeatMode === "off" ? COLORS.textSecondary : COLORS.primaryAccent;
  };

  // Get shuffle color
  const getShuffleColor = () => {
    return isShuffled ? COLORS.primaryAccent : COLORS.textSecondary;
  };

  if (!currentTrack) {
    return (
      <View style={styles.noTrackContainer}>
        <LinearGradient
          colors={[COLORS.background, COLORS.surface]}
          style={styles.noTrackGradient}
        >
          <StatusBar barStyle="light-content" backgroundColor="transparent" />
          <View style={styles.noTrackContent}>
            <Ionicons
              name="musical-notes-outline"
              size={80}
              color={COLORS.textSecondary}
            />
            <Text style={styles.noTrackText}>No Track Playing</Text>
            <Text style={styles.noTrackSubtext}>
              Start playing music to see the player
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push("/(tabs)/search")}
            >
              <Text style={styles.browseButtonText}>Browse Music</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />

      {/* Animated Background */}
      <Animated.View
        style={[styles.backgroundOverlay, { opacity: backgroundOpacity }]}
      >
        <LinearGradient
          colors={[
            "rgba(99, 102, 241, 0.3)",
            "rgba(139, 92, 246, 0.2)",
            "rgba(6, 182, 212, 0.1)",
            "rgba(15, 15, 35, 0.8)",
          ]}
          style={styles.backgroundGradient}
        />
      </Animated.View>

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]}
            style={styles.closeButtonGradient}
          >
            <Ionicons
              name="chevron-down"
              size={24}
              color={COLORS.textPrimary}
            />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Now Playing</Text>
          <Text style={styles.headerSubtitle}>From your library</Text>
        </View>

        <TouchableOpacity style={styles.queueButton} onPress={() => {}}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]}
            style={styles.queueButtonGradient}
          >
            <Ionicons name="list" size={20} color={COLORS.textPrimary} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Album Artwork */}
        <Animated.View
          style={[
            styles.artworkContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: artworkScale }],
            },
          ]}
        >
          <View style={styles.artworkWrapper}>
            <Image
              source={
                currentTrack.thumbnailUrl
                  ? { uri: currentTrack.thumbnailUrl }
                  : require("../assets/images/default-track.png")
              }
              style={styles.artwork}
              resizeMode="cover"
            />
            <View style={styles.artworkGlow} />
          </View>

          <View style={styles.sourceIconContainer}>
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.6)"]}
              style={styles.sourceIconGradient}
            >
              <Ionicons
                name={
                  currentTrack.sourceType === "youtube"
                    ? "logo-youtube"
                    : "cloud"
                }
                size={16}
                color={COLORS.textPrimary}
              />
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Track Info */}
        <Animated.View
          style={[
            styles.infoContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.title} numberOfLines={2}>
            {currentTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
          <Text style={styles.album} numberOfLines={1}>
            {currentTrack.album || "Unknown Album"}
          </Text>
        </Animated.View>

        {/* Audio Visualizer */}
        <Animated.View
          style={[
            styles.visualizerContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <AudioVisualizer
            isPlaying={isPlaying}
            intensity={0.7}
            color={COLORS.primaryAccent}
            height={80}
          />
        </Animated.View>

        {/* Progress Bar */}
        <Animated.View
          style={[
            styles.progressContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <ProgressBar showTime={true} height={6} />
        </Animated.View>

        {/* Playback Controls */}
        <Animated.View
          style={[
            styles.controlsContainer,
            {
              opacity: controlsOpacity,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleShuffle}
            activeOpacity={0.7}
          >
            <Ionicons name="shuffle" size={24} color={getShuffleColor()} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handlePrevious}
            activeOpacity={0.7}
          >
            <Ionicons
              name="play-skip-back"
              size={28}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={handlePlayPause}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[COLORS.primaryAccent, COLORS.secondary]}
              style={styles.playPauseGradient}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={32}
                color={COLORS.textPrimary}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Ionicons
              name="play-skip-forward"
              size={28}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleRepeat}
            activeOpacity={0.7}
          >
            <Ionicons
              name={getRepeatIcon()}
              size={24}
              color={getRepeatColor()}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Additional Actions */}
        <Animated.View
          style={[
            styles.actionsContainer,
            {
              opacity: controlsOpacity,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={
                isLiked
                  ? ["#FF3B30", "#FF6B6B"]
                  : ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]
              }
              style={styles.actionButtonGradient}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? "#FFFFFF" : COLORS.textPrimary}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAddToPlaylist}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]}
              style={styles.actionButtonGradient}
            >
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={COLORS.textPrimary}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push(`/track/${currentTrack.id}`)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]}
              style={styles.actionButtonGradient}
            >
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={COLORS.textPrimary}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Next Up Queue Preview */}
        <Animated.View
          style={[
            styles.queuePreviewContainer,
            {
              opacity: controlsOpacity,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.queuePreviewHeader}>
            <Ionicons name="list" size={20} color={COLORS.textSecondary} />
            <Text style={styles.queuePreviewTitle}>Next Up</Text>
            <TouchableOpacity>
              <Ionicons
                name="chevron-up"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.queuePreviewContent}>
            <Image
              source={{ uri: currentTrack.thumbnailUrl }}
              style={styles.queuePreviewImage}
              resizeMode="cover"
            />
            <View style={styles.queuePreviewInfo}>
              <Text style={styles.queuePreviewTrack} numberOfLines={1}>
                {currentTrack.title}
              </Text>
              <Text style={styles.queuePreviewArtist} numberOfLines={1}>
                {currentTrack.artist}
              </Text>
            </View>
            <TouchableOpacity style={styles.queuePreviewButton}>
              <Ionicons name="play" size={16} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  noTrackContainer: {
    flex: 1,
  },
  noTrackGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  noTrackContent: {
    alignItems: "center",
  },
  noTrackText: {
    fontSize: 24,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  noTrackSubtext: {
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    textAlign: "center",
  },
  browseButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 25,
    ...SHADOWS.medium,
  },
  browseButtonText: {
    color: COLORS.textPrimary,
    fontFamily: "InterBold",
    fontSize: 16,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: SPACING.md,
    zIndex: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  closeButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  queueButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  queueButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  artworkContainer: {
    alignItems: "center",
    marginVertical: SPACING.xl,
    position: "relative",
  },
  artworkWrapper: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    ...SHADOWS.large,
  },
  artwork: {
    width: SCREEN_WIDTH - 120,
    height: SCREEN_WIDTH - 120,
    borderRadius: 20,
  },
  artworkGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  sourceIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  sourceIconGradient: {
    padding: 8,
    borderRadius: 8,
  },
  infoContainer: {
    paddingHorizontal: SPACING.xl,
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.sm,
    lineHeight: 34,
  },
  artist: {
    fontSize: 20,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  album: {
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textTertiary,
    textAlign: "center",
  },
  visualizerContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  progressContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  controlButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  playPauseButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: "hidden",
    ...SHADOWS.medium,
  },
  playPauseGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  actionButton: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING.md,
    borderRadius: 28,
    overflow: "hidden",
  },
  actionButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  queuePreviewContainer: {
    marginHorizontal: SPACING.xl,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  queuePreviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  queuePreviewTitle: {
    fontSize: 14,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
    flex: 1,
    marginLeft: SPACING.sm,
  },
  queuePreviewContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  queuePreviewImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  queuePreviewInfo: {
    flex: 1,
  },
  queuePreviewTrack: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  queuePreviewArtist: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  queuePreviewButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
