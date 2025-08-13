/**
 * Search Results Screen
 * Displays search results for tracks, artists, and playlists
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES, SHADOWS } from '../constants/theme';
import { usePlayer } from '../hooks/usePlayer';

// Mock data for search results
const MOCK_SEARCH_RESULTS = {
  tracks: [
    {
      id: '401',
      title: 'Starboy',
      artist: 'The Weeknd, Daft Punk',
      duration: 230,
      thumbnailUrl: null,
      sourceType: 'youtube',
    },
    {
      id: '402',
      title: 'Stargirl Interlude',
      artist: 'The Weeknd, Lana Del Rey',
      duration: 120,
      thumbnailUrl: null,
      sourceType: 'audius',
    },
    {
      id: '403',
      title: 'Star Shopping',
      artist: 'Lil Peep',
      duration: 175,
      thumbnailUrl: null,
      sourceType: 'youtube',
    },
  ],
  artists: [
    {
      id: 'a1',
      name: 'Starset',
      thumbnailUrl: null,
      trackCount: 45,
    },
    {
      id: 'a2',
      name: 'Stars',
      thumbnailUrl: null,
      trackCount: 32,
    },
  ],
  playlists: [
    {
      id: 'p1',
      name: 'Star Gazing',
      creator: 'musiclover',
      trackCount: 12,
      thumbnailUrl: null,
    },
    {
      id: 'p2',
      name: 'Starry Night',
      creator: 'chillvibes',
      trackCount: 8,
      thumbnailUrl: null,
    },
  ],
};

// Tab types
type TabType = 'all' | 'tracks' | 'artists' | 'playlists';

export default function SearchResultsScreen() {
  const router = useRouter();
  const { query } = useLocalSearchParams();
  const { play, currentTrack, isPlaying, pause } = usePlayer();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<TabType>('all');
  // State for search query
  const [searchText, setSearchText] = useState(query as string || '');

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle search submission
  const handleSearch = () => {
    if (searchText.trim()) {
      // In a real app, this would fetch new search results
      console.log(`Searching for: ${searchText}`);
    }
  };

  // Navigate to track detail
  const handleTrackPress = (trackId: string) => {
    router.push(`/track/${trackId}`);
  };

  // Navigate to artist detail
  const handleArtistPress = (artistId: string) => {
    router.push(`/artist/${artistId}`);
  };

  // Navigate to playlist detail
  const handlePlaylistPress = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`);
  };

  // Play or pause track
  const handlePlayPause = (track: typeof MOCK_SEARCH_RESULTS.tracks[0]) => {
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
  const renderTrackItem = ({ item }: { item: typeof MOCK_SEARCH_RESULTS.tracks[0] }) => {
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
          <View style={styles.sourceContainer}>
            <Ionicons 
              name={item.sourceType === 'youtube' ? 'logo-youtube' : 'cloud'} 
              size={14} 
              color={COLORS.textSecondary} 
              style={styles.sourceIcon}
            />
            <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
          </View>
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

  // Render an artist item
  const renderArtistItem = ({ item }: { item: typeof MOCK_SEARCH_RESULTS.artists[0] }) => {
    return (
      <TouchableOpacity 
        style={styles.artistItem}
        onPress={() => handleArtistPress(item.id)}
      >
        <View style={styles.artistAvatar}>
          {item.thumbnailUrl ? (
            <Image source={{ uri: item.thumbnailUrl }} style={styles.avatarImage} />
          ) : (
            <View style={[styles.placeholderAvatar, { backgroundColor: COLORS.primaryAccent + '40' }]}>
              <Ionicons name="person" size={24} color={COLORS.primaryAccent} />
            </View>
          )}
        </View>
        <Text style={styles.artistName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.artistTracks}>{item.trackCount} tracks</Text>
      </TouchableOpacity>
    );
  };

  // Render a playlist item
  const renderPlaylistItem = ({ item }: { item: typeof MOCK_SEARCH_RESULTS.playlists[0] }) => {
    return (
      <TouchableOpacity 
        style={styles.playlistItem}
        onPress={() => handlePlaylistPress(item.id)}
      >
        <View style={styles.playlistCover}>
          {item.thumbnailUrl ? (
            <Image source={{ uri: item.thumbnailUrl }} style={styles.coverImage} />
          ) : (
            <View style={styles.placeholderCover}>
              <Ionicons name="musical-notes" size={24} color={COLORS.textSecondary} />
            </View>
          )}
        </View>
        <Text style={styles.playlistName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.playlistCreator} numberOfLines={1}>by {item.creator}</Text>
        <Text style={styles.playlistTracks}>{item.trackCount} tracks</Text>
      </TouchableOpacity>
    );
  };

  // Get filtered results based on active tab
  const getFilteredResults = () => {
    switch (activeTab) {
      case 'tracks':
        return { tracks: MOCK_SEARCH_RESULTS.tracks, artists: [], playlists: [] };
      case 'artists':
        return { tracks: [], artists: MOCK_SEARCH_RESULTS.artists, playlists: [] };
      case 'playlists':
        return { tracks: [], artists: [], playlists: MOCK_SEARCH_RESULTS.playlists };
      case 'all':
      default:
        return MOCK_SEARCH_RESULTS;
    }
  };

  const filteredResults = getFilteredResults();
  const hasResults = (
    filteredResults.tracks.length > 0 || 
    filteredResults.artists.length > 0 || 
    filteredResults.playlists.length > 0
  );

  return (
    <View style={styles.container}>
      {/* Header with search bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for songs, artists, playlists"
            placeholderTextColor={COLORS.textTertiary}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchText('')}
            >
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollableTab 
          tabs={[
            { id: 'all', label: 'All' },
            { id: 'tracks', label: 'Tracks' },
            { id: 'artists', label: 'Artists' },
            { id: 'playlists', label: 'Playlists' },
          ]}
          activeTab={activeTab}
          onTabPress={(tab) => setActiveTab(tab as TabType)}
        />
      </View>

      {/* Results */}
      {hasResults ? (
        <FlatList
          data={[{ key: 'results' }]}
          renderItem={() => (
            <View style={styles.resultsContainer}>
              {/* Tracks section */}
              {filteredResults.tracks.length > 0 && (
                <View style={styles.section}>
                  {activeTab === 'all' && (
                    <Text style={styles.sectionTitle}>Tracks</Text>
                  )}
                  {filteredResults.tracks.map((track) => (
                    <React.Fragment key={track.id}>
                      {renderTrackItem({ item: track })}
                    </React.Fragment>
                  ))}
                </View>
              )}

              {/* Artists section */}
              {filteredResults.artists.length > 0 && (
                <View style={styles.section}>
                  {activeTab === 'all' && (
                    <Text style={styles.sectionTitle}>Artists</Text>
                  )}
                  <View style={styles.artistsGrid}>
                    {filteredResults.artists.map((artist) => (
                      <React.Fragment key={artist.id}>
                        {renderArtistItem({ item: artist })}
                      </React.Fragment>
                    ))}
                  </View>
                </View>
              )}

              {/* Playlists section */}
              {filteredResults.playlists.length > 0 && (
                <View style={styles.section}>
                  {activeTab === 'all' && (
                    <Text style={styles.sectionTitle}>Playlists</Text>
                  )}
                  <View style={styles.playlistsGrid}>
                    {filteredResults.playlists.map((playlist) => (
                      <React.Fragment key={playlist.id}>
                        {renderPlaylistItem({ item: playlist })}
                      </React.Fragment>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={48} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>No results found</Text>
          <Text style={styles.emptySubtext}>Try a different search term</Text>
        </View>
      )}
    </View>
  );
}

// Scrollable tab component
interface Tab {
  id: string;
  label: string;
}

interface ScrollableTabProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const ScrollableTab: React.FC<ScrollableTabProps> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={tabStyles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[tabStyles.tab, activeTab === tab.id && tabStyles.activeTab]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text 
            style={[tabStyles.tabText, activeTab === tab.id && tabStyles.activeTabText]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  tab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.sm,
    borderRadius: 20,
    ...SHADOWS.small,
  },
  activeTab: {
    backgroundColor: COLORS.primaryAccent,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.textPrimary,
    fontFamily: 'InterBold',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: SPACING.sm,
    backgroundColor: COLORS.backgroundSecondary,
    ...SHADOWS.small,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.small,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: COLORS.textPrimary,
    fontFamily: 'InterRegular',
    fontSize: 16,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  tabsContainer: {
    marginVertical: SPACING.sm,
  },
  resultsContainer: {
    padding: SPACING.lg,
    paddingBottom: 100, // Space for mini player
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: SIZES.cardBorderRadius,
    ...SHADOWS.small,
  },
  trackCover: {
    width: 50,
    height: 50,
    borderRadius: SIZES.cardBorderRadius,
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
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sourceIcon: {
    marginRight: 4,
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryAccent,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  artistsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  artistItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  artistAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  placeholderAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  artistName: {
    fontSize: 14,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
    textAlign: 'center',
  },
  artistTracks: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  playlistsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playlistItem: {
    width: '48%',
    marginBottom: SPACING.lg,
  },
  playlistCover: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  playlistName: {
    fontSize: 16,
    fontFamily: 'InterBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  playlistCreator: {
    fontSize: 14,
    fontFamily: 'InterRegular',
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  playlistTracks: {
    fontSize: 12,
    fontFamily: 'InterRegular',
    color: COLORS.textTertiary,
  },
  emptyContainer: {
    flex: 1,
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