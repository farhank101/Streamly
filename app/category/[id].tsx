/**
 * Category Screen
 * Displays content for a specific genre or category with comprehensive sections
 * Matching the exact design from the reference image
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
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, SIZES, FONTS } from "../../constants/theme";
import { rockGenreData, GenreData, genreData } from "../../constants/genreData";
import { genreImages } from "../../assets/images/home/index";
import { getArtistImage } from "../../services/imageService";

const { width } = Dimensions.get("window");

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const [artistsWithImages, setArtistsWithImages] = useState<any[]>([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);

  // Resolve genre by slug from the in-memory database with a safe fallback
  const slug = String(id || "").toLowerCase();

  // Add error handling and logging
  console.log("🎯 CategoryScreen - slug:", slug);
  console.log("🎯 CategoryScreen - available genres:", Object.keys(genreData));

  const category: GenreData = genreData[slug] || rockGenreData;

  console.log("🎯 CategoryScreen - selected category:", category);
  console.log("🎯 CategoryScreen - category data:", {
    name: category.name,
    popular: category.popular?.length || 0,
    playlists: category.playlists?.length || 0,
    newReleases: category.newReleases?.length || 0,
    artists: category.artists?.length || 0,
  });

  // Log sample data to check structure
  if (category.popular && category.popular.length > 0) {
    console.log(
      "🎯 CategoryScreen - sample popular item:",
      category.popular[0]
    );
  }
  if (category.artists && category.artists.length > 0) {
    console.log("🎯 CategoryScreen - sample artist:", category.artists[0]);
  }

  const headerImage = (genreImages as any)[slug];

  // Test function to check if Spotify API is working
  const testSpotifyConnection = async () => {
    try {
      console.log("🧪 Testing Spotify connection...");

      // Check environment variables
      const spotifyClientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
      const spotifyClientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

      console.log("🔑 Spotify Client ID:", spotifyClientId ? "Set" : "Missing");
      console.log(
        "🔑 Spotify Client Secret:",
        spotifyClientSecret ? "Set" : "Missing"
      );

      // Show actual values for debugging (first few characters)
      if (spotifyClientId) {
        console.log(
          "🔑 Client ID value:",
          spotifyClientId.substring(0, 8) + "..."
        );
      }
      if (spotifyClientSecret) {
        console.log(
          "🔑 Client Secret value:",
          spotifyClientSecret.substring(0, 8) + "..."
        );
      }

      if (
        !spotifyClientId ||
        !spotifyClientSecret ||
        spotifyClientId === "placeholder" ||
        spotifyClientSecret === "placeholder"
      ) {
        alert(
          "❌ Spotify credentials are missing or invalid. Check your environment variables."
        );
        return;
      }

      console.log("✅ Environment variables are set, testing API call...");

      const testImage = await getArtistImage("Eminem", {
        primarySource: "spotify",
        enableFallback: false,
      });

      if (
        testImage &&
        testImage.length > 0 &&
        !testImage.includes("unsplash.com")
      ) {
        console.log(
          "✅ Spotify API is working! Test image:",
          testImage.substring(0, 50) + "..."
        );
        alert("✅ Spotify API is working! Found image for Eminem.");
      } else {
        console.log("❌ Spotify API is not working. Test result:", testImage);
        alert("❌ Spotify API is not working. Check your credentials.");
      }
    } catch (error) {
      console.error("❌ Spotify test failed:", error);
      alert("❌ Spotify test failed: " + error.message);
    }
  };

  // Function to fetch real artist images from Spotify
  const fetchArtistImages = async () => {
    if (!category.artists || category.artists.length === 0) return;

    setIsLoadingArtists(true);
    try {
      console.log("🎵 Fetching artist images for:", category.name);
      console.log("🎵 Number of artists to fetch:", category.artists.length);

      // First, immediately set fallback images so users don't see blue circles
      const artistsWithFallbacks = category.artists.map((artist) => ({
        ...artist,
        image: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face&artist=${encodeURIComponent(
          artist.name
        )}`,
      }));

      // Set fallback images immediately
      setArtistsWithImages(artistsWithFallbacks);
      console.log("🔄 Set fallback images immediately");

      // Now try to fetch real images from Spotify
      const artistsWithRealImages = await Promise.all(
        category.artists.map(async (artist, index) => {
          try {
            console.log(
              `🎵 Fetching image for artist ${index + 1}/${
                category.artists.length
              }: ${artist.name}`
            );

            // Get real image from Spotify
            const realImage = await getArtistImage(artist.name, {
              primarySource: "spotify",
              enableFallback: true,
            });

            if (
              realImage &&
              realImage.length > 0 &&
              !realImage.includes("unsplash.com")
            ) {
              console.log(
                `✅ Successfully fetched Spotify image for ${artist.name}:`,
                realImage.substring(0, 50) + "..."
              );
              return {
                ...artist,
                image: realImage,
              };
            } else {
              console.log(
                `⚠️ No valid Spotify image for ${artist.name}, keeping fallback`
              );
              return {
                ...artist,
                image: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face&artist=${encodeURIComponent(
                  artist.name
                )}`,
              };
            }
          } catch (error) {
            console.warn(`⚠️ Failed to fetch image for ${artist.name}:`, error);
            // Keep the fallback image
            return {
              ...artist,
              image: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face&artist=${encodeURIComponent(
                artist.name
              )}`,
            };
          }
        })
      );

      // Update with real images if any were found
      setArtistsWithImages(artistsWithRealImages);
      console.log(
        "✅ Successfully processed",
        artistsWithRealImages.length,
        "artists"
      );

      // Log how many got real images vs fallbacks
      const realImagesCount = artistsWithRealImages.filter(
        (a) => a.image.includes("spotify") || a.image.includes("lastfm")
      ).length;
      console.log(
        `📊 Image fetch results: ${realImagesCount} real images, ${
          artistsWithRealImages.length - realImagesCount
        } fallbacks`
      );
    } catch (error) {
      console.error("❌ Error fetching artist images:", error);
      // Keep the fallback images we set earlier
      console.log("🔄 Keeping fallback images due to error");
    } finally {
      setIsLoadingArtists(false);
    }
  };

  // Fetch artist images when Artists tab is activated OR when Overview tab loads
  useEffect(() => {
    if (activeTab === "ARTISTS" && artistsWithImages.length === 0) {
      fetchArtistImages();
    } else if (activeTab === "OVERVIEW" && artistsWithImages.length === 0) {
      // Also fetch images for Overview tab
      fetchArtistImages();
    }
  }, [activeTab, category.artists]);

  // Auto-fetch images when component first loads (for Overview tab)
  useEffect(() => {
    if (
      artistsWithImages.length === 0 &&
      category.artists &&
      category.artists.length > 0
    ) {
      console.log("🚀 Auto-fetching artist images for Overview tab...");
      console.log("🚀 Category:", category.name);
      console.log("🚀 Artists count:", category.artists.length);
      fetchArtistImages();
    }
  }, []);

  // Synchronous image resolver for artists (to avoid async issues in render)
  const getArtistImageSync = (
    artistName: string,
    artistImage?: string
  ): any => {
    if (artistImage && artistImage.startsWith("http")) {
      return { uri: artistImage };
    }
    // Return a default placeholder for now
    return {
      uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
    };
  };

  // Validate category data
  if (
    !category ||
    !category.popular ||
    !category.playlists ||
    !category.newReleases ||
    !category.artists
  ) {
    console.error("❌ CategoryScreen - Invalid category data:", category);
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 100 }}>
          Error: Invalid genre data for "{slug}"
        </Text>
      </View>
    );
  }

  const renderContentCard = (item: any, isArtist = false) => {
    // Add error handling for item data
    if (!item || !item.image) {
      console.warn(
        "⚠️ renderContentCard - Invalid item or missing image:",
        item
      );
      return (
        <View style={styles.contentCard}>
          <View
            style={[
              styles.cardImage,
              {
                backgroundColor: COLORS.backgroundTertiary,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>
              No Image
            </Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item?.title || item?.name || "Unknown"}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.contentCard} activeOpacity={0.8}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          onError={(error) =>
            console.log("Image load error:", error.nativeEvent)
          }
          defaultSource={{
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
          }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.cardGradient}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title || item.name}
            </Text>
            {item.artist && (
              <Text style={styles.cardArtist} numberOfLines={1}>
                {item.artist}
              </Text>
            )}
            {item.releaseDate && (
              <Text style={styles.cardReleaseDate} numberOfLines={1}>
                {item.releaseDate}
              </Text>
            )}
          </View>
        </LinearGradient>
        {/* Play button in bottom-left corner as shown in the image */}
        <TouchableOpacity style={styles.playButtonBottomLeft}>
          <Ionicons name="play" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderArtistCard = (artist: any) => {
    // Add error handling for artist data
    if (!artist || !artist.name) {
      console.warn("⚠️ renderArtistCard - Invalid artist:", artist);
      return (
        <View style={styles.artistCard}>
          <View
            style={[
              styles.artistImage,
              {
                backgroundColor: COLORS.backgroundTertiary,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text style={{ color: COLORS.textSecondary, fontSize: 10 }}>?</Text>
          </View>
          <Text style={styles.artistName} numberOfLines={1}>
            Unknown Artist
          </Text>
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.artistCard} activeOpacity={0.8}>
        <Image
          source={getArtistImageSync(artist.name, artist.image)}
          style={styles.artistImage}
          onError={(error) =>
            console.log("Artist image load error:", error.nativeEvent)
          }
          defaultSource={{
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
          }}
        />
        <Text style={styles.artistName} numberOfLines={1}>
          {artist.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleViewAllTap = (title: string) => {
    const normalized = title.toLowerCase();
    if (normalized.includes("playlist")) setActiveTab("PLAYLISTS");
    else if (normalized.includes("new release")) setActiveTab("NEW RELEASES");
    else if (normalized.includes("artist")) setActiveTab("ARTISTS");
  };

  const renderSection = (
    title: string,
    data: any[],
    showViewAll = false,
    isArtist = false
  ) => {
    // Add error handling for data
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn(`⚠️ renderSection - No data for "${title}"`);
      return (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
          <Text
            style={{
              color: COLORS.textSecondary,
              textAlign: "center",
              padding: 20,
            }}
          >
            No {title.toLowerCase()} available
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {showViewAll && (
            <TouchableOpacity onPress={() => handleViewAllTap(title)}>
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
            // Add error handling for individual items
            if (!item || !item.id) {
              console.warn(
                `⚠️ renderSection - Invalid item at index ${index}:`,
                item
              );
              return null;
            }

            return (
              <View key={item.id || index} style={styles.cardContainer}>
                {isArtist ? renderArtistCard(item) : renderContentCard(item)}
                {/* Like count below the card */}
                <View style={styles.cardStatsBelow}>
                  <Ionicons
                    name="heart"
                    size={12}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.cardLikesBelow}>{item.likes || "0"}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const handlePlaylistPress = (playlist: any) => {
    if (playlist && playlist.id) {
      router.push(`/playlist/${playlist.id}`);
    }
  };

  const renderPlaylistGrid = (title: string, data: any[]) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.gridContainer}>
        {data.map((pl) => (
          <View key={pl.id} style={styles.gridCardWrapper}>
            <TouchableOpacity
              style={styles.gridCard}
              activeOpacity={0.85}
              onPress={() => handlePlaylistPress(pl)}
            >
              <Image source={{ uri: pl.image }} style={styles.gridCardImage} />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.gridCardGradient}
              >
                <Text style={styles.gridCardTitle} numberOfLines={2}>
                  {pl.title}
                </Text>
              </LinearGradient>
              {/* Info button */}
              <TouchableOpacity style={styles.gridInfoButton}>
                <Ionicons
                  name="information-circle"
                  size={20}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            {/* Playlist title below the card */}
            <Text style={styles.gridCardTitleBelow} numberOfLines={2}>
              {pl.title}
            </Text>
            {/* Like count below the title */}
            <View style={styles.gridCardStats}>
              <Ionicons name="heart" size={12} color={COLORS.textSecondary} />
              <Text style={styles.gridCardLikes}>{pl.likes}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderArtistGrid = (title: string, data: any[]) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.artistGridContainer}>
        {data.map((artist) => (
          <View key={artist.id} style={styles.artistGridCardWrapper}>
            <TouchableOpacity
              style={styles.artistGridCard}
              activeOpacity={0.85}
              onPress={() => router.push(`/artist/${artist.id}`)}
            >
              <Image
                source={getArtistImageSync(artist.name, artist.image)}
                style={styles.artistGridCardImage}
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.artistGridCardGradient}
              >
                <Text style={styles.artistGridCardTitle} numberOfLines={2}>
                  {artist.name}
                </Text>
              </LinearGradient>
              {/* Info button */}
              <TouchableOpacity style={styles.artistGridInfoButton}>
                <Ionicons
                  name="information-circle"
                  size={20}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            {/* Artist name below the card */}
            <Text style={styles.artistGridCardTitleBelow} numberOfLines={1}>
              {artist.name}
            </Text>
            {/* Like count below the title */}
            <View style={styles.artistGridCardStats}>
              <Ionicons name="heart" size={12} color={COLORS.textSecondary} />
              <Text style={styles.artistGridCardLikes}>{artist.likes}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  // Function to render artist grid with refresh capability
  const renderArtistGridWithHeader = (title: string, artists: any[]) => (
    <View style={styles.artistGridSection}>
      <View style={styles.artistGridHeader}>
        <Text style={styles.artistGridTitle}>{title}</Text>
        <View style={styles.refreshSection}>
          <Text style={styles.imageStatusText}>
            {isLoadingArtists
              ? "Loading images..."
              : artistsWithImages.length > 0
              ? `${
                  artists.filter(
                    (a) =>
                      a.image !==
                      category.artists.find((orig) => orig.id === a.id)?.image
                  ).length
                } real images`
              : "Click refresh to load images"}
          </Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchArtistImages}
            disabled={isLoadingArtists}
          >
            <Ionicons
              name="refresh"
              size={20}
              color={
                isLoadingArtists ? COLORS.textTertiary : COLORS.primaryAccent
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      {renderArtistGrid("", artists)}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
        hidden={true}
      />

      {/* Header with background image */}
      <View style={styles.header}>
        {headerImage && (
          <Image
            source={headerImage}
            style={styles.headerImage}
            resizeMode="cover"
            blurRadius={12}
          />
        )}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={COLORS.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {activeTab === "PLAYLISTS"
                ? "Playlists"
                : activeTab === "ARTISTS"
                ? "Artists"
                : category.name}
            </Text>
            {(activeTab === "PLAYLISTS" || activeTab === "ARTISTS") && (
              <TouchableOpacity style={styles.searchButton}>
                <Ionicons name="search" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </View>

      {/* Spacer between header and nav tabs */}
      <View style={styles.headerSpacer} />

      {/* Navigation Tabs */}
      <LinearGradient
        colors={[
          "rgba(99, 102, 241, 0.05)",
          "rgba(99, 102, 241, 0.02)",
          "transparent",
        ]}
        style={styles.navTabsContainer}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navTabsContent}
        >
          <TouchableOpacity
            style={[
              styles.navTab,
              activeTab === "OVERVIEW" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("OVERVIEW")}
          >
            <Text
              style={[
                styles.navTabText,
                activeTab === "OVERVIEW" && styles.activeTabText,
              ]}
            >
              OVERVIEW
            </Text>
            {activeTab === "OVERVIEW" && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navTab,
              activeTab === "PLAYLISTS" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("PLAYLISTS")}
          >
            <Text
              style={[
                styles.navTabText,
                activeTab === "PLAYLISTS" && styles.activeTabText,
              ]}
            >
              PLAYLISTS
            </Text>
            {activeTab === "PLAYLISTS" && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navTab,
              activeTab === "NEW RELEASES" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("NEW RELEASES")}
          >
            <Text
              style={[
                styles.navTabText,
                activeTab === "NEW RELEASES" && styles.activeTabText,
              ]}
            >
              NEW RELEASES
            </Text>
            {activeTab === "NEW RELEASES" && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navTab, activeTab === "ARTISTS" && styles.activeTab]}
            onPress={() => setActiveTab("ARTISTS")}
          >
            <Text
              style={[
                styles.navTabText,
                activeTab === "ARTISTS" && styles.activeTabText,
              ]}
            >
              ARTISTS
            </Text>
            {activeTab === "ARTISTS" && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.navTabsDivider} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {(() => {
          try {
            if (activeTab === "OVERVIEW") {
              return (
                <>
                  {renderSection("Popular this week", category.popular)}
                  {renderSection("Playlists", category.playlists, true)}
                  {renderSection("New releases", category.newReleases, true)}
                  {(() => {
                    // Show loading state for artists section if we're fetching images
                    if (isLoadingArtists && artistsWithImages.length === 0) {
                      return (
                        <View style={styles.section}>
                          <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Artists</Text>
                            <View style={styles.loadingIndicator}>
                              <ActivityIndicator
                                size="small"
                                color={COLORS.primaryAccent}
                              />
                              <Text style={styles.loadingText}>
                                Loading images...
                              </Text>
                            </View>
                          </View>
                          <View style={styles.loadingPlaceholder}>
                            <Text style={styles.loadingPlaceholderText}>
                              Fetching real artist images from Spotify...
                            </Text>
                          </View>
                        </View>
                      );
                    }

                    // Show artists with real images if available, otherwise show original data
                    return (
                      <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                          <Text style={styles.sectionTitle}>Artists</Text>
                          <View style={styles.overviewRefreshSection}>
                            <TouchableOpacity
                              style={styles.viewAllButton}
                              onPress={() => {
                                console.log(
                                  "Clicked View All: switching to ARTISTS tab"
                                );
                                setActiveTab("ARTISTS");
                              }}
                            >
                              <Text style={styles.viewAllText}>
                                View All &gt;
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.refreshButton}
                              onPress={fetchArtistImages}
                              disabled={isLoadingArtists}
                            >
                              <Ionicons
                                name="refresh"
                                size={16}
                                color={
                                  isLoadingArtists
                                    ? COLORS.textTertiary
                                    : COLORS.primaryAccent
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        {renderSection(
                          "",
                          artistsWithImages.length > 0
                            ? artistsWithImages
                            : category.artists,
                          false, // Don't show View All here since we have it above
                          true // Mark as artist section
                        )}
                      </View>
                    );
                  })()}
                </>
              );
            }

            if (activeTab === "PLAYLISTS") {
              return (
                <>
                  {renderPlaylistGrid("Playlists", category.playlists)}
                  <View style={styles.podcastSection}>
                    <Text style={styles.podcastText}>Podcast Page</Text>
                  </View>
                </>
              );
            }

            if (activeTab === "NEW RELEASES") {
              return (
                <>
                  {renderSection(
                    "All New Releases",
                    category.newReleases,
                    true
                  )}
                </>
              );
            }

            if (activeTab === "ARTISTS") {
              return (
                <>
                  {isLoadingArtists ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator
                        size="large"
                        color={COLORS.primaryAccent}
                      />
                      <Text style={styles.loadingText}>Loading artists...</Text>
                    </View>
                  ) : artistsWithImages.length === 0 ? (
                    <View style={styles.helpContainer}>
                      <Text style={styles.helpTitle}>
                        Get Real Artist Images
                      </Text>
                      <Text style={styles.helpText}>
                        Click the refresh button above to fetch real artist
                        images from Spotify. This will replace the placeholder
                        images with actual artist photos.
                      </Text>
                      <View style={styles.helpButtonsContainer}>
                        <TouchableOpacity
                          style={styles.helpButton}
                          onPress={fetchArtistImages}
                        >
                          <Text style={styles.helpButtonText}>
                            Load Images Now
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.testButton}
                          onPress={testSpotifyConnection}
                        >
                          <Text style={styles.testButtonText}>
                            Test Spotify API
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    renderArtistGridWithHeader(
                      "All Artists",
                      artistsWithImages.length > 0
                        ? artistsWithImages
                        : category.artists
                    )
                  )}
                </>
              );
            }

            return null;
          } catch (error) {
            console.error("❌ Error rendering content:", error);
            return (
              <View style={{ padding: 20, alignItems: "center" }}>
                <Text
                  style={{ color: COLORS.textSecondary, textAlign: "center" }}
                >
                  Error rendering content. Please try again.
                </Text>
              </View>
            );
          }
        })()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 220,
    position: "relative",
    marginTop: 0, // No status bar to account for
  },
  headerSpacer: {
    height: SPACING.md,
  },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  headerGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
    paddingBottom: SPACING.lg,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: "center",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  navTabs: {
    marginBottom: SPACING.sm,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  navTabsContainer: {
    marginBottom: SPACING.sm,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navTabsContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  navTabsDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginTop: SPACING.md,
  },
  navTab: {
    marginRight: SPACING.xl,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: "center",
    minWidth: 90,
    borderRadius: SIZES.borderRadius,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1,
    borderColor: "transparent",
  },
  activeTab: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderColor: "rgba(99, 102, 241, 0.3)",
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  navTabText: {
    fontSize: 14,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textSecondary,
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  activeTabText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.family.interBold,
  },
  activeTabIndicator: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 2,
    marginTop: SPACING.xs,
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    marginTop: 0,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.primaryAccent,
  },
  horizontalListContent: {
    paddingHorizontal: SPACING.lg,
  },
  cardContainer: {
    marginRight: SPACING.md,
    alignItems: "center",
  },
  contentCard: {
    width: 180,
    height: 180,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    position: "relative",
    marginBottom: SPACING.sm,
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
  cardTitle: {
    fontSize: 14,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardArtist: {
    fontSize: 12,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  cardReleaseDate: {
    fontSize: 10,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textTertiary,
    marginBottom: 4,
  },
  cardStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardLikes: {
    fontSize: 11,
    fontFamily: FONTS.family.interRegular,
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
  playButtonBottomLeft: {
    position: "absolute",
    bottom: SPACING.sm,
    left: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  // Artist card styles
  artistCard: {
    width: 100,
    alignItems: "center",
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.sm,
  },
  artistName: {
    fontSize: 14,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  artistStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  artistLikes: {
    fontSize: 11,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  // Grid styles for Playlists tab
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
  },
  gridCardWrapper: {
    width: (width - SPACING.lg * 3) / 2, // Account for padding and gap
    marginBottom: SPACING.lg,
  },
  gridCard: {
    width: "100%",
    height: 140,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    position: "relative",
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
    padding: SPACING.sm,
  },
  gridCardTitle: {
    fontSize: 14,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  gridCardTitleBelow: {
    fontSize: 12,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.sm,
    marginTop: SPACING.xs,
  },
  gridPlayButton: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  gridInfoButton: {
    position: "absolute",
    bottom: SPACING.sm,
    right: SPACING.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  gridCardStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  gridCardLikes: {
    fontSize: 12,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  // New styles for Podcast Page
  podcastSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  podcastText: {
    fontSize: 16,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textPrimary,
  },
  cardStatsBelow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  cardLikesBelow: {
    fontSize: 11,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  // Artist grid styles for ARTISTS tab
  artistGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
  },
  artistGridCardWrapper: {
    width: (width - SPACING.lg * 3) / 2, // Account for padding and gap
    marginBottom: SPACING.lg,
  },
  artistGridCard: {
    width: "100%",
    height: 160,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    position: "relative",
  },
  artistGridCardImage: {
    width: "100%",
    height: "100%",
  },
  artistGridCardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
    padding: SPACING.sm,
  },
  artistGridCardTitle: {
    fontSize: 14,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  artistGridCardTitleBelow: {
    fontSize: 12,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.sm,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  artistGridInfoButton: {
    position: "absolute",
    bottom: SPACING.sm,
    right: SPACING.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  artistGridCardStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    justifyContent: "center",
  },
  artistGridCardLikes: {
    fontSize: 12,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  // Navigation Tabs Styles
  navTabsContainer: {
    marginBottom: SPACING.sm,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  navTabsContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  navTabsDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginTop: SPACING.md,
  },
  navTab: {
    marginRight: SPACING.xl,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    minWidth: 80,
  },
  activeTab: {
    // Active tab styling
  },
  navTabText: {
    fontSize: 14,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textSecondary,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.family.interBold,
  },
  activeTabIndicator: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 2,
    marginTop: SPACING.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  loadingText: {
    marginTop: SPACING.sm,
    fontSize: 16,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textSecondary,
  },
  artistGridSection: {
    marginBottom: SPACING.xl,
  },
  artistGridHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  artistGridTitle: {
    fontSize: 20,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
  },
  refreshSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  imageStatusText: {
    fontSize: 12,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textTertiary,
    marginRight: SPACING.sm,
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  helpContainer: {
    padding: SPACING.lg,
    alignItems: "center",
    marginTop: SPACING.lg,
  },
  helpTitle: {
    fontSize: 18,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  helpText: {
    fontSize: 14,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  helpButton: {
    width: "80%",
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryAccent,
    justifyContent: "center",
    alignItems: "center",
  },
  helpButtonText: {
    fontSize: 16,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textPrimary,
  },
  helpButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: SPACING.md,
  },
  testButton: {
    width: "80%",
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondaryAccent,
    justifyContent: "center",
    alignItems: "center",
  },
  testButtonText: {
    fontSize: 16,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textPrimary,
  },
  loadingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: SPACING.sm,
  },
  loadingPlaceholder: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.backgroundTertiary,
    borderRadius: SIZES.cardBorderRadius,
    marginTop: SPACING.sm,
  },
  loadingPlaceholderText: {
    fontSize: 12,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  overviewRefreshSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  viewAllButton: {
    marginRight: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.borderRadius,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
  },
});
