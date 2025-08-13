/**
 * User Followers Screen
 * Displays users who follow the specified user
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../../constants/theme';
import { useAuth } from '../../../hooks/useAuth';

// Mock data for followers
const MOCK_FOLLOWERS = [
  {
    id: '1',
    username: 'jazzlover',
    displayName: 'Jazz Lover',
    avatarUrl: null,
    isFollowing: false,
  },
  {
    id: '2',
    username: 'rockfan',
    displayName: 'Rock Fan',
    avatarUrl: null,
    isFollowing: true,
  },
  {
    id: '3',
    username: 'popmusic',
    displayName: 'Pop Music',
    avatarUrl: null,
    isFollowing: false,
  },
  {
    id: '4',
    username: 'classicalfan',
    displayName: 'Classical Fan',
    avatarUrl: null,
    isFollowing: true,
  },
  {
    id: '5',
    username: 'indiemusic',
    displayName: 'Indie Music',
    avatarUrl: null,
    isFollowing: false,
  },
];

export default function UserFollowersScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  
  // Fetch user data and followers
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call to fetch user data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        setProfileUser({
          id,
          username: 'musiclover',
          displayName: 'Music Lover',
        });
        
        setFollowers(MOCK_FOLLOWERS);
      } catch (error) {
        console.error('Error fetching followers data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  // Handle follow/unfollow user
  const handleFollowToggle = (userId) => {
    setFollowers(prevFollowers => 
      prevFollowers.map(follower => 
        follower.id === userId 
          ? { ...follower, isFollowing: !follower.isFollowing } 
          : follower
      )
    );
    // In a real app, you would make an API call to follow/unfollow the user
  };
  
  // Render user item
  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <TouchableOpacity 
        style={styles.userInfo}
        onPress={() => router.push(`/user/${item.id}`)}
      >
        {item.avatarUrl ? (
          <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text style={styles.avatarInitial}>{item.username.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        <View style={styles.userTextContainer}>
          <Text style={styles.displayName}>{item.displayName}</Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
      </TouchableOpacity>
      {user && item.id !== user.id && (
        <TouchableOpacity 
          style={[styles.followButton, item.isFollowing && styles.followingButton]}
          onPress={() => handleFollowToggle(item.id)}
        >
          <Text style={[styles.followButtonText, item.isFollowing && styles.followingButtonText]}>
            {item.isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
  
  // Loading state
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Loading followers...</Text>
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
        <Text style={styles.headerTitle}>
          {profileUser.displayName}'s Followers
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Followers List */}
      {followers.length > 0 ? (
        <FlatList
          data={followers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={60} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>No followers yet</Text>
          <Text style={styles.emptyText}>
            When people follow {profileUser.displayName}, they'll show up here
          </Text>
        </View>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
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
  listContent: {
    padding: SPACING.md,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  userTextContainer: {
    marginLeft: SPACING.md,
  },
  displayName: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  username: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  followButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    backgroundColor: COLORS.primaryAccent,
    minWidth: 100,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  followButtonText: {
    fontSize: 14,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  followingButtonText: {
    color: COLORS.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
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