/**
 * Home Screen
 * Main dashboard for authenticated users with modern design inspired by leading music apps
 */

import React, { useState, useEffect, useRef } from "react";
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
import { genreData } from "../../constants/genreData";
import { allArtists } from "../../constants/allArtists";
import ProgressBar from "../../components/player/ProgressBar";
import {
  getMockTrendingMusic,
  getTrendingVideos,
} from "../../services/youtube";
import { getArtistInfo } from "../../services/lastfm";
import {
  batchGetArtistImages,
  ImageServiceConfig,
} from "../../services/imageService";

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

// Safe image source resolver with proper fallbacks
const getSafeImageSource = (item: any) => {
  console.log('🖼️ getSafeImageSource called with item:', item);
  
  try {
    // Priority 1: Local image from homeImages
    if (item.imageKey && (homeImages as any)[item.imageKey]) {
      console.log('✅ Using homeImages for:', item.imageKey);
      return (homeImages as any)[item.imageKey];
    }

    // Priority 2: Remote image URL
    if (
      item.image &&
      typeof item.image === "string" &&
      item.image.trim() !== ""
    ) {
      console.log('✅ Using remote image:', item.image);
      return { uri: item.image.trim() };
    }

    // Priority 3: Default placeholder
    console.log('🔄 Using default placeholder for:', item.name || item.title);
    return {
      uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    };
  } catch (error) {
    console.error("Error in getSafeImageSource:", error);
    return {
      uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    };
  }
};

// Generate unique keys for React components
const generateUniqueKey = (item: any, index: number) => {
  // Ensure we have a valid, unique key
  if (item.id && item.id !== "undefined" && item.id !== "null") {
    return item.id;
  }
  if (item.name && item.name !== "undefined" && item.name !== "null") {
    return `${item.name}_${index}`;
  }
  if (item.title && item.title !== "undefined" && item.title !== "null") {
    return `${item.title}_${index}`;
  }
  // Use a combination of timestamp and index for guaranteed uniqueness
  return `item_${Date.now()}_${index}`;
};

// Mock data with proper unique IDs
const recentlyPlayedSeed = [
  {
    id: "recent_1",
    title: "Queen",
    artist: "Queen",
    imageKey: "queen",
    image: "https://picsum.photos/300/300?random=4",
    likes: "598K",
    isArtist: true,
  },
  {
    id: "recent_2",
    title: "70s Rock Anthems Radio",
    subtitle: "PLAYLIST RADIO",
    imageKey: "rock70s",
    image: "https://picsum.photos/300/300?random=5",
    likes: "420K",
    isPlaylist: true,
  },
  {
    id: "recent_3",
    title: "Progressive",
    artist: "Various Artists",
    imageKey: "progressive",
    image: "https://picsum.photos/300/300?random=6",
    likes: "128K",
  },
];

const madeForYou = [
  {
    id: "mfy_1",
    title: "Deep Focus",
    subtitle: "Concentration music",
    imageKey: "deep_focus",
    image: "https://picsum.photos/300/300?random=7",
    likes: "678K",
  },
  {
    id: "mfy_2",
    title: "Chill Vibes",
    subtitle: "Relaxing beats",
    imageKey: "chill_vibes",
    image: "https://picsum.photos/300/300?random=8",
    likes: "543K",
  },
  {
    id: "mfy_3",
    title: "Workout Mix",
    subtitle: "High energy tracks",
    imageKey: "workout_mix",
    image: "https://picsum.photos/300/300?random=9",
    likes: "456K",
  },
];

// Get top artists from different genres for recommendations
const recommendedArtistsSeed = allArtists
  .filter((artist) => artist.tier === "Top" || artist.tier === "Major")
  .slice(0, 6)
  .map((artist) => ({
    id: artist.id,
    name: artist.name,
    imageKey: `artist_${artist.id}`,
    image: artist.image,
    likes: artist.likes,
  }));

// Alternative artist names for Last.fm fallback (no longer used for primary search)
const artistNameMapping = {
  "Arijit Singh": "Arijit Singh",
  "Shreya Ghoshal": "Shreya Ghoshal",
  Pritam: "Pritam",
  "A.R. Rahman": "A.R. Rahman",
  Badshah: "Badshah",
  "Diljit Dosanjh": "Diljit Dosanjh",
};

const popularPlaylists = [
  {
    id: "playlist_1",
    title: "Hip Hop Hits",
    subtitle: "Best hip hop tracks",
    imageKey: "pl_hiphop_hits",
    image: "https://picsum.photos/300/300?random=10",
    likes: "520K",
  },
  {
    id: "playlist_2",
    title: "Pop Fresh!",
    subtitle: "Latest pop hits",
    imageKey: "pl_pop_fresh",
    image: "https://picsum.photos/300/300?random=11",
    likes: "412K",
  },
  {
    id: "playlist_3",
    title: "Rap Essentials",
    subtitle: "Classic rap tracks",
    imageKey: "pl_rap_essentials",
    image: "https://picsum.photos/300/300?random=12",
    likes: "389K",
  },
];

// Genres data matching your original layout
const genres = [
  { id: "hiphop", name: "HIP-HOP", imageKey: "genre_hiphop", likes: "2.1M" },
  {
    id: "dance_electro",
    name: "DANCE/ELECTRO",
    imageKey: "genre_dance_electro",
    likes: "1.8M",
  },
  { id: "pop", name: "POP", imageKey: "genre_pop", likes: "3.4M" },
  { id: "country", name: "COUNTRY", imageKey: "genre_country", likes: "1.2M" },
  { id: "rock", name: "ROCK", imageKey: "genre_rock", likes: "2.8M" },
  { id: "indie", name: "INDIE", imageKey: "genre_indie", likes: "956K" },
  { id: "latin", name: "LATIN", imageKey: "genre_latin", likes: "1.5M" },
  { id: "kpop", name: "K-POP", imageKey: "genre_kpop", likes: "2.3M" },
  { id: "metal", name: "METAL", imageKey: "genre_metal", likes: "1.1M" },
  { id: "radio", name: "RADIO", imageKey: "genre_radio", likes: "1.7M" },
  {
    id: "progressive",
    name: "PROGRESSIVE",
    imageKey: "genre_progressive",
    likes: "445K",
  },
  { id: "decades", name: "DECADES", imageKey: "decades", likes: "890K" },
  {
    id: "classical",
    name: "CLASSICAL",
    imageKey: "genre_classical",
    likes: "567K",
  },
  { id: "jazz", name: "JAZZ", imageKey: "genre_jazz", likes: "423K" },
  {
    id: "instrumentals",
    name: "INSTRUMENTALS",
    imageKey: "genre_instrumentals",
    likes: "678K",
  },
  { id: "punk", name: "PUNK", imageKey: "genre_punk", likes: "345K" },
  { id: "blues", name: "BLUES", imageKey: "genre_blues", likes: "234K" },
  {
    id: "soul_funk",
    name: "SOUL/FUNK",
    imageKey: "genre_soul_funk",
    likes: "1.2M",
  },
  { id: "reggae", name: "REGGAE", imageKey: "genre_reggae", likes: "789K" },
  { id: "folk", name: "FOLK", imageKey: "genre_folk", likes: "456K" },
];

// Moods data matching your original layout
const moods = [
  { id: "party", name: "PARTY", imageKey: "party", likes: "1.8M" },
  { id: "chill", name: "CHILL", imageKey: "chill", likes: "1.2M" },
  { id: "workout", name: "WORKOUT", imageKey: "workout", likes: "1.5M" },
  { id: "focus", name: "FOCUS", imageKey: "focus", likes: "890K" },
  { id: "driving", name: "DRIVING", imageKey: "driving", likes: "1.1M" },
  { id: "rainy_day", name: "RAINY DAY", imageKey: "rainy_day", likes: "678K" },
  { id: "romance", name: "ROMANCE", imageKey: "romance", likes: "2.3M" },
  { id: "sleep", name: "SLEEP", imageKey: "sleep", likes: "456K" },
  { id: "comedy", name: "COMEDY", imageKey: "comedy", likes: "234K" },
  { id: "family", name: "FAMILY", imageKey: "family", likes: "567K" },
  { id: "dinner", name: "DINNER", imageKey: "dinner", likes: "789K" },
  { id: "travel", name: "TRAVEL", imageKey: "travel", likes: "1.3M" },
];

// Podcasts data
const podcasts = [
  {
    id: "podcast_1",
    title: "Music History",
    subtitle: "Exploring music through time",
    imageKey: "genre_classical",
    likes: "234K",
  },
  {
    id: "podcast_2",
    title: "Artist Interviews",
    subtitle: "Behind the scenes with musicians",
    imageKey: "genre_rock",
    likes: "189K",
  },
  {
    id: "podcast_3",
    title: "Music Theory",
    subtitle: "Understanding the fundamentals",
    imageKey: "genre_jazz",
    likes: "156K",
  },
  {
    id: "podcast_4",
    title: "Concert Stories",
    subtitle: "Amazing live performance tales",
    imageKey: "genre_pop",
    likes: "298K",
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { play, currentTrack, isPlaying, pause } = usePlayer();
  const [trendingMusic, setTrendingMusic] = useState<Track[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const genresMoodsRef = useRef<View>(null);
  const [recommendedArtists, setRecommendedArtists] = useState<any[]>(
    recommendedArtistsSeed
  );
  const [recentlyPlayed, setRecentlyPlayed] =
    useState<any[]>(recentlyPlayedSeed);
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const [isLoading, setIsLoading] = useState(true);
  const [showFullGenres, setShowFullGenres] = useState(false);
  const [showFullMoods, setShowFullMoods] = useState(false);

  useEffect(() => {
    const loadTrendingMusic = async () => {
      try {
        const trending = await getTrendingVideos("US", "10", 20);
        const withImages = trending.map((t, index) => ({
          ...t,
          id:
            t.id && t.id !== "undefined"
              ? t.id
              : `trending_${Date.now()}_${index}`,
          image: t.thumbnailUrl,
        }));
        setTrendingMusic(withImages as unknown as Track[]);
      } catch (error) {
        console.error("❌ Failed to load trending music:", error);
        const mockTrending = getMockTrendingMusic();
        setTrendingMusic(mockTrending);
      }
    };

    const hydrateArtists = async () => {
      try {
        console.log("🔄 Starting to hydrate artists...");

        // Use original artist names for Spotify searches
        const artistNames = recommendedArtistsSeed.map((a) => a.name);
        console.log("🎵 Artist names to fetch:", artistNames);

        // Explicitly set Spotify as primary source with fallback enabled
        const imageConfig: Partial<ImageServiceConfig> = {
          primarySource: "spotify",
          enableFallback: true,
        };

        const artistImages = await batchGetArtistImages(
          artistNames,
          imageConfig
        );
        console.log("🖼️ Batch fetched artist images:", artistImages);

        const updated = recommendedArtistsSeed.map((a) => {
          // Use original artist name for Spotify
          const fetchedImage = artistImages[a.name];
          console.log(`🖼️ Artist image for ${a.name}:`, fetchedImage);

          // Use fetched image if available, otherwise keep original
          const finalImage = fetchedImage || a.image;
          console.log(`✅ Final image for ${a.name}:`, finalImage);

          return { ...a, image: finalImage };
        });

        console.log("🎉 Artists hydrated:", updated);
        setRecommendedArtists(updated);
      } catch (error) {
        console.error("❌ Failed to hydrate artists:", error);
        console.log("🔄 Using fallback artist data");
        setRecommendedArtists(recommendedArtistsSeed);
      }
    };

    const hydrateRecentlyPlayed = async () => {
      try {
        console.log("🔄 Starting to hydrate recently played...");

        const artistNames = recentlyPlayedSeed
          .filter((item) => item.isArtist && item.artist)
          .map((item) => item.artist); // Use original artist names

        console.log("🎵 Recently played artist names:", artistNames);

        if (artistNames.length > 0) {
          // Explicitly set Spotify as primary source with fallback enabled
          const imageConfig: Partial<ImageServiceConfig> = {
            primarySource: "spotify",
            enableFallback: true,
          };

          const artistImages = await batchGetArtistImages(
            artistNames,
            imageConfig
          );
          console.log(
            "🖼️ Batch fetched recently played artist images:",
            artistImages
          );

          const updated = recentlyPlayedSeed.map((item) => {
            if (item.isArtist && item.artist) {
              // Use original artist name for Spotify
              const fetchedImage = artistImages[item.artist];
              console.log(`🖼️ Artist image for ${item.artist}:`, fetchedImage);

              const finalImage = fetchedImage || item.image;
              console.log(`✅ Final image for ${item.artist}:`, finalImage);

              return { ...item, image: finalImage };
            }
            return item;
          });

          console.log("🎉 Recently played hydrated:", updated);
          setRecentlyPlayed(updated);
        } else {
          console.log("ℹ️ No artists in recently played to hydrate");
          setRecentlyPlayed(recentlyPlayedSeed);
        }
      } catch (error) {
        console.error("❌ Failed to hydrate recently played:", error);
        console.log("🔄 Using fallback recently played data");
        setRecentlyPlayed(recentlyPlayedSeed);
      }
    };

    const loadAllData = async () => {
      setIsLoading(true);

      console.log("🔧 API Configuration check:");
      console.log(
        "YouTube API Key:",
        process.env.EXPO_PUBLIC_YOUTUBE_API_KEY ? "✅ Set" : "❌ Missing"
      );
      console.log(
        "Last.fm API Key:",
        process.env.EXPO_PUBLIC_LASTFM_API_KEY ? "✅ Set" : "❌ Missing"
      );

      try {
        await Promise.all([
          loadTrendingMusic(),
          hydrateArtists(),
          hydrateRecentlyPlayed(),
        ]);
      } catch (error) {
        console.error("❌ Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  // Navigation handlers
  const handleCardPress = (item: any) => {
    // Navigate to genre detail if the item id matches a known genre slug
    if (
      item?.id &&
      typeof item.id === "string" &&
      (genreData as any)[item.id]
    ) {
      router.push(`/category/${item.id}`);
      return;
    }
    // Navigate to mood detail if the item id matches a known mood slug
    const moodSlugs = [
      "party",
      "chill",
      "workout",
      "focus",
      "driving",
      "rainy_day",
      "romance",
      "sleep",
      "comedy",
      "family",
      "dinner",
      "travel",
    ];
    if (
      item?.id &&
      typeof item.id === "string" &&
      moodSlugs.includes(item.id)
    ) {
      router.push(`/mood/${item.id}`);
      return;
    }
    if (item.isArtist || (!item.title && item.name && !item.color)) {
      router.push(`/user/${item.id}`);
    } else if (item.isPlaylist) {
      router.push(`/playlist/${item.id}`);
    } else if (item.name && item.color) {
      router.push("/(tabs)/search");
    } else if (item.subtitle && item.subtitle.toLowerCase().includes("album")) {
      router.push("/(tabs)/search");
    } else if (item.sourceType === "youtube") {
      if (item.id) {
        router.push(`/track/${item.id}`);
      } else if (item.sourceId) {
        router.push(`/track/${item.sourceId}`);
      } else {
        router.push("/(tabs)/search");
      }
    } else if (item.title) {
      router.push("/(tabs)/search");
    }
  };

  const handlePlayPress = (item: any) => {
    if (item.sourceType === "youtube" && item.sourceId) {
      play(item);
    }
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      pause();
    } else {
      play(currentTrack);
    }
  };

  const handleViewAll = (section: string) => {
    if (section === "Genres") {
      setShowFullGenres(true);
    } else if (section === "Moods") {
      setShowFullMoods(true);
    } else {
      router.push("/(tabs)/search");
    }
  };

  const navigateHeaderTab = (tab: string) => {
    setActiveTab(tab);
  };

  // Manual refresh function for debugging
  const refreshImages = async () => {
    console.log("🔄 Manual refresh triggered");
    setIsLoading(true);

    try {
      const artistNames = recommendedArtistsSeed.map(
        (a) => artistNameMapping[a.name] || a.name
      );
      console.log("🎵 Refreshing artist images for:", artistNames);

      const artistImages = await batchGetArtistImages(artistNames);
      console.log("🖼️ Refresh results:", artistImages);

      const updated = recommendedArtistsSeed.map((a) => {
        const searchName = artistNameMapping[a.name] || a.name;
        const lastfmImage = artistImages[searchName];
        console.log(
          `🔄 Refresh: ${a.name} (searched as ${searchName}) -> ${
            lastfmImage || "using fallback"
          }`
        );
        return { ...a, image: lastfmImage || a.image };
      });

      setRecommendedArtists(updated);
      console.log("✅ Refresh completed");
    } catch (error) {
      console.error("❌ Refresh failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render functions with proper unique keys
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
        source={getSafeImageSource(item)}
        style={styles.cardImage}
        onError={(error) => console.log("Image load error:", error.nativeEvent)}
        defaultSource={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
        }}
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

  const renderBrowseCard = (item: any) => {
    console.log('🎨 renderBrowseCard called with item:', item);
    return (
      <TouchableOpacity
        style={styles.browseCard}
        activeOpacity={0.8}
        onPress={() => handleCardPress(item)}
      >
        <Image
          source={getSafeImageSource(item)}
          style={styles.browseCardImage}
          onError={(error) =>
            console.log("Browse image load error:", error.nativeEvent)
          }
          defaultSource={{
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
          }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.browseCardGradient}
        >
          <Text style={styles.browseCardName}>{item.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  // Grid layout renderer for Genres & Moods (restoring your original design)
  const renderGridSection = (
    title: string,
    data: any[],
    onBackToPreview: () => void
  ) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <TouchableOpacity onPress={onBackToPreview}>
            <Text style={styles.backToPreviewText}>← Back to Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.gridContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={generateUniqueKey(item, index)}
            style={styles.gridCard}
            activeOpacity={0.8}
            onPress={() => handleCardPress(item)}
          >
            <Image
              source={getSafeImageSource(item)}
              style={styles.gridCardImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.gridCardGradient}
            >
              <Text style={styles.gridCardName}>{item.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSection = (
    title: string,
    data: any[],
    isLarge = false,
    isCircular = false,
    showViewAll = false,
    subtitle?: string
  ) => {
    console.log(`🎯 Rendering section: ${title} with ${data.length} items`);
    console.log(`🎯 First item:`, data[0]);

    return (
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
          contentContainerStyle={styles.horizontalListContent}
        >
          {data.map((item, index) => {
            const shouldUseBrowseCard =
              title === "Browse" || title === "Genres" || title === "Moods";
            console.log(
              `🎯 Item ${index}: ${item.name} - Using browse card: ${shouldUseBrowseCard}`
            );

            return (
              <View
                key={generateUniqueKey(item, index)}
                style={styles.cardContainer}
              >
                {isCircular
                  ? renderContentCard(item, isLarge, true)
                  : shouldUseBrowseCard
                  ? renderBrowseCard(item)
                  : renderContentCard(item, isLarge)}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {}} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.primaryAccent, "#8B5CF6", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSubtitle}>
              Discover your next favorite track
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Continue Listening */}
      {currentTrack && (
        <View style={styles.continueCard}>
          <View style={styles.continueRow}>
            <Image
              source={{ uri: currentTrack.thumbnailUrl }}
              style={styles.continueImage}
            />
            <View style={styles.continueInfo}>
              <Text style={styles.continueLabel}>Continue listening</Text>
              <Text style={styles.continueTitle} numberOfLines={1}>
                {currentTrack.title}
              </Text>
              <Text style={styles.continueArtist} numberOfLines={1}>
                {currentTrack.artist}
              </Text>
              <View style={styles.continueControls}>
                <TouchableOpacity
                  style={styles.continuePlayButton}
                  onPress={togglePlayPause}
                  activeOpacity={0.9}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={20}
                    color={COLORS.textPrimary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.continueProgress}>
            <ProgressBar showTime={false} height={6} />
          </View>
        </View>
      )}

      {/* Quick Actions moved to Library screen */}

      {/* Navigation Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navTabs}
        onScroll={(event) =>
          console.log("📱 Nav tabs scroll:", event.nativeEvent.contentOffset.x)
        }
        scrollEventThrottle={16}
      >
        <TouchableOpacity
          style={styles.navTab}
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
          style={styles.navTab}
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
          style={styles.navTab}
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
          style={styles.navTab}
          onPress={() => navigateHeaderTab("RECOMMENDATIONS")}
        >
          <Text
            style={[
              styles.navTabText,
              activeTab === "RECOMMENDATIONS" && styles.activeTabText,
            ]}
          >
            RECOMMENDATIONS
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Content based on active tab */}
      {activeTab === "OVERVIEW" && (
        <>
          {renderSection("Recently Played", recentlyPlayed, false, false, true)}
          {renderSection("Made For You", madeForYou, true, false, true)}
          {renderSection(
            "Recommended Artists",
            recommendedArtists,
            false,
            true,
            true
          )}
          {renderSection(
            "Popular Playlists",
            popularPlaylists,
            false,
            false,
            true
          )}
          {renderSection("Trending Now", trendingMusic, false, false, true)}
        </>
      )}

      {activeTab === "GENRES & MOODS" && (
        <>
          {showFullGenres
            ? renderGridSection("Genres", genres, () =>
                setShowFullGenres(false)
              )
            : renderSection("Genres", genres.slice(0, 5), false, false, true)}
          {showFullMoods
            ? renderGridSection("Moods", moods, () => setShowFullMoods(false))
            : renderSection("Moods", moods.slice(0, 5), false, false, true)}
        </>
      )}

      {activeTab === "PODCASTS" && (
        <>{renderSection("Popular Podcasts", podcasts, false, false, true)}</>
      )}

      {activeTab === "RECOMMENDATIONS" && (
        <>
          {renderSection(
            "Personalized Recommendations",
            recommendedArtists,
            false,
            true,
            true
          )}
          {renderSection(
            "Trending Recommendations",
            trendingMusic,
            false,
            false,
            true
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.sm,
  },
  header: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  headerGradient: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderRadius: SIZES.borderRadius,
    marginHorizontal: SPACING.lg,
    elevation: 8,
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
    opacity: 0.9,
    textAlign: "center",
  },
  continueCard: {
    backgroundColor: "transparent",
    marginHorizontal: 0,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
  },
  continueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  continueImage: {
    width: 64,
    height: 64,
    borderRadius: SIZES.cardBorderRadius,
    marginRight: SPACING.md,
  },
  continueInfo: {
    flex: 1,
  },
  continueLabel: {
    fontSize: 12,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  continueTitle: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
  },
  continueArtist: {
    fontSize: 13,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  continueControls: {
    marginTop: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  continuePlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryAccent,
    alignItems: "center",
    justifyContent: "center",
  },
  continueProgress: {
    marginTop: SPACING.md,
  },
  quickActions: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundTertiary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    marginRight: 8,
    elevation: 0,
  },
  quickActionText: {
    marginLeft: 6,
    fontSize: 13,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
  },
  navTabsContainer: {
    backgroundColor: "transparent",
    marginHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 0,
  },
  navTabs: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
  },
  navTab: {
    marginRight: SPACING.xl,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.borderRadius,
    minWidth: 120, // Ensure minimum width for proper spacing
    alignItems: "center", // Center the text
  },
  activeTab: {
    backgroundColor: "transparent",
  },
  navTabText: {
    fontSize: 14,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  activeTabText: {
    color: COLORS.textPrimary,
    fontWeight: "700",
    textDecorationLine: "underline",
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
    marginBottom: SPACING.xl,
    backgroundColor: "transparent",
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  sectionHeader: {
    marginBottom: SPACING.sm,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: "left",
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "InterRegular",
    color: COLORS.textSecondary,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: "InterMedium",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    color: COLORS.primaryAccent,
    overflow: "visible",
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  horizontalListContent: {
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
    elevation: 4,
    shadowColor: COLORS.textSecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  largeCard: {
    width: 200,
    height: 200,
  },
  circularCard: {
    width: 120,
    height: 150,
    borderRadius: 60,
    elevation: 4,
    shadowColor: COLORS.textSecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
    height: "70%",
    justifyContent: "flex-end",
    padding: SPACING.sm,
    borderRadius: SIZES.cardBorderRadius,
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
  },
  // Grid layout styles for Genres & Moods
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
  },
  gridCard: {
    width: "48%",
    height: 120,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    marginBottom: SPACING.md,
    position: "relative",
    elevation: 4,
    shadowColor: COLORS.textSecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gridCardImage: {
    width: "100%",
    height: "100%",
  },
  gridCardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: SPACING.sm,
    borderRadius: SIZES.cardBorderRadius,
  },
  gridCardName: {
    fontSize: 16,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  backToPreviewText: {
    fontSize: 14,
    fontFamily: "InterMedium",
    color: COLORS.primary,
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
