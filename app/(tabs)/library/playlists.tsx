/**
 * Playlists Tab
 * Displays user's playlists in the library section
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../../constants/theme';

// Mock data for playlists
const MOCK_PLAYLISTS = [
  {
    id: '1',
    name: 'Favorite Tracks',
    description: 'My all-time favorites',
    coverImageUrl: null,
    trackCount: 42,
  },
  {
    id: '2',
    name: 'Workout Mix',
    description: 'High energy tracks for the gym',
    coverImageUrl: null,
    trackCount: 18,
  },
  {
    id: '3',
    name: 'Chill Vibes',
    description: 'Relaxing music for downtime',
    coverImageUrl: null,
    trackCount: 25,
  },
  {
    id: '4',
    name: 'Coding Focus',
    description: 'Concentration music for programming',
    coverImageUrl: null,
    trackCount: 15,
  },
];

export default function PlaylistsTab() {
  const router = useRouter();

  // Navigate to playlist detail
  const handlePlaylistPress = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`);
  };

  // Create new playlist
  const handleCreatePlaylist = () => {
    // In a real app, this would open a modal to create a new playlist
    console.log('Create new playlist');
  };

  // Render a playlist item
  const renderPlaylistItem = ({ item }: { item: typeof MOCK_PLAYLISTS[0] }) => (
    <TouchableOpacity 
      style={styles.playlistItem}
      onPress={() => handlePlaylistPress(item.id)}
    >
      <View style={styles.playlistCover}>
        {item.coverImageUrl ? (
          <Image source={{ uri: item.coverImageUrl }} style={styles.coverImage} />
        ) : (
          <View style={styles.placeholderCover}>
            <Ionicons name="musical-notes" size={24} color={COLORS.textSecondary} />
          </View>
        )}
      </View>
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.playlistDescription} numberOfLines={1}>{item.description}</Text>
        <Text style={styles.playlistTrackCount}>{item.trackCount} tracks</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Create playlist button */}
      <TouchableOpacity 
        style={styles.createButton}
        onPress={handleCreatePlaylist}
      >
        <Ionicons name="add" size={24} color={COLORS.textPrimary} />
        <Text style={styles.createButtonText}>Create New Playlist</Text>
      </TouchableOpacity>

      {/* Playlists list */}
      <FlatList
        data={MOCK_PLAYLISTS}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaylistItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="musical-notes-outline" size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No playlists yet</Text>
            <Text style={styles.emptySubtext}>Create your first playlist to start organizing your music</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: SPACING.md,
    margin: SPACING.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'dashed',
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  listContent: {
    padding: SPACING.lg,
    paddingTop: 0,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  playlistCover: {
    width: 60,
    height: 60,
    borderRadius: 4,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  placeholderCover: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  playlistName: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  playlistDescription: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  playlistTrackCount: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  moreButton: {
    padding: SPACING.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});