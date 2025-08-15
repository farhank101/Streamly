const fs = require('fs');
const path = require('path');

// Configuration
const CONSTANTS_DIR = path.join(__dirname, '../constants');

async function fixFilenames() {
  console.log('🔧 Fixing duplicate "Artists" in filenames...\n');
  
  // Get all files with duplicate "Artists" in name
  const files = fs.readdirSync(CONSTANTS_DIR)
    .filter(file => file.includes('ArtistsArtists.json'));
  
  console.log(`📁 Found ${files.length} files with duplicate "Artists" in name:`);
  files.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  let totalFixed = 0;
  
  for (const file of files) {
    try {
      const oldPath = path.join(CONSTANTS_DIR, file);
      const newFilename = file.replace('ArtistsArtists.json', 'Artists.json');
      const newPath = path.join(CONSTANTS_DIR, newFilename);
      
      // Check if target file already exists
      if (fs.existsSync(newPath)) {
        // Remove the duplicate file
        fs.unlinkSync(oldPath);
        console.log(`🗑️  Removed duplicate ${file}`);
      } else {
        // Rename the file
        fs.renameSync(oldPath, newPath);
        totalFixed++;
        console.log(`✅ Renamed ${file} → ${newFilename}`);
      }
      
    } catch (error) {
      console.log(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  // Also clean up any other duplicate files
  const allFiles = fs.readdirSync(CONSTANTS_DIR);
  const artistFiles = allFiles.filter(file => 
    file.includes('Artists') && 
    file.endsWith('.json') && 
    !file.includes('Clean') && 
    !file.includes('Massive') && 
    !file.includes('Collection') &&
    !file.includes('Enhanced') &&
    !file.includes('WithImages')
  );
  
  console.log('\n📊 Final Artist Files Structure:');
  console.log('=================================');
  artistFiles.forEach(file => {
    const stats = fs.statSync(path.join(CONSTANTS_DIR, file));
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`   ${file.padEnd(25)} (${sizeKB} KB)`);
  });
  
  console.log('\n🎉 Filename cleanup complete!');
  console.log(`📁 Total artist files: ${artistFiles.length}`);
  
  return { totalFixed, totalFiles: artistFiles.length };
}

// Run the fix
if (require.main === module) {
  fixFilenames().catch(console.error);
}

module.exports = { fixFilenames };
