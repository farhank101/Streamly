/**
 * Home Screen
 * Main dashboard for authenticated users with modern design inspired by leading music apps
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, SPACING, SIZES, TYPOGRAPHY } from "../../constants/theme";
import { useAuth } from "../../hooks/useAuth";
import { usePlayer } from "../../context/PlayerContext";
import { Track } from "../../types/track";
import homeImages from "../../assets/images/home/index";
import { getMockTrendingMusic } from "../../services/youtube";

const { width } = Dimensions.get("window");

// Type definitions for the mixed data
interface HeaderItem {
  type: "header";
  title: string;
}

interface GenreItem {
  type: "genre";
  id: string;
  name: string;
  imageKey?: string;
  image?: string;
  likes?: string;
  isArtist?: boolean;
  isPlaylist?: boolean;
}

interface CategoryItem {
  type: "category";
  id: string;
  name: string;
  imageKey: string;
}

interface MoodItem {
  type: "mood";
  id: string;
  name: string;
  imageKey: string;
}

type MixedItem = HeaderItem | GenreItem | CategoryItem | MoodItem;

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
  return {
    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  };
};

// Mock data for demonstration (now with optional local image keys)
const recentlyPlayed = [
  {
    id: "1",
    title: "Queen",
    artist: "Queen",
    imageKey: "queen",
    image: "https://via.placeholder.com/150x150/45B7D1/FFFFFF?text=Queen",
    likes: "598K",
    isArtist: true,
  },
  {
    id: "2",
    title: "70s Rock Anthems Radio",
    subtitle: "PLAYLIST RADIO",
    imageKey: "rock70s",
    image: "https://via.placeholder.com/150x150/E17055/FFFFFF?text=70s+ROCK",
    likes: "420K",
    isPlaylist: true,
  },
  {
    id: "3",
    title: "Progressive",
    artist: "Various Artists",
    imageKey: "progressive",
    image: "https://via.placeholder.com/150x150/00B894/FFFFFF?text=PROG",
    likes: "128K",
  },
];

const madeForYou = [
  {
    id: "1",
    title: "Deep Focus",
    subtitle: "Concentration music",
    imageKey: "deep_focus",
    image: "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=DEEP+FOCUS",
    likes: "678K",
  },
  {
    id: "2",
    title: "Productive Morning",
    subtitle: "Start your day right",
    imageKey: "productive_morning",
    image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=PRODUCTIVE",
    likes: "246K",
  },
  {
    id: "3",
    title: "White Noise",
    subtitle: "Sleep and relaxation",
    imageKey: "white_noise",
    image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=WHITE+NOISE",
    likes: "146K",
  },
];

const browseCategories = [
  {
    id: "1",
    name: "HIP-HOP",
    imageKey: "genre_hiphop",
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=HIP-HOP",
    color: "#FF6B6B",
  },
  {
    id: "2",
    name: "POP",
    imageKey: "genre_pop",
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=POP",
    color: "#4ECDC4",
  },
  {
    id: "3",
    name: "ROCK",
    imageKey: "genre_rock",
    image: "https://via.placeholder.com/200x200/45B7D1/FFFFFF?text=ROCK",
    color: "#45B7D1",
  },
  {
    id: "4",
    name: "DANCE",
    imageKey: "genre_dance",
    image: "https://via.placeholder.com/200x200/96CEB4/FFFFFF?text=DANCE",
    color: "#96CEB4",
  },
];

const playlistPicks = [
  {
    id: "1",
    title: "Russian Composers",
    subtitle: "Classical masterpieces",
    imageKey: "pick_russian_composers",
    image:
      "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=RUSSIAN+COMPOSERS",
    likes: "71K",
  },
  {
    id: "2",
    title: "Guitar Solos",
    subtitle: "Epic guitar performances",
    imageKey: "pick_guitar_solos",
    image:
      "https://via.placeholder.com/200x200/55A3FF/FFFFFF?text=GUITAR+SOLOS",
    likes: "291K",
  },
  {
    id: "3",
    title: "Workout Energy",
    subtitle: "High intensity training",
    imageKey: "pick_workout_energy",
    image: "https://via.placeholder.com/200x200/FF7675/FFFFFF?text=WORKOUT",
    likes: "89K",
  },
];

const podcasts = [
  {
    id: "1",
    name: "COMEDY",
    imageKey: "podcast_comedy",
    image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=COMEDY",
    color: "#FF6B6B",
  },
  {
    id: "2",
    name: "Top 50",
    imageKey: "podcast_top50",
    image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=TOP+50",
    color: "#4ECDC4",
  },
  {
    id: "3",
    name: "TRUE CRIME",
    imageKey: "podcast_true_crime",
    image: "https://via.placeholder.com/200x200/45B7D1/FFFFFF?text=TRUE+CRIME",
    color: "#45B7D1",
  },
  {
    id: "4",
    name: "BUSINESS",
    imageKey: "podcast_business",
    image: "https://via.placeholder.com/200x200/96CEB4/FFFFFF?text=BUSINESS",
    color: "#96CEB4",
  },
];

const newReleases = [
  {
    id: "1",
    title: "LPS",
    subtitle: "Album release 22/03/19",
    imageKey: "new_lps",
    image: "https://via.placeholder.com/200x200/FAB1A0/FFFFFF?text=LPS",
    artist: "Various Artists",
  },
  {
    id: "2",
    title: "Humble Humble Juice",
    subtitle: "Album release 14/03/19",
    imageKey: "new_humble_juice",
    image: "https://via.placeholder.com/200x200/00B894/FFFFFF?text=HUMBLE",
    artist: "Various Artists",
  },
  {
    id: "3",
    title: "Drip",
    subtitle: "Album release 08/03/19",
    imageKey: "new_drip",
    image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=DRIP",
    artist: "Various Artists",
  },
];

const recommendedArtists = [
  {
    id: "1",
    name: "The Smiths",
    imageKey: "artist_smiths",
    image: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=The+Smiths",
    likes: "371K",
  },
  {
    id: "2",
    name: "The Clash",
    imageKey: "artist_clash",
    image: "https://via.placeholder.com/150x150/4ECDC4/FFFFFF?text=The+Clash",
    likes: "361K",
  },
  {
    id: "3",
    name: "Joy Division",
    imageKey: "artist_joy_division",
    image:
      "https://via.placeholder.com/150x150/45B7D1/FFFFFF?text=Joy+Division",
    likes: "298K",
  },
];

const popularPlaylists = [
  {
    id: "1",
    title: "Hip Hop Hits",
    subtitle: "Best hip hop tracks",
    imageKey: "pl_hiphop_hits",
    image:
      "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=HIP-HOP+HITS",
    likes: "520K",
  },
  {
    id: "2",
    title: "Pop Fresh!",
    subtitle: "Latest pop hits",
    imageKey: "pl_pop_fresh",
    image: "https://via.placeholder.com/200x200/55A3FF/FFFFFF?text=POP+FRESH",
    likes: "412K",
  },
  {
    id: "3",
    title: "Rap Essentials",
    subtitle: "Classic rap tracks",
    imageKey: "pl_rap_essentials",
    image: "https://via.placeholder.com/200x200/FF7675/FFFFFF?text=RAP",
    likes: "389K",
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { play, currentTrack, isPlaying, pause } = usePlayer();
  const [trendingMusic, setTrendingMusic] = useState<Track[]>([]);

  useEffect(() => {
    // Load mock trending music for testing
    const loadTrendingMusic = () => {
      const mockTrending = getMockTrendingMusic();
      setTrendingMusic(mockTrending);
    };

    loadTrendingMusic();
  }, []);

  // Navigation handlers pointing only to existing routes
  const handleCardPress = (item: any) => {
    if (item.isArtist || (!item.title && item.name && !item.color)) {
      router.push(`/user/${item.id}`);
    } else if (item.isPlaylist) {
      router.push(`/playlist/${item.id}`);
    } else if (item.name && item.color) {
      // Genre/Mood - go to search instead of explore
      router.push("/(tabs)/search");
    } else if (item.subtitle && item.subtitle.toLowerCase().includes("album")) {
      // No album screen yet; send to search as placeholder
      router.push("/(tabs)/search");
    } else if (item.sourceType === "youtube") {
      // This is a track from YouTube
      if (item.id) {
        router.push(`/track/${item.id}`);
      } else if (item.sourceId) {
        router.push(`/track/${item.sourceId}`);
      } else {
        router.push("/(tabs)/search");
      }
    } else if (item.title) {
      // Treat as playlist/track fallback
      router.push(`/playlist/${item.id}`);
    } else {
      router.push("/(tabs)/search");
    }
  };

  const handlePlayPress = (item: any) => {
    // If it's a track, play it first
    if (item.sourceType === "youtube") {
      play(item).catch((error) => {
        console.error("❌ Failed to play track:", error);
        // Reset loading state if there's an error
        // resetLoadingState(); // This line was removed from the new_code, so it's removed here.
      });
    }

    // Then navigate to the detail page
    handleCardPress(item);
  };

  const handleViewAll = (section: string) => {
    switch (section) {
      case "Recently played":
        router.push("/(tabs)/library/history");
        break;
      case "Make monday more productive":
        router.push("/(tabs)/search");
        break;
      case "Browse":
        // setActiveTab("GENRES & MOODS"); // This line was removed from the new_code, so it's removed here.
        break;
      case "Playlist picks":
      case "Popular playlists":
        router.push("/(tabs)/library/playlists");
        break;
      case "Podcasts":
        router.push("/(tabs)/search");
        break;
      case "New releases for you":
      case "You might like these artists":
        router.push("/(tabs)/search");
        break;
      default:
        router.push("/(tabs)/search");
    }
  };

  const [activeTab, setActiveTab] = useState("OVERVIEW");

  const navigateHeaderTab = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContentCard = (
    item: any,
    isLarge = false,
    isCircular = false
  ) => (
    <TouchableOpacity
      style={[
        styles.contentCard,
        isLarge && styles.largeCard,
        isCircular && styles.circularCard,
      ]}
      activeOpacity={0.8}
      onPress={() => handleCardPress(item)}
    >
      <Image
        source={getImageSource(item.imageKey, item.image)}
        style={styles.cardImage}
      />
      {!isCircular && (
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.cardGradient}
        >
          <View style={styles.cardContent}>
            {item.subtitle && (
              <Text style={styles.cardSubtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            )}
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title || item.name}
            </Text>
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
          <Text style={styles.circularCardTitle} numberOfLines={1}>
            {item.title || item.name}
          </Text>
          {item.likes && (
            <View style={styles.cardStats}>
              <Ionicons name="heart" size={12} color={COLORS.textSecondary} />
              <Text style={styles.cardLikes}>{item.likes}</Text>
            </View>
          )}
        </View>
      )}
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => handlePlayPress(item)}
      >
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
      <Image
        source={getImageSource(item.imageKey, item.image)}
        style={styles.browseCardImage}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.browseCardGradient}
      >
        <Text style={styles.browseCardName}>{item.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSection = (
    title: string,
    data: any[],
    isLarge = false,
    isCircular = false,
    showViewAll = false,
    subtitle?: string
  ) => (
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
            {isCircular
              ? renderContentCard(item, isLarge, true)
              : title === "Browse"
              ? renderBrowseCard(item)
              : renderContentCard(item, isLarge)}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {}} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.primaryAccent, "#8B5CF6"]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Home</Text>
        </LinearGradient>
      </View>

      {/* Navigation Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navTabs}
      >
        <TouchableOpacity
          style={[styles.navTab, activeTab === "OVERVIEW" && styles.activeTab]}
          onPress={() => navigateHeaderTab("OVERVIEW")}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === "OVERVIEW" && styles.activeTabText,
            ]}
          >
            OVERVIEW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navTab,
            activeTab === "GENRES & MOODS" && styles.activeTab,
          ]}
          onPress={() => navigateHeaderTab("GENRES & MOODS")}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === "GENRES & MOODS" && styles.activeTabText,
            ]}
          >
            GENRES & MOODS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navTab, activeTab === "PODCASTS" && styles.activeTab]}
          onPress={() => navigateHeaderTab("PODCASTS")}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === "PODCASTS" && styles.activeTabText,
            ]}
          >
            PODCASTS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navTab,
            activeTab === "RECOMMENDED" && styles.activeTab,
          ]}
          onPress={() => navigateHeaderTab("RECOMMENDED")}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === "RECOMMENDED" && styles.activeTabText,
            ]}
          >
            RECOMMENDED
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Content based on active tab */}
      {activeTab === "OVERVIEW" && (
        <>
          {/* Recently Played */}
          {renderSection("Recently played", recentlyPlayed, false, true)}

          {/* Trending Music */}
          {trendingMusic.length > 0 &&
            renderSection(
              "Trending Now",
              trendingMusic,
              true,
              false,
              false,
              "Popular music from YouTube"
            )}

          {/* Made for you */}
          {renderSection("Make monday more productive", madeForYou, true)}

          {/* Browse */}
          {renderSection(
            "Browse",
            browseCategories,
            false,
            false,
            true,
            "Explore by genre and mood"
          )}

          {/* Playlist picks */}
          {renderSection(
            "Playlist picks",
            playlistPicks,
            true,
            false,
            false,
            "Selected for you based on your recent activity"
          )}

          {/* Podcasts */}
          {renderSection(
            "Podcasts",
            podcasts,
            false,
            false,
            true,
            "Explore by categories and popularity"
          )}

          {/* New releases for you */}
          {renderSection(
            "New releases for you",
            newReleases,
            true,
            false,
            true
          )}

          {/* You might like these artists */}
          {renderSection(
            "You might like these artists",
            recommendedArtists,
            false,
            true
          )}

          {/* Popular playlists */}
          {renderSection(
            "Popular playlists",
            popularPlaylists,
            true,
            false,
            true
          )}
        </>
      )}

      {activeTab === "GENRES & MOODS" && (
        <View style={styles.genresMoodsContainer}>
          {/* Content Container - No extra margins */}
          <View style={styles.genresMoodsContentContainer}>
            {/* Genres Section */}
            <View style={styles.genresSection}>
              <Text style={styles.genresSectionTitle}>Genres</Text>
              <View style={styles.genresGrid}>
                {[
                  { id: "1", name: "HIP-HOP", imageKey: "genre_hiphop" },
                  {
                    id: "2",
                    name: "DANCE/ELECTRO",
                    imageKey: "genre_dance_electro",
                  },
                  { id: "3", name: "POP", imageKey: "genre_pop" },
                  { id: "4", name: "COUNTRY", imageKey: "genre_country" },
                  { id: "5", name: "ROCK", imageKey: "genre_rock" },
                  { id: "6", name: "INDIE", imageKey: "genre_indie" },
                  { id: "7", name: "LATIN", imageKey: "genre_latin" },
                  { id: "8", name: "K-POP", imageKey: "genre_kpop" },
                ].map((genre) => (
                  <TouchableOpacity
                    key={genre.id}
                    style={styles.genreCardCompact}
                    activeOpacity={0.8}
                    onPress={() => handleCardPress(genre)}
                  >
                    <Image
                      source={getImageSource(genre.imageKey)}
                      style={styles.genreCardCompactImage}
                    />
                    <View style={styles.genreCardCompactOverlay}>
                      <Text style={styles.genreCardCompactName}>
                        {genre.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Additional Categories Section */}
            <View style={styles.genresSection}>
              <View style={styles.genresGrid}>
                {[
                  { id: "1", name: "DECADES", imageKey: "decades" },
                  { id: "2", name: "CLASSICAL", imageKey: "classical" },
                  { id: "3", name: "JAZZ", imageKey: "jazz" },
                  { id: "4", name: "INSTRUMENTALS", imageKey: "instrumentals" },
                  { id: "5", name: "PUNK", imageKey: "punk" },
                  { id: "6", name: "BLUES", imageKey: "blues" },
                  { id: "7", name: "SOUL/FUNK", imageKey: "soul_funk" },
                  { id: "8", name: "REGGAE", imageKey: "reggae" },
                ].map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.genreCardCompact}
                    activeOpacity={0.8}
                    onPress={() => router.push(`/category/${category.id}`)}
                  >
                    <Image
                      source={getImageSource(category.imageKey)}
                      style={styles.genreCardCompactImage}
                    />
                    <View style={styles.genreCardCompactOverlay}>
                      <Text style={styles.genreCardCompactName}>
                        {category.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Moods Section */}
            <View style={styles.genresSection}>
              <Text style={styles.genresSectionTitle}>Moods</Text>
              <View style={styles.genresGrid}>
                {[
                  { id: "1", name: "PARTY", imageKey: "party" },
                  { id: "2", name: "CHILL", imageKey: "chill" },
                  { id: "3", name: "WORKOUT", imageKey: "workout" },
                  { id: "4", name: "FOCUS", imageKey: "focus" },
                  { id: "5", name: "DRIVING", imageKey: "driving" },
                  { id: "6", name: "RAINY DAY", imageKey: "rainy_day" },
                  { id: "7", name: "ROMANCE", imageKey: "romance" },
                  { id: "8", name: "SLEEP", imageKey: "sleep" },
                  { id: "9", name: "COMEDY", imageKey: "comedy" },
                  { id: "10", name: "FAMILY", imageKey: "family" },
                  { id: "11", name: "DINNER", imageKey: "dinner" },
                  { id: "12", name: "TRAVEL", imageKey: "travel" },
                ].map((mood) => (
                  <TouchableOpacity
                    key={mood.id}
                    style={styles.genreCardCompact}
                    activeOpacity={0.8}
                    onPress={() => router.push(`/category/${mood.id}`)}
                  >
                    <Image
                      source={getImageSource(mood.imageKey)}
                      style={styles.genreCardCompactImage}
                    />
                    <View style={styles.genreCardCompactOverlay}>
                      <Text style={styles.genreCardCompactName}>
                        {mood.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}

      {activeTab === "PODCASTS" && (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>Podcasts</Text>
          <Text style={styles.tabSubtitle}>Discover amazing podcasts</Text>

          {/* Popular Podcast Categories */}
          <View style={styles.podcastSection}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <View style={styles.podcastGrid}>
              {[
                { id: "1", name: "TECH", imageKey: "tech_podcast" },
                { id: "2", name: "BUSINESS", imageKey: "business_podcast" },
                { id: "3", name: "COMEDY", imageKey: "comedy_podcast" },
                { id: "4", name: "TRUE CRIME", imageKey: "true_crime_podcast" },
                { id: "5", name: "HEALTH", imageKey: "health_podcast" },
                { id: "6", name: "EDUCATION", imageKey: "education_podcast" },
              ].map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.podcastCard}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/category/${category.id}`)}
                >
                  <Image
                    source={getImageSource(category.imageKey)}
                    style={styles.podcastCardImage}
                  />
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(139, 92, 246, 0.8)",
                      "rgba(236, 72, 153, 0.8)",
                    ]}
                    style={styles.podcastCardGradient}
                  >
                    <Text style={styles.podcastCardName}>{category.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {activeTab === "RECOMMENDED" && (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>Recommended</Text>
          <Text style={styles.tabSubtitle}>Coming soon...</Text>
        </View>
      )}

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
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  navTabs: {
    flexDirection: "row",
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
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.textPrimary,
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  tabTitle: {
    fontSize: 24,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  tabSubtitle: {
    fontSize: 16,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: "left",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: "InterMedium",
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
    overflow: "hidden",
    position: "relative",
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
    width: "100%",
    height: "100%",
  },
  cardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    justifyContent: "flex-end",
    padding: SPACING.sm,
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  circularCardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.sm,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  circularCardTitle: {
    fontSize: 12,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 10,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  cardStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardLikes: {
    fontSize: 11,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  playButton: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  browseCard: {
    width: 120,
    height: 80,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    position: "relative",
  },
  browseCardImage: {
    width: "100%",
    height: "100%",
  },
  browseCardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
    padding: SPACING.sm,
  },
  browseCardName: {
    fontSize: 12,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  scrollViewContent: {
    paddingBottom: SPACING.xl, // Add padding to the bottom of the scroll view content
  },

  genresMoodsContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  genresMoodsNavContainer: {
    marginBottom: SPACING.sm,
  },
  genresMoodsContentContainer: {
    flex: 1,
  },
  genresMoodsContent: {
    paddingBottom: SPACING.md,
  },
  genreRow: {
    justifyContent: "space-between",
    marginBottom: SPACING.xs,
  },
  navContainer: {
    marginBottom: SPACING.md,
  },
  navDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginTop: SPACING.sm,
  },
  genresMoodsFlatList: {
    flex: 1,
  },
  // New styles for the compact genre grid layout
  genresMoodsNavTabs: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  genresMoodsNavTab: {
    marginRight: SPACING.xl,
    paddingBottom: SPACING.xs,
  },
  genresMoodsActiveTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryAccent,
  },
  genresMoodsNavTabText: {
    fontSize: 14,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
  },
  genresMoodsActiveTabText: {
    color: COLORS.textPrimary,
  },
  genresMoodsNavDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginTop: SPACING.sm,
  },
  genresSection: {
    marginTop: SPACING.sm,
  },
  genresSectionTitle: {
    fontSize: 24,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  genresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.sm,
  },
  genreCardCompact: {
    width: "48%",
    height: 120,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    marginBottom: SPACING.sm,
    position: "relative",
  },
  genreCardCompactImage: {
    width: "100%",
    height: "100%",
  },
  genreCardCompactOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingBottom: 12,
    paddingRight: 16,
  },
  genreCardCompactName: {
    fontSize: 14,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  // Podcast styles
  podcastSection: {
    marginTop: SPACING.lg,
  },
  podcastGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.sm,
  },
  podcastCard: {
    width: "48%",
    height: 120,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    marginBottom: SPACING.sm,
    position: "relative",
  },
  podcastCardImage: {
    width: "100%",
    height: "100%",
  },
  podcastCardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  podcastCardName: {
    fontSize: 14,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
