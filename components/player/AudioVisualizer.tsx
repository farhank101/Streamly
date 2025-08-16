/**
 * Audio Visualizer Component
 * Beautiful animated bars that respond to music playback
 */

import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { COLORS, SPACING } from "../../constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BAR_COUNT = 32;
const BAR_WIDTH = (SCREEN_WIDTH - 120) / BAR_COUNT - 2;

interface AudioVisualizerProps {
  isPlaying: boolean;
  intensity?: number; // 0-1 scale for animation intensity
  color?: string;
  height?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  intensity = 0.5,
  color = COLORS.primaryAccent,
  height = 60,
}) => {
  const barAnimations = useRef<Animated.Value[]>([]).current;
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize bar animations
  useEffect(() => {
    if (barAnimations.length === 0) {
      for (let i = 0; i < BAR_COUNT; i++) {
        barAnimations[i] = new Animated.Value(0.1);
      }
    }
  }, []);

  // Start/stop animations based on playing state
  useEffect(() => {
    if (isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [isPlaying, intensity]);

  const startAnimation = () => {
    if (animationRef.current) return;

    const animate = () => {
      const animations = barAnimations.map((anim, index) => {
        // Create wave-like pattern with different phases
        const phase = (index / BAR_COUNT) * Math.PI * 2;
        const randomFactor = Math.random() * 0.3 + 0.7;
        const targetValue =
          (Math.sin(Date.now() * 0.01 + phase) * 0.5 + 0.5) *
          intensity *
          randomFactor;

        return Animated.timing(anim, {
          toValue: Math.max(0.1, targetValue),
          duration: 100 + Math.random() * 200,
          useNativeDriver: false,
        });
      });

      Animated.parallel(animations).start(() => {
        if (isPlaying) {
          animationRef.current = setTimeout(animate, 100);
        }
      });
    };

    animate();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }

    // Fade out all bars
    const fadeOutAnimations = barAnimations.map((anim) =>
      Animated.timing(anim, {
        toValue: 0.1,
        duration: 300,
        useNativeDriver: false,
      })
    );

    Animated.parallel(fadeOutAnimations).start();
  };

  const renderBar = (index: number) => {
    const anim = barAnimations[index];
    if (!anim) return null;

    return (
      <Animated.View
        key={index}
        style={[
          styles.bar,
          {
            height: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [4, height],
            }),
            backgroundColor: color,
            opacity: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }),
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.visualizerContainer}>
        {Array.from({ length: BAR_COUNT }, (_, index) => renderBar(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  visualizerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 80,
    paddingVertical: SPACING.sm,
  },
  bar: {
    width: BAR_WIDTH,
    marginHorizontal: 1,
    borderRadius: 2,
    backgroundColor: COLORS.primaryAccent,
  },
});
