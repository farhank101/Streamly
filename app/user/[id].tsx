/**
 * User Profile Screen
 * Displays another user's profile information
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';

// Mock data for user playlists
const MOCK_PLAYLISTS = [
  {
    id: '1',
    name: 'Chill Vibes',
    trackCount: 15,
    imageUrl: null,
  },
  {
    id: '2',
    name: 'Workout Mix',
    trackCount: 20,
    imageUrl: null,
  },
  {
    id: '3',
    name: 'Focus Time',
    trackCount: 12,
    imageUrl: null,
  },
];

export default function UserProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call to fetch user data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        setProfileUser({
          id,
          username: 'musiclover',
          displayName: 'Music Lover',
          bio: 'Just a person who loves music of all genres. Always looking for new artists and songs to add to my collection.',
          avatarUrl: null,
          followersCount: 120,
          followingCount: 85,
        });
        
        setIsFollowing(false);
        setPlaylists(MOCK_PLAYLISTS);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [id]);
  
  // Handle follow/unfollow
  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
    // In a real app, you would make an API call to follow/unfollow the user
  };
  
  // Render playlist item
  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.playlistItem}
      onPress={() => router.push(`/playlist/${item.id}`)}
    >
      <View style={styles.playlistImageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.playlistImage} />
        ) : (
          <View style={styles.playlistImagePlaceholder}>
            <Ionicons name="musical-notes" size={30} color={COLORS.textSecondary} />
          </View>
        )}
      </View>
      <Text style={styles.playlistName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.playlistTrackCount}>{item.trackCount} tracks</Text>
    </TouchableOpacity>
  );
  
  // Loading state
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }
  
  // User not found
  if (!profileUser) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons name="person-outline" size={60} color={COLORS.textSecondary} />
        <Text style={styles.notFoundTitle}>User Not Found</Text>
        <Text style={styles.notFoundText}>The user you're looking for doesn't exist or has been removed</Text>
        <TouchableOpacity 
          style={styles.backHomeButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.backHomeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.userAvatar}>
            {profileUser.avatarUrl ? (
              <Image source={{ uri: profileUser.avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.placeholderAvatar}>
                <Text style={styles.avatarInitial}>{profileUser.username.charAt(0).toUpperCase()}</Text>
              </View>
            )}
          </View>
          <Text style={styles.displayName}>{profileUser.displayName}</Text>
          <Text style={styles.username}>@{profileUser.username}</Text>
          
          {profileUser.bio && (
            <Text style={styles.bio}>{profileUser.bio}</Text>
          )}
          
          {/* Follow button */}
          {user && user.id !== profileUser.id && (
            <TouchableOpacity 
              style={[styles.followButton, isFollowing && styles.followingButton]}
              onPress={handleFollowToggle}
            >
              <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={styles.statItem}
            onPress={() => router.push(`/user/${profileUser.id}/followers`)}
          >
            <Text style={styles.statValue}>{profileUser.followersCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <TouchableOpacity 
            style={styles.statItem}
            onPress={() => router.push(`/user/${profileUser.id}/following`)}
          >
            <Text style={styles.statValue}>{profileUser.followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
        </View>

        {/* Playlists */}
        <View style={styles.playlistsContainer}>
          <Text style={styles.sectionTitle}>Public Playlists</Text>
          
          {playlists.length > 0 ? (
            <FlatList
              data={playlists}
              renderItem={renderPlaylistItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.playlistsList}
            />
          ) : (
            <View style={styles.emptyPlaylistsContainer}>
              <Ionicons name="musical-notes-outline" size={40} color={COLORS.textSecondary} />
              <Text style={styles.emptyPlaylistsText}>No public playlists</Text>
            </View>
          )}
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
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
  moreButton: {
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
  displayName: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  bio: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  followButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    borderRadius: 20,
    backgroundColor: COLORS.primaryAccent,
    minWidth: 120,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  followButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  followingButtonText: {
    color: COLORS.textPrimary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.divider,
    marginBottom: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
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
    height: '60%',
    backgroundColor: COLORS.divider,
    alignSelf: 'center',
  },
  playlistsContainer: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  playlistsList: {
    paddingRight: SPACING.lg,
  },
  playlistItem: {
    width: 150,
    marginRight: SPACING.md,
  },
  playlistImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  playlistImage: {
    width: '100%',
    height: '100%',
  },
  playlistImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistName: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  playlistTrackCount: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  emptyPlaylistsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 8,
  },
  emptyPlaylistsText: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'InterMedium',
    color: COLORS.textSecondary,
  },
  notFoundTitle: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  notFoundText: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  backHomeButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 30,
  },
  backHomeButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
});