/**
 * Discover More Artists - Enhanced Discovery Script
 * - Finds more artists for existing genres (increased limits)
 * - Uses multiple discovery methods
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

// Enhanced genre configurations with higher limits
const ENHANCED_GENRE_CONFIGS = {
  "Rock": {
    searchTerms: ["rock", "alternative rock", "classic rock", "hard rock", "progressive rock"],
    maxArtists: 60,
    minPopularity: 20
  },
  "Pop": {
    searchTerms: ["pop", "pop music", "mainstream pop", "synthpop", "electropop"],
    maxArtists: 80,
    minPopularity: 15
  },
  "Country": {
    searchTerms: ["country", "country music", "nashville", "outlaw country", "country rock"],
    maxArtists: 60,
    minPopularity: 20
  },
  "Latin": {
    searchTerms: ["latin", "latin pop", "reggaeton", "salsa", "bossa nova", "merengue"],
    maxArtists: 60,
    minPopularity: 20
  },
  "Metal": {
    searchTerms: ["metal", "heavy metal", "death metal", "black metal", "thrash metal"],
    maxArtists: 50,
    minPopularity: 15
  },
  "Jazz": {
    searchTerms: ["jazz", "smooth jazz", "bebop", "fusion", "acid jazz", "latin jazz"],
    maxArtists: 40,
    minPopularity: 10
  },
  "Classical": {
    searchTerms: ["classical", "orchestral", "symphony", "chamber music", "opera"],
    maxArtists: 40,
    minPopularity: 10
  },
  "Blues": {
    searchTerms: ["blues", "blues rock", "delta blues", "chicago blues", "texas blues"],
    maxArtists: 40,
    minPopularity: 10
  },
  "Folk": {
    searchTerms: ["folk", "folk music", "acoustic folk", "celtic folk", "americana"],
    maxArtists: 40,
    minPopularity: 10
  },
  "Punk": {
    searchTerms: ["punk", "punk rock", "hardcore punk", "pop punk", "post punk"],
    maxArtists: 40,
    minPopularity: 10
  },
  "Soul/Funk": {
    searchTerms: ["soul", "funk", "r&b", "motown", "neo soul", "disco"],
    maxArtists: 50,
    minPopularity: 15
  },
  "Reggae": {
    searchTerms: ["reggae", "dancehall", "ska", "roots reggae", "lovers rock"],
    maxArtists: 40,
    minPopularity: 10
  },
  "Indie": {
    searchTerms: ["indie", "indie rock", "alternative indie", "indie pop", "indie folk"],
    maxArtists: 50,
    minPopularity: 15
  },
  
  // New genres to discover
  "World": {
    searchTerms: ["world music", "african music", "middle eastern", "indian classical", "flamenco"],
    maxArtists: 30,
    minPopularity: 10
  },
  "Electronic": {
    searchTerms: ["electronic", "ambient", "techno", "house", "trance", "drum and bass"],
    maxArtists: 50,
    minPopularity: 15
  },
  "Alternative": {
    searchTerms: ["alternative", "alternative rock", "grunge", "post grunge", "nu metal"],
    maxArtists: 50,
    minPopularity: 15
  },
  "Instrumental": {
    searchTerms: ["instrumental", "post rock", "math rock", "experimental", "avant garde"],
    maxArtists: 30,
    minPopularity: 10
  }
};

class EnhancedArtistDiscovery {
  constructor(token) {
    this.token = token;
    this.discoveredArtists = new Map();
    this.stats = { totalGenres: 0, totalArtists: 0, errors: 0 };
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
        Authorization: "Basic " + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get token (${response.status})`);
    }
    
    const data = await response.json();
    return data.access_token;
  }

  async discoverArtistsForGenre(genre, config) {
    console.log(`🔍 Discovering artists for genre: ${genre}`);
    
    const artists = new Map();
    
    for (const searchTerm of config.searchTerms) {
      try {
        const searchUrl = `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(searchTerm)}&type=artist&limit=50&offset=0`;
        const data = await this.makeSpotifyRequest(searchUrl, `genre search for ${searchTerm}`);
        
        if (!data || !data.artists || !data.artists.items) {
          console.log(`  ⚠️ No results for search term: ${searchTerm}`);
          continue;
        }

        let artistCount = 0;
        for (const artist of data.artists.items) {
          if (artistCount >= config.maxArtists) break;
          
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
              discoveryMethod: 'enhanced_search'
            };
            
            artists.set(artist.id, artistData);
            artistCount++;
          }
        }
        
        console.log(`  ✅ Found ${artistCount} artists for search term: ${searchTerm}`);
        
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
      "Rock": ["rock", "alternative", "hard rock", "classic rock", "progressive"],
      "Pop": ["pop", "mainstream", "synthpop", "electropop"],
      "Country": ["country", "nashville", "outlaw", "bluegrass"],
      "Latin": ["latin", "reggaeton", "salsa", "bossa nova", "merengue"],
      "Metal": ["metal", "heavy metal", "death metal", "black metal", "thrash"],
      "Jazz": ["jazz", "bebop", "fusion", "smooth jazz", "acid jazz"],
      "Classical": ["classical", "orchestral", "symphony", "chamber", "opera"],
      "Blues": ["blues", "blues rock", "delta blues", "chicago blues"],
      "Folk": ["folk", "acoustic folk", "celtic folk", "americana"],
      "Punk": ["punk", "hardcore punk", "pop punk", "post punk"],
      "Soul/Funk": ["soul", "funk", "r&b", "motown", "neo soul"],
      "Reggae": ["reggae", "dancehall", "ska", "roots reggae"],
      "Indie": ["indie", "alternative indie", "indie pop", "indie folk"],
      "World": ["world music", "african", "middle eastern", "indian classical"],
      "Electronic": ["electronic", "ambient", "techno", "house", "trance"],
      "Alternative": ["alternative", "grunge", "post grunge", "nu metal"],
      "Instrumental": ["instrumental", "post rock", "math rock", "experimental"]
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
    return genres[0] || fallbackGenre;
  }

  async runDiscovery() {
    console.log("🚀 Starting Enhanced Multi-Genre Artist Discovery...");
    console.log(`📊 Target: ${Object.keys(ENHANCED_GENRE_CONFIGS).length} genres`);
    
    for (const [genre, config] of Object.entries(ENHANCED_GENRE_CONFIGS)) {
      console.log(`\n🎵 Processing genre: ${genre}`);
      
      const artists = await this.discoverArtistsForGenre(genre, config);
      this.discoveredArtists.set(genre, artists);
      this.stats.totalGenres++;
      this.stats.totalArtists += artists.length;
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log("\n🎉 Enhanced Discovery Complete!");
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
      const fileName = `${genre.toLowerCase().replace(/[^a-z0-9]/g, '_')}ArtistsEnhanced.json`;
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
    
    const combinedPath = path.join(outputDir, "allEnhancedGenreArtists.json");
    fs.writeFileSync(combinedPath, JSON.stringify(allArtists, null, 2), "utf8");
    console.log(`📝 Written: allEnhancedGenreArtists.json (${allArtists.length} total artists)`);
    
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
    console.log("🎵 Enhanced Multi-Genre Artist Discovery Script");
    console.log("=" .repeat(50));
    
    const discovery = new EnhancedArtistDiscovery();
    discovery.token = await discovery.getSpotifyToken();
    console.log("✅ Got Spotify access token");
    
    const discoveredArtists = await discovery.runDiscovery();
    
    if (discoveredArtists.size === 0) {
      console.log("❌ No artists discovered. Check your configuration.");
      return;
    }
    
    const outputFiles = discovery.writeOutputFiles();
    
    console.log("\n🏆 Artists by Genre:");
    for (const [genre, artists] of discoveredArtists) {
      const topArtists = artists.filter(a => a.spotifyPopularity >= 70).slice(0, 3);
      
      console.log(`\n${genre}:`);
      topArtists.forEach((artist, index) => {
        console.log(`  ${index + 1}. ${artist.name} - ${artist.spotifyPopularity} popularity`);
      });
    }
    
    console.log("\n🎉 Enhanced discovery script completed successfully!");
    
  } catch (error) {
    console.error("\n💥 Enhanced discovery script failed:", error);
    process.exit(1);
  }
}

main();
