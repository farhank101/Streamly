/**
 * Onboarding Screen
 * Landing page with Streamly branding and call-to-action buttons
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, SIZES, SHADOWS, FONTS } from "../constants/theme";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/(auth)/register");
  };

  const handleSignIn = () => {
    router.push("/(auth)/login");
  };

  return (
    <LinearGradient
      colors={[COLORS.background, "#1a1a2e", "#16213e"]}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* App Logo and Branding */}
      <View style={styles.brandingContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons
              name="musical-note"
              size={32}
              color={COLORS.primaryAccent}
            />
          </View>
        </View>
        <Text style={styles.appName}>Streamly</Text>
        <Text style={styles.tagline}>Your music, everywhere</Text>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Discover, stream, and enjoy millions of songs from multiple platforms.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="play" size={20} color={COLORS.primaryAccent} />
          </View>
          <Text style={styles.featureText}>Unlimited Streaming</Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="search" size={20} color={COLORS.primaryAccent} />
          </View>
          <Text style={styles.featureText}>Smart Search</Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="heart" size={20} color={COLORS.primaryAccent} />
          </View>
          <Text style={styles.featureText}>Personalized</Text>
        </View>
      </View>

      {/* Call-to-Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedButtonText}>GET STARTED</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>

      {/* Terms */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  brandingContainer: {
    alignItems: "center",
    marginTop: height * 0.1,
    marginBottom: SPACING.xl,
  },
  logoContainer: {
    marginBottom: SPACING.lg,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  appName: {
    fontSize: 36,
    fontFamily: FONTS.family.oswaldBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: 18,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
  },
  descriptionContainer: {
    marginBottom: SPACING.xl,
  },
  description: {
    fontSize: 16,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: SPACING.xl,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  featureText: {
    fontSize: 16,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textPrimary,
  },
  buttonsContainer: {
    marginBottom: SPACING.xl,
  },
  getStartedButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  getStartedButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontFamily: FONTS.family.interSemiBold,
    textTransform: "uppercase",
  },
  signInButton: {
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  signInButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontFamily: FONTS.family.interSemiBold,
    textTransform: "uppercase",
  },
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    fontSize: 12,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
