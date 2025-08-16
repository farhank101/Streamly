/**
 * Splash Screen
 * Inspired by SiriusXM app's splash screen
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { COLORS, SHADOWS } from '../constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const fadeAnim = new Animated.Value(0);
  
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Navigate to appropriate screen after timeout and auth check
    const timer = setTimeout(() => {
      if (isLoading) {
        // Still loading auth state, wait a bit more
        return;
      }
      
      if (isAuthenticated) {
        // User is authenticated, go to main app
        router.replace('/(tabs)');
      } else {
        // User is not authenticated, go to onboarding
        router.replace('/onboarding');
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading]);
  
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