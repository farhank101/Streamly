/**
 * Spotify EDM Artist Discovery Script
 * - Discovers EDM artists automatically using multiple methods
 * - Searches by genres, playlists, and related artists
 * - Builds a comprehensive database of EDM artists
 * - Fetches real Spotify data (images, popularity, followers)
 *
 * Usage:
 *   EXPO_PUBLIC_SPOTIFY_CLIENT_ID=xxx EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=yyy node scripts/discover-edm-artists.js
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Prefer global fetch (Node >=18); fall back to node-fetch v2 from package.json
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetchFn = typeof fetch !== "undefined" ? fetch : require("node-fetch");

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.error(
    "❌ Spotify API credentials not found. Set EXPO_PUBLIC_SPOTIFY_CLIENT_ID and EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET"
  );
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");

// EDM-related genres and search terms
const EDM_GENRES = [
  "edm",
  "electronic",
  "house",
  "techno",
  "trance",
  "dubstep",
  "future-bass",
  "progressive-house",
  "deep-house",
  "tech-house",
  "minimal",
  "hardstyle",
  "drum-and-bass",
  "drumstep",
  "idm",
  "ambient",
  "chillout",
  "electro",
  "big-room",
  "tropical-house",
  "melodic-house",
  "acid-house",
  "breakbeat",
  "garage",
  "jungle",
  "liquid-dnb",
  "neurofunk",
  "psytrance",
  "goa-trance",
  "uplifting-trance",
  "vocal-trance",
  "progressive-trance",
];

// Popular EDM playlists to analyze
const EDM_PLAYLISTS = [
  "37i9dQZF1DX8NTLI2TtZa6", // Electronic Beats
  "37i9dQZF1DX5Vy6DFOcx00", // Dance Party
  "37i9dQZF1DXcBWIGoYBM5M", // Today's Top Hits
  "37i9dQZF1DX4WYpdgoIcn6", // Chart Toppers
];

// Seed artists to start discovery from
const SEED_ARTISTS = [
  "4tZwfgrHOc3mvqYlEYSvVi", // Daft Punk
  "1vCWHaC5f2uS3y19w5Kk7y", // Avicii
  "7CajNmpbOovFoOoasH2HaY", // Calvin Harris
  "60d24wfXkVzDSfLS6hyCjZ", // Martin Garrix
  "1Cs0zKBU1kc0i8ypK3B9ai", // David Guetta
];

// Artist discovery settings
const DISCOVERY_CONFIG = {
  maxArtistsPerGenre: 30, // Max artists to find per genre
  maxArtistsPerPlaylist: 20, // Max artists to find per playlist
  maxRelatedArtists: 15, // Max related artists per seed artist
  minPopularity: 25, // Minimum popularity score (0-100)
  maxTotalArtists: 300, // Maximum total artists to discover
  rateLimitDelay: 100, // Delay between API calls (ms)
};

class EDMArtistDiscovery {
  constructor(token) {
    this.token = token;
    this.discoveredArtists = new Map(); // Use Map to avoid duplicates
    this.stats = {
      genres: 0,
      playlists: 0,
      related: 0,
      total: 0,
      errors: 0,
    };
  }

  async makeSpotifyRequest(url, description = "API request") {
    try {
      const response = await fetchFn(url, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      if (!response.ok) {
        if (response.status === 429) {
          console.log(`⏳ Rate limited, waiting 5 seconds...`);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          return this.makeSpotifyRequest(url, description);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ Error in ${description}:`, error.message);
      this.stats.errors++;
      return null;
    }
  }

  async getSpotifyToken() {
    const response = await fetchFn("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
            "base64"
          ),
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Failed to get token (${response.status}): ${text}`);
    }

    const data = await response.json();
    if (!data.access_token) {
      throw new Error("No access_token in Spotify response");
    }

    return data.access_token;
  }

  async discoverArtistsByGenre(genre) {
    console.log(`🔍 Discovering artists for genre: ${genre}`);

    try {
      // Search for artists in this genre
      const searchUrl = `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(
        genre
      )}&type=artist&limit=50&offset=0`;
      const data = await this.makeSpotifyRequest(
        searchUrl,
        `genre search for ${genre}`
      );

      if (!data || !data.artists || !data.artists.items) {
        console.log(`⚠️ No results for genre: ${genre}`);
        return;
      }

      let artistCount = 0;
      for (const artist of data.artists.items) {
        if (artistCount >= DISCOVERY_CONFIG.maxArtistsPerGenre) break;

        // Check if artist meets our criteria AND is actually an EDM artist
        if (artist.popularity >= DISCOVERY_CONFIG.minPopularity && this.isEDMArtist(artist.genres)) {
          const artistData = {
            id: artist.id,
            name: artist.name,
            image: artist.images?.[0]?.url || null,
            followers: artist.followers?.total || 0,
            spotifyId: artist.id,
            spotifyPopularity: artist.popularity,
            genres: artist.genres || [],
            primaryGenre: this.getPrimaryGenre(artist.genres), // Use actual artist genre, not search genre
            country: null,
            discoveryMethod: 'genre_search'
          };
          
          this.discoveredArtists.set(artist.id, artistData);
          artistCount++;
          
          // Log the discovery for debugging
          console.log(`  ✅ ${artist.name} - ${artistData.primaryGenre} (${artist.popularity})`);
        } else if (artist.popularity >= DISCOVERY_CONFIG.minPopularity) {
          // Log why artist was rejected
          console.log(`  ❌ ${artist.name} - Rejected: genres [${artist.genres.join(', ')}] don't match EDM criteria`);
        }
      }

      console.log(`✅ Found ${artistCount} EDM artists for genre: ${genre}`);
      this.stats.genres += artistCount;
    } catch (error) {
      console.error(`❌ Error discovering genre ${genre}:`, error.message);
    }
  }

  async discoverArtistsFromPlaylist(playlistId) {
    console.log(`🎵 Discovering artists from playlist: ${playlistId}`);

    try {
      // Get playlist tracks
      const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100&offset=0`;
      const data = await this.makeSpotifyRequest(
        playlistUrl,
        `playlist tracks for ${playlistId}`
      );

      if (!data || !data.items) {
        console.log(`⚠️ No tracks found in playlist: ${playlistId}`);
        return;
      }

      const artistIds = new Set();

      // Extract unique artist IDs from tracks
      for (const item of data.items) {
        if (item.track && item.track.artists) {
          for (const artist of item.track.artists) {
            artistIds.add(artist.id);
          }
        }
      }

      // Get detailed artist information
      let artistCount = 0;
      const artistIdArray = Array.from(artistIds);

      for (
        let i = 0;
        i <
        Math.min(artistIdArray.length, DISCOVERY_CONFIG.maxArtistsPerPlaylist);
        i++
      ) {
        const artistId = artistIdArray[i];

        // Skip if we already have this artist
        if (this.discoveredArtists.has(artistId)) continue;

        const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
        const artistData = await this.makeSpotifyRequest(
          artistUrl,
          `artist details for ${artistId}`
        );

        if (
          artistData &&
          artistData.popularity >= DISCOVERY_CONFIG.minPopularity
        ) {
          // Check if this is an EDM artist
          if (this.isEDMArtist(artistData.genres)) {
            const artist = {
              id: artistData.id,
              name: artistData.name,
              image: artistData.images?.[0]?.url || null,
              followers: artistData.followers?.total || 0,
              spotifyId: artistData.id,
              spotifyPopularity: artistData.popularity,
              genres: artistData.genres || [],
              primaryGenre: this.getPrimaryGenre(artistData.genres), // Use actual artist genre
              country: null,
              discoveryMethod: "playlist_analysis",
            };

            this.discoveredArtists.set(artistId, artist);
            artistCount++;
          }
        }

        // Rate limiting
        await new Promise((resolve) =>
          setTimeout(resolve, DISCOVERY_CONFIG.rateLimitDelay)
        );
      }

      console.log(`✅ Found ${artistCount} EDM artists from playlist`);
      this.stats.playlists += artistCount;
    } catch (error) {
      console.error(
        `❌ Error discovering from playlist ${playlistId}:`,
        error.message
      );
    }
  }

  async discoverRelatedArtists(seedArtistId) {
    console.log(`🔗 Discovering related artists for: ${seedArtistId}`);

    try {
      const relatedUrl = `https://api.spotify.com/v1/artists/${seedArtistId}/related-artists`;
      const data = await this.makeSpotifyRequest(
        relatedUrl,
        `related artists for ${seedArtistId}`
      );

      if (!data || !data.artists) {
        console.log(`⚠️ No related artists found for: ${seedArtistId}`);
        return;
      }

      let artistCount = 0;
      for (const artist of data.artists) {
        if (artistCount >= DISCOVERY_CONFIG.maxRelatedArtists) break;

        // Skip if we already have this artist
        if (this.discoveredArtists.has(artist.id)) continue;

        // Check if this is an EDM artist
        if (this.isEDMArtist(artist.genres)) {
          const artistData = {
            id: artist.id,
            name: artist.name,
            image: artist.images?.[0]?.url || null,
            followers: artist.followers?.total || 0,
            spotifyId: artist.id,
            spotifyPopularity: artist.popularity,
            genres: artist.genres || [],
            primaryGenre: this.getPrimaryGenre(artist.genres), // Use actual artist genre
            country: null,
            discoveryMethod: "related_artist",
          };

          this.discoveredArtists.set(artist.id, artistData);
          artistCount++;
        }
      }

      console.log(`✅ Found ${artistCount} related EDM artists`);
      this.stats.related += artistCount;
    } catch (error) {
      console.error(
        `❌ Error discovering related artists for ${seedArtistId}:`,
        error.message
      );
    }
  }

  async runDiscovery() {
    console.log("🚀 Starting EDM Artist Discovery...");
    console.log(`📊 Target: Up to ${DISCOVERY_CONFIG.maxTotalArtists} artists`);
    console.log(`🎯 Min popularity: ${DISCOVERY_CONFIG.minPopularity}/100`);

    // Method 1: Discover by genres
    console.log("\n🎵 Method 1: Genre-based discovery");
    for (const genre of EDM_GENRES) {
      if (this.discoveredArtists.size >= DISCOVERY_CONFIG.maxTotalArtists)
        break;
      await this.discoverArtistsByGenre(genre);
      await new Promise((resolve) =>
        setTimeout(resolve, DISCOVERY_CONFIG.rateLimitDelay)
      );
    }

    // Method 2: Discover from playlists
    console.log("\n📋 Method 2: Playlist-based discovery");
    for (const playlistId of EDM_PLAYLISTS) {
      if (this.discoveredArtists.size >= DISCOVERY_CONFIG.maxTotalArtists)
        break;
      await this.discoverArtistsFromPlaylist(playlistId);
      await new Promise((resolve) =>
        setTimeout(resolve, DISCOVERY_CONFIG.rateLimitDelay)
      );
    }

    // Method 3: Discover related artists
    console.log("\n🔗 Method 3: Related artist discovery");
    for (const seedArtistId of SEED_ARTISTS) {
      if (this.discoveredArtists.size >= DISCOVERY_CONFIG.maxTotalArtists)
        break;
      await this.discoverRelatedArtists(seedArtistId);
      await new Promise((resolve) =>
        setTimeout(resolve, DISCOVERY_CONFIG.rateLimitDelay)
      );
    }

    // Convert Map to array and add additional fields
    const artistsArray = Array.from(this.discoveredArtists.values()).map(
      (artist) => ({
        ...artist,
        likes: this.toKNotation(artist.followers),
        subgenre: artist.primaryGenre,
        activeYears: this.estimateActiveYears(
          artist.spotifyPopularity,
          artist.followers
        ),
      })
    );

    // Sort by popularity
    artistsArray.sort(
      (a, b) => (b.spotifyPopularity || 0) - (a.spotifyPopularity || 0)
    );

    this.stats.total = artistsArray.length;

    console.log("\n🎉 Discovery Complete!");
    console.log(`📊 Final Results:`);
    console.log(`   • Genre discovery: ${this.stats.genres} artists`);
    console.log(`   • Playlist analysis: ${this.stats.playlists} artists`);
    console.log(`   • Related artists: ${this.stats.related} artists`);
    console.log(`   • Total unique artists: ${this.stats.total}`);
    console.log(`   • Errors encountered: ${this.stats.errors}`);

    return artistsArray;
  }

  isEDMArtist(genres) {
    if (!genres || genres.length === 0) return false;

    const edmKeywords = [
      "edm",
      "electronic",
      "dance",
      "house",
      "techno",
      "trance",
      "dubstep",
      "future-bass",
      "progressive",
      "deep-house",
      "tech-house",
      "minimal",
      "hardstyle",
      "drum-and-bass",
      "drumstep",
      "idm",
      "ambient",
      "chillout",
      "electro",
      "big-room",
      "tropical",
      "melodic",
      "acid",
      "breakbeat",
      "garage",
      "jungle",
      "liquid",
      "neurofunk",
      "psytrance",
      "goa",
    ];

    // Exclude non-EDM genres that might be misclassified
    const nonEDMKeywords = [
      "rap",
      "hip-hop",
      "trap",
      "r&b",
      "soul",
      "funk",
      "rock",
      "metal",
      "punk",
      "indie",
      "folk",
      "country",
      "jazz",
      "blues",
      "classical",
      "reggae",
      "latin",
      "k-pop",
      "j-pop",
      "pop",
      "art pop",
    ];

    // Check if any non-EDM genres are present (exclude these artists)
    const hasNonEDMGenre = genres.some((genre) =>
      nonEDMKeywords.some((keyword) =>
        genre.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    if (hasNonEDMGenre) return false;

    // Check if any EDM genres are present
    return genres.some((genre) =>
      edmKeywords.some((keyword) =>
        genre.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }

  getPrimaryGenre(genres) {
    if (!genres || genres.length === 0) return "electronic";

    const priorityGenres = [
      "techno",
      "house",
      "trance",
      "dubstep",
      "future-bass",
      "progressive-house",
      "deep-house",
      "tech-house",
      "minimal",
      "hardstyle",
      "drum-and-bass",
      "idm",
      "ambient",
      "electro",
      "big-room",
      "tropical-house",
      "edm",
      "electronic",
      "dance",
    ];

    // Find the highest priority genre
    for (const priority of priorityGenres) {
      const found = genres.find((genre) =>
        genre.toLowerCase().includes(priority.toLowerCase())
      );
      if (found) return found;
    }

    // If no priority genre found, return the first genre that's not empty
    const firstValidGenre = genres.find(
      (genre) => genre && genre.trim() !== ""
    );
    return firstValidGenre || "electronic";
  }

  toKNotation(num) {
    if (!Number.isFinite(num)) return "0";
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${Math.floor(num / 1_000)}K`;
    return `${num}`;
  }

  estimateActiveYears(popularity, followers) {
    if (popularity >= 80 && followers >= 10000000) return "2000-present";
    if (popularity >= 70 && followers >= 5000000) return "2005-present";
    if (popularity >= 60 && followers >= 2000000) return "2010-present";
    if (popularity >= 50 && followers >= 1000000) return "2015-present";
    return "2020-present";
  }

  writeOutputFiles(artists) {
    // Write JSON file
    const jsonPath = path.join(ROOT, "constants/discoveredEDMArtists.json");
    fs.writeFileSync(jsonPath, JSON.stringify(artists, null, 2), "utf8");
    console.log(`📝 JSON file written: ${jsonPath}`);

    // Write TypeScript file
    const tsPath = path.join(ROOT, "constants/discoveredEDMArtists.ts");
    const tsContent = `/**
 * Discovered EDM Artists
 * Auto-generated by Spotify discovery script
 * Generated on: ${new Date().toISOString()}
 */

export interface DiscoveredEDMArtist {
  id: string;
  name: string;
  image: string | null;
  likes: string;
  followers: number;
  spotifyId: string;
  spotifyPopularity: number;
  genres: string[];
  primaryGenre: string;
  country: string | null;
  discoveryMethod: string;
  subgenre: string;
  activeYears: string;
}

export const discoveredEDMArtists: DiscoveredEDMArtist[] = ${JSON.stringify(
      artists,
      null,
      2
    )};

export default discoveredEDMArtists;
`;

    fs.writeFileSync(tsPath, tsContent, "utf8");
    console.log(`📝 TypeScript file written: ${tsPath}`);

    return { jsonPath, tsPath };
  }
}

async function main() {
  try {
    console.log("🎵 Spotify EDM Artist Discovery Script");
    console.log("=".repeat(50));

    // Get Spotify token
    const discovery = new EDMArtistDiscovery();
    discovery.token = await discovery.getSpotifyToken();
    console.log("✅ Got Spotify access token");

    // Run the discovery process
    const discoveredArtists = await discovery.runDiscovery();

    if (discoveredArtists.length === 0) {
      console.log("❌ No artists discovered. Check your configuration.");
      return;
    }

    // Write output files
    const outputFiles = discovery.writeOutputFiles(discoveredArtists);

    // Show top discoveries
    const topArtists = discoveredArtists
      .filter((a) => a.spotifyPopularity >= 60)
      .slice(0, 10);

    if (topArtists.length > 0) {
      console.log("\n🏆 Top 10 Discovered Artists:");
      topArtists.forEach((artist, index) => {
        console.log(
          `  ${index + 1}. ${artist.name} - ${artist.primaryGenre} (${
            artist.spotifyPopularity
          })`
        );
      });
    }

    console.log("\n🎉 Discovery script completed successfully!");
    console.log(`📁 Output files:`);
    console.log(`   • JSON: ${outputFiles.jsonPath}`);
    console.log(`   • TypeScript: ${outputFiles.tsPath}`);
  } catch (error) {
    console.error("\n💥 Discovery script failed:", error);
    process.exit(1);
  }
}

main();
