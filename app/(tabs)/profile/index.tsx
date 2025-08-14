/**
 * User Profile Screen
 * Displays user information and settings
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING } from "../../../constants/theme";
import { useAuth } from "../../../hooks/useAuth";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, deleteAccount } = useAuth();

  // State for settings
  const [darkMode, setDarkMode] = useState(true); // App is dark mode by default
  const [streamingQuality, setStreamingQuality] = useState("High");
  const [downloadQuality, setDownloadQuality] = useState("Standard");
  const [autoplay, setAutoplay] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              // Navigation will be handled by the AuthProvider
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  // Confirm delete account
  const confirmDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      Alert.alert(
        "Error",
        "Please type 'DELETE' exactly to confirm account deletion."
      );
      return;
    }

    try {
      setIsDeletingAccount(true);

      // Call AuthContext to delete account
      const { error } = await deleteAccount();
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      setShowDeleteModal(false);
      setDeleteConfirmation("");

      Alert.alert(
        "Account Deleted",
        "Your account and all associated data have been permanently deleted.",
        [
          {
            text: "OK",
            onPress: () => {
              // After deletion, navigate to onboarding
              router.replace("/onboarding");
            },
          },
        ]
      );
    } catch (error: any) {
      console.error("Delete account error:", error);
      Alert.alert(
        "Error",
        "Failed to delete account. Please try again or contact support if the problem persists."
      );
    } finally {
      setIsDeletingAccount(false);
    }
  };

  // Cancel delete account
  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
    setDeleteConfirmation("");
  };

  // Handle streaming quality selection
  const handleStreamingQuality = () => {
    Alert.alert(
      "Streaming Quality",
      "Select your preferred streaming quality",
      [
        { text: "Low (64 kbps)", onPress: () => setStreamingQuality("Low") },
        {
          text: "Standard (128 kbps)",
          onPress: () => setStreamingQuality("Standard"),
        },
        { text: "High (256 kbps)", onPress: () => setStreamingQuality("High") },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  // Handle download quality selection
  const handleDownloadQuality = () => {
    Alert.alert(
      "Download Quality",
      "Select your preferred download quality",
      [
        { text: "Low (64 kbps)", onPress: () => setDownloadQuality("Low") },
        {
          text: "Standard (128 kbps)",
          onPress: () => setDownloadQuality("Standard"),
        },
        { text: "High (256 kbps)", onPress: () => setDownloadQuality("High") },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  // If user is not logged in, redirect to onboarding
  if (!user) {
    // Redirect to onboarding since user shouldn't be able to access this tab without auth
    React.useEffect(() => {
      router.replace("/onboarding");
    }, []);

    return (
      <View style={styles.loadingContainer}>
        <Ionicons
          name="person-circle-outline"
          size={80}
          color={COLORS.textSecondary}
        />
        <Text style={styles.loadingText}>Redirecting to onboarding...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => console.log("Open settings")}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.userAvatar}>
            {user.avatarUrl ? (
              <Image
                source={{ uri: user.avatarUrl }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.placeholderAvatar}>
                <Text style={styles.avatarInitial}>
                  {user.username.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => router.push("/profile/edit")}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>48</Text>
            <Text style={styles.statLabel}>Liked Songs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsTitle}>Settings</Text>

          {/* Appearance */}
          <View style={styles.settingSection}>
            <Text style={styles.settingSectionTitle}>Appearance</Text>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingDescription}>Use dark theme</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{
                  false: COLORS.backgroundTertiary,
                  true: COLORS.primaryAccent,
                }}
                thumbColor={COLORS.textPrimary}
              />
            </View>
          </View>

          {/* Playback */}
          <View style={styles.settingSection}>
            <Text style={styles.settingSectionTitle}>Playback</Text>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleStreamingQuality}
            >
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Streaming Quality</Text>
                <Text style={styles.settingDescription}>
                  {streamingQuality}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleDownloadQuality}
            >
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Download Quality</Text>
                <Text style={styles.settingDescription}>{downloadQuality}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Autoplay</Text>
                <Text style={styles.settingDescription}>
                  Play next track automatically
                </Text>
              </View>
              <Switch
                value={autoplay}
                onValueChange={setAutoplay}
                trackColor={{
                  false: COLORS.backgroundTertiary,
                  true: COLORS.primaryAccent,
                }}
                thumbColor={COLORS.textPrimary}
              />
            </View>
          </View>

          {/* Data Usage */}
          <View style={styles.settingSection}>
            <Text style={styles.settingSectionTitle}>Data Usage</Text>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Data Saver</Text>
                <Text style={styles.settingDescription}>
                  Reduce data usage when streaming
                </Text>
              </View>
              <Switch
                value={dataSaver}
                onValueChange={setDataSaver}
                trackColor={{
                  false: COLORS.backgroundTertiary,
                  true: COLORS.primaryAccent,
                }}
                thumbColor={COLORS.textPrimary}
              />
            </View>
          </View>

          {/* Account */}
          <View style={styles.settingSection}>
            <Text style={styles.settingSectionTitle}>Account</Text>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Change Password</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.settingItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.settingItem, styles.deleteAccountItem]}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.deleteAccountText}>Delete Account</Text>
            </TouchableOpacity>
          </View>

          {/* About */}
          <View style={styles.settingSection}>
            <Text style={styles.settingSectionTitle}>About</Text>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Terms of Service</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Privacy Policy</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
            <View style={styles.versionInfo}>
              <Text style={styles.versionText}>Streamly v1.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showDeleteModal}
        animationType="slide"
        transparent={true}
        onRequestClose={isDeletingAccount ? undefined : cancelDeleteAccount}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Account Deletion</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
            </Text>
            <Text style={styles.modalWarning}>
              This will delete:
              • All your playlists
              • Your listening history
              • Liked songs
              • User profile and settings
              • All cached data
            </Text>
            <Text style={styles.modalText}>
              Please type "DELETE" exactly to confirm.
            </Text>
            <TextInput
              style={styles.deleteConfirmInput}
              value={deleteConfirmation}
              onChangeText={setDeleteConfirmation}
              placeholder="Type 'DELETE' to confirm"
              placeholderTextColor={COLORS.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelDeleteAccount}
                disabled={isDeletingAccount}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirmButton,
                  isDeletingAccount && styles.disabledButton,
                ]}
                onPress={confirmDeleteAccount}
                disabled={isDeletingAccount}
              >
                {isDeletingAccount ? (
                  <Text style={styles.modalButtonText}>Deleting...</Text>
                ) : (
                  <Text style={styles.modalButtonText}>Delete Account</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 100, // Space for mini player
  },
  userInfoContainer: {
    alignItems: "center",
    padding: SPACING.lg,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: SPACING.md,
    position: "relative",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  placeholderAvatar: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.primaryAccent,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 40,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.backgroundTertiary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  username: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  editProfileButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  editProfileText: {
    fontSize: 14,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.divider,
    marginBottom: SPACING.lg,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
  },
  settingsContainer: {
    padding: SPACING.lg,
  },
  settingsTitle: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  settingSection: {
    marginBottom: SPACING.lg,
  },
  settingSectionTitle: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  logoutItem: {
    justifyContent: "center",
    paddingVertical: SPACING.md,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: COLORS.error,
  },
  deleteAccountItem: {
    justifyContent: "center",
    paddingVertical: SPACING.md,
  },
  deleteAccountText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: COLORS.error,
  },
  versionInfo: {
    alignItems: "center",
    marginTop: SPACING.md,
  },
  versionText: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textTertiary,
  },
  signInContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
  signInTitle: {
    fontSize: 24,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  signInText: {
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xl,
  },
  signInButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 30,
    marginBottom: SPACING.md,
    width: "80%",
    alignItems: "center",
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  registerButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.divider,
    width: "80%",
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: SPACING.lg,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  modalText: {
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  modalWarning: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  deleteConfirmInput: {
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    width: "100%",
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textPrimary,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: COLORS.backgroundTertiary,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  confirmButton: {
    backgroundColor: COLORS.error,
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  disabledButton: {
    opacity: 0.7,
  },
});
