const fs = require('fs');
const path = require('path');

// Configuration
const CONSTANTS_DIR = path.join(__dirname, '../constants');
const OUTPUT_DIR = path.join(__dirname, '../constants/cleaned');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Artist data structure
class Artist {
  constructor(data) {
    this.id = data.id || data.spotifyId || data.spotify_id;
    this.name = data.name;
    this.image = data.image || data.images?.[0] || data.profilePicture;
    this.followers = data.followers || data.followers_count || 0;
    this.spotifyId = data.spotifyId || data.spotify_id || data.id;
    this.spotifyPopularity = data.spotifyPopularity || data.popularity || 0;
    this.genres = data.genres || [];
    this.primaryGenre = data.primaryGenre || data.primary_genre || '';
    this.country = data.country || null;
    this.discoveryMethod = data.discoveryMethod || data.discovery_method || 'deduplication';
    this.genre = data.genre || '';
    this.likes = data.likes || this.formatFollowers(this.followers);
    this.tier = data.tier || this.calculateTier(this.followers);
  }

  formatFollowers(followers) {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  }

  calculateTier(followers) {
    if (followers >= 10000000) return 'Top';
    if (followers >= 1000000) return 'Popular';
    if (followers >= 100000) return 'Rising';
    return 'Emerging';
  }

  // Create a unique key for deduplication
  getUniqueKey() {
    return `${this.id || this.name?.toLowerCase()}`;
  }

  // Merge with another artist (keep the best data)
  merge(other) {
    if (!this.image && other.image) this.image = other.image;
    if (!this.followers && other.followers) this.followers = other.followers;
    if (!this.spotifyPopularity && other.spotifyPopularity) this.spotifyPopularity = other.spotifyPopularity;
    if (!this.country && other.country) this.country = other.country;
    
    // Merge genres
    const allGenres = new Set([...this.genres, ...other.genres]);
    this.genres = Array.from(allGenres);
    
    // Keep the better primary genre
    if (other.primaryGenre && !this.primaryGenre) {
      this.primaryGenre = other.primaryGenre;
    }
    
    // Update likes and tier
    this.likes = this.formatFollowers(this.followers);
    this.tier = this.calculateTier(this.followers);
  }
}

// Main deduplication function
async function deduplicateArtists() {
  console.log('🎵 Starting artist deduplication process...\n');
  
  const allArtists = new Map();
  const genreStats = {};
  const duplicates = [];
  
  // Get all JSON files in constants directory
  const files = fs.readdirSync(CONSTANTS_DIR)
    .filter(file => file.endsWith('.json'))
    .filter(file => !file.includes('Massive') && !file.includes('Collection'))
    .filter(file => !file.includes('Enhanced') && !file.includes('WithImages'));
  
  console.log(`📁 Found ${files.length} genre files to process:`);
  files.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  // Process each file
  for (const file of files) {
    try {
      const filePath = path.join(CONSTANTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const artists = JSON.parse(content);
      
      if (!Array.isArray(artists)) {
        console.log(`⚠️  Skipping ${file} - not an array`);
        continue;
      }
      
      const genreName = file.replace('Artists.json', '').replace('.json', '');
      genreStats[genreName] = { total: 0, duplicates: 0, unique: 0 };
      
      console.log(`🔄 Processing ${genreName} (${artists.length} artists)...`);
      
      for (const artistData of artists) {
        if (!artistData.name) continue;
        
        const artist = new Artist(artistData);
        const uniqueKey = artist.getUniqueKey();
        
        if (allArtists.has(uniqueKey)) {
          // Duplicate found
          const existingArtist = allArtists.get(uniqueKey);
          existingArtist.merge(artist);
          duplicates.push({
            name: artist.name,
            file: file,
            existingFile: genreStats[existingArtist.genre] ? existingArtist.genre : 'unknown'
          });
          genreStats[genreName].duplicates++;
        } else {
          // New unique artist
          allArtists.set(uniqueKey, artist);
          genreStats[genreName].unique++;
        }
        
        genreStats[genreName].total++;
      }
      
    } catch (error) {
      console.log(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  // Convert to array and sort by popularity
  const uniqueArtists = Array.from(allArtists.values())
    .sort((a, b) => (b.spotifyPopularity || 0) - (a.spotifyPopularity || 0));
  
  console.log('\n📊 Deduplication Results:');
  console.log('========================');
  console.log(`Total unique artists: ${uniqueArtists.length}`);
  console.log(`Total duplicates removed: ${duplicates.length}`);
  console.log('');
  
  // Show genre statistics
  console.log('Genre Statistics:');
  console.log('=================');
  Object.entries(genreStats).forEach(([genre, stats]) => {
    if (stats.total > 0) {
      console.log(`${genre.padEnd(15)}: ${stats.total.toString().padStart(4)} total, ${stats.unique.toString().padStart(4)} unique, ${stats.duplicates.toString().padStart(4)} duplicates`);
    }
  });
  
  // Save deduplicated data
  const outputFiles = {
    'allArtistsDeduplicated.json': uniqueArtists,
    'duplicatesReport.json': duplicates,
    'genreStats.json': genreStats
  };
  
  console.log('\n💾 Saving deduplicated data...');
  for (const [filename, data] of Object.entries(outputFiles)) {
    const outputPath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`   ✅ Saved ${filename}`);
  }
  
  // Create genre-specific files (without duplicates)
  console.log('\n🎯 Creating clean genre-specific files...');
  const genreArtists = {};
  
  for (const artist of uniqueArtists) {
    // Determine primary genre from the artist's genres array
    let primaryGenre = artist.primaryGenre || 'other';
    
    // Map to our genre categories
    if (artist.genres.some(g => g.includes('rock'))) primaryGenre = 'rock';
    else if (artist.genres.some(g => g.includes('pop'))) primaryGenre = 'pop';
    else if (artist.genres.some(g => g.includes('hip') || g.includes('rap'))) primaryGenre = 'hiphop';
    else if (artist.genres.some(g => g.includes('jazz'))) primaryGenre = 'jazz';
    else if (artist.genres.some(g => g.includes('classical'))) primaryGenre = 'classical';
    else if (artist.genres.some(g => g.includes('country'))) primaryGenre = 'country';
    else if (artist.genres.some(g => g.includes('metal'))) primaryGenre = 'metal';
    else if (artist.genres.some(g => g.includes('folk'))) primaryGenre = 'folk';
    else if (artist.genres.some(g => g.includes('blues'))) primaryGenre = 'blues';
    else if (artist.genres.some(g => g.includes('reggae'))) primaryGenre = 'reggae';
    else if (artist.genres.some(g => g.includes('punk'))) primaryGenre = 'punk';
    else if (artist.genres.some(g => g.includes('soul') || g.includes('funk'))) primaryGenre = 'soul_funk';
    else if (artist.genres.some(g => g.includes('latin'))) primaryGenre = 'latin';
    else if (artist.genres.some(g => g.includes('indie'))) primaryGenre = 'indie';
    else if (artist.genres.some(g => g.includes('electronic') || g.includes('edm') || g.includes('dance'))) primaryGenre = 'electronic';
    else if (artist.genres.some(g => g.includes('bollywood') || g.includes('hindi'))) primaryGenre = 'bollywood';
    
    if (!genreArtists[primaryGenre]) {
      genreArtists[primaryGenre] = [];
    }
    
    genreArtists[primaryGenre].push(artist);
  }
  
  // Save genre-specific files
  for (const [genre, artists] of Object.entries(genreArtists)) {
    const filename = `${genre}ArtistsClean.json`;
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    // Sort by popularity within genre
    artists.sort((a, b) => (b.spotifyPopularity || 0) - (a.spotifyPopularity || 0));
    
    fs.writeFileSync(outputPath, JSON.stringify(artists, null, 2));
    console.log(`   ✅ Saved ${filename} (${artists.length} artists)`);
  }
  
  // Create a summary report
  const summary = {
    totalUniqueArtists: uniqueArtists.length,
    totalDuplicatesRemoved: duplicates.length,
    genreBreakdown: Object.fromEntries(
      Object.entries(genreArtists).map(([genre, artists]) => [genre, artists.length])
    ),
    topArtists: uniqueArtists.slice(0, 20).map(a => ({
      name: a.name,
      popularity: a.spotifyPopularity,
      followers: a.followers,
      primaryGenre: a.primaryGenre
    })),
    timestamp: new Date().toISOString()
  };
  
  const summaryPath = path.join(OUTPUT_DIR, 'deduplicationSummary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`   ✅ Saved deduplicationSummary.json`);
  
  console.log('\n🎉 Deduplication complete!');
  console.log(`📁 Check the '${OUTPUT_DIR}' directory for cleaned files.`);
  console.log(`📊 Summary: ${uniqueArtists.length} unique artists, ${duplicates.length} duplicates removed`);
  
  return { uniqueArtists, duplicates, genreStats };
}

// Run the deduplication
if (require.main === module) {
  deduplicateArtists().catch(console.error);
}

module.exports = { deduplicateArtists, Artist };
