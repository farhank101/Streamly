/**
 * Mood Detail Screen
 * Mirrors the Genre Category screen but sources data from moods
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, SIZES, FONTS } from "../../constants/theme";
import { MoodData, moodData, chillMoodData } from "../../constants/moodData";
import { genreImages } from "../../assets/images/home/index";

export default function MoodScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("OVERVIEW");

  // Resolve mood by slug from the in-memory database with a safe fallback
  const slug = String(id || "").toLowerCase();
  const mood: MoodData = moodData[slug] || chillMoodData;
  const headerImage = (genreImages as any)[slug];

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

  const renderContentCard = (item: any) => (
    <TouchableOpacity style={styles.contentCard} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.cardGradient}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.releaseDate && (
            <Text style={styles.cardReleaseDate} numberOfLines={1}>
              {item.releaseDate}
            </Text>
          )}
          {item.likes && (
            <View style={styles.cardStats}>
              <Ionicons name="heart" size={12} color={COLORS.textSecondary} />
              <Text style={styles.cardLikes}>{item.likes}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play" size={20} color={COLORS.textPrimary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderArtistCard = (artist: any) => (
    <TouchableOpacity style={styles.artistCard} activeOpacity={0.8}>
      <Image
        source={getArtistImageSync(artist.name, artist.image)}
        style={styles.artistImage}
      />
      <Text style={styles.artistName} numberOfLines={1}>
        {artist.name}
      </Text>
      {artist.likes && (
        <View style={styles.artistStats}>
          <Ionicons name="heart" size={12} color={COLORS.textSecondary} />
          <Text style={styles.artistLikes}>{artist.likes}</Text>
        </View>
      )}
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
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
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
            <Text style={styles.headerTitle}>{mood.name}</Text>
          </View>
        </LinearGradient>
      </View>

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
          {(["OVERVIEW", "PLAYLISTS", "NEW RELEASES", "ARTISTS"] as const).map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.navTab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.navTabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
                {activeTab === tab && (
                  <View style={styles.activeTabIndicator} />
                )}
              </TouchableOpacity>
            )
          )}
        </ScrollView>
        <View style={styles.navTabsDivider} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "OVERVIEW" && (
          <>
            {renderSection("Popular in this week", mood.popular)}
            {renderSection("Playlists", mood.playlists, true)}
            {renderSection("New releases", mood.newReleases, true)}
            {renderSection("Artists", mood.artists, true, true)}
          </>
        )}
        {activeTab === "PLAYLISTS" && (
          <>{renderSection("All Playlists", mood.playlists, true)}</>
        )}
        {activeTab === "NEW RELEASES" && (
          <>{renderSection("All New Releases", mood.newReleases, true)}</>
        )}
        {activeTab === "ARTISTS" && (
          <>{renderSection("All Artists", mood.artists, true, true)}</>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { height: 200, position: "relative" },
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  navTabsContainer: {
    backgroundColor: COLORS.background,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navTabsContent: {
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
  },
  navTab: {
    marginRight: SPACING.xl,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
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
    width: "100%",
    height: 2,
    backgroundColor: COLORS.primaryAccent,
    borderRadius: 1,
    marginTop: SPACING.xs,
    shadowColor: COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  navTabsDivider: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: SPACING.sm,
  },
  content: { flex: 1 },
  section: { marginBottom: SPACING.xl },
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
  horizontalListContent: { paddingHorizontal: SPACING.lg },
  cardContainer: { marginRight: SPACING.md },
  contentCard: {
    width: 200,
    height: 200,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    position: "relative",
  },
  cardImage: { width: "100%", height: "100%" },
  cardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    justifyContent: "flex-end",
    padding: SPACING.sm,
  },
  cardContent: { flex: 1, justifyContent: "flex-end" },
  cardTitle: {
    fontSize: 14,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardReleaseDate: {
    fontSize: 10,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textTertiary,
    marginBottom: 4,
  },
  cardStats: { flexDirection: "row", alignItems: "center" },
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
  artistCard: { width: 120, alignItems: "center" },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.sm,
  },
  artistName: {
    fontSize: 14,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  artistStats: { flexDirection: "row", alignItems: "center" },
  artistLikes: {
    fontSize: 11,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
});
