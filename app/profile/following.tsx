/**
 * Following Screen
 * Displays users that the current user is following
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';

// Mock data for following users
const MOCK_FOLLOWING = [
  {
    id: '1',
    username: 'musiclover',
    displayName: 'Music Lover',
    avatarUrl: null,
    isFollowing: true,
  },
  {
    id: '2',
    username: 'beatmaker',
    displayName: 'Beat Maker',
    avatarUrl: null,
    isFollowing: true,
  },
  {
    id: '3',
    username: 'jazzfan',
    displayName: 'Jazz Fan',
    avatarUrl: null,
    isFollowing: true,
  },
  {
    id: '4',
    username: 'rockstar',
    displayName: 'Rock Star',
    avatarUrl: null,
    isFollowing: true,
  },
  {
    id: '5',
    username: 'classicalmusic',
    displayName: 'Classical Music',
    avatarUrl: null,
    isFollowing: true,
  },
];

export default function FollowingScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [following, setFollowing] = useState(MOCK_FOLLOWING);

  // Handle follow/unfollow user
  const handleFollowToggle = (userId) => {
    setFollowing(prevFollowing => 
      prevFollowing.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing } 
          : user
      )
    );
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
      <TouchableOpacity 
        style={[styles.followButton, item.isFollowing && styles.followingButton]}
        onPress={() => handleFollowToggle(item.id)}
      >
        <Text style={[styles.followButtonText, item.isFollowing && styles.followingButtonText]}>
          {item.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // If user is not logged in, show sign in prompt
  if (!user) {
    return (
      <View style={styles.signInContainer}>
        <Ionicons name="person-circle-outline" size={80} color={COLORS.textSecondary} />
        <Text style={styles.signInTitle}>Sign in to Streamly</Text>
        <Text style={styles.signInText}>
          Sign in to see who you're following
        </Text>
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
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
        <Text style={styles.headerTitle}>Following</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Following List */}
      {following.length > 0 ? (
        <FlatList
          data={following}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={60} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>Not following anyone yet</Text>
          <Text style={styles.emptyText}>
            When you follow someone, you'll see them here
          </Text>
          <TouchableOpacity 
            style={styles.findButton}
            onPress={() => router.push('/(tabs)/search')}
          >
            <Text style={styles.findButtonText}>Find People to Follow</Text>
          </TouchableOpacity>
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
    marginBottom: SPACING.xl,
  },
  findButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 30,
  },
  findButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
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
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
});