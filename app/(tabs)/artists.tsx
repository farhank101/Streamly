import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  allArtists,
  UnifiedArtist,
  getAllGenres,
  getArtistsByGenre,
} from "../../constants/allArtists";
import { COLORS, SPACING, SIZES, FONTS } from "../../constants/theme";

const { width } = Dimensions.get("window");

export default function ArtistsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"popularity" | "name" | "followers">(
    "popularity"
  );

  const genres = ["All", ...getAllGenres()];

  // Filter artists by genre and search
  const filteredArtists = allArtists
    .filter((artist: any) => {
      const matchesGenre =
        selectedGenre === "All" || artist.genre === selectedGenre;
      const matchesSearch = artist.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesGenre && matchesSearch;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "popularity":
          return (b.spotifyPopularity || 0) - (a.spotifyPopularity || 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "followers":
          const aFollowers =
            typeof a.followers === "string"
              ? parseFloat(a.followers.replace(/[^0-9.]/g, ""))
              : a.followers;
          const bFollowers =
            typeof b.followers === "string"
              ? parseFloat(b.followers.replace(/[^0-9.]/g, ""))
              : b.followers;
          return bFollowers - aFollowers;
        default:
          return 0;
      }
    });

  const renderArtist = ({ item }: { item: UnifiedArtist }) => (
    <TouchableOpacity style={styles.artistCard}>
      <Image
        source={
          item.image
            ? { uri: item.image }
            : require("../../assets/images/default-track.png")
        }
        style={styles.artistImage}
        resizeMode="cover"
      />
      <View style={styles.artistInfo}>
        <Text style={styles.artistName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.artistGenre} numberOfLines={1}>
          {item.genre} • {item.tier}
        </Text>
        <Text style={styles.artistFollowers}>
          {typeof item.followers === "string" && item.followers.includes("M")
            ? item.followers
            : `${item.likes} likes`}
        </Text>
        <View style={styles.popularityBar}>
          <View
            style={[
              styles.popularityFill,
              { width: `${item.spotifyPopularity || 50}%` },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const GenreButton = ({ genre }: { genre: string }) => (
    <TouchableOpacity
      style={[
        styles.genreButton,
        selectedGenre === genre && styles.genreButtonActive,
      ]}
      onPress={() => setSelectedGenre(genre)}
    >
      <Text
        style={[
          styles.genreButtonText,
          selectedGenre === genre && styles.genreButtonTextActive,
        ]}
      >
        {genre}
      </Text>
    </TouchableOpacity>
  );

  const SortButton = ({
    title,
    value,
  }: {
    title: string;
    value: typeof sortBy;
  }) => (
    <TouchableOpacity
      style={[styles.sortButton, sortBy === value && styles.sortButtonActive]}
      onPress={() => setSortBy(value)}
    >
      <Text
        style={[
          styles.sortButtonText,
          sortBy === value && styles.sortButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Artists</Text>
        <Text style={styles.subtitle}>{filteredArtists.length} artists</Text>
      </View>

      <View style={styles.genreContainer}>
        <FlatList
          data={genres}
          renderItem={({ item }) => <GenreButton genre={item} />}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreList}
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search artists..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.sortContainer}>
        <SortButton title="Popular" value="popularity" />
        <SortButton title="Name" value="name" />
        <SortButton title="Followers" value="followers" />
      </View>

      <FlatList
        data={filteredArtists as any}
        renderItem={renderArtist}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: FONTS.size.xl,
    fontFamily: FONTS.family.interBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.size.sm,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
  },
  genreContainer: {
    marginBottom: SPACING.md,
  },
  genreList: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  genreButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  genreButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genreButtonText: {
    fontSize: FONTS.size.sm,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textSecondary,
  },
  genreButtonTextActive: {
    color: COLORS.textPrimary,
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONTS.size.base,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  sortContainer: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  sortButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  sortButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sortButtonText: {
    fontSize: FONTS.size.sm,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.textSecondary,
  },
  sortButtonTextActive: {
    color: COLORS.textPrimary,
  },
  listContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  artistCard: {
    width: (width - SPACING.lg * 3) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  artistImage: {
    width: "100%",
    height: 120,
  },
  artistInfo: {
    padding: SPACING.sm,
  },
  artistName: {
    fontSize: FONTS.size.sm,
    fontFamily: FONTS.family.interSemiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  artistGenre: {
    fontSize: FONTS.size.xs,
    fontFamily: FONTS.family.interMedium,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  artistFollowers: {
    fontSize: FONTS.size.xs,
    fontFamily: FONTS.family.interRegular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  popularityBar: {
    height: 3,
    backgroundColor: COLORS.divider,
    borderRadius: 2,
    overflow: "hidden",
  },
  popularityFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});
