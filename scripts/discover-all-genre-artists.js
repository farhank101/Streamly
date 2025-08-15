/**
 * Discover Artists for All Music Genres
 * - Discovers artists for Rock, Pop, Country, Latin, K-POP, Metal, Jazz, etc.
 * - Uses Spotify API to fetch real artist data
 * - Creates comprehensive artist database for all genres
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Prefer global fetch (Node >=18); fall back to node-fetch v2 from package.json
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

// Define all major genres with their search terms
const GENRE_CONFIGS = {
  "Rock": {
    searchTerms: ["rock", "alternative rock", "classic rock", "hard rock"],
    maxArtists: 25,
    minPopularity: 30
  },
  "Pop": {
    searchTerms: ["pop", "pop music", "mainstream pop"],
    maxArtists: 30,
    minPopularity: 25
  },
  "Country": {
    searchTerms: ["country", "country music", "nashville"],
    maxArtists: 20,
    minPopularity: 30
  },
  "Latin": {
    searchTerms: ["latin", "latin pop", "reggaeton", "salsa"],
    maxArtists: 20,
    minPopularity: 30
  },
  "K-POP": {
    searchTerms: ["k-pop", "korean pop", "korean pop music"],
    maxArtists: 20,
    minPopularity: 25
  },
  "Metal": {
    searchTerms: ["metal", "heavy metal", "death metal", "black metal"],
    maxArtists: 20,
    minPopularity: 25
  },
  "Jazz": {
    searchTerms: ["jazz", "smooth jazz", "bebop", "fusion"],
    maxArtists: 15,
    minPopularity: 20
  },
  "Classical": {
    searchTerms: ["classical", "orchestral", "symphony"],
    maxArtists: 15,
    minPopularity: 20
  },
  "Blues": {
    searchTerms: ["blues", "blues rock", "delta blues"],
    maxArtists: 15,
    minPopularity: 20
  },
  "Folk": {
    searchTerms: ["folk", "folk music", "acoustic folk"],
    maxArtists: 15,
    minPopularity: 20
  },
  "Punk": {
    searchTerms: ["punk", "punk rock", "hardcore punk"],
    maxArtists: 15,
    minPopularity: 20
  },
  "Soul/Funk": {
    searchTerms: ["soul", "funk", "r&b", "motown"],
    maxArtists: 20,
    minPopularity: 25
  },
  "Reggae": {
    searchTerms: ["reggae", "dancehall", "ska"],
    maxArtists: 15,
    minPopularity: 20
  },
  "Indie": {
    searchTerms: ["indie", "indie rock", "alternative indie"],
    maxArtists: 20,
    minPopularity: 25
  }
};

class GenreArtistDiscovery {
  constructor(token) {
    this.token = token;
    this.discoveredArtists = new Map(); // genre -> artists array
    this.stats = {
      totalGenres: 0,
      totalArtists: 0,
      errors: 0
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
          await new Promise(resolve => setTimeout(resolve, 5000));
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

  async discoverArtistsForGenre(genre, config) {
    console.log(`🔍 Discovering artists for genre: ${genre}`);
    
    const artists = new Map(); // Use Map to avoid duplicates within genre
    
    for (const searchTerm of config.searchTerms) {
      try {
        // Search for artists in this genre
        const searchUrl = `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(searchTerm)}&type=artist&limit=50&offset=0`;
        const data = await this.makeSpotifyRequest(searchUrl, `genre search for ${searchTerm}`);
        
        if (!data || !data.artists || !data.artists.items) {
          console.log(`  ⚠️ No results for search term: ${searchTerm}`);
          continue;
        }

        let artistCount = 0;
        for (const artist of data.artists.items) {
          if (artistCount >= config.maxArtists) break;
          
          // Check if artist meets our criteria
          if (artist.popularity >= config.minPopularity && this.isGenreArtist(artist.genres, genre)) {
            const artistData = {
              id: artist.id,
              name: artist.name,
              image: artist.images?.[0]?.url || null,
              followers: artist.followers?.total || 0,
              spotifyId: artist.id,
              spotifyPopularity: artist.popularity,
              genres: artist.genres || [],
              primaryGenre: this.getPrimaryGenre(artist.genres, genre),
              country: null,
              discoveryMethod: 'genre_search'
            };
            
            artists.set(artist.id, artistData);
            artistCount++;
          }
        }
        
        console.log(`  ✅ Found ${artistCount} artists for search term: ${searchTerm}`);
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.error(`  ❌ Error searching for ${searchTerm}:`, error.message);
      }
    }
    
    const artistsArray = Array.from(artists.values());
    console.log(`🎯 Total unique artists for ${genre}: ${artistsArray.length}`);
    
    return artistsArray;
  }

  isGenreArtist(genres, targetGenre) {
    if (!genres || genres.length === 0) return false;
    
    const genreKeywords = {
      "Rock": ["rock", "alternative", "hard rock", "classic rock"],
      "Pop": ["pop", "mainstream"],
      "Country": ["country", "nashville"],
      "Latin": ["latin", "reggaeton", "salsa", "bossa nova"],
      "K-POP": ["k-pop", "korean pop"],
      "Metal": ["metal", "heavy metal", "death metal", "black metal"],
      "Jazz": ["jazz", "bebop", "fusion", "smooth jazz"],
      "Classical": ["classical", "orchestral", "symphony"],
      "Blues": ["blues", "blues rock", "delta blues"],
      "Folk": ["folk", "acoustic"],
      "Punk": ["punk", "hardcore"],
      "Soul/Funk": ["soul", "funk", "r&b", "motown"],
      "Reggae": ["reggae", "dancehall", "ska"],
      "Indie": ["indie", "alternative"]
    };
    
    const keywords = genreKeywords[targetGenre] || [];
    return genres.some(genre => 
      keywords.some(keyword => 
        genre.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }

  getPrimaryGenre(genres, fallbackGenre) {
    if (!genres || genres.length === 0) return fallbackGenre;
    
    // Return the first genre that matches our target, or the fallback
    return genres[0] || fallbackGenre;
  }

  async runDiscovery() {
    console.log("🚀 Starting Multi-Genre Artist Discovery...");
    console.log(`📊 Target: ${Object.keys(GENRE_CONFIGS).length} genres`);
    
    for (const [genre, config] of Object.entries(GENRE_CONFIGS)) {
      console.log(`\n🎵 Processing genre: ${genre}`);
      
      const artists = await this.discoverArtistsForGenre(genre, config);
      this.discoveredArtists.set(genre, artists);
      this.stats.totalGenres++;
      this.stats.totalArtists += artists.length;
      
      // Rate limiting between genres
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log("\n🎉 Discovery Complete!");
    console.log(`📊 Final Results:`);
    console.log(`   • Genres processed: ${this.stats.totalGenres}`);
    console.log(`   • Total artists discovered: ${this.stats.totalArtists}`);
    console.log(`   • Errors encountered: ${this.stats.errors}`);
    
    return this.discoveredArtists;
  }

  writeOutputFiles() {
    const outputDir = path.join(ROOT, "constants");
    
    // Write individual genre files
    for (const [genre, artists] of this.discoveredArtists) {
      const fileName = `${genre.toLowerCase().replace(/[^a-z0-9]/g, '_')}Artists.json`;
      const filePath = path.join(outputDir, fileName);
      
      fs.writeFileSync(filePath, JSON.stringify(artists, null, 2), "utf8");
      console.log(`📝 Written: ${fileName} (${artists.length} artists)`);
    }
    
    // Write combined file
    const allArtists = [];
    for (const [genre, artists] of this.discoveredArtists) {
      artists.forEach(artist => {
        allArtists.push({
          ...artist,
          genre: genre,
          likes: this.toKNotation(artist.followers),
          tier: this.calculateTier(artist.spotifyPopularity)
        });
      });
    }
    
    const combinedPath = path.join(outputDir, "allGenreArtists.json");
    fs.writeFileSync(combinedPath, JSON.stringify(allArtists, null, 2), "utf8");
    console.log(`📝 Written: allGenreArtists.json (${allArtists.length} total artists)`);
    
    return { outputDir, allArtists };
  }

  toKNotation(num) {
    if (!Number.isFinite(num)) return "0";
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${Math.floor(num / 1_000)}K`;
    return `${num}`;
  }

  calculateTier(popularity) {
    if (popularity >= 80) return "Top";
    if (popularity >= 60) return "Major";
    if (popularity >= 40) return "Established";
    return "Rising";
  }
}

async function main() {
  try {
    console.log("🎵 Multi-Genre Artist Discovery Script");
    console.log("=" .repeat(50));
    
    // Get Spotify token
    const discovery = new GenreArtistDiscovery();
    discovery.token = await discovery.getSpotifyToken();
    console.log("✅ Got Spotify access token");
    
    // Run the discovery process
    const discoveredArtists = await discovery.runDiscovery();
    
    if (discoveredArtists.size === 0) {
      console.log("❌ No artists discovered. Check your configuration.");
      return;
    }
    
    // Write output files
    const outputFiles = discovery.writeOutputFiles();
    
    // Show summary by genre
    console.log("\n🏆 Artists by Genre:");
    for (const [genre, artists] of discoveredArtists) {
      const topArtists = artists
        .filter(a => a.spotifyPopularity >= 70)
        .slice(0, 3);
      
      console.log(`\n${genre}:`);
      topArtists.forEach((artist, index) => {
        console.log(`  ${index + 1}. ${artist.name} - ${artist.spotifyPopularity} popularity`);
      });
    }
    
    console.log("\n🎉 Multi-genre discovery script completed successfully!");
    
  } catch (error) {
    console.error("\n💥 Discovery script failed:", error);
    process.exit(1);
  }
}

main();
