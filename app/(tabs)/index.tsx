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

// Custom image source resolver that works with homeImages
const getSafeImageSource = (item: any) => {
  try {
    // Priority 1: Local image from homeImages
    if (item.imageKey && (homeImages as any)[item.imageKey]) {
      return (homeImages as any)[item.imageKey];
    }

    // Priority 2: Remote image URL
    if (
      item.image &&
      typeof item.image === "string" &&
      item.image.trim() !== ""
    ) {
      return { uri: item.image.trim() };
    }

    // Priority 3: Default placeholder
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
    title: "PLAYLIST RADIO",
    subtitle: "70s Rock Anthems",
    imageKey: "genre_rock",
    image: "https://picsum.photos/300/300?random=4",
    likes: "598K",
    isPlaylist: true,
  },
  {
    id: "recent_2",
    title: "Chill Vibes",
    subtitle: "Relaxing beats",
    imageKey: "chill",
    image: "https://picsum.photos/300/300?random=5",
    likes: "420K",
    isPlaylist: true,
  },
  {
    id: "recent_3",
    title: "Workout Mix",
    subtitle: "High energy tracks",
    imageKey: "workout",
    image: "https://picsum.photos/300/300?random=6",
    likes: "128K",
    isPlaylist: true,
  },
];

const madeForYou = [
  {
    id: "mfy_1",
    title: "Deep Focus",
    subtitle: "Make monday more productive",
    imageKey: "focus",
    image: "https://picsum.photos/300/300?random=7",
    likes: "678K",
  },
  {
    id: "mfy_2",
    title: "Productive Morning",
    subtitle: "Start your day right",
    imageKey: "workout",
    image: "https://picsum.photos/300/300?random=8",
    likes: "543K",
  },
  {
    id: "mfy_3",
    title: "Mellow Beats",
    subtitle: "Calm and collected",
    imageKey: "chill",
    image: "https://picsum.photos/300/300?random=9",
    likes: "456K",
  },
];

// Browse section data
const browseGenres = [
  { id: "hiphop", name: "HIP-HOP", imageKey: "genre_hiphop", likes: "2.1M" },
  {
    id: "dance_electro",
    name: "DANCE / ELECTRO",
    imageKey: "genre_dance_electro",
    likes: "1.8M",
  },
  { id: "pop", name: "POP", imageKey: "genre_pop", likes: "3.4M" },
  { id: "country", name: "COUNTRY", imageKey: "genre_country", likes: "1.2M" },
  { id: "rock", name: "ROCK", imageKey: "genre_rock", likes: "2.8M" },
  { id: "indie", name: "INDIE", imageKey: "genre_indie", likes: "956K" },
  { id: "latin", name: "LATIN", imageKey: "genre_latin", likes: "1.5M" },
  { id: "rb", name: "R&B", imageKey: "genre_rb", likes: "2.3M" },
  { id: "metal", name: "METAL", imageKey: "genre_metal", likes: "1.1M" },
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
    name: "SOUL / FUNK",
    imageKey: "genre_soul_funk",
    likes: "1.2M",
  },
  { id: "reggae", name: "REGGAE", imageKey: "genre_reggae", likes: "789K" },
];

const browseMoods = [
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

// Additional sections for Home
const playlistPicks = [
  {
    id: "playlist_picks_1",
    title: "Random Compilations",
    subtitle: "Mixed genres",
    imageKey: "genre_pop",
    image: "https://picsum.photos/300/300?random=20",
    likes: "890K",
    isPlaylist: true,
  },
  {
    id: "playlist_picks_2",
    title: "Workout Mix",
    subtitle: "High energy",
    imageKey: "workout",
    image: "https://picsum.photos/300/300?random=21",
    likes: "756K",
    isPlaylist: true,
  },
  {
    id: "playlist_picks_3",
    title: "Chill Vibes",
    subtitle: "Relaxing",
    imageKey: "chill",
    image: "https://picsum.photos/300/300?random=22",
    likes: "654K",
    isPlaylist: true,
  },
];

const newReleases = [
  {
    id: "new_release_1",
    title: "New Album",
    subtitle: "Artist Name",
    imageKey: "genre_pop",
    image: "https://picsum.photos/300/300?random=30",
    likes: "123K",
  },
  {
    id: "new_release_2",
    title: "Latest Single",
    subtitle: "Another Artist",
    imageKey: "genre_hiphop",
    image: "https://picsum.photos/300/300?random=31",
    likes: "98K",
  },
  {
    id: "new_release_3",
    title: "EP Release",
    subtitle: "Indie Artist",
    imageKey: "genre_indie",
    image: "https://picsum.photos/300/300?random=32",
    likes: "76K",
  },
];

const popularArtists = [
  {
    id: "artist_1",
    name: "The Beatles",
    imageKey: "artist_beatles",
    image: "https://picsum.photos/300/300?random=40",
    likes: "5.2M",
    isArtist: true,
  },
  {
    id: "artist_2",
    name: "Taylor Swift",
    imageKey: "artist_taylor",
    image: "https://picsum.photos/300/300?random=41",
    likes: "4.8M",
    isArtist: true,
  },
  {
    id: "artist_3",
    name: "Ed Sheeran",
    imageKey: "artist_ed",
    image: "https://picsum.photos/300/300?random=42",
    likes: "3.9M",
    isArtist: true,
  },
  {
    id: "artist_4",
    name: "Drake",
    imageKey: "artist_drake",
    image: "https://picsum.photos/300/300?random=43",
    likes: "4.1M",
    isArtist: true,
  },
];

// Podcasts data
const podcasts = [
  {
    id: "podcast_1",
    title: "Daily Dose",
    subtitle: "Music news daily",
    imageKey: "genre_pop",
    image: "https://picsum.photos/300/300?random=50",
    likes: "234K",
  },
  {
    id: "podcast_2",
    title: "The Joe Rogan Experience",
    subtitle: "Long form conversations",
    imageKey: "genre_rock",
    image: "https://picsum.photos/300/300?random=51",
    likes: "189K",
  },
  {
    id: "podcast_3",
    title: "Music Theory",
    subtitle: "Understanding music",
    imageKey: "genre_classical",
    image: "https://picsum.photos/300/300?random=52",
    likes: "156K",
  },
];

// Get top artists from different genres for recommendations
console.log("🌱 allArtists imported:", allArtists);
console.log(
  "🌱 allArtists length:",
  allArtists ? allArtists.length : "undefined"
);

// Check if allArtists is actually an array and has data
if (!allArtists || !Array.isArray(allArtists) || allArtists.length === 0) {
  console.error("❌ allArtists is empty or not an array!");
  // Fallback to hardcoded artists with real images
  const fallbackArtists = [
    {
      id: "fallback_1",
      name: "Drake",
      imageKey: "artist_drake",
      image: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
      likes: "4.1M",
    },
    {
      id: "fallback_2",
      name: "Taylor Swift",
      imageKey: "artist_taylor",
      image: "https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13",
      likes: "4.8M",
    },
    {
      id: "fallback_3",
      name: "Ed Sheeran",
      imageKey: "artist_ed",
      image: "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
      likes: "3.9M",
    },
    {
      id: "fallback_4",
      name: "The Weeknd",
      imageKey: "artist_weeknd",
      image: "https://i.scdn.co/image/ab6761610000e5eb86e362deb9f22566331fbdeb",
      likes: "3.7M",
    },
    {
      id: "fallback_5",
      name: "Post Malone",
      imageKey: "artist_post",
      image: "https://i.scdn.co/image/ab6761610000e5eb19c2790744c792d05570bb71",
      likes: "3.2M",
    },
    {
      id: "fallback_6",
      name: "Ariana Grande",
      imageKey: "artist_ariana",
      image: "https://i.scdn.co/image/ab6761610000e5eb4a21b4760d2ecb7b0dcdc8da",
      likes: "3.5M",
    },
  ];
  console.log("🔄 Using fallback artists:", fallbackArtists);
  var recommendedArtistsSeed = fallbackArtists;
} else {
  console.log("🌱 allArtists has data, first item:", allArtists[0]);
  console.log(
    "🌱 allArtists with Top/Major tier:",
    allArtists.filter(
      (artist) => artist.tier === "Top" || artist.tier === "Major"
    )
  );

  recommendedArtistsSeed = allArtists
    .filter((artist) => artist.tier === "Top" || artist.tier === "Major")
    .slice(0, 6)
    .map((artist) => ({
      id: artist.id,
      name: artist.name,
      imageKey: `artist_${artist.id}`,
      image: artist.image,
      likes: artist.likes,
    }));
}

// Debug logging for recommendedArtistsSeed
console.log("🌱 recommendedArtistsSeed created:", recommendedArtistsSeed);
if (recommendedArtistsSeed.length > 0) {
  console.log("🌱 First seed artist:", recommendedArtistsSeed[0]);
  console.log("🌱 First seed artist image:", recommendedArtistsSeed[0].image);
}

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
    imageKey: "genre_hiphop",
    image: "https://picsum.photos/300/300?random=10",
    likes: "520K",
  },
  {
    id: "playlist_2",
    title: "Pop Fresh!",
    subtitle: "Latest pop hits",
    imageKey: "genre_pop",
    image: "https://picsum.photos/300/300?random=11",
    likes: "412K",
  },
  {
    id: "playlist_3",
    title: "Rap Essentials",
    subtitle: "Classic rap tracks",
    imageKey: "genre_hiphop",
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
  const [showFullGenresGrid, setShowFullGenresGrid] = useState(false);
  const [showFullMoodsGrid, setShowFullMoodsGrid] = useState(false);

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
        console.log(
          "🔄 recommendedArtistsSeed length:",
          recommendedArtistsSeed.length
        );
        console.log(
          "🔄 recommendedArtistsSeed first item:",
          recommendedArtistsSeed[0]
        );

        // Use the data directly since it already contains real Spotify images
        console.log("🎉 Setting recommendedArtists directly (no API calls needed)");
        setRecommendedArtists(recommendedArtistsSeed);
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
          .map((item) => item.artist!)
          .filter((name): name is string => name !== undefined); // Use original artist names

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
            // Since recentlyPlayedSeed items are playlists, not artists,
            // we don't need to hydrate them with artist images
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

  // Manual refresh function removed - no longer needed since we use static data

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
    console.log("🎨 renderBrowseCard called with item:", item);
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

  // Horizontal tiles renderer for Genres & Moods with View All
  const renderHorizontalTilesSection = (
    title: string,
    data: any[],
    showViewAll: boolean,
    onViewAll: () => void
  ) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAllText}>View All &gt;</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListContent}
      >
        {data.slice(0, 5).map((item, index) => (
          <TouchableOpacity
            key={generateUniqueKey(item, index)}
            style={styles.horizontalTile}
            activeOpacity={0.8}
            onPress={() => handleCardPress(item)}
          >
            <Image
              source={getSafeImageSource(item)}
              style={styles.horizontalTileImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.horizontalTileGradient}
            >
              <Text style={styles.horizontalTileName}>{item.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
            <View style={styles.headerTopRow}>
              <Text style={styles.headerTitle}>Home</Text>
              <TouchableOpacity style={styles.searchButton}>
                <Ionicons name="search" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
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
      </ScrollView>

      {/* Content based on active tab */}
      {activeTab === "OVERVIEW" && (
        <>
          {renderSection("Recently Played", recentlyPlayed, false, false, true)}
          {renderSection(
            "Make monday more productive",
            madeForYou,
            true,
            false,
            true
          )}
          {renderSection(
            "Browse",
            browseGenres.slice(0, 4),
            false,
            false,
            true
          )}
          {renderSection("Playlist picks", playlistPicks, false, false, true)}
          {renderSection("Podcasts", podcasts, false, false, true)}
          {renderSection(
            "New releases for you",
            newReleases,
            false,
            false,
            true
          )}
          {(() => {
            console.log("🎯 Rendering 'You might like these artists' section");
            console.log("🎯 recommendedArtists data:", recommendedArtists);
            console.log(
              "🎯 recommendedArtists length:",
              recommendedArtists.length
            );
            if (recommendedArtists.length > 0) {
              console.log("🎯 First artist:", recommendedArtists[0]);
              console.log(
                "🎯 First artist image:",
                recommendedArtists[0].image
              );
            }
            return renderSection(
              "You might like these artists",
              recommendedArtists,
              false,
              true,
              true
            );
          })()}
          {renderSection(
            "Popular playlists",
            popularPlaylists,
            false,
            false,
            true
          )}
        </>
      )}

      {activeTab === "GENRES & MOODS" && (
        <>
          {!showFullGenresGrid && !showFullMoodsGrid ? (
            <>
              {renderHorizontalTilesSection("Genres", browseGenres, true, () =>
                setShowFullGenresGrid(true)
              )}
              {renderHorizontalTilesSection("Moods", browseMoods, true, () =>
                setShowFullMoodsGrid(true)
              )}
            </>
          ) : showFullGenresGrid ? (
            <>
              {renderGridSection("Genres", browseGenres, () =>
                setShowFullGenresGrid(false)
              )}
            </>
          ) : (
            <>
              {renderGridSection("Moods", browseMoods, () =>
                setShowFullMoodsGrid(false)
              )}
            </>
          )}
        </>
      )}

      {activeTab === "PODCASTS" && (
        <>
          {renderSection("Popular Podcasts", podcasts, false, false, true)}
          {renderSection("Trending Podcasts", podcasts, false, false, true)}
          {renderSection("New Episodes", podcasts, false, false, true)}
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
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  headerGradient: {
    paddingVertical: SPACING.lg,
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
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: SPACING.xs,
  },
  searchButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "left",
    marginBottom: 0,
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
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
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
    marginBottom: SPACING.md,
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
    marginRight: SPACING.lg,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.borderRadius,
    minWidth: 100, // Ensure minimum width for proper spacing
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
    marginBottom: SPACING.md,
    backgroundColor: "transparent",
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  sectionHeader: {
    marginBottom: SPACING.xs,
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
    fontSize: 18,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
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
    paddingBottom: SPACING.lg,
  },
  horizontalListContent: {
    paddingHorizontal: SPACING.lg,
  },
  cardContainer: {
    marginRight: SPACING.md,
  },
  contentCard: {
    width: 140,
    height: 140,
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
    width: 180,
    height: 180,
  },
  circularCard: {
    width: 100,
    height: 130,
    borderRadius: 50,
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
  horizontalTile: {
    width: 120,
    height: 120,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    marginRight: SPACING.md,
    position: "relative",
    elevation: 4,
    shadowColor: COLORS.textSecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  horizontalTileImage: {
    width: "100%",
    height: "100%",
  },
  horizontalTileGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
    padding: SPACING.sm,
    borderRadius: SIZES.cardBorderRadius,
  },
  horizontalTileName: {
    fontSize: 12,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
