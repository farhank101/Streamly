/**
 * Search Screen
 * Allows users to search for tracks, artists, and playlists
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING } from "../constants/theme";
import * as SpeechRecognition from "expo-speech-recognition";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  // Request permission on mount
  useEffect(() => {
    // TODO: Implement speech recognition when API is available
    // For now, we'll disable voice search functionality
    setHasPermission(false);
  }, []);

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim().length === 0) return;
    router.push({
      pathname: "/search-results",
      params: { query: searchQuery },
    });
  };

  // Back button
  const handleBack = () => {
    router.back();
  };

  // Voice search - TODO: Implement when speech recognition API is available
  const handleVoiceSearch = async () => {
    Alert.alert(
      "Voice Search Coming Soon",
      "Voice search functionality will be available in a future update.",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for songs, artists, or playlists"
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            autoFocus={true}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery("")}
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.micButton}
            onPress={handleVoiceSearch}
          >
            <Ionicons
              name={isListening ? "mic" : "mic-outline"}
              size={22}
              color={isListening ? COLORS.primaryAccent : COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Suggestions */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Try searching for</Text>
        <View style={styles.suggestionsContainer}>
          {["Hip Hop", "Rock", "Jazz", "Pop", "Electronic", "R&B"].map(
            (genre) => (
              <TouchableOpacity
                key={genre}
                style={styles.suggestionChip}
                onPress={() => {
                  setSearchQuery(genre);
                  handleSearch();
                }}
              >
                <Text style={styles.suggestionText}>{genre}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  backButton: { padding: SPACING.sm, marginRight: SPACING.sm },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    height: 40,
  },
  searchIcon: { marginRight: SPACING.sm },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontFamily: "InterRegular",
    fontSize: 16,
    padding: 0,
  },
  clearButton: { padding: SPACING.xs },
  micButton: { padding: SPACING.xs, marginLeft: SPACING.xs },
  content: { flex: 1, padding: SPACING.lg },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "InterBold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: SPACING.lg,
  },
  suggestionChip: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 20,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    margin: SPACING.xs,
  },
  suggestionText: {
    color: COLORS.textPrimary,
    fontFamily: "InterMedium",
    fontSize: 14,
  },
});
