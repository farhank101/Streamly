const fs = require('fs');
const path = require('path');

// Configuration
const CONSTANTS_DIR = path.join(__dirname, '../constants');
const OUTPUT_FILE = path.join(CONSTANTS_DIR, 'allArtists.ts');

// Massive artist files to merge
const MASSIVE_FILES = [
  'hiphopMassive.json',
  'popMassive.json', 
  'rockMassive.json',
  'indieMassive.json',
  'countryMassive.json',
  'metalMassive.json',
  'jazzMassive.json',
  'classicalMassive.json',
  'bluesMassive.json',
  'folkMassive.json',
  'punkMassive.json',
  'soul_funkMassive.json',
  'reggaeMassive.json',
  'latinMassive.json',
  'electronicMassive.json',
  'rbMassive.json',
  'otherMassive.json'
];

// Additional artist files
const ADDITIONAL_FILES = [
  'bollywoodArtists.json',
  'hiphopArtists.json',
  'discoveredEDMArtists.json',
  'topGlobalArtists.json'
];

class MassiveArtistMerger {
  constructor() {
    this.allArtists = new Map(); // Use Map to avoid duplicates
    this.stats = {
      total: 0,
      duplicates: 0,
      merged: 0
    };
  }

  async loadJsonFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`❌ Error loading ${filePath}:`, error.message);
      return [];
    }
  }

  normalizeArtist(artist, sourceFile) {
    // Ensure all required fields are present
    return {
      id: artist.id || `generated_${Date.now()}_${Math.random()}`,
      name: artist.name || 'Unknown Artist',
      image: artist.image || null,
      followers: artist.followers || 0,
      spotifyId: artist.spotifyId || artist.id || '',
      spotifyPopularity: artist.spotifyPopularity || 0,
      genres: artist.genres || [],
      primaryGenre: artist.primaryGenre || this.extractGenreFromFilename(sourceFile),
      country: artist.country || null,
      discoveryMethod: artist.discoveryMethod || 'massive_merge',
      genre: artist.genre || this.extractGenreFromFilename(sourceFile),
      likes: artist.likes || this.formatFollowers(artist.followers),
      tier: artist.tier || this.determineTier(artist.spotifyPopularity, artist.followers)
    };
  }

  extractGenreFromFilename(filename) {
    // Extract genre from filename like "hiphopMassive.json" -> "Hip-Hop"
    const match = filename.match(/^(.+?)Massive\.json$/);
    if (match) {
      const genre = match[1];
      // Convert to proper case
      return genre.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return 'Other';
  }

  formatFollowers(followers) {
    if (typeof followers === 'string') return followers;
    if (followers >= 1000000) return `${(followers / 1000000).toFixed(1)}M`;
    if (followers >= 1000) return `${(followers / 1000).toFixed(1)}K`;
    return followers.toString();
  }

  determineTier(popularity, followers) {
    if (popularity >= 90) return 'Superstar';
    if (popularity >= 80) return 'Global Star';
    if (popularity >= 70) return 'Established';
    if (popularity >= 60) return 'Rising';
    if (popularity >= 50) return 'Emerging';
    if (followers >= 10000000) return 'Major';
    if (followers >= 1000000) return 'Established';
    if (followers >= 100000) return 'Rising';
    return 'Underground';
  }

  async mergeMassiveFiles() {
    console.log('🚀 Starting massive artist merge...');
    
    // Process massive files first
    for (const filename of MASSIVE_FILES) {
      const filePath = path.join(CONSTANTS_DIR, filename);
      if (fs.existsSync(filePath)) {
        console.log(`📁 Processing ${filename}...`);
        const artists = await this.loadJsonFile(filePath);
        
        if (Array.isArray(artists)) {
          let newArtists = 0;
          for (const artist of artists) {
            const normalized = this.normalizeArtist(artist, filename);
            const key = `${normalized.spotifyId}_${normalized.name}`;
            
            if (!this.allArtists.has(key)) {
              this.allArtists.set(key, normalized);
              newArtists++;
            } else {
              this.stats.duplicates++;
            }
          }
          console.log(`  ✅ Added ${newArtists} new artists from ${filename}`);
        }
      } else {
        console.log(`⚠️ File not found: ${filename}`);
      }
    }

    // Process additional files
    for (const filename of ADDITIONAL_FILES) {
      const filePath = path.join(CONSTANTS_DIR, filename);
      if (fs.existsSync(filePath)) {
        console.log(`📁 Processing ${filename}...`);
        const artists = await this.loadJsonFile(filePath);
        
        if (Array.isArray(artists)) {
          let newArtists = 0;
          for (const artist of artists) {
            const normalized = this.normalizeArtist(artist, filename);
            const key = `${normalized.spotifyId}_${normalized.name}`;
            
            if (!this.allArtists.has(key)) {
              this.allArtists.set(key, normalized);
              newArtists++;
            } else {
              this.stats.duplicates++;
            }
          }
          console.log(`  ✅ Added ${newArtists} new artists from ${filename}`);
        }
      }
    }

    this.stats.total = this.allArtists.size;
    this.stats.merged = this.stats.total;
  }

  generateTypeScriptFile() {
    console.log('📝 Generating TypeScript file...');
    
    const artistsArray = Array.from(this.allArtists.values());
    
    // Sort by popularity and name
    artistsArray.sort((a, b) => {
      if (b.spotifyPopularity !== a.spotifyPopularity) {
        return b.spotifyPopularity - a.spotifyPopularity;
      }
      return a.name.localeCompare(b.name);
    });

    const fileContent = `// Auto-generated from massive artist merge
// Total unique artists: ${this.stats.total}
// Duplicates removed: ${this.stats.duplicates}

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
  allArtists.forEach((artist) => {
    if (artist.genre) {
      genres.add(artist.genre);
    }
  });
  return Array.from(genres).sort();
};

// Helper function to get artists by genre
export const getArtistsByGenre = (genre: string): UnifiedArtist[] => {
  return allArtists.filter((artist) => artist.genre === genre);
};

export const allArtists = ${JSON.stringify(artistsArray, null, 2)} as const;

export type Artist = (typeof allArtists)[number];
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
    console.log(`✅ Generated ${OUTPUT_FILE} with ${this.stats.total} artists`);
  }

  async run() {
    try {
      await this.mergeMassiveFiles();
      this.generateTypeScriptFile();
      
      console.log('\n🎉 Merge completed successfully!');
      console.log(`📊 Statistics:`);
      console.log(`   Total artists: ${this.stats.total}`);
      console.log(`   Duplicates removed: ${this.stats.duplicates}`);
      console.log(`   Files processed: ${MASSIVE_FILES.length + ADDITIONAL_FILES.length}`);
      
    } catch (error) {
      console.error('❌ Error during merge:', error);
    }
  }
}

// Run the merger
const merger = new MassiveArtistMerger();
merger.run();
