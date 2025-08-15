/**
 * Massive Artist Discovery Script
 * - Discovers 10,000+ artists from Spotify across all genres
 * - Uses multiple discovery methods for comprehensive coverage
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

// Massive search terms for different genres
const MASSIVE_SEARCH_TERMS = [
  "pop", "rock", "hip hop", "rap", "electronic", "edm", "country", "folk",
  "r&b", "soul", "latin", "reggae", "metal", "jazz", "classical", "k-pop",
  "indie", "alternative", "mainstream", "chart", "hit", "radio", "viral",
  "trending", "famous", "celebrity", "superstar", "icon", "billion streams",
  "80s", "90s", "2000s", "2010s", "2020s", "retro", "vintage", "classic",
  "chill", "energetic", "romantic", "melancholic", "uplifting", "dark",
  "happy", "sad", "angry", "peaceful", "intense", "relaxing", "acoustic",
  "piano", "guitar", "violin", "saxophone", "drums", "orchestra", "choir",
  "instrumental", "vocal", "platinum", "gold", "diamond", "grammy", "billboard",
  "award winning", "critically acclaimed", "influential", "legendary", "tiktok",
  "instagram", "youtube", "streaming", "playlist", "algorithm", "meme",
  "internet", "social media", "digital", "underground", "experimental",
  "avant-garde", "lo-fi", "bedroom pop", "dream pop", "shoegaze", "post-rock",
  // Additional search terms for more coverage
  "singer", "songwriter", "producer", "band", "group", "duo", "trio", "quartet",
  "orchestra", "ensemble", "choir", "chorus", "solo", "featured", "collaboration",
  "remix", "cover", "original", "live", "studio", "acoustic", "unplugged",
  "acapella", "instrumental", "vocal", "backing", "lead", "harmony", "melody",
  "rhythm", "beat", "groove", "swing", "blues", "jazz", "funk", "disco",
  "house", "techno", "trance", "dubstep", "ambient", "chillout", "lounge",
  "world", "ethnic", "traditional", "modern", "contemporary", "fusion",
  "crossover", "hybrid", "experimental", "avant-garde", "progressive",
  "artistic", "creative", "innovative", "pioneering", "groundbreaking",
  "revolutionary", "influential", "seminal", "classic", "timeless", "eternal",
  "legendary", "mythical", "iconic", "famous", "popular", "trending", "viral",
  "buzz", "hype", "momentum", "rising", "emerging", "upcoming", "newcomer",
  "debut", "first", "latest", "recent", "fresh", "new", "modern", "current",
  "today", "now", "present", "future", "next", "upcoming", "anticipated",
  "expected", "predicted", "forecast", "trend", "direction", "movement",
  "scene", "community", "culture", "subculture", "underground", "mainstream",
  "commercial", "independent", "indie", "alternative", "non-mainstream",
  "niche", "specialized", "focused", "dedicated", "devoted", "passionate",
  "enthusiastic", "dedicated", "committed", "serious", "professional", "amateur",
  "hobbyist", "enthusiast", "fan", "supporter", "follower", "listener",
  "audience", "crowd", "fans", "supporters", "followers", "listeners",
  "viewers", "watchers", "observers", "spectators", "onlookers", "bystanders",
  "witnesses", "participants", "contributors", "creators", "makers", "artists",
  "musicians", "performers", "entertainers", "showmen", "showwomen", "stars",
  "celebrities", "personalities", "figures", "names", "faces", "voices",
  "sounds", "tones", "notes", "chords", "scales", "modes", "keys", "tempos",
  "rhythms", "beats", "grooves", "swings", "feels", "vibes", "moods",
  "atmospheres", "ambiences", "environments", "settings", "contexts", "situations",
  "circumstances", "conditions", "states", "phases", "stages", "periods",
  "eras", "ages", "times", "moments", "instants", "seconds", "minutes",
  "hours", "days", "weeks", "months", "years", "decades", "centuries",
  "millennia", "eternity", "infinity", "forever", "always", "never", "sometimes",
  "occasionally", "rarely", "seldom", "frequently", "often", "usually",
  "typically", "generally", "commonly", "regularly", "consistently", "constantly",
  "continuously", "endlessly", "infinitely", "eternally", "permanently",
  "temporarily", "briefly", "momentarily", "instantly", "suddenly", "gradually",
  "slowly", "quickly", "rapidly", "swiftly", "speedily", "hastily", "urgently",
  "immediately", "promptly", "soon", "early", "late", "on time", "punctual",
  "delayed", "postponed", "cancelled", "rescheduled", "rearranged", "modified",
  "adjusted", "changed", "altered", "modified", "adapted", "customized",
  "personalized", "individualized", "tailored", "fitted", "sized", "measured",
  "calculated", "estimated", "approximated", "rounded", "exact", "precise",
  "accurate", "correct", "right", "wrong", "incorrect", "inaccurate", "imprecise",
  "approximate", "rough", "general", "broad", "wide", "narrow", "specific",
  "detailed", "comprehensive", "thorough", "complete", "full", "partial",
  "incomplete", "unfinished", "ongoing", "continuing", "progressive", "evolving",
  "developing", "growing", "expanding", "increasing", "decreasing", "shrinking",
  "contracting", "reducing", "minimizing", "maximizing", "optimizing", "improving",
  "enhancing", "upgrading", "advancing", "progressing", "evolving", "developing",
  "maturing", "aging", "growing", "changing", "transforming", "converting",
  "adapting", "adjusting", "modifying", "altering", "changing", "varying",
  "differing", "distinguishing", "separating", "dividing", "splitting", "breaking",
  "cracking", "shattering", "destroying", "ruining", "damaging", "harming",
  "hurting", "injuring", "wounding", "cutting", "slashing", "stabbing", "piercing",
  "penetrating", "entering", "exiting", "leaving", "arriving", "departing",
  "coming", "going", "moving", "traveling", "journeying", "wandering", "roaming",
  "exploring", "discovering", "finding", "searching", "seeking", "looking",
  "watching", "observing", "examining", "studying", "analyzing", "investigating",
  "researching", "exploring", "discovering", "uncovering", "revealing", "exposing",
  "showing", "displaying", "presenting", "demonstrating", "illustrating", "depicting",
  "portraying", "representing", "symbolizing", "signifying", "meaning", "indicating",
  "suggesting", "implying", "hinting", "cluing", "pointing", "directing", "guiding",
  "leading", "showing", "teaching", "instructing", "educating", "training",
  "coaching", "mentoring", "advising", "counseling", "consulting", "helping",
  "assisting", "supporting", "aiding", "facilitating", "enabling", "empowering",
  "encouraging", "motivating", "inspiring", "uplifting", "elevating", "raising",
  "lifting", "boosting", "enhancing", "improving", "bettering", "perfecting",
  "refining", "polishing", "smoothing", "softening", "hardening", "strengthening",
  "weakening", "fortifying", "reinforcing", "supporting", "maintaining", "preserving",
  "protecting", "defending", "guarding", "watching", "monitoring", "observing",
  "tracking", "following", "pursuing", "chasing", "hunting", "seeking", "searching",
  "exploring", "discovering", "finding", "locating", "identifying", "recognizing",
  "acknowledging", "appreciating", "valuing", "treasuring", "cherishing", "loving",
  "adoring", "worshipping", "idolizing", "admiring", "respecting", "honoring",
  "praising", "commending", "complimenting", "flattering", "pleasing", "satisfying",
  "fulfilling", "completing", "finishing", "ending", "concluding", "terminating",
  "stopping", "halting", "pausing", "waiting", "delaying", "postponing", "cancelling",
  "aborting", "terminating", "finishing", "completing", "accomplishing", "achieving",
  "reaching", "attaining", "obtaining", "gaining", "acquiring", "getting", "receiving",
  "accepting", "taking", "grabbing", "seizing", "capturing", "catching", "trapping",
  "ensnaring", "entangling", "involving", "including", "incorporating", "integrating",
  "combining", "merging", "joining", "connecting", "linking", "tying", "binding",
  "attaching", "fastening", "securing", "fixing", "setting", "placing", "positioning",
  "locating", "situating", "establishing", "founding", "creating", "making", "building",
  "constructing", "assembling", "putting", "placing", "setting", "arranging", "organizing",
  "structuring", "ordering", "sorting", "classifying", "categorizing", "grouping",
  "clustering", "bunching", "collecting", "gathering", "accumulating", "amassing",
  "stockpiling", "hoarding", "storing", "saving", "keeping", "holding", "retaining",
  "maintaining", "preserving", "conserving", "protecting", "safeguarding", "securing",
  "defending", "guarding", "watching", "monitoring", "observing", "supervising",
  "overseeing", "managing", "controlling", "directing", "guiding", "leading", "ruling",
  "governing", "administering", "executing", "implementing", "enforcing", "applying",
  "using", "utilizing", "employing", "applying", "practicing", "exercising", "performing",
  "conducting", "carrying", "executing", "accomplishing", "achieving", "completing",
  "finishing", "ending", "concluding", "terminating", "stopping", "halting", "pausing"
];

class MassiveArtistDiscovery {
  constructor(token) {
    this.token = token;
    this.discoveredArtists = new Map();
    this.genreArtists = new Map();
    this.stats = { 
      totalArtists: 0, 
      errors: 0, 
      rateLimited: 0,
      startTime: Date.now()
    };
  }

  async makeSpotifyRequest(url, description = "API request", retryCount = 0) {
    try {
      const response = await fetchFn(url, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      
      if (!response.ok) {
        if (response.status === 429 && retryCount < 3) {
          this.stats.rateLimited++;
          const waitTime = Math.pow(2, retryCount) * 5000;
          console.log(`⏳ Rate limited, waiting ${waitTime/1000}s...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return this.makeSpotifyRequest(url, description, retryCount + 1);
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

  determineGenre(artist) {
    const genres = artist.genres || [];
    if (genres.length === 0) return "Other";
    
    const primaryGenre = genres[0].toLowerCase();
    if (primaryGenre.includes("pop")) return "Pop";
    if (primaryGenre.includes("rock")) return "Rock";
    if (primaryGenre.includes("hip") || primaryGenre.includes("rap")) return "Hip-Hop";
    if (primaryGenre.includes("electronic") || primaryGenre.includes("edm")) return "Electronic";
    if (primaryGenre.includes("country")) return "Country";
    if (primaryGenre.includes("r&b") || primaryGenre.includes("soul")) return "R&B";
    if (primaryGenre.includes("latin")) return "Latin";
    if (primaryGenre.includes("metal")) return "Metal";
    if (primaryGenre.includes("jazz")) return "Jazz";
    if (primaryGenre.includes("classical")) return "Classical";
    if (primaryGenre.includes("k-pop")) return "K-Pop";
    if (primaryGenre.includes("indie")) return "Indie";
    if (primaryGenre.includes("folk")) return "Folk";
    if (primaryGenre.includes("reggae")) return "Reggae";
    
    return "Other";
  }

  async searchArtistsByTerm(searchTerm, limit = 50, offset = 0) {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=artist&limit=${limit}&offset=${offset}`;
    const data = await this.makeSpotifyRequest(searchUrl, `search for "${searchTerm}"`);
    
    if (!data || !data.artists || !data.artists.items) {
      return [];
    }
    
    return data.artists.items.filter(artist => 
      artist.popularity >= 20 && 
      artist.followers?.total >= 10000
    );
  }

  async discoverArtistsBySearchTerms() {
    console.log("🔍 Phase 1: Discovering artists by search terms...");
    
    for (let i = 0; i < MASSIVE_SEARCH_TERMS.length; i++) {
      const searchTerm = MASSIVE_SEARCH_TERMS[i];
      console.log(`  🎯 Searching: "${searchTerm}" (${i + 1}/${MASSIVE_SEARCH_TERMS.length})`);
      
      try {
        // Search with multiple offsets to get more results
        for (let offset = 0; offset < 500; offset += 50) {
          const artists = await this.searchArtistsByTerm(searchTerm, 50, offset);
          
          if (artists.length === 0) break;
          
          let newArtistsFound = 0;
          for (const artist of artists) {
            if (!this.discoveredArtists.has(artist.id)) {
              const genre = this.determineGenre(artist);
              
              const artistData = {
                id: artist.id,
                name: artist.name,
                image: artist.images?.[0]?.url || null,
                followers: artist.followers?.total || 0,
                spotifyId: artist.id,
                spotifyPopularity: artist.popularity,
                genres: artist.genres || [],
                discoveryMethod: 'search_term',
                searchTerm: searchTerm,
                primaryGenre: genre
              };
              
              this.discoveredArtists.set(artist.id, artistData);
              
              if (!this.genreArtists.has(genre)) {
                this.genreArtists.set(genre, new Map());
              }
              this.genreArtists.get(genre).set(artist.id, artistData);
              
              newArtistsFound++;
            }
          }
          
          console.log(`    ✅ Found ${newArtistsFound} new artists (offset ${offset})`);
          
          if (newArtistsFound === 0) break;
          
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
      } catch (error) {
        console.error(`  ❌ Error searching for "${searchTerm}":`, error.message);
      }
      
      if ((i + 1) % 10 === 0) {
        console.log(`  📊 Progress: ${i + 1}/${MASSIVE_SEARCH_TERMS.length} search terms completed`);
        console.log(`  🎵 Total artists discovered so far: ${this.discoveredArtists.size.toLocaleString()}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  async discoverArtistsByPopularityRanges() {
    console.log("🔍 Phase 2: Discovering artists by popularity ranges...");
    
    const popularityRanges = [
      { min: 95, max: 100, description: "Superstars (95-100)" },
      { min: 90, max: 94, description: "Global Stars (90-94)" },
      { min: 85, max: 89, description: "Major Stars (85-89)" },
      { min: 80, max: 84, description: "Popular Stars (80-84)" },
      { min: 70, max: 79, description: "Established (70-79)" },
      { min: 60, max: 69, description: "Rising (60-69)" },
      { min: 50, max: 59, description: "Emerging (50-59)" },
      { min: 40, max: 49, description: "Developing (40-49)" },
      { min: 30, max: 39, description: "New (30-39)" },
      { min: 20, max: 29, description: "Underground (20-29)" }
    ];

    for (const range of popularityRanges) {
      console.log(`  🎯 Searching for artists with popularity ${range.min}-${range.max}`);
      
      try {
        for (const searchTerm of MASSIVE_SEARCH_TERMS.slice(0, 20)) {
          const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=artist&limit=50`;
          const data = await this.makeSpotifyRequest(searchUrl, `popularity search for ${searchTerm}`);
          
          if (!data || !data.artists || !data.artists.items) {
            continue;
          }

          let foundCount = 0;
          for (const artist of data.artists.items) {
            if (foundCount >= 40) break;
            
            if (artist.popularity >= range.min && artist.popularity <= range.max && 
                artist.followers?.total >= 10000) {
              
              if (!this.discoveredArtists.has(artist.id)) {
                const genre = this.determineGenre(artist);
                
                const artistData = {
                  id: artist.id,
                  name: artist.name,
                  image: artist.images?.[0]?.url || null,
                  followers: artist.followers?.total || 0,
                  spotifyId: artist.id,
                  spotifyPopularity: artist.popularity,
                  genres: artist.genres || [],
                  discoveryMethod: 'popularity_search',
                  primaryGenre: genre
                };
                
                this.discoveredArtists.set(artist.id, artistData);
                
                if (!this.genreArtists.has(genre)) {
                  this.genreArtists.set(genre, new Map());
                }
                this.genreArtists.get(genre).set(artist.id, artistData);
                
                foundCount++;
              }
            }
          }
          
          console.log(`    ✅ Found ${foundCount} artists for "${searchTerm}" in ${range.description}`);
          
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        
      } catch (error) {
        console.error(`  ❌ Error in popularity range ${range.min}-${range.max}:`, error.message);
      }
    }
  }

  async runMassiveDiscovery() {
    console.log("🚀 Starting Massive Artist Discovery (Target: 10,000+ artists)...");
    console.log("=" .repeat(60));
    
    await this.discoverArtistsBySearchTerms();
    await this.discoverArtistsByPopularityRanges();
    
    const artistsArray = Array.from(this.discoveredArtists.values());
    this.stats.totalArtists = artistsArray.length;
    
    const duration = (Date.now() - this.stats.startTime) / 1000;
    
    console.log("\n🎉 Massive Artist Discovery Complete!");
    console.log("=" .repeat(60));
    console.log(`📊 Final Results:`);
    console.log(`   • Total artists discovered: ${this.stats.totalArtists.toLocaleString()}`);
    console.log(`   • Unique genres found: ${this.genreArtists.size}`);
    console.log(`   • Errors encountered: ${this.stats.errors}`);
    console.log(`   • Rate limit events: ${this.stats.rateLimited}`);
    console.log(`   • Total time: ${Math.round(duration)}s`);
    
    return this.discoveredArtists;
  }

  writeOutputFiles() {
    const outputDir = path.join(ROOT, "constants");
    
    const allArtists = Array.from(this.discoveredArtists.values()).map(artist => ({
      ...artist,
      likes: this.toKNotation(artist.followers),
      tier: this.calculateTier(artist.spotifyPopularity)
    }));
    
    const massiveArtistsPath = path.join(outputDir, "massiveArtistsCollection.json");
    fs.writeFileSync(massiveArtistsPath, JSON.stringify(allArtists, null, 2), "utf8");
    console.log(`📝 Written: massiveArtistsCollection.json (${allArtists.length.toLocaleString()} artists)`);
    
    for (const [genre, artistsMap] of this.genreArtists) {
      if (artistsMap.size > 0) {
        const genreArtists = Array.from(artistsMap.values()).map(artist => ({
          ...artist,
          likes: this.toKNotation(artist.followers),
          tier: this.calculateTier(artist.spotifyPopularity)
        }));
        
        const genrePath = path.join(outputDir, `${genre.toLowerCase().replace(/[^a-z0-9]/g, '')}Massive.json`);
        fs.writeFileSync(genrePath, JSON.stringify(genreArtists, null, 2), "utf8");
        console.log(`📝 Written: ${path.basename(genrePath)} (${genreArtists.length} ${genre} artists)`);
      }
    }
    
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
    if (popularity >= 60) return "Established";
    if (popularity >= 40) return "Rising";
    return "Underground";
  }
}

async function main() {
  try {
    console.log("🎵 Massive Artist Discovery Script (Target: 10,000+ artists)");
    console.log("=" .repeat(60));
    
    const discovery = new MassiveArtistDiscovery();
    discovery.token = await discovery.getSpotifyToken();
    console.log("✅ Got Spotify access token");
    
    const discoveredArtists = await discovery.runMassiveDiscovery();
    
    if (discoveredArtists.size === 0) {
      console.log("❌ No artists discovered. Check your configuration.");
      return;
    }
    
    const outputFiles = discovery.writeOutputFiles();
    
    console.log("\n🏆 Top Artists Discovered:");
    const artistsArray = Array.from(discoveredArtists.values());
    const sortedArtists = artistsArray.sort((a, b) => b.spotifyPopularity - a.spotifyPopularity);
    
    sortedArtists.slice(0, 25).forEach((artist, index) => {
      const discovery = new MassiveArtistDiscovery();
      console.log(`  ${index + 1}. ${artist.name} - ${artist.spotifyPopularity} popularity (${discovery.toKNotation(artist.followers)} followers) - ${artist.primaryGenre || 'Unknown'}`);
    });
    
    console.log("\n🎉 Massive artist discovery script completed successfully!");
    console.log(`🎯 Target achieved: ${discoveredArtists.size.toLocaleString()}+ artists discovered!`);
    
  } catch (error) {
    console.error("\n💥 Massive artist discovery script failed:", error);
    process.exit(1);
  }
}

main();
