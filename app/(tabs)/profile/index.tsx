/**
 * User Profile Screen
 * Displays user information and settings
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../../constants/theme';
import { useAuth } from '../../../hooks/useAuth';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  // State for settings
  const [darkMode, setDarkMode] = useState(true); // App is dark mode by default
  const [streamingQuality, setStreamingQuality] = useState('High');
  const [downloadQuality, setDownloadQuality] = useState('Standard');
  const [autoplay, setAutoplay] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  
  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // Navigation will be handled by the AuthProvider
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Handle streaming quality selection
  const handleStreamingQuality = () => {
    Alert.alert(
      'Streaming Quality',
      'Select your preferred streaming quality',
      [
        { text: 'Low (64 kbps)', onPress: () => setStreamingQuality('Low') },
        { text: 'Standard (128 kbps)', onPress: () => setStreamingQuality('Standard') },
        { text: 'High (256 kbps)', onPress: () => setStreamingQuality('High') },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  // Handle download quality selection
  const handleDownloadQuality = () => {
    Alert.alert(
      'Download Quality',
      'Select your preferred download quality',
      [
        { text: 'Low (64 kbps)', onPress: () => setDownloadQuality('Low') },
        { text: 'Standard (128 kbps)', onPress: () => setDownloadQuality('Standard') },
        { text: 'High (256 kbps)', onPress: () => setDownloadQuality('High') },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  // If user is not logged in, show sign in prompt
  if (!user) {
    return (
      <View style={styles.signInContainer}>
        <Ionicons name="person-circle-outline" size={80} color={COLORS.textSecondary} />
        <Text style={styles.signInTitle}>Sign in to Streamly</Text>
        <Text style={styles.signInText}>
          Sign in to access your profile, playlists, and personalized recommendations
        </Text>
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => router.push('/(auth)/register')}
        >
          <Text style={styles.registerButtonText}>Create Account</Text>
        </TouchableOpacity>
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
          onPress={() => console.log('Open settings')}
        >
          <Ionicons name="settings-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.userAvatar}>
            {user.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.placeholderAvatar}>
                <Text style={styles.avatarInitial}>{user.username.charAt(0).toUpperCase()}</Text>
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
            onPress={() => router.push('/profile/edit')}
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
                trackColor={{ false: COLORS.backgroundTertiary, true: COLORS.primaryAccent }}
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
                <Text style={styles.settingDescription}>{streamingQuality}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={handleDownloadQuality}
            >
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Download Quality</Text>
                <Text style={styles.settingDescription}>{downloadQuality}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Autoplay</Text>
                <Text style={styles.settingDescription}>Play next track automatically</Text>
              </View>
              <Switch
                value={autoplay}
                onValueChange={setAutoplay}
                trackColor={{ false: COLORS.backgroundTertiary, true: COLORS.primaryAccent }}
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
                <Text style={styles.settingDescription}>Reduce data usage when streaming</Text>
              </View>
              <Switch
                value={dataSaver}
                onValueChange={setDataSaver}
                trackColor={{ false: COLORS.backgroundTertiary, true: COLORS.primaryAccent }}
                thumbColor={COLORS.textPrimary}
              />
            </View>
          </View>
          
          {/* Account */}
          <View style={styles.settingSection}>
            <Text style={styles.settingSectionTitle}>Account</Text>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/(auth)/forgot-password')}
            >
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Change Password</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.settingItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          
          {/* About */}
          <View style={styles.settingSection}>
            <Text style={styles.settingSectionTitle}>About</Text>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Terms of Service</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Privacy Policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <View style={styles.versionInfo}>
              <Text style={styles.versionText}>Streamly v1.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 100, // Space for mini player
  },
  userInfoContainer: {
    alignItems: 'center',
    padding: SPACING.lg,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  placeholderAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primaryAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 40,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.backgroundTertiary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  username: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontFamily: 'InterRegular',
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
    fontFamily: 'InterMedium',
    color: COLORS.textPrimary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.divider,
    marginBottom: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'InterRegular',
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
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  settingSection: {
    marginBottom: SPACING.lg,
  },
  settingSectionTitle: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  logoutItem: {
    justifyContent: 'center',
    paddingVertical: SPACING.md,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: COLORS.error,
  },
  versionInfo: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textTertiary,
  },
  signInContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  signInTitle: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  signInText: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  signInButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 30,
    marginBottom: SPACING.md,
    width: '80%',
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  registerButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.divider,
    width: '80%',
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
});