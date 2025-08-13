/**
 * Audio Visualizer Component
 * Displays animated bars that react to audio playback
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS } from '../../constants/theme';

interface AudioVisualizerProps {
  isPlaying: boolean;
  intensity?: number; // 0-1 value to control animation intensity
  barCount?: number; // Number of bars to display
  color?: string; // Primary color of the visualizer
}

export default function AudioVisualizer({
  isPlaying,
  intensity = 0.8,
  barCount = 20,
  color = COLORS.primaryAccent,
}: AudioVisualizerProps) {
  // Create an array of animated values for each bar
  const [bars] = useState(() => 
    Array.from({ length: barCount }, () => new Animated.Value(0.1))
  );
  
  // Generate random heights when playing
  useEffect(() => {
    let animationsArray: Animated.CompositeAnimation[] = [];
    
    if (isPlaying) {
      // Create animations for each bar
      bars.forEach((bar, index) => {
        // Random duration between 300ms and 800ms
        const duration = Math.random() * 500 + 300;
        
        // Create a sequence of animations that loop
        const animation = Animated.loop(
          Animated.sequence([
            // Animate to a random height
            Animated.timing(bar, {
              toValue: Math.random() * intensity + 0.1, // Random height between 0.1 and intensity+0.1
              duration,
              easing: Easing.ease,
              useNativeDriver: false,
            }),
            // Animate back to a different random height
            Animated.timing(bar, {
              toValue: Math.random() * intensity + 0.1,
              duration,
              easing: Easing.ease,
              useNativeDriver: false,
            }),
          ])
        );
        
        // Start the animation with a random delay
        setTimeout(() => {
          animation.start();
        }, index * 50);
        
        animationsArray.push(animation);
      });
    } else {
      // Reset all bars to minimal height when not playing
      bars.forEach((bar) => {
        const animation = Animated.timing(bar, {
          toValue: 0.1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        });
        
        animation.start();
        animationsArray.push(animation);
      });
    }
    
    // Clean up animations on unmount or when isPlaying changes
    return () => {
      animationsArray.forEach(anim => anim.stop());
    };
  }, [isPlaying, bars, intensity]);
  
  return (
    <View style={styles.container}>
      {bars.map((bar, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              backgroundColor: color,
              height: bar.interpolate({
                inputRange: [0, 1],
                outputRange: ['5%', '100%'],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  bar: {
    width: 3,
    borderRadius: 3,
    backgroundColor: COLORS.primaryAccent,
  },
});