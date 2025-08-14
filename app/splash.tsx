/**
 * Splash Screen
 * Inspired by SiriusXM app's splash screen
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SHADOWS } from '../constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Navigate to onboarding or main app after timeout
    const timer = setTimeout(() => {
      // Check if user has completed onboarding before
      const hasCompletedOnboarding = false; // This would be a real check in production
      
      if (hasCompletedOnboarding) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        {/* Replace with your actual logo */}
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>S</Text>
        </View>
        <Text style={styles.appName}>Streamly</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryAccent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...SHADOWS.large,
  },
  logoText: {
    fontSize: 70,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  appName: {
    fontSize: 36,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
});