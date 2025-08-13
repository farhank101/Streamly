/**
 * Splash Screen
 * Beautiful introduction screen with Streamly branding
 */

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, SIZES, SHADOWS, FONTS } from "../constants/theme";
import { useAuth } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Auto-navigate after 3 seconds or when auth state changes
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("onboarding");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  // Manual navigation
  const handleGetStarted = () => {
    router.push("/(auth)/register");
  };

  const handleSignIn = () => {
    router.push("/(auth)/login");
  };

  return (
    <LinearGradient
      colors={[COLORS.background, "#1a1a2e", "#16213e", "#0f3460"]}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.backgroundNotes}>
        <Ionicons
          name="musical-note"
          size={24}
          color="rgba(255, 255, 255, 0.1)"
          style={styles.note1}
        />
        <Ionicons
          name="musical-notes"
          size={20}
          color="rgba(255, 255, 255, 0.08)"
          style={styles.note2}
        />
        <Ionicons
          name="musical-note"
          size={28}
          color="rgba(255, 255, 255, 0.06)"
          style={styles.note3}
        />
        <Ionicons
          name="musical-notes"
          size={16}
          color="rgba(255, 255, 255, 0.1)"
          style={styles.note4}
        />
        <Ionicons
          name="musical-note"
          size={22}
          color="rgba(255, 255, 255, 0.08)"
          style={styles.note5}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.brandingContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons
                name="musical-notes"
                size={48}
                color={COLORS.primaryAccent}
              />
            </View>
          </View>

          <Text style={styles.appName}>Streamly</Text>
          <Text style={styles.tagline}>Your music, everywhere</Text>
          <Text style={styles.subtitle}>
            Discover, stream, and enjoy millions of songs from multiple
            platforms
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="play-circle"
                size={24}
                color={COLORS.primaryAccent}
              />
            </View>
            <Text style={styles.featureText}>Unlimited Streaming</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="search" size={24} color={COLORS.primaryAccent} />
            </View>
            <Text style={styles.featureText}>Smart Search</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="heart" size={24} color={COLORS.primaryAccent} />
            </View>
            <Text style={styles.featureText}>Personalized</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  backgroundNotes: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  note1: {
    position: "absolute",
    top: height * 0.15,
    left: width * 0.1,
    transform: [{ rotate: "15deg" }],
  },
  note2: {
    position: "absolute",
    top: height * 0.25,
    right: width * 0.15,
    transform: [{ rotate: "-20deg" }],
  },
  note3: {
    position: "absolute",
    top: height * 0.4,
    left: width * 0.2,
    transform: [{ rotate: "45deg" }],
  },
  note4: {
    position: "absolute",
    top: height * 0.6,
    right: width * 0.1,
    transform: [{ rotate: "-30deg" }],
  },
  note5: {
    position: "absolute",
    top: height * 0.7,
    left: width * 0.15,
    transform: [{ rotate: "60deg" }],
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  brandingContainer: {
    alignItems: "center",
    marginBottom: SPACING.xxl * 2,
  },
  logoContainer: {
    marginBottom: SPACING.lg,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.large,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  appName: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: "center",
    fontFamily: FONTS.family.oswaldBold,
    fontSize: 48,
  },
  tagline: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    textAlign: "center",
    fontFamily: FONTS.family.oswaldSemiBold,
    fontSize: 18,
  },
  subtitle: {
    color: COLORS.textTertiary,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: width * 0.8,
    fontFamily: FONTS.family.interRegular,
    fontSize: 18,
  },
  featuresContainer: {
    width: "100%",
    maxWidth: 300,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },
  featureText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.family.interRegular,
    fontSize: 16,
  },
  actionContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  getStartedButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  getStartedButtonText: {
    color: COLORS.textPrimary,
    textTransform: "uppercase",
    fontFamily: FONTS.family.interSemiBold,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: "transparent",
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  signInButtonText: {
    color: COLORS.textPrimary,
    textTransform: "uppercase",
    fontFamily: FONTS.family.interMedium,
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  footerText: {
    color: COLORS.textTertiary,
    textAlign: "center",
    lineHeight: 18,
    fontFamily: FONTS.family.interRegular,
    fontSize: 12,
  },
});
