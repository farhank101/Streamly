/**
 * Login Screen
 * Beautiful login screen with email/username and password authentication
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
import { useAuth } from "../../hooks/useAuth";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!emailOrUsername.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const { error } = await login({
      emailOrUsername: emailOrUsername.trim(),
      password,
    });

    if (error) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    } else {
      // Success - user will be redirected by the auth context
      console.log("Login successful");
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(
      "Coming Soon",
      `${provider} login will be available in a future update.`,
      [{ text: "OK" }]
    );
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
            <Text style={styles.headerTitle}>Log In</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Branding */}
          <View style={styles.brandingContainer}>
            <Text style={styles.appName}>Streamly</Text>
            <Text style={styles.tagline}>Your music, everywhere</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email or Username</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={emailOrUsername}
                  onChangeText={setEmailOrUsername}
                  placeholder="Enter your email or username"
                  placeholderTextColor={COLORS.textTertiary}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  autoFocus
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textTertiary}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "LOGGING IN..." : "LOG IN"}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.facebookButton}
                onPress={() => handleSocialLogin("Facebook")}
              >
                <Ionicons
                  name="logo-facebook"
                  size={20}
                  color={COLORS.textPrimary}
                />
                <Text style={styles.facebookButtonText}>
                  Continue with Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.googleButton}
                onPress={() => handleSocialLogin("Google")}
              >
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Prompt */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
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
  brandingContainer: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  appName: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    fontFamily: FONTS.family.oswaldBold,
    fontSize: 30,
  },
  tagline: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.family.interRegular,
    fontSize: 18,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
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
  eyeButton: {
    padding: SPACING.xs,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    color: COLORS.primaryAccent,
    fontFamily: FONTS.family.interRegular,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: COLORS.textPrimary,
    textTransform: "uppercase",
    fontFamily: FONTS.family.interSemiBold,
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dividerText: {
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.md,
    fontFamily: FONTS.family.interRegular,
    fontSize: 14,
  },
  socialContainer: {
    marginBottom: SPACING.xl,
  },
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1877F2",
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  facebookButtonText: {
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    fontFamily: FONTS.family.interMedium,
    fontSize: 16,
    textTransform: "uppercase",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.textPrimary,
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    ...SHADOWS.medium,
  },
  googleButtonText: {
    color: COLORS.background,
    marginLeft: SPACING.sm,
    fontFamily: FONTS.family.interMedium,
    fontSize: 16,
    textTransform: "uppercase",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.xl,
  },
  signupText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.family.interRegular,
    fontSize: 16,
  },
  signupLink: {
    color: COLORS.primaryAccent,
    fontFamily: FONTS.family.interMedium,
    fontSize: 16,
  },
});
