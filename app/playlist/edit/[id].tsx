/**
 * Edit Playlist Screen
 * Allows users to edit an existing playlist's details
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../../constants/theme';
import { useAuth } from '../../../hooks/useAuth';

// Mock data for the playlist being edited
const MOCK_PLAYLIST = {
  id: '1',
  name: 'Chill Vibes',
  description: 'Perfect playlist for relaxing and unwinding after a long day.',
  coverUrl: null,
  isPrivate: false,
  createdAt: new Date('2023-09-15'),
  updatedAt: new Date('2023-10-18'),
  createdBy: {
    id: 'user1',
    username: 'musiclover',
  },
  trackCount: 12,
  duration: 2520, // in seconds (42 minutes)
};

export default function EditPlaylistScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  
  // State for playlist details
  const [name, setName] = useState(MOCK_PLAYLIST.name);
  const [description, setDescription] = useState(MOCK_PLAYLIST.description || '');
  const [isPrivate, setIsPrivate] = useState(MOCK_PLAYLIST.isPrivate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if form is valid
  const isFormValid = name.trim().length > 0;

  // Check if user is the creator of the playlist
  const isCreator = user?.id === MOCK_PLAYLIST.createdBy.id;

  // If user is not the creator, redirect back
  if (!isCreator) {
    router.replace(`/playlist/${id}`);
    return null;
  }

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!isFormValid) {
      setError('Please enter a playlist name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In a real app, this would call an API to update the playlist
      // For now, we'll simulate a delay and success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to playlist detail with success message
      router.replace({
        pathname: `/playlist/${id}`,
        params: { 
          message: 'Playlist updated successfully!',
          status: 'success'
        }
      });
    } catch (err) {
      setError('Failed to update playlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete playlist
  const handleDeletePlaylist = () => {
    Alert.alert(
      'Delete Playlist',
      'Are you sure you want to delete this playlist? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              // In a real app, this would call an API to delete the playlist
              // For now, we'll simulate a delay and success
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Navigate back to playlists with success message
              router.replace({
                pathname: '/(tabs)/library/playlists',
                params: { 
                  message: `Playlist "${name}" deleted successfully!`,
                  status: 'success'
                }
              });
            } catch (err) {
              setError('Failed to delete playlist. Please try again.');
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Playlist</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Playlist cover placeholder */}
          <View style={styles.coverPlaceholder}>
            <Ionicons name="musical-notes" size={48} color={COLORS.textSecondary} />
            <TouchableOpacity style={styles.changeCoverButton}>
              <Ionicons name="camera" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Error message */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          {/* Name input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="My Awesome Playlist"
              placeholderTextColor={COLORS.textTertiary}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Description input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description (optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add an optional description"
              placeholderTextColor={COLORS.textTertiary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Privacy toggle */}
          <View style={styles.toggleContainer}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Private Playlist</Text>
              <Text style={styles.toggleDescription}>
                When enabled, only you can see this playlist
              </Text>
            </View>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: COLORS.backgroundTertiary, true: COLORS.primaryAccent }}
              thumbColor={COLORS.textPrimary}
            />
          </View>

          {/* Delete playlist button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeletePlaylist}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            <Text style={styles.deleteButtonText}>Delete Playlist</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
          onPress={handleSaveChanges}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <Text style={styles.saveButtonText}>Saving...</Text>
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Space for the button at bottom
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  form: {
    padding: SPACING.lg,
  },
  coverPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: COLORS.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.xl,
    position: 'relative',
  },
  changeCoverButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: COLORS.primaryAccent,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    fontFamily: 'InterRegular',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  textArea: {
    minHeight: 100,
    paddingTop: SPACING.md,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  toggleInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.error,
    marginLeft: SPACING.sm,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  saveButton: {
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 30,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.backgroundTertiary,
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
});