/**
 * Registration Screen
 * Simple signup screen with email, password, username, and date of birth
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
import { useAuth } from "../../context/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Date of birth state
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Generate date options
  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString()
  );

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateUsername = (username: string) => {
    return username.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  };

  const validateDateOfBirth = () => {
    if (!selectedDay || !selectedMonth || !selectedYear) return false;

    const day = parseInt(selectedDay);
    const month = parseInt(selectedMonth);
    const year = parseInt(selectedYear);

    // Basic date validation
    if (day < 1 || day > 31 || month < 1 || month > 12) return false;

    // Check if user is at least 13 years old
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 13;
    }

    return age >= 13;
  };

  const handleRegistration = async () => {
    // Validate all fields
    if (!validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert("Validation Error", "Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    if (!validateUsername(username)) {
      Alert.alert(
        "Validation Error",
        "Username must be at least 3 characters and contain only letters, numbers, and underscores"
      );
      return;
    }

    if (!validateDateOfBirth()) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid date of birth (must be 13+ years old)"
      );
      return;
    }

    const formattedDateOfBirth = `${selectedYear}-${selectedMonth}-${selectedDay}`;

    const { error } = await register({
      email: email.trim(),
      password,
      username: username.trim(),
      dateOfBirth: formattedDateOfBirth,
    });

    if (error) {
      Alert.alert(
        "Registration Failed",
        error.message || "Registration failed"
      );
    } else {
      Alert.alert(
        "Registration Successful",
        "Your account has been created successfully!",
        [{ text: "OK", onPress: () => router.replace("/(tabs)") }]
      );
    }
  };

  const handleSocialSignup = (provider: string) => {
    Alert.alert(
      "Coming Soon",
      `${provider} signup will be available in a future update.`,
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
            <Text style={styles.headerTitle}>Create Account</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Branding */}
          <View style={styles.brandingContainer}>
            <Text style={styles.appName}>Streamly</Text>
            <Text style={styles.tagline}>Join the music revolution</Text>
          </View>

          {/* Registration Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
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
                />
              </View>
            </View>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Choose a username"
                  placeholderTextColor={COLORS.textTertiary}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
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

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor={COLORS.textTertiary}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Date of Birth */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <View style={styles.dateDropdownsContainer}>
                {/* Month Dropdown */}
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() =>
                      setActiveDropdown(
                        activeDropdown === "month" ? null : "month"
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.dropdownButtonText,
                        !selectedMonth && styles.placeholderText,
                      ]}
                    >
                      {selectedMonth
                        ? months.find((m) => m.value === selectedMonth)?.label
                        : "Month"}
                    </Text>
                    <Ionicons
                      name={
                        activeDropdown === "month"
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={16}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>

                  {activeDropdown === "month" && (
                    <View style={styles.dropdownOptions}>
                      <ScrollView
                        style={styles.dropdownScroll}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                      >
                        {months.map((month) => (
                          <TouchableOpacity
                            key={month.value}
                            style={styles.dropdownOption}
                            onPress={() => {
                              setSelectedMonth(month.value);
                              setActiveDropdown(null);
                            }}
                          >
                            <Text style={styles.dropdownOptionText}>
                              {month.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* Day Dropdown */}
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() =>
                      setActiveDropdown(activeDropdown === "day" ? null : "day")
                    }
                  >
                    <Text
                      style={[
                        styles.dropdownButtonText,
                        !selectedDay && styles.placeholderText,
                      ]}
                    >
                      {selectedDay || "Day"}
                    </Text>
                    <Ionicons
                      name={
                        activeDropdown === "day" ? "chevron-up" : "chevron-down"
                      }
                      size={16}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>

                  {activeDropdown === "day" && (
                    <View style={styles.dropdownOptions}>
                      <ScrollView
                        style={styles.dropdownScroll}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                      >
                        {days.map((day) => (
                          <TouchableOpacity
                            key={day}
                            style={styles.dropdownOption}
                            onPress={() => {
                              setSelectedDay(day);
                              setActiveDropdown(null);
                            }}
                          >
                            <Text style={styles.dropdownOptionText}>{day}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* Year Dropdown */}
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() =>
                      setActiveDropdown(
                        activeDropdown === "year" ? null : "year"
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.dropdownButtonText,
                        !selectedYear && styles.placeholderText,
                      ]}
                    >
                      {selectedYear || "Year"}
                    </Text>
                    <Ionicons
                      name={
                        activeDropdown === "year"
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={16}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>

                  {activeDropdown === "year" && (
                    <View style={styles.dropdownOptions}>
                      <ScrollView
                        style={styles.dropdownScroll}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                      >
                        {years.map((year) => (
                          <TouchableOpacity
                            key={year}
                            style={styles.dropdownOption}
                            onPress={() => {
                              setSelectedYear(year);
                              setActiveDropdown(null);
                            }}
                          >
                            <Text style={styles.dropdownOptionText}>
                              {year}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                isLoading && styles.registerButtonDisabled,
              ]}
              onPress={handleRegistration}
              disabled={isLoading}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Signup */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.facebookButton}
              onPress={() => handleSocialSignup("Facebook")}
            >
              <Ionicons
                name="logo-facebook"
                size={20}
                color={COLORS.textPrimary}
              />
              <Text style={styles.facebookButtonText}>
                Sign up with Facebook
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => handleSocialSignup("Google")}
            >
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Login Prompt */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By clicking "Create Account", you agree to the{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
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
  dateDropdownsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  dropdownContainer: {
    flex: 1,
    position: "relative",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.md,
    height: SIZES.inputHeight,
  },
  dropdownButtonText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.family.interRegular,
    fontSize: 16,
  },
  placeholderText: {
    color: COLORS.textTertiary,
  },
  dropdownOptions: {
    position: "absolute",
    top: SIZES.inputHeight + 4,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    maxHeight: 200,
    zIndex: 1000,
    ...SHADOWS.medium,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownOption: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  dropdownOptionText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.family.interRegular,
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.lg,
    ...SHADOWS.medium,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.xl,
  },
  loginText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.family.interRegular,
    fontSize: 16,
  },
  loginLink: {
    color: COLORS.primaryAccent,
    fontFamily: FONTS.family.interMedium,
    fontSize: 16,
  },
  termsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  termsText: {
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: FONTS.family.interRegular,
    fontSize: 12,
  },
  termsLink: {
    color: COLORS.primaryAccent,
    textDecorationLine: "underline",
  },
});
