/**
 * History Tab
 * Displays user's listening history in the library section
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../../constants/theme';
import { usePlayer } from '../../../hooks/usePlayer';
import { useAuth } from '../../../hooks/useAuth';

// Mock data for listen history
const MOCK_LISTEN_HISTORY = [
  {
    id: '201',
    title: 'Flowers',
    artist: 'Miley Cyrus',
    duration: 200,
    thumbnailUrl: null,
    sourceType: 'youtube',
    listenedAt: new Date('2023-10-20T14:30:00'),
  },
  {
    id: '202',
    title: 'Kill Bill',
    artist: 'SZA',
    duration: 153,
    thumbnailUrl: null,
    sourceType: 'audius',
    listenedAt: new Date('2023-10-20T13:15:00'),
  },
  {
    id: '203',
    title: 'Creepin',
    artist: 'Metro Boomin, The Weeknd, 21 Savage',
    duration: 221,
    thumbnailUrl: null,
    sourceType: 'youtube',
    listenedAt: new Date('2023-10-19T20:45:00'),
  },
  {
    id: '204',
    title: 'Die For You',
    artist: 'The Weeknd',
    duration: 260,
    thumbnailUrl: null,
    sourceType: 'audius',
    listenedAt: new Date('2023-10-19T18:30:00'),
  },
  {
    id: '205',
    title: 'Calm Down',
    artist: 'Rema & Selena Gomez',
    duration: 239,
    thumbnailUrl: null,
    sourceType: 'youtube',
    listenedAt: new Date('2023-10-18T22:10:00'),
  },
  {
    id: '206',
    title: 'Snooze',
    artist: 'SZA',
    duration: 202,
    thumbnailUrl: null,
    sourceType: 'audius',
    listenedAt: new Date('2023-10-18T16:45:00'),
  },
];

export default function HistoryTab() {
  const router = useRouter();
  const { play, currentTrack, isPlaying, pause } = usePlayer();
  const { user } = useAuth();

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Format date for display
  const formatListenDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const listenDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (listenDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (listenDate.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Format time for display
  const formatListenTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Group history by date
  const groupedHistory = MOCK_LISTEN_HISTORY.reduce((groups, track) => {
    const dateKey = formatListenDate(track.listenedAt);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(track);
    return groups;
  }, {} as Record<string, typeof MOCK_LISTEN_HISTORY>);

  // Convert grouped history to array for FlatList
  const historyByDate = Object.entries(groupedHistory).map(([date, tracks]) => ({
    date,
    tracks,
  }));

  // Navigate to track detail
  const handleTrackPress = (trackId: string) => {
    router.push(`/track/${trackId}`);
  };

  // Play or pause track
  const handlePlayPause = (track: typeof MOCK_LISTEN_HISTORY[0]) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      // In a real app, we would convert the mock track to a proper Track object
      // and pass it to the play function
      play();
    }
  };

  // Render a track item
  const renderTrackItem = ({ item }: { item: typeof MOCK_LISTEN_HISTORY[0] }) => {
    const isCurrentTrack = currentTrack?.id === item.id;

    return (
      <TouchableOpacity 
        style={styles.trackItem}
        onPress={() => handleTrackPress(item.id)}
      >
        <View style={styles.trackCover}>
          {item.thumbnailUrl ? (
            <Image source={{ uri: item.thumbnailUrl }} style={styles.coverImage} />
          ) : (
            <View style={styles.placeholderCover}>
              <Ionicons name="musical-note" size={20} color={COLORS.textSecondary} />
            </View>
          )}
        </View>
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.trackArtist} numberOfLines={1}>{item.artist}</Text>
        </View>
        <View style={styles.trackMeta}>
          <Text style={styles.timeText}>{formatListenTime(item.listenedAt)}</Text>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => handlePlayPause(item)}
          >
            <Ionicons 
              name={isCurrentTrack && isPlaying ? 'pause' : 'play'} 
              size={20} 
              color={COLORS.textPrimary} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // Render a date section
  const renderDateSection = ({ item }: { item: { date: string, tracks: typeof MOCK_LISTEN_HISTORY } }) => {
    return (
      <View style={styles.dateSection}>
        <Text style={styles.dateSectionTitle}>{item.date}</Text>
        {item.tracks.map(track => (
          <React.Fragment key={track.id}>
            {renderTrackItem({ item: track })}
          </React.Fragment>
        ))}
      </View>
    );
  };

  // If user is not logged in, show sign in prompt
  if (!user) {
    return (
      <View style={styles.signInContainer}>
        <Ionicons name="time-outline" size={64} color={COLORS.textSecondary} />
        <Text style={styles.signInTitle}>Track Your Listening History</Text>
        <Text style={styles.signInText}>
          Sign in to keep track of your listening history and discover your music patterns
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
      {/* Header with clear history option */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Listen History</Text>
          <Text style={styles.headerSubtitle}>{MOCK_LISTEN_HISTORY.length} tracks</Text>
        </View>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={() => console.log('Clear history')}
        >
          <Ionicons name="trash-outline" size={18} color={COLORS.textSecondary} />
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* History list grouped by date */}
      <FlatList
        data={historyByDate}
        keyExtractor={(item) => item.date}
        renderItem={renderDateSection}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No listening history yet</Text>
            <Text style={styles.emptySubtext}>Your recently played tracks will appear here</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  clearText: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  listContent: {
    padding: SPACING.lg,
    paddingTop: 0,
  },
  dateSection: {
    marginBottom: SPACING.lg,
  },
  dateSectionTitle: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  trackCover: {
    width: 50,
    height: 50,
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
  trackInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  trackTitle: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  trackMeta: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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
  signInContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  signInTitle: {
    fontSize: 20,
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