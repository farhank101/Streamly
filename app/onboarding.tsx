/**
 * Onboarding Screen
 * Welcome screen with app features and sign-in options
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES, SHADOWS } from '../constants/theme';

export default function OnboardingScreen() {
  const router = useRouter();

  // Handle get started button press
  const handleGetStarted = () => {
    router.push('/(auth)/register');
  };

  // Handle sign in button press
  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

  // Handle terms of service press
  const handleTermsPress = () => {
    // Navigate to terms page or show modal
    console.log('Terms pressed');
  };

  // Handle privacy policy press
  const handlePrivacyPress = () => {
    // Navigate to privacy page or show modal
    console.log('Privacy pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo and App Name */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Ionicons name="musical-note" size={40} color={COLORS.primaryAccent} />
        </View>
        <Text style={styles.appName}>Streamly</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Your music, everywhere</Text>
          <Text style={styles.subtitle}>Discover, stream, and enjoy millions of songs from multiple platforms</Text>
        </View>
        
        {/* Feature List */}
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="play-circle" size={28} color={COLORS.textPrimary} />
            </View>
            <Text style={styles.featureText}>Unlimited Streaming</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="search" size={28} color={COLORS.textPrimary} />
            </View>
            <Text style={styles.featureText}>Smart Search</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="heart" size={28} color={COLORS.textPrimary} />
            </View>
            <Text style={styles.featureText}>Personalized</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={handleSignIn}
        >
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>
        
        <Text style={styles.termsText}>
          By continuing, you agree to our <Text style={styles.linkText} onPress={handleTermsPress}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText} onPress={handlePrivacyPress}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  appName: {
    fontSize: 32,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  welcomeContainer: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
  },
  featureList: {
    width: '100%',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  featureText: {
    fontSize: 18,
    fontFamily: 'InterMedium',
    color: COLORS.textPrimary,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    gap: SPACING.md,
  },
  getStartedButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 8,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  getStartedText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  signInButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  linkText: {
    color: COLORS.primaryAccent,
    textDecorationLine: 'none',
  },
});