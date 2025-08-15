/**
 * Library Main Screen
 * Main entry point for the library section with tabs for different views
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY } from "../../../constants/theme";

// Tab components
import PlaylistsTab from "./playlists";
import LikedTab from "./liked";
import HistoryTab from "./history";

type TabType = "playlists" | "liked" | "history";

export default function LibraryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("history");

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "playlists":
        return <PlaylistsTab />;
      case "liked":
        return <LikedTab />;
      case "history":
        return <HistoryTab />;
      default:
        return <HistoryTab />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Library</Text>
      </View>

      {/* Quick actions for Library */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickActions}
      >
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => setActiveTab("liked")}
        >
          <Ionicons name="heart" size={16} color={COLORS.textPrimary} />
          <Text style={styles.quickActionText}>Liked</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => setActiveTab("history")}
        >
          <Ionicons name="time" size={16} color={COLORS.textPrimary} />
          <Text style={styles.quickActionText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => {
            // Navigate to create playlist screen
            // Keep within library context but reuse global route
            // Using router to push the dedicated page
            router.push("/create-playlist");
          }}
        >
          <Ionicons name="add" size={16} color={COLORS.textPrimary} />
          <Text style={styles.quickActionText}>New Playlist</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Tab navigation */}
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === "history" && styles.activeTab]}
            onPress={() => setActiveTab("history")}
          >
            <Ionicons
              name="time-outline"
              size={20}
              color={
                activeTab === "history" ? COLORS.primary : COLORS.textSecondary
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "history" && styles.activeTabText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "liked" && styles.activeTab]}
            onPress={() => setActiveTab("liked")}
          >
            <Ionicons
              name="heart-outline"
              size={20}
              color={
                activeTab === "liked" ? COLORS.highlight : COLORS.textSecondary
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "liked" && styles.activeTabText,
              ]}
            >
              Liked Songs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "playlists" && styles.activeTab]}
            onPress={() => setActiveTab("playlists")}
          >
            <Ionicons
              name="list-outline"
              size={20}
              color={
                activeTab === "playlists"
                  ? COLORS.secondary
                  : COLORS.textSecondary
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "playlists" && styles.activeTabText,
              ]}
            >
              Playlists
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Tab content */}
      <View style={styles.content}>{renderTabContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  quickActions: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundTertiary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    marginRight: 8,
  },
  quickActionText: {
    marginLeft: 6,
    fontSize: 13,
    fontFamily: "InterMedium",
    color: COLORS.textPrimary,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    marginBottom: SPACING.md,
  },
  tabScrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.md,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: COLORS.primary + "15",
  },
  tabText: {
    fontSize: 14,
    fontFamily: "InterMedium",
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  activeTabText: {
    color: COLORS.primary,
    fontFamily: "InterSemiBold",
  },
  content: {
    flex: 1,
  },
});
