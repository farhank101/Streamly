/**
 * Forgot Password Screen
 * Allows users to reset their password via email
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, SIZES, SHADOWS, FONTS } from "../../constants/theme";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle password reset
  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Reset Link Sent",
        "If an account with that email exists, we've sent a password reset link. Please check your email.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/login"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate back to login
  const handleBackToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <LinearGradient
      colors={[COLORS.background, "#1a1a2e", "#16213e"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={COLORS.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reset Password</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name="lock-open"
                  size={32}
                  color={COLORS.primaryAccent}
                />
              </View>
            </View>

            {/* Title and Description */}
            <Text style={styles.title}>Forgot your password?</Text>
            <Text style={styles.description}>
              Don't worry! It happens. Please enter the email address associated
              with your account.
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.textTertiary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus
                />
                {email.length > 0 && (
                  <Ionicons
                    name="mail"
                    size={20}
                    color={COLORS.textSecondary}
                  />
                )}
              </View>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              style={[
                styles.resetButton,
                isLoading && styles.resetButtonDisabled,
              ]}
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              <Text style={styles.resetButtonText}>
                {isLoading ? "SENDING..." : "SEND RESET LINK"}
              </Text>
            </TouchableOpacity>

            {/* Additional Help */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>
                Remember your password?{" "}
                <Text style={styles.helpLink} onPress={handleBackToLogin}>
                  Back to login
                </Text>
              </Text>
            </View>
          </View>

          {/* Footer Info */}
          <View style={styles.footerContainer}>
                          <Text style={styles.footerText}>
                The reset link will expire in 1 hour for security reasons.
              </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.family.interBold,
    fontSize: 20,
  },
  placeholder: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.xxl,
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.large,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  title: {
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.md,
    fontFamily: FONTS.family.oswaldBold,
    fontSize: 30,
  },
  description: {
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: SPACING.xl,
    maxWidth: 300,
    fontFamily: FONTS.family.interRegular,
    fontSize: 18,
  },
  inputContainer: {
    width: "100%",
    marginBottom: SPACING.xl,
  },
  inputLabel: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    fontFamily: FONTS.family.interMedium,
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.md,
    height: SIZES.inputHeight,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    padding: 0,
    fontFamily: FONTS.family.interRegular,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  resetButtonDisabled: {
    opacity: 0.6,
  },
  resetButtonText: {
    color: COLORS.textPrimary,
    textTransform: "uppercase",
    fontFamily: FONTS.family.interSemiBold,
    fontSize: 16,
  },
  helpContainer: {
    alignItems: "center",
  },
  helpText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.family.interRegular,
    fontSize: 16,
  },
  helpLink: {
    color: COLORS.primaryAccent,
    fontFamily: FONTS.family.interMedium,
    fontSize: 16,
  },
  footerContainer: {
    paddingVertical: SPACING.xl,
    alignItems: "center",
  },
  footerText: {
    color: COLORS.textTertiary,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: FONTS.family.interRegular,
    fontSize: 12,
  },
});
