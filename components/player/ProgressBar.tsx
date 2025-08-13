/**
 * Progress Bar Component
 * Interactive progress bar for audio playback with seeking functionality
 */

import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { usePlayer } from "../../context/PlayerContext";
import { COLORS, SPACING, SIZES, FONTS } from "../../constants/theme";

interface ProgressBarProps {
  onSeek?: (position: number) => void;
  showTime?: boolean;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  onSeek,
  showTime = true,
  height = 4,
}) => {
  const { position, duration, seek } = usePlayer();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);
  const progressBarRef = useRef<View>(null);

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
    if (!progressBarRef.current) return;

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

  const currentPosition = isSeeking ? seekPosition : position;
  const progress = duration > 0 ? currentPosition / duration : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={progressBarRef}
        style={[styles.progressBar, { height }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.backgroundBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
                backgroundColor: COLORS.primaryAccent,
              },
            ]}
          />
        </View>
      </TouchableOpacity>

      {showTime && (
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
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
    width: "100%",
    justifyContent: "center",
  },
  backgroundBar: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.xs,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: FONTS.family.interMedium,
  },
});

export default ProgressBar;
