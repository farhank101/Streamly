const fs = require('fs');
const path = require('path');

// Configuration
const CONSTANTS_DIR = path.join(__dirname, '../constants');

async function finalCleanup() {
  console.log('🧹 Final cleanup - removing duplicate and unnecessary files...\n');
  
  // Get all artist files
  const allFiles = fs.readdirSync(CONSTANTS_DIR);
  const artistFiles = allFiles.filter(file => 
    file.includes('Artists') && 
    file.endsWith('.json')
  );
  
  console.log(`📁 Found ${artistFiles.length} artist files:`);
  artistFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  // Files to keep (the clean, deduplicated ones)
  const filesToKeep = [
    'allGenreArtists.json',
    'bluesArtists.json',
    'bollywoodArtists.json',
    'classicalArtists.json',
    'countryArtists.json',
    'discoveredEDMArtists.json',
    'electronicArtists.json',
    'emoArtists.json',
    'folkArtists.json',
    'hiphopArtists.json',
    'indieArtists.json',
    'jazzArtists.json',
    'k_popArtists.json',
    'latinArtists.json',
    'metalArtists.json',
    'otherArtists.json',
    'popArtists.json',
    'punkArtists.json',
    'r&bArtists.json',
    'reggaeArtists.json',
    'rockArtists.json',
    'soul_funkArtists.json',
    'stutter houseArtists.json',
    'topGlobalArtists.json',
    'tropical houseArtists.json'
  ];
  
  // Files to remove
  const filesToRemove = artistFiles.filter(file => !filesToKeep.includes(file));
  
  console.log(`🗑️  Files to remove (${filesToRemove.length}):`);
  filesToRemove.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  let totalRemoved = 0;
  
  for (const file of filesToRemove) {
    try {
      const filePath = path.join(CONSTANTS_DIR, file);
      fs.unlinkSync(filePath);
      totalRemoved++;
      console.log(`✅ Removed ${file}`);
    } catch (error) {
      console.log(`❌ Error removing ${file}:`, error.message);
    }
  }
  
  // Verify final structure
  const remainingFiles = fs.readdirSync(CONSTANTS_DIR)
    .filter(file => file.includes('Artists') && file.endsWith('.json'));
  
  console.log('\n📊 Final Clean Structure:');
  console.log('==========================');
  remainingFiles.forEach(file => {
    const stats = fs.statSync(path.join(CONSTANTS_DIR, file));
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`   ${file.padEnd(25)} (${sizeKB.padStart(6)} KB)`);
  });
  
  console.log('\n🎉 Final cleanup complete!');
  console.log(`📁 Total files removed: ${totalRemoved}`);
  console.log(`📁 Remaining files: ${remainingFiles.length}`);
  console.log('🚀 Your artist database is now clean and organized!');
  
  return { totalRemoved, remainingFiles: remainingFiles.length };
}

// Run the cleanup
if (require.main === module) {
  finalCleanup().catch(console.error);
}

module.exports = { finalCleanup };
