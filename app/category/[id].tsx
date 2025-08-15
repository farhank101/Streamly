/**
 * Category Screen
 * Displays content for a specific genre or category with comprehensive sections
 * Matching the exact design from the reference image
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, SIZES, FONTS } from "../../constants/theme";
import { rockGenreData, GenreData, genreData } from "../../constants/genreData";
import { genreImages } from "../../assets/images/home/index";
import { getArtistImage } from "../../utils/imageUtils";

const { width } = Dimensions.get("window");

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("OVERVIEW");

  // Resolve genre by slug from the in-memory database with a safe fallback
  const slug = String(id || "").toLowerCase();
  const category: GenreData = genreData[slug] || rockGenreData;
  const headerImage = (genreImages as any)[slug];

  const renderContentCard = (item: any, isArtist = false) => (
    <TouchableOpacity style={styles.contentCard} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
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

  const renderArtistCard = (artist: any) => (
    <TouchableOpacity style={styles.artistCard} activeOpacity={0.8}>
      <Image
        source={getArtistImage(artist.name, artist.image)}
        style={styles.artistImage}
      />
      <Text style={styles.artistName} numberOfLines={1}>
        {artist.name}
      </Text>
    </TouchableOpacity>
  );

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
  ) => (
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
        {data.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            {isArtist ? renderArtistCard(item) : renderContentCard(item)}
            {/* Like count below the card */}
            <View style={styles.cardStatsBelow}>
              <Ionicons name="heart" size={12} color={COLORS.textSecondary} />
              <Text style={styles.cardLikesBelow}>{item.likes}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

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
                source={getArtistImage(artist.name, artist.image)}
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
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navTabsContainer}
        style={styles.navTabs}
      >
        <TouchableOpacity
          style={[styles.navTab, activeTab === "OVERVIEW" && styles.activeTab]}
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
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navTab, activeTab === "PLAYLISTS" && styles.activeTab]}
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
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "OVERVIEW" && (
          <>
            {renderSection("Popular this week", category.popular)}
            {renderSection("Playlists", category.playlists, true)}
            {renderSection("New releases", category.newReleases, true)}
            {renderSection("Artists", category.artists, true, true)}
          </>
        )}

        {activeTab === "PLAYLISTS" && (
          <>
            {renderPlaylistGrid("Playlists", category.playlists)}
            <View style={styles.podcastSection}>
              <Text style={styles.podcastText}>Podcast Page</Text>
            </View>
          </>
        )}

        {activeTab === "NEW RELEASES" && (
          <>{renderSection("All New Releases", category.newReleases, true)}</>
        )}

        {activeTab === "ARTISTS" && (
          <>{renderArtistGrid("All Artists", category.artists)}</>
        )}
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
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navTabsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  navTab: {
    marginRight: SPACING.xl,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minWidth: 100,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  navTabText: {
    fontSize: 14,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  activeTabText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.family.interBold,
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
});
