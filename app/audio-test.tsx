/**
 * Audio Test Screen
 * Test screen for audio playback functionality
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, SIZES, SHADOWS } from "../constants/theme";
import { usePlayer } from "../context/PlayerContext";
import { getMockTrendingMusic } from "../services/youtube";

export default function AudioTestScreen() {
  const router = useRouter();
  const { 
    currentTrack, 
    isPlaying, 
    position, 
    duration, 
    error, 
    volume,
    audioQuality,
    play, 
    pause, 
    stop, 
    seek, 
    setVolume, 
    setAudioQuality,
    retryPlayback 
  } = usePlayer();

  const [testTracks] = useState(getMockTrendingMusic());
  const [selectedQuality, setSelectedQuality] = useState<'low' | 'medium' | 'high'>('medium');

  const handlePlayTrack = async (track: any) => {
    try {
      console.log("🎵 Testing playback for:", track.title);
      await play(track);
      Alert.alert("Success", `Started playing: ${track.title}`);
    } catch (error) {
      console.error("❌ Playback failed:", error);
      Alert.alert("Error", `Failed to play: ${error.message}`);
    }
  };

  const handleQualityChange = async (quality: 'low' | 'medium' | 'high') => {
    try {
      setSelectedQuality(quality);
      await setAudioQuality(quality);
      Alert.alert("Quality Changed", `Audio quality set to: ${quality}`);
    } catch (error) {
      console.error("❌ Quality change failed:", error);
      Alert.alert("Error", `Failed to change quality: ${error.message}`);
    }
  };

  const handleRetry = async () => {
    try {
      await retryPlayback();
      Alert.alert("Retry", "Playback retry initiated");
    } catch (error) {
      console.error("❌ Retry failed:", error);
      Alert.alert("Error", `Retry failed: ${error.message}`);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.surface]}
        style={styles.gradientBackground}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Audio Test</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Current Status */}
          <View style={styles.statusSection}>
            <Text style={styles.sectionTitle}>Current Status</Text>
            <View style={styles.statusCard}>
              <Text style={styles.statusText}>
                Track: {currentTrack ? currentTrack.title : "None"}
              </Text>
              <Text style={styles.statusText}>
                Artist: {currentTrack ? currentTrack.artist : "None"}
              </Text>
              <Text style={styles.statusText}>
                Playing: {isPlaying ? "Yes" : "No"}
              </Text>
              <Text style={styles.statusText}>
                Position: {formatTime(position)} / {formatTime(duration)}
              </Text>
              <Text style={styles.statusText}>
                Volume: {Math.round(volume * 100)}%
              </Text>
              <Text style={styles.statusText}>
                Quality: {audioQuality}
              </Text>
              {error && (
                <Text style={[styles.statusText, styles.errorText]}>
                  Error: {error}
                </Text>
              )}
            </View>
          </View>

          {/* Audio Quality Controls */}
          <View style={styles.qualitySection}>
            <Text style={styles.sectionTitle}>Audio Quality</Text>
            <View style={styles.qualityButtons}>
              {(['low', 'medium', 'high'] as const).map((quality) => (
                <TouchableOpacity
                  key={quality}
                  style={[
                    styles.qualityButton,
                    selectedQuality === quality && styles.qualityButtonActive
                  ]}
                  onPress={() => handleQualityChange(quality)}
                >
                  <Text style={[
                    styles.qualityButtonText,
                    selectedQuality === quality && styles.qualityButtonTextActive
                  ]}>
                    {quality.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Test Tracks */}
          <View style={styles.tracksSection}>
            <Text style={styles.sectionTitle}>Test Tracks</Text>
            {testTracks.map((track) => (
              <TouchableOpacity
                key={track.id}
                style={styles.trackCard}
                onPress={() => handlePlayTrack(track)}
              >
                <View style={styles.trackInfo}>
                  <Text style={styles.trackTitle}>{track.title}</Text>
                  <Text style={styles.trackArtist}>{track.artist}</Text>
                  <Text style={styles.trackDuration}>
                    {formatTime(track.duration)}
                  </Text>
                </View>
                <Ionicons 
                  name="play-circle" 
                  size={32} 
                  color={COLORS.primaryAccent} 
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Control Buttons */}
          <View style={styles.controlsSection}>
            <Text style={styles.sectionTitle}>Controls</Text>
            <View style={styles.controlButtons}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={pause}
                disabled={!currentTrack}
              >
                <Ionicons name="pause" size={24} color={COLORS.textPrimary} />
                <Text style={styles.controlButtonText}>Pause</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={stop}
                disabled={!currentTrack}
              >
                <Ionicons name="stop" size={24} color={COLORS.textPrimary} />
                <Text style={styles.controlButtonText}>Stop</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleRetry}
                disabled={!error}
              >
                <Ionicons name="refresh" size={24} color={COLORS.textPrimary} />
                <Text style={styles.controlButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Volume Control */}
          <View style={styles.volumeSection}>
            <Text style={styles.sectionTitle}>Volume Control</Text>
            <View style={styles.volumeButtons}>
              <TouchableOpacity
                style={styles.volumeButton}
                onPress={() => setVolume(Math.max(0, volume - 0.1))}
              >
                <Ionicons name="volume-low" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.volumeButton}
                onPress={() => setVolume(0.5)}
              >
                <Text style={styles.volumeButtonText}>50%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.volumeButton}
                onPress={() => setVolume(1.0)}
              >
                <Text style={styles.volumeButtonText}>100%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.volumeButton}
                onPress={() => setVolume(Math.min(1, volume + 0.1))}
              >
                <Ionicons name="volume-high" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingTop: 60,
    paddingBottom: SPACING.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 44,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  statusSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  statusCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statusText: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  errorText: {
    color: COLORS.error,
  },
  qualitySection: {
    marginBottom: SPACING.xl,
  },
  qualityButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qualityButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: 12,
    marginHorizontal: SPACING.xs,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  qualityButtonActive: {
    backgroundColor: COLORS.primaryAccent,
    borderColor: COLORS.primaryAccent,
  },
  qualityButtonText: {
    fontSize: 12,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
  },
  qualityButtonTextActive: {
    color: COLORS.textPrimary,
  },
  tracksSection: {
    marginBottom: SPACING.xl,
  },
  trackCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  trackDuration: {
    fontSize: 12,
    fontFamily: "InterRegular",
    color: COLORS.textTertiary,
  },
  controlsSection: {
    marginBottom: SPACING.xl,
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  controlButton: {
    alignItems: "center",
    padding: SPACING.md,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  controlButtonText: {
    fontSize: 12,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  volumeSection: {
    marginBottom: SPACING.xl,
  },
  volumeButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  volumeButton: {
    alignItems: "center",
    padding: SPACING.md,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  volumeButtonText: {
    fontSize: 12,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
  },
});
