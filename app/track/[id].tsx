/**
 * Track Detail Screen
 * Shows detailed information about a track and playback controls
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Share, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { Track } from '../../types/track';
import { usePlayer } from '../../hooks/usePlayer';
import { useAuth } from '../../hooks/useAuth';

export default function TrackDetailScreen() {
  const params = useLocalSearchParams();
  const id = typeof params.id === 'string' ? params.id : (Array.isArray(params.id) ? params.id[0] : undefined);
  
  const router = useRouter();
  const { play, pause, isPlaying, currentTrack } = usePlayer();
  const { isAuthenticated } = useAuth();
  
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  
  const fetchTrackDetails = useCallback(async () => {
    if (!id) {
      setError('No track ID provided');
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let mockTrack: Track;
      
      // Check if it's a YouTube video ID format
      if (id.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
        try {
          const { getYouTubeVideo } = await import('../../services/youtube');
          const youtubeTrack = await getYouTubeVideo(id);
          mockTrack = youtubeTrack;
        } catch (error) {
          console.error('Failed to fetch YouTube video:', error);
          // Fallback to mock data
          mockTrack = {
            id,
            sourceId: `youtube-${id}`,
            sourceType: 'youtube',
            title: `YouTube Track ${id}`,
            artist: 'Unknown Artist',
            duration: 240,
            thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&crop=face',
            createdAt: new Date(),
            playCount: 1500,
          };
        }
      } else {
        // Generate mock track data
        mockTrack = {
          id,
          sourceId: `track-${id}`,
          sourceType: 'youtube',
          title: `Track ${id}`,
          artist: `Artist for ${id}`,
          duration: 240,
          thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&crop=face',
          createdAt: new Date(),
          playCount: 1500,
        };
      }
      
      setTrack(mockTrack);
    } catch (err) {
      console.error('Error fetching track details:', err);
      setError('Failed to load track details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTrackDetails();
  }, [fetchTrackDetails]);

  const isCurrentTrack = currentTrack?.id === id;

  const handlePlayPause = useCallback(() => {
    if (!track) return;
    
    if (isCurrentTrack && isPlaying) {
      pause();
    } else {
      play(track);
    }
  }, [track, isCurrentTrack, isPlaying, play, pause]);

  const handleLike = useCallback(async () => {
    if (!isAuthenticated) {
      router.push('/(auth)/login');
      return;
    }
    
    try {
      setIsLiked(prev => !prev);
      // Add actual API call here
      console.log(`${isLiked ? 'Unlike' : 'Like'} track ${id}`);
    } catch (error) {
      console.error('Error liking track:', error);
      Alert.alert('Error', 'Failed to update like status. Please try again.');
      // Revert the state on error
      setIsLiked(prev => !prev);
    }
  }, [isAuthenticated, isLiked, id, router]);

  const handleAddToPlaylist = useCallback(() => {
    if (!isAuthenticated) {
      router.push('/(auth)/login');
      return;
    }
    
    // Add actual playlist functionality here
    console.log(`Add track ${id} to playlist`);
    Alert.alert('Coming Soon', 'Playlist functionality will be available soon!');
  }, [isAuthenticated, id, router]);

  const handleShare = useCallback(async () => {
    if (!track) return;
    
    try {
      const result = await Share.share({
        message: `Check out "${track.title}" by ${track.artist} on Streamly!`,
        url: `https://streamly.app/track/${id}`,
      });
      
      if (result.action === Share.sharedAction) {
        console.log('Track shared successfully');
      }
    } catch (error) {
      console.error('Error sharing track:', error);
      Alert.alert('Error', 'Failed to share track. Please try again.');
    }
  }, [track, id]);

  const formatDuration = useCallback((seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const handleRetry = useCallback(() => {
    fetchTrackDetails();
  }, [fetchTrackDetails]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryAccent} />
        <Text style={styles.loadingText}>Loading track...</Text>
      </View>
    );
  }

  if (error || !track) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={COLORS.textSecondary} />
        <Text style={styles.errorText}>{error || 'Track not found'}</Text>
        <View style={styles.errorButtonContainer}>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.artworkContainer}>
        <Image 
          source={{ uri: track.thumbnailUrl }} 
          style={styles.artwork}
          resizeMode="cover"
          onError={(error) => {
            console.warn('Image failed to load:', error.nativeEvent.error);
          }}
        />
        <View style={styles.sourceIconContainer}>
          <Ionicons 
            name={track.sourceType === 'youtube' ? 'logo-youtube' : 'cloud'} 
            size={16} 
            color={COLORS.textPrimary} 
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={3}>{track.title}</Text>
        <Text style={styles.artist} numberOfLines={2}>{track.artist}</Text>
        <Text style={styles.stats}>
          {formatDuration(track.duration)} • {(track.playCount || 0).toLocaleString()} plays
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handlePlayPause}
          activeOpacity={0.7}
          accessibilityLabel={isCurrentTrack && isPlaying ? 'Pause track' : 'Play track'}
          accessibilityRole="button"
        >
          <Ionicons 
            name={isCurrentTrack && isPlaying ? 'pause-circle' : 'play-circle'} 
            size={64} 
            color={COLORS.primaryAccent} 
          />
        </TouchableOpacity>
        
        <View style={styles.secondaryActions}>
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={handleLike}
            activeOpacity={0.7}
            accessibilityLabel={isLiked ? 'Unlike track' : 'Like track'}
            accessibilityRole="button"
          >
            <Ionicons 
              name={isLiked ? 'heart' : 'heart-outline'} 
              size={28} 
              color={isLiked ? '#FF3B30' : COLORS.textPrimary} 
            />
            <Text style={styles.secondaryButtonText}>Like</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={handleAddToPlaylist}
            activeOpacity={0.7}
            accessibilityLabel="Add to playlist"
            accessibilityRole="button"
          >
            <Ionicons name="add-circle-outline" size={28} color={COLORS.textPrimary} />
            <Text style={styles.secondaryButtonText}>Add</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={handleShare}
            activeOpacity={0.7}
            accessibilityLabel="Share track"
            accessibilityRole="button"
          >
            <Ionicons name="share-outline" size={28} color={COLORS.textPrimary} />
            <Text style={styles.secondaryButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.relatedContainer}>
        <Text style={styles.sectionTitle}>You Might Also Like</Text>
        
        <View style={styles.relatedPlaceholder}>
          <Ionicons name="musical-notes-outline" size={32} color={COLORS.textSecondary} />
          <Text style={styles.placeholderText}>Related tracks will appear here</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textPrimary,
    fontFamily: 'InterRegular',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  errorText: {
    color: COLORS.textPrimary,
    fontFamily: 'InterRegular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  errorButtonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  retryButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
  },
  retryButtonText: {
    color: COLORS.textPrimary,
    fontFamily: 'InterBold',
    fontSize: 14,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontFamily: 'InterBold',
    fontSize: 14,
  },
  artworkContainer: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 350,
    alignSelf: 'center',
    marginTop: SPACING.xl,
    marginHorizontal: SPACING.lg,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  artwork: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  sourceIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 4,
    padding: 4,
  },
  infoContainer: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
    lineHeight: 30,
  },
  artist: {
    fontSize: 18,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
    lineHeight: 22,
  },
  album: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    lineHeight: 18,
  },
  stats: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  actionContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  actionButton: {
    marginBottom: SPACING.lg,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    maxWidth: 300,
  },
  secondaryButton: {
    alignItems: 'center',
    padding: SPACING.sm,
  },
  secondaryButtonText: {
    marginTop: SPACING.xs,
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  relatedContainer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  relatedPlaceholder: {
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontFamily: 'InterRegular',
    textAlign: 'center',
  },
});