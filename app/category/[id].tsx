/**
 * Category Screen
 * Displays content for a specific genre or category
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
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING, SIZES } from "../../constants/theme";

const { width } = Dimensions.get("window");

// Mock data for category content
const categoryData = {
  "1": { name: "HIP-HOP", color: "#FF6B6B" },
  "2": { name: "DANCE/ELECTRO", color: "#4ECDC4" },
  "3": { name: "POP", color: "#45B7D1" },
  "4": { name: "COUNTRY", color: "#96CEB4" },
  "5": { name: "ROCK", color: "#FECA57" },
  "6": { name: "INDIE", color: "#FF9FF3" },
  "7": { name: "LATIN", color: "#54A0FF" },
  "8": { name: "K-POP", color: "#5F27CD" },
  "9": { name: "METAL", color: "#00D2D3" },
  "10": { name: "RADIO", color: "#FF9F43" },
};

const popularContent = [
  {
    id: "1",
    title: "Workout Rock",
    image:
      "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=WORKOUT+ROCK",
    likes: "414K",
  },
  {
    id: "2",
    title: "Love Rock",
    image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=LOVE+ROCK",
    likes: "98K",
  },
  {
    id: "3",
    title: "Rockabilly",
    image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=ROCKABILLY",
    likes: "82K",
  },
];

const playlists = [
  {
    id: "1",
    title: "Pop Rock",
    image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=POP+ROCK",
    likes: "420K",
  },
  {
    id: "2",
    title: "Woodstock legends",
    image: "https://via.placeholder.com/200x200/00B894/FFFFFF?text=WOODSTOCK",
    likes: "64K",
  },
  {
    id: "3",
    title: "Guitar!",
    image: "https://via.placeholder.com/200x200/FAB1A0/FFFFFF?text=GUITAR",
    likes: "299K",
  },
];

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("OVERVIEW");

  const category = categoryData[id as keyof typeof categoryData];

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Category not found</Text>
      </View>
    );
  }

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
          <View style={styles.cardStats}>
            <Ionicons name="heart" size={12} color={COLORS.textSecondary} />
            <Text style={styles.cardLikes}>{item.likes}</Text>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play" size={20} color={COLORS.textPrimary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSection = (title: string, data: any[], showViewAll = false) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showViewAll && (
          <TouchableOpacity>
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
            {renderContentCard(item)}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with background image */}
      <View style={styles.header}>
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
            <Text style={styles.headerTitle}>{category.name}</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.navTabs}>
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
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "OVERVIEW" && (
          <>
            {renderSection("Popular in these week", popularContent)}
            {renderSection("Playlists", playlists, true)}
          </>
        )}

        {activeTab === "PLAYLISTS" && (
          <View style={styles.centerContent}>
            <Ionicons name="list" size={64} color={COLORS.textSecondary} />
            <Text style={styles.centerText}>Playlists coming soon!</Text>
          </View>
        )}

        {activeTab === "NEW RELEASES" && (
          <View style={styles.centerContent}>
            <Ionicons name="newspaper" size={64} color={COLORS.textSecondary} />
            <Text style={styles.centerText}>New releases coming soon!</Text>
          </View>
        )}

        {activeTab === "ARTISTS" && (
          <View style={styles.centerContent}>
            <Ionicons name="people" size={64} color={COLORS.textSecondary} />
            <Text style={styles.centerText}>Artists coming soon!</Text>
          </View>
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
    height: 200,
    position: "relative",
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
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    flex: 1,
  },
  navTabs: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  navTab: {
    marginRight: SPACING.xl,
    paddingBottom: SPACING.sm,
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
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
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
    width: 200,
    height: 200,
    borderRadius: SIZES.cardBorderRadius,
    overflow: "hidden",
    position: "relative",
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
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: 4,
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
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    minHeight: 300,
  },
  centerText: {
    fontSize: 18,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.md,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: COLORS.error,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});
