/**
 * Track Detail Screen
 * Shows detailed information about a track and playback controls
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { Track } from '../../types/track';
import { usePlayer } from '../../hooks/usePlayer';
import { useAuth } from '../../hooks/useAuth';

export default function TrackDetailScreen() {
  // Fixed: Remove type annotation to let TypeScript infer the correct type
  const params = useLocalSearchParams();
  const id = typeof params.id === 'string' ? params.id : (Array.isArray(params.id) ? params.id[0] : undefined);
  
  const router = useRouter();
  const { play, pause, isPlaying, currentTrack } = usePlayer();
  const { isAuthenticated } = useAuth();
  
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  
  // Fetch track details
  useEffect(() => {
    const fetchTrackDetails = async () => {
      if (!id) {
        setError('No track ID provided');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real app, we would fetch the track details from an API
        // For now, we'll simulate the data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock track data - now we can safely use id as string
        const mockTrack: Track = {
          id: id,
          sourceId: id.startsWith('yt') ? `youtube-${id}` : `audius-${id}`,
          sourceType: id.startsWith('yt') ? 'youtube' : 'audius',
          title: `Track ${id}`,
          artist: `Artist for ${id}`,
          album: `Album for ${id}`,
          duration: 240, // 4 minutes
          thumbnailUrl: 'https://via.placeholder.com/500',
          createdAt: new Date(),
          playCount: 1500,
        };
        
        setTrack(mockTrack);
      } catch (err: any) {
        console.error('Error fetching track details:', err);
        setError('Failed to load track details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackDetails();
  }, [id]);

  // Check if this is the currently playing track
  const isCurrentTrack = currentTrack?.id === id;

  // Handle play/pause
  const handlePlayPause = () => {
    if (!track) return;
    
    if (isCurrentTrack && isPlaying) {
      pause();
    } else {
      play(track);
    }
  };

  // Handle like/unlike
  const handleLike = async () => {
    if (!isAuthenticated) {
      // Prompt to sign in
      router.push('/(auth)/login');
      return;
    }
    
    // Toggle like status
    setIsLiked(!isLiked);
    
    // In a real app, we would call an API to like/unlike the track
    console.log(`${isLiked ? 'Unlike' : 'Like'} track ${id}`);
  };

  // Handle add to playlist
  const handleAddToPlaylist = () => {
    if (!isAuthenticated) {
      // Prompt to sign in
      router.push('/(auth)/login');
      return;
    }
    
    // In a real app, this would open a modal to select a playlist
    console.log(`Add track ${id} to playlist`);
  };

  // Handle share
  const handleShare = async () => {
    if (!track) return;
    
    try {
      await Share.share({
        message: `Check out "${track.title}" by ${track.artist} on Streamly!`,
        url: `https://streamly.app/track/${id}`,
      });
    } catch (error) {
      console.error('Error sharing track:', error);
    }
  };

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
        <Text style={styles.errorText}>{error || 'Track not found'}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Track artwork */}
      <View style={styles.artworkContainer}>
        <Image 
          source={{ uri: track.thumbnailUrl }} 
          style={styles.artwork}
          resizeMode="cover"
          defaultSource={{ uri: 'https://via.placeholder.com/500/333333/CCCCCC?text=No+Image' }}
        />
        <View style={styles.sourceIconContainer}>
          <Ionicons 
            name={track.sourceType === 'youtube' ? 'logo-youtube' : 'cloud'} 
            size={16} 
            color={COLORS.textPrimary} 
          />
        </View>
      </View>

      {/* Track info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{track.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{track.artist}</Text>
        {track.album && (
          <Text style={styles.album} numberOfLines={1}>{track.album}</Text>
        )}
        <Text style={styles.stats}>
          {formatDuration(track.duration)} • {track.playCount?.toLocaleString() || 0} plays
        </Text>
      </View>

      {/* Action buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handlePlayPause}
          activeOpacity={0.7}
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
          >
            <Ionicons name="add-circle-outline" size={28} color={COLORS.textPrimary} />
            <Text style={styles.secondaryButtonText}>Add</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Ionicons name="share-outline" size={28} color={COLORS.textPrimary} />
            <Text style={styles.secondaryButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Related tracks section (placeholder) */}
      <View style={styles.relatedContainer}>
        <Text style={styles.sectionTitle}>You Might Also Like</Text>
        
        {/* This would be a list of related tracks in a real app */}
        <View style={styles.relatedPlaceholder}>
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
    paddingBottom: 120, // Space for mini player and tab bar
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
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  backButton: {
    backgroundColor: COLORS.primaryAccent,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 20,
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
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  artwork: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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
  },
  artist: {
    fontSize: 18,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  album: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
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
  },
  secondaryButton: {
    alignItems: 'center',
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
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontFamily: 'InterRegular',
  },
});