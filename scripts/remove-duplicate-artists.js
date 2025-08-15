const fs = require('fs');
const path = require('path');

// Configuration
const CONSTANTS_DIR = path.join(__dirname, '../constants');
const OUTPUT_DIR = path.join(__dirname, '../constants/cleaned');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to determine primary genre for an artist
function determinePrimaryGenre(artist, sourceFile) {
  // First try to get genre from the source file name
  let genre = sourceFile.replace('Artists.json', '');
  
  // If it's allGenre, try to determine from artist data
  if (genre === 'allGenre') {
    // Check primaryGenre field
    if (artist.primaryGenre) {
      genre = artist.primaryGenre.toLowerCase();
    }
    // Check genres array
    else if (artist.genres && artist.genres.length > 0) {
      const firstGenre = artist.genres[0].toLowerCase();
      if (firstGenre.includes('rock')) genre = 'rock';
      else if (firstGenre.includes('pop')) genre = 'pop';
      else if (firstGenre.includes('hip') || firstGenre.includes('rap')) genre = 'hiphop';
      else if (firstGenre.includes('jazz')) genre = 'jazz';
      else if (firstGenre.includes('classical')) genre = 'classical';
      else if (firstGenre.includes('country')) genre = 'country';
      else if (firstGenre.includes('metal')) genre = 'metal';
      else if (firstGenre.includes('folk')) genre = 'folk';
      else if (firstGenre.includes('blues')) genre = 'blues';
      else if (firstGenre.includes('reggae')) genre = 'reggae';
      else if (firstGenre.includes('punk')) genre = 'punk';
      else if (firstGenre.includes('soul') || firstGenre.includes('funk')) genre = 'soul_funk';
      else if (firstGenre.includes('latin')) genre = 'latin';
      else if (firstGenre.includes('indie')) genre = 'indie';
      else if (firstGenre.includes('electronic') || firstGenre.includes('edm') || firstGenre.includes('dance')) genre = 'electronic';
      else if (firstGenre.includes('bollywood') || firstGenre.includes('hindi')) genre = 'bollywood';
      else genre = 'other';
    }
    // Check genre field
    else if (artist.genre) {
      const genreStr = artist.genre.toLowerCase();
      if (genreStr.includes('rock')) genre = 'rock';
      else if (genreStr.includes('pop')) genre = 'pop';
      else if (genreStr.includes('hip') || genreStr.includes('rap')) genre = 'hiphop';
      else if (genreStr.includes('jazz')) genre = 'jazz';
      else if (genreStr.includes('classical')) genre = 'classical';
      else if (genreStr.includes('country')) genre = 'country';
      else if (genreStr.includes('metal')) genre = 'metal';
      else if (genreStr.includes('folk')) genre = 'folk';
      else if (genreStr.includes('blues')) genre = 'blues';
      else if (genreStr.includes('reggae')) genre = 'reggae';
      else if (genreStr.includes('punk')) genre = 'punk';
      else if (genreStr.includes('soul') || genreStr.includes('funk')) genre = 'soul_funk';
      else if (genreStr.includes('latin')) genre = 'latin';
      else if (genreStr.includes('indie')) genre = 'indie';
      else if (genreStr.includes('electronic') || genreStr.includes('edm') || genreStr.includes('dance')) genre = 'electronic';
      else if (genreStr.includes('bollywood') || genreStr.includes('hindi')) genre = 'bollywood';
      else genre = 'other';
    }
  }
  
  return genre;
}

async function removeDuplicateArtists() {
  console.log('🎵 Removing duplicate artists from genre files...\n');
  
  // Get all genre artist files
  const files = fs.readdirSync(CONSTANTS_DIR)
    .filter(file => file.includes('Artists') && file.endsWith('.json'))
    .filter(file => !file.includes('Massive') && !file.includes('Collection') && !file.includes('Enhanced') && !file.includes('WithImages'));
  
  console.log(`📁 Found ${files.length} genre files to process:`);
  files.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  // Track all artists to avoid duplicates
  const allArtists = new Map(); // id -> artist
  const artistGenres = new Map(); // id -> primary genre
  const duplicates = [];
  
  // First pass: collect all artists and determine their primary genre
  console.log('🔄 First pass: Analyzing all artists...');
  
  for (const file of files) {
    try {
      const filePath = path.join(CONSTANTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const artists = JSON.parse(content);
      
      if (!Array.isArray(artists)) continue;
      
      for (const artist of artists) {
        if (!artist.name || !artist.id) continue;
        
        const artistId = artist.id;
        const primaryGenre = determinePrimaryGenre(artist, file);
        
        if (allArtists.has(artistId)) {
          // Duplicate found - determine which genre to keep
          const existingArtist = allArtists.get(artistId);
          const existingGenre = artistGenres.get(artistId);
          
          // Keep the artist with higher popularity or better genre info
          if ((artist.spotifyPopularity || 0) > (existingArtist.spotifyPopularity || 0)) {
            allArtists.set(artistId, artist);
            artistGenres.set(artistId, primaryGenre);
            duplicates.push({
              name: artist.name,
              id: artistId,
              removedFrom: existingGenre,
              keptIn: primaryGenre
            });
          } else {
            duplicates.push({
              name: artist.name,
              id: artistId,
              removedFrom: primaryGenre,
              keptIn: existingGenre
            });
          }
        } else {
          // New artist
          allArtists.set(artistId, artist);
          artistGenres.set(artistId, primaryGenre);
        }
      }
    } catch (error) {
      console.log(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`📊 Found ${allArtists.size} unique artists`);
  console.log(`📊 Found ${duplicates.length} duplicates to remove`);
  
  // Second pass: create clean genre files
  console.log('\n🔄 Second pass: Creating clean genre files...');
  
  const genreArtists = {};
  
  // Initialize genre buckets
  for (const [artistId, artist] of allArtists) {
    const primaryGenre = artistGenres.get(artistId);
    
    if (!genreArtists[primaryGenre]) {
      genreArtists[primaryGenre] = [];
    }
    
    genreArtists[primaryGenre].push(artist);
  }
  
  // Save clean genre files
  let totalSaved = 0;
  
  for (const [genre, artists] of Object.entries(genreArtists)) {
    if (artists.length === 0) continue;
    
    // Sort by popularity
    artists.sort((a, b) => (b.spotifyPopularity || 0) - (a.spotifyPopularity || 0));
    
    const filename = `${genre}Artists.json`;
    const filePath = path.join(OUTPUT_DIR, filename);
    
    fs.writeFileSync(filePath, JSON.stringify(artists, null, 2));
    console.log(`   ✅ Saved ${filename} (${artists.length} artists)`);
    totalSaved++;
  }
  
  // Save summary
  const summary = {
    totalUniqueArtists: allArtists.size,
    totalDuplicatesRemoved: duplicates.length,
    genreBreakdown: Object.fromEntries(
      Object.entries(genreArtists).map(([genre, artists]) => [genre, artists.length])
    ),
    duplicates: duplicates.slice(0, 20), // Show first 20 duplicates
    timestamp: new Date().toISOString()
  };
  
  const summaryPath = path.join(OUTPUT_DIR, 'duplicatesRemovedSummary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  console.log('\n📊 Summary:');
  console.log('============');
  console.log(`Total unique artists: ${allArtists.size}`);
  console.log(`Duplicates removed: ${duplicates.length}`);
  console.log(`Clean files created: ${totalSaved}`);
  console.log('\n🎵 Genre Distribution:');
  console.log('======================');
  Object.entries(genreArtists).forEach(([genre, artists]) => {
    console.log(`${genre.padEnd(15)}: ${artists.length.toString().padStart(3)} artists`);
  });
  console.log(`\n🎉 Duplicate artists removed successfully!`);
  console.log(`📁 Check '${OUTPUT_DIR}' directory for clean files.`);
  
  return { totalArtists: allArtists.size, duplicatesRemoved: duplicates.length };
}

// Run the script
if (require.main === module) {
  removeDuplicateArtists().catch(console.error);
}

module.exports = { removeDuplicateArtists };
