/**
 * Home Screen
 * Main dashboard for authenticated users with modern design inspired by leading music apps
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
  Dimensions,
  ScrollView as RNScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, SIZES, SHADOWS, FONTS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../hooks/usePlayer';
import { useRouter } from 'expo-router';
import homeImages from '../../assets/images/home/index';

const { width } = Dimensions.get('window');

// Helper to resolve local images by key, with fallbacks to remote URL or default placeholder
const getImageSource = (key?: string, fallbackUrl?: string) => {
  // Use local image if present in mapping
  if (key && (homeImages as any)[key]) {
    return (homeImages as any)[key];
  }
  // Fallback to remote URL
  if (fallbackUrl) {
    return { uri: fallbackUrl } as const;
  }
  // Final fallback to a simple colored background
  return { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' };
};

// Mock data for demonstration (now with optional local image keys)
const recentlyPlayed = [
  { id: '1', title: 'Queen', artist: 'Queen', imageKey: 'queen', image: 'https://via.placeholder.com/150x150/45B7D1/FFFFFF?text=Queen', likes: '598K', isArtist: true },
  { id: '2', title: '70s Rock Anthems Radio', subtitle: 'PLAYLIST RADIO', imageKey: 'rock70s', image: 'https://via.placeholder.com/150x150/E17055/FFFFFF?text=70s+ROCK', likes: '420K', isPlaylist: true },
  { id: '3', title: 'Progressive', artist: 'Various Artists', imageKey: 'progressive', image: 'https://via.placeholder.com/150x150/00B894/FFFFFF?text=PROG', likes: '128K' },
];

const madeForYou = [
  { id: '1', title: 'Deep Focus', subtitle: 'Concentration music', imageKey: 'deep_focus', image: 'https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=DEEP+FOCUS', likes: '678K' },
  { id: '2', title: 'Productive Morning', subtitle: 'Start your day right', imageKey: 'productive_morning', image: 'https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=PRODUCTIVE', likes: '246K' },
  { id: '3', title: 'White Noise', subtitle: 'Sleep and relaxation', imageKey: 'white_noise', image: 'https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=WHITE+NOISE', likes: '146K' },
];

const browseCategories = [
  { id: '1', name: 'HIP-HOP', imageKey: 'genre_hiphop', image: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=HIP-HOP', color: '#FF6B6B' },
  { id: '2', name: 'POP', imageKey: 'genre_pop', image: 'https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=POP', color: '#4ECDC4' },
  { id: '3', name: 'ROCK', imageKey: 'genre_rock', image: 'https://via.placeholder.com/200x200/45B7D1/FFFFFF?text=ROCK', color: '#45B7D1' },
  { id: '4', name: 'DANCE', imageKey: 'genre_dance', image: 'https://via.placeholder.com/200x200/96CEB4/FFFFFF?text=DANCE', color: '#96CEB4' },
];

const playlistPicks = [
  { id: '1', title: 'Russian Composers', subtitle: 'Classical masterpieces', imageKey: 'pick_russian_composers', image: 'https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=RUSSIAN+COMPOSERS', likes: '71K' },
  { id: '2', title: 'Guitar Solos', subtitle: 'Epic guitar performances', imageKey: 'pick_guitar_solos', image: 'https://via.placeholder.com/200x200/55A3FF/FFFFFF?text=GUITAR+SOLOS', likes: '291K' },
  { id: '3', title: 'Workout Energy', subtitle: 'High intensity training', imageKey: 'pick_workout_energy', image: 'https://via.placeholder.com/200x200/FF7675/FFFFFF?text=WORKOUT', likes: '89K' },
];

const podcasts = [
  { id: '1', name: 'COMEDY', imageKey: 'podcast_comedy', image: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=COMEDY', color: '#FF6B6B' },
  { id: '2', name: 'Top 50', imageKey: 'podcast_top50', image: 'https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=TOP+50', color: '#4ECDC4' },
  { id: '3', name: 'TRUE CRIME', imageKey: 'podcast_true_crime', image: 'https://via.placeholder.com/200x200/45B7D1/FFFFFF?text=TRUE+CRIME', color: '#45B7D1' },
  { id: '4', name: 'BUSINESS', imageKey: 'podcast_business', image: 'https://via.placeholder.com/200x200/96CEB4/FFFFFF?text=BUSINESS', color: '#96CEB4' },
];

const newReleases = [
  { id: '1', title: 'LPS', subtitle: 'Album release 22/03/19', imageKey: 'new_lps', image: 'https://via.placeholder.com/200x200/FAB1A0/FFFFFF?text=LPS', artist: 'Various Artists' },
  { id: '2', title: 'Humble Humble Juice', subtitle: 'Album release 14/03/19', imageKey: 'new_humble_juice', image: 'https://via.placeholder.com/200x200/00B894/FFFFFF?text=HUMBLE', artist: 'Various Artists' },
  { id: '3', title: 'Drip', subtitle: 'Album release 08/03/19', imageKey: 'new_drip', image: 'https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=DRIP', artist: 'Various Artists' },
];

const recommendedArtists = [
  { id: '1', name: 'The Smiths', imageKey: 'artist_smiths', image: 'https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=The+Smiths', likes: '371K' },
  { id: '2', name: 'The Clash', imageKey: 'artist_clash', image: 'https://via.placeholder.com/150x150/4ECDC4/FFFFFF?text=The+Clash', likes: '361K' },
  { id: '3', name: 'Joy Division', imageKey: 'artist_joy_division', image: 'https://via.placeholder.com/150x150/45B7D1/FFFFFF?text=Joy+Division', likes: '298K' },
];

const popularPlaylists = [
  { id: '1', title: 'Hip Hop Hits', subtitle: 'Best hip hop tracks', imageKey: 'pl_hiphop_hits', image: 'https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=HIP-HOP+HITS', likes: '520K' },
  { id: '2', title: 'Pop Fresh!', subtitle: 'Latest pop hits', imageKey: 'pl_pop_fresh', image: 'https://via.placeholder.com/200x200/55A3FF/FFFFFF?text=POP+FRESH', likes: '412K' },
  { id: '3', title: 'Rap Essentials', subtitle: 'Classic rap tracks', imageKey: 'pl_rap_essentials', image: 'https://via.placeholder.com/200x200/FF7675/FFFFFF?text=RAP', likes: '389K' },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Navigation handlers pointing only to existing routes
  const handleCardPress = (item: any) => {
    if (item.isArtist || (!item.title && item.name && !item.color)) {
      router.push(`/user/${item.id}`);
    } else if (item.isPlaylist) {
      router.push(`/playlist/${item.id}`);
    } else if (item.name && item.color) {
      // Genre/Mood
      router.push(`/category/${item.id}`);
    } else if (item.subtitle && item.subtitle.toLowerCase().includes('album')) {
      // No album screen yet; send to explore as placeholder
      router.push('/explore');
    } else if (item.title) {
      // Treat as playlist/track fallback
      router.push(`/playlist/${item.id}`);
    } else {
      router.push('/explore');
    }
  };

  const handlePlayPress = (item: any) => {
    // With mock data, just navigate to the most relevant detail
    handleCardPress(item);
  };

  const handleViewAll = (section: string) => {
    switch (section) {
      case 'Recently played':
        router.push('/(tabs)/library/history');
        break;
      case 'Make monday more productive':
      case 'Browse':
        router.push('/(tabs)/explore');
        break;
      case 'Playlist picks':
      case 'Popular playlists':
        router.push('/(tabs)/library/playlists');
        break;
      case 'Podcasts':
        router.push({ pathname: '/(tabs)/explore', params: { tab: 'PODCASTS' } });
        break;
      case 'New releases for you':
      case 'You might like these artists':
        router.push('/(tabs)/explore');
        break;
      default:
        router.push('/(tabs)/explore');
    }
  };

  const navigateHeaderTab = (tab: string) => {
    router.push({ pathname: '/(tabs)/explore', params: { tab } });
  };

  const renderContentCard = (item: any, isLarge = false, isCircular = false) => (
    <TouchableOpacity 
      style={[
        styles.contentCard, 
        isLarge && styles.largeCard,
        isCircular && styles.circularCard
      ]} 
      activeOpacity={0.8}
      onPress={() => handleCardPress(item)}
    >
      <Image source={getImageSource(item.imageKey, item.image)} style={styles.cardImage} />
      {!isCircular && (
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.cardGradient}
        >
          <View style={styles.cardContent}>
            {item.subtitle && (
              <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
            )}
            <Text style={styles.cardTitle} numberOfLines={2}>{item.title || item.name}</Text>
            {item.likes && (
              <View style={styles.cardStats}>
                <Ionicons name="heart" size={12} color={COLORS.textSecondary} />
                <Text style={styles.cardLikes}>{item.likes}</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      )}
      {isCircular && (
        <View style={styles.circularCardContent}>
          <Text style={styles.circularCardTitle} numberOfLines={1}>{item.title || item.name}</Text>
          {item.likes && (
            <View style={styles.cardStats}>
              <Ionicons name="heart" size={12} color={COLORS.textSecondary} />
              <Text style={styles.cardLikes}>{item.likes}</Text>
            </View>
          )}
        </View>
      )}
      <TouchableOpacity style={styles.playButton} onPress={() => handlePlayPress(item)}>
        <Ionicons name="play" size={20} color={COLORS.textPrimary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderBrowseCard = (item: any) => (
    <TouchableOpacity 
      style={styles.browseCard} 
      activeOpacity={0.8}
      onPress={() => handleCardPress(item)}
    >
      <Image source={getImageSource(item.imageKey, item.image)} style={styles.browseCardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.browseCardGradient}
      >
        <Text style={styles.browseCardName}>{item.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSection = (title: string, data: any[], isLarge = false, isCircular = false, showViewAll = false, subtitle?: string) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        </View>
        {showViewAll && (
          <TouchableOpacity onPress={() => handleViewAll(title)}>
            <Text style={styles.viewAllText}>View All &gt;</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            {isCircular ? renderContentCard(item, isLarge, true) : 
             title === 'Browse' ? renderBrowseCard(item) : 
             renderContentCard(item, isLarge)}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.primaryAccent, '#8B5CF6']}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Home</Text>
        </LinearGradient>
      </View>

      {/* Navigation Tabs */}
      <RNScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navTabs}
      >
        <TouchableOpacity style={[styles.navTab, styles.activeTab]}>
          <Text style={[styles.navTabText, styles.activeTabText]}>OVERVIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab} onPress={() => navigateHeaderTab('GENRES & MOODS')}>
          <Text style={styles.navTabText}>GENRES & MOODS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab} onPress={() => navigateHeaderTab('PODCASTS')}>
          <Text style={styles.navTabText}>PODCASTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab} onPress={() => navigateHeaderTab('RADIO')}>
          <Text style={styles.navTabText}>RADIO</Text>
        </TouchableOpacity>
      </RNScrollView>

      {/* Recently Played */}
      {renderSection('Recently played', recentlyPlayed, false, true)}

      {/* Made for you */}
      {renderSection('Make monday more productive', madeForYou, true)}

      {/* Browse */}
      {renderSection('Browse', browseCategories, false, false, true, 'Explore by genre and mood')}

      {/* Playlist picks */}
      {renderSection('Playlist picks', playlistPicks, true, false, false, 'Selected for you based on your recent activity')}

      {/* Podcasts */}
      {renderSection('Podcasts', podcasts, false, false, true, 'Explore by categories and popularity')}

      {/* New releases for you */}
      {renderSection('New releases for you', newReleases, true, false, true)}

      {/* You might like these artists */}
      {renderSection('You might like these artists', recommendedArtists, false, true)}

      {/* Popular playlists */}
      {renderSection('Popular playlists', popularPlaylists, true, false, true)}

      {/* Spacer for mini player */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  headerGradient: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderRadius: SIZES.borderRadius,
    marginHorizontal: SPACING.lg,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  navTabs: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  navTab: {
    marginRight: SPACING.xl,
    paddingBottom: SPACING.xs,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryAccent,
  },
  navTabText: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.textPrimary,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    color: COLORS.primaryAccent,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  cardContainer: {
    marginRight: SPACING.md,
  },
  contentCard: {
    width: 150,
    height: 150,
    borderRadius: SIZES.cardBorderRadius,
    overflow: 'hidden',
    position: 'relative',
  },
  largeCard: {
    width: 200,
    height: 200,
  },
  circularCard: {
    width: 120,
    height: 150,
    borderRadius: 60,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: SPACING.sm,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  circularCardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  circularCardTitle: {
    fontSize: 12,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 10,
    fontFamily: 'InterMedium',
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLikes: {
    fontSize: 11,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  playButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseCard: {
    width: 120,
    height: 80,
    borderRadius: SIZES.cardBorderRadius,
    overflow: 'hidden',
    position: 'relative',
  },
  browseCardImage: {
    width: '100%',
    height: '100%',
  },
  browseCardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: SPACING.sm,
  },
  browseCardName: {
    fontSize: 12,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});