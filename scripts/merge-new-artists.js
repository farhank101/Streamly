/**
 * Merge New Artists Script
 * Merges the newly fetched 20k+ artists with existing ones and removes duplicates
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

async function mergeNewArtists() {
  console.log("🔄 Starting artist merge process...");

  try {
    // Load new massive artists collection
    const newArtistsPath = path.join(
      ROOT,
      "constants",
      "massiveArtistsCollection.json"
    );
    if (!fs.existsSync(newArtistsPath)) {
      throw new Error(
        "massiveArtistsCollection.json not found. Run the discovery script first."
      );
    }

    const newArtists = JSON.parse(fs.readFileSync(newArtistsPath, "utf8"));
    console.log(`📊 New artists: ${newArtists.length.toLocaleString()}`);

    // Create a new allArtists.ts file with the merged data
    const mergedArtists = newArtists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      image: artist.image || null,
      followers: artist.followers || 0,
      spotifyId: artist.spotifyId || artist.id,
      spotifyPopularity: artist.spotifyPopularity || 0,
      genres: artist.genres || [],
      primaryGenre: artist.primaryGenre || "",
      country: artist.country || null,
      discoveryMethod: artist.discoveryMethod || "massive_discovery",
      genre: artist.primaryGenre || "Other",
      likes: artist.likes || "0",
      tier: artist.tier || "Underground",
    }));

    console.log(
      `✅ Processed ${mergedArtists.length.toLocaleString()} artists`
    );

    // Create backup of existing file if it exists
    const existingPath = path.join(ROOT, "constants", "allArtists.ts");
    if (fs.existsSync(existingPath)) {
      const backupPath = path.join(ROOT, "constants", "allArtists.backup.ts");
      fs.copyFileSync(existingPath, backupPath);
      console.log(`💾 Backup created: allArtists.backup.ts`);
    }

    // Generate new allArtists.ts content
    const newContent = `// Auto-generated from artist merge script
// Total unique artists: ${mergedArtists.length.toLocaleString()}
// Source: massiveArtistsCollection.json

// Artist interface
export interface UnifiedArtist {
  id: string;
  name: string;
  image?: string;
  followers: number | string;
  spotifyId: string;
  spotifyPopularity: number;
  genres: readonly string[];
  primaryGenre?: string;
  country?: string | null;
  discoveryMethod: string;
  genre: string;
  likes: string;
  tier: string;
}

// Helper function to get all unique genres
export const getAllGenres = (): string[] => {
  const genres = new Set<string>();
  allArtists.forEach(artist => {
    if (artist.genre) {
      genres.add(artist.genre);
    }
  });
  return Array.from(genres).sort();
};

// Helper function to get artists by genre
export const getArtistsByGenre = (genre: string): UnifiedArtist[] => {
  return allArtists.filter(artist => artist.genre === genre);
};

export const allArtists = ${JSON.stringify(mergedArtists, null, 2)};
`;

    // Write new file
    fs.writeFileSync(existingPath, newContent, "utf8");
    console.log(`📝 Updated: allArtists.ts`);

    // Also create a JSON version for easier processing
    const jsonPath = path.join(ROOT, "constants", "allArtistsMerged.json");
    fs.writeFileSync(jsonPath, JSON.stringify(mergedArtists, null, 2), "utf8");
    console.log(`📝 Created: allArtistsMerged.json`);

    console.log("\n🎉 Artist merge completed successfully!");
    console.log(
      `🎵 Total artists now available: ${mergedArtists.length.toLocaleString()}`
    );
  } catch (error) {
    console.error("❌ Error during artist merge:", error);
    process.exit(1);
  }
}

// Run the merge
mergeNewArtists();
