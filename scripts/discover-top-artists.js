/**
 * Discover Top Global Artists
 * - Finds the world's most popular artists (The Weeknd, Justin Bieber, Taylor Swift, etc.)
 * - Uses Spotify API to fetch top artists by popularity and followers
 * - Focuses on artists with 80+ popularity scores
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const fetchFn = typeof fetch !== "undefined" ? fetch : require("node-fetch");

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.error("❌ Spotify API credentials not found");
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");

// Top artists we specifically want to find
const TOP_ARTISTS_TO_FIND = [
  "The Weeknd",
  "Justin Bieber",
  "Taylor Swift",
  "Lana Del Rey",
  "Backstreet Boys",
  "Cigarettes After Sex",
  "Drake",
  "Ed Sheeran",
  "Ariana Grande",
  "Billie Eilish",
  "Post Malone",
  "Dua Lipa",
  "The Beatles",
  "Queen",
  "Michael Jackson",
  "Madonna",
  "Beyoncé",
  "Rihanna",
  "Lady Gaga",
  "Bruno Mars",
  "Kendrick Lamar",
  "Travis Scott",
  "J. Cole",
  "Eminem",
  "Coldplay",
  "Imagine Dragons",
  "Maroon 5",
  "One Direction",
  "Harry Styles",
  "BTS",
  "Blackpink",
  "TWICE",
  "Red Velvet",
  "EXO",
  "NCT",
  "Stray Kids",
  "ATEEZ",
  "Seventeen",
  "Mamamoo",
  "IU",
  "Sunmi",
  "Taeyeon",
  "Taemin",
  "Kai",
  "Baekhyun",
  "D.O.",
  "Suho",
  "Xiumin",
  "Chen",
  "Lay",
  "Sehun",
  "Chanyeol",
  "DO",
  "Kai",
  "Baekhyun",
  "Suho",
  "Xiumin",
];

// Additional search terms for top artists
const TOP_ARTIST_SEARCH_TERMS = [
  "pop superstar",
  "global pop",
  "mainstream pop",
  "chart topper",
  "billion streams",
  "grammy winner",
  "billboard hot 100",
  "top 40",
  "mainstream music",
  "popular music",
  "viral artist",
  "trending artist",
  "famous singer",
  "celebrity artist",
  "music icon",
];

class TopArtistDiscovery {
  constructor(token) {
    this.token = token;
    this.discoveredArtists = new Map();
    this.stats = { totalArtists: 0, errors: 0 };
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
      throw new Error(`Failed to get token (${response.status})`);
    }

    const data = await response.json();
    return data.access_token;
  }

  async searchSpecificArtist(artistName) {
    try {
      const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        artistName
      )}&type=artist&limit=5`;
      const data = await this.makeSpotifyRequest(
        searchUrl,
        `search for ${artistName}`
      );

      if (!data || !data.artists || data.artists.items.length === 0) {
        return null;
      }

      // Find the best match
      const bestMatch =
        data.artists.items.find(
          (artist) =>
            artist.name.toLowerCase() === artistName.toLowerCase() ||
            artist.name.toLowerCase().includes(artistName.toLowerCase()) ||
            artistName.toLowerCase().includes(artist.name.toLowerCase())
        ) || data.artists.items[0];

      if (bestMatch && bestMatch.popularity >= 70) {
        return {
          id: bestMatch.id,
          name: bestMatch.name,
          image: bestMatch.images?.[0]?.url || null,
          followers: bestMatch.followers?.total || 0,
          spotifyId: bestMatch.id,
          spotifyPopularity: bestMatch.popularity,
          genres: bestMatch.genres || [],
          discoveryMethod: "specific_search",
        };
      }

      return null;
    } catch (error) {
      console.error(`  ❌ Error searching for ${artistName}:`, error.message);
      return null;
    }
  }

  async searchTopArtistsByPopularity() {
    console.log("🔍 Searching for top artists by popularity...");

    // Search by popularity ranges
    const popularityRanges = [
      { min: 95, max: 100, description: "Superstars (95-100)" },
      { min: 90, max: 94, description: "Global Stars (90-94)" },
      { min: 85, max: 89, description: "Major Stars (85-89)" },
      { min: 80, max: 84, description: "Popular Stars (80-84)" },
    ];

    for (const range of popularityRanges) {
      console.log(
        `  🎯 Searching for artists with popularity ${range.min}-${range.max}`
      );

      try {
        // Use multiple search terms to find top artists
        for (const searchTerm of TOP_ARTIST_SEARCH_TERMS.slice(0, 5)) {
          const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            searchTerm
          )}&type=artist&limit=50`;
          const data = await this.makeSpotifyRequest(
            searchUrl,
            `popularity search for ${searchTerm}`
          );

          if (!data || !data.artists || !data.artists.items) {
            continue;
          }

          let foundCount = 0;
          for (const artist of data.artists.items) {
            if (foundCount >= 20) break; // Limit per search term

            if (
              artist.popularity >= range.min &&
              artist.popularity <= range.max &&
              artist.followers?.total >= 1000000
            ) {
              // At least 1M followers

              const artistData = {
                id: artist.id,
                name: artist.name,
                image: artist.images?.[0]?.url || null,
                followers: artist.followers?.total || 0,
                spotifyId: artist.id,
                spotifyPopularity: artist.popularity,
                genres: artist.genres || [],
                discoveryMethod: "popularity_search",
              };

              this.discoveredArtists.set(artist.id, artistData);
              foundCount++;
            }
          }

          console.log(`    ✅ Found ${foundCount} artists for "${searchTerm}"`);

          // Rate limiting
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      } catch (error) {
        console.error(
          `  ❌ Error in popularity range ${range.min}-${range.max}:`,
          error.message
        );
      }
    }
  }

  async searchSpecificTopArtists() {
    console.log("🔍 Searching for specific top artists...");

    for (const artistName of TOP_ARTISTS_TO_FIND) {
      console.log(`  🎵 Searching for: ${artistName}`);

      const artist = await this.searchSpecificArtist(artistName);
      if (artist) {
        this.discoveredArtists.set(artist.spotifyId, artist);
        console.log(
          `    ✅ Found: ${artist.name} (${artist.spotifyPopularity} popularity)`
        );
      } else {
        console.log(`    ⚠️ Not found: ${artistName}`);
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  async runDiscovery() {
    console.log("🚀 Starting Top Global Artist Discovery...");

    // Method 1: Search for specific top artists
    await this.searchSpecificTopArtists();

    // Method 2: Search by popularity ranges
    await this.searchTopArtistsByPopularity();

    const artistsArray = Array.from(this.discoveredArtists.values());
    this.stats.totalArtists = artistsArray.length;

    console.log("\n🎉 Top Artist Discovery Complete!");
    console.log(`📊 Final Results:`);
    console.log(
      `   • Total top artists discovered: ${this.stats.totalArtists}`
    );
    console.log(`   • Errors encountered: ${this.stats.errors}`);

    return this.discoveredArtists;
  }

  writeOutputFiles() {
    const outputDir = path.join(ROOT, "constants");

    // Write top artists file
    const allArtists = Array.from(this.discoveredArtists.values()).map(
      (artist) => ({
        ...artist,
        likes: this.toKNotation(artist.followers),
        tier: this.calculateTier(artist.spotifyPopularity),
      })
    );

    const topArtistsPath = path.join(outputDir, "topGlobalArtists.json");
    fs.writeFileSync(
      topArtistsPath,
      JSON.stringify(allArtists, null, 2),
      "utf8"
    );
    console.log(
      `📝 Written: topGlobalArtists.json (${allArtists.length} top artists)`
    );

    return { outputDir, allArtists };
  }

  toKNotation(num) {
    if (!Number.isFinite(num)) return "0";
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${Math.floor(num / 1_000)}K`;
    return `${num}`;
  }

  calculateTier(popularity) {
    if (popularity >= 95) return "Superstar";
    if (popularity >= 90) return "Global Star";
    if (popularity >= 85) return "Major Star";
    if (popularity >= 80) return "Popular Star";
    return "Rising";
  }
}

async function main() {
  try {
    console.log("🎵 Top Global Artist Discovery Script");
    console.log("=".repeat(50));

    const discovery = new TopArtistDiscovery();
    discovery.token = await discovery.getSpotifyToken();
    console.log("✅ Got Spotify access token");

    const discoveredArtists = await discovery.runDiscovery();

    if (discoveredArtists.size === 0) {
      console.log("❌ No top artists discovered. Check your configuration.");
      return;
    }

    const outputFiles = discovery.writeOutputFiles();

    // Show summary by popularity
    console.log("\n🏆 Top Artists Discovered:");
    const artistsArray = Array.from(discoveredArtists.values());
    const sortedArtists = artistsArray.sort(
      (a, b) => b.spotifyPopularity - a.spotifyPopularity
    );

    sortedArtists.slice(0, 20).forEach((artist, index) => {
      const discovery = new TopArtistDiscovery();
      console.log(
        `  ${index + 1}. ${artist.name} - ${
          artist.spotifyPopularity
        } popularity (${discovery.toKNotation(artist.followers)} followers)`
      );
    });

    console.log("\n🎉 Top artist discovery script completed successfully!");
  } catch (error) {
    console.error("\n💥 Top artist discovery script failed:", error);
    process.exit(1);
  }
}

main();
