/**
 * Enhanced Progress Bar Component
 * Modern progress bar with smooth animations and better visual feedback
 */

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { usePlayer } from "../../context/PlayerContext";
import { COLORS, SPACING, SHADOWS } from "../../constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ProgressBarProps {
  onSeek?: (position: number) => void;
  showTime?: boolean;
  height?: number;
  showThumb?: boolean;
  disabled?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  onSeek,
  showTime = true,
  height = 4,
  showThumb = true,
  disabled = false,
}) => {
  const { position, duration, seek } = usePlayer();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);
  const progressBarRef = useRef<View>(null);

  // Animations
  const progressAnim = useRef(new Animated.Value(0)).current;
  const thumbScaleAnim = useRef(new Animated.Value(1)).current;
  const thumbOpacityAnim = useRef(new Animated.Value(0)).current;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = async (newPosition: number) => {
    try {
      await seek(newPosition);
      if (onSeek) {
        onSeek(newPosition);
      }
    } catch (error) {
      console.error("Seek error:", error);
    }
  };

  const handlePress = (event: any) => {
    if (!progressBarRef.current || disabled) return;

    progressBarRef.current.measure((x, y, width, height, pageX, pageY) => {
      const touchX = event.nativeEvent.pageX - pageX;
      const progress = Math.max(0, Math.min(1, touchX / width));
      const newPosition = progress * duration;

      setSeekPosition(newPosition);
      setIsSeeking(true);
      handleSeek(newPosition);
      setIsSeeking(false);
    });
  };

  const handlePressIn = () => {
    if (disabled) return;

    // Animate thumb scale and opacity
    Animated.parallel([
      Animated.timing(thumbScaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(thumbOpacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    if (disabled) return;

    // Reset thumb animations
    Animated.parallel([
      Animated.timing(thumbScaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(thumbOpacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Update progress animation
  useEffect(() => {
    const currentPosition = isSeeking ? seekPosition : position;
    const progress = duration > 0 ? currentPosition / duration : 0;

    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [position, duration, isSeeking, seekPosition]);

  const currentPosition = isSeeking ? seekPosition : position;
  const progress = duration > 0 ? currentPosition / duration : 0;

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <TouchableOpacity
        ref={progressBarRef}
        style={[styles.progressBar, { height }]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={disabled ? 1 : 0.8}
      >
        {/* Background Track */}
        <View style={styles.backgroundTrack}>
          {/* Progress Fill */}
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
                backgroundColor: disabled
                  ? COLORS.textTertiary
                  : COLORS.primaryAccent,
              },
            ]}
          />

          {/* Progress Glow */}
          <Animated.View
            style={[
              styles.progressGlow,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
                opacity: disabled ? 0 : 0.6,
              },
            ]}
          />
        </View>

        {/* Thumb */}
        {showThumb && (
          <Animated.View
            style={[
              styles.thumb,
              {
                left: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, SCREEN_WIDTH - 120 - 16],
                }),
                transform: [{ scale: thumbScaleAnim }],
                opacity: thumbOpacityAnim,
              },
            ]}
          />
        )}
      </TouchableOpacity>

      {/* Time Display */}
      {showTime && (
        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, disabled && styles.timeTextDisabled]}>
            {formatTime(currentPosition)}
          </Text>
          <Text style={[styles.timeText, disabled && styles.timeTextDisabled]}>
            {formatTime(duration)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  progressBar: {
    position: "relative",
    marginBottom: SPACING.sm,
  },
  backgroundTrack: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    position: "relative",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
    position: "absolute",
    left: 0,
    top: 0,
  },
  progressGlow: {
    height: "100%",
    borderRadius: 2,
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: COLORS.primaryAccent,
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
  thumb: {
    position: "absolute",
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.textPrimary,
    borderWidth: 2,
    borderColor: COLORS.primaryAccent,
    ...SHADOWS.medium,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
  },
  timeTextDisabled: {
    color: COLORS.textTertiary,
  },
});

export default ProgressBar;
