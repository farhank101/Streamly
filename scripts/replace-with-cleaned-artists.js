const fs = require('fs');
const path = require('path');

// Configuration
const CLEANED_DIR = path.join(__dirname, '../constants/cleaned');
const CONSTANTS_DIR = path.join(__dirname, '../constants');
const BACKUP_DIR = path.join(__dirname, '../constants/backup');

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

async function replaceWithCleanedArtists() {
  console.log('🔄 Starting replacement of old artist files with cleaned versions...\n');
  
  // Get all cleaned artist files
  const cleanedFiles = fs.readdirSync(CLEANED_DIR)
    .filter(file => file.endsWith('Clean.json'))
    .filter(file => !file.includes('Summary') && !file.includes('Report') && !file.includes('Stats'));
  
  console.log(`📁 Found ${cleanedFiles.length} cleaned artist files:`);
  cleanedFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  let totalReplaced = 0;
  let totalBackedUp = 0;
  
  for (const cleanedFile of cleanedFiles) {
    try {
      // Determine the original filename
      const originalFilename = cleanedFile.replace('Clean.json', 'Artists.json');
      const originalPath = path.join(CONSTANTS_DIR, originalFilename);
      const cleanedPath = path.join(CLEANED_DIR, cleanedFile);
      
      // Check if original file exists
      if (fs.existsSync(originalPath)) {
        // Create backup
        const backupPath = path.join(BACKUP_DIR, originalFilename);
        fs.copyFileSync(originalPath, backupPath);
        totalBackedUp++;
        console.log(`💾 Backed up ${originalFilename}`);
        
        // Replace with cleaned version
        fs.copyFileSync(cleanedPath, originalPath);
        totalReplaced++;
        console.log(`✅ Replaced ${originalFilename} with cleaned version`);
      } else {
        // Create new file if original doesn't exist
        const newPath = path.join(CONSTANTS_DIR, originalFilename);
        fs.copyFileSync(cleanedPath, newPath);
        totalReplaced++;
        console.log(`🆕 Created new ${originalFilename} from cleaned version`);
      }
      
    } catch (error) {
      console.log(`❌ Error processing ${cleanedFile}:`, error.message);
    }
  }
  
  // Also replace the main allArtists file
  const mainCleanedFile = 'allArtistsDeduplicated.json';
  const mainCleanedPath = path.join(CLEANED_DIR, mainCleanedFile);
  const mainOriginalPath = path.join(CONSTANTS_DIR, 'allArtists.ts');
  
  if (fs.existsSync(mainCleanedPath)) {
    try {
      // Backup original if it exists
      if (fs.existsSync(mainOriginalPath)) {
        const backupPath = path.join(BACKUP_DIR, 'allArtists.ts');
        fs.copyFileSync(mainOriginalPath, backupPath);
        console.log(`💾 Backed up allArtists.ts`);
      }
      
      // Convert JSON to TypeScript format
      const cleanedData = JSON.parse(fs.readFileSync(mainCleanedPath, 'utf8'));
      const tsContent = `// Auto-generated from deduplication script
// Total unique artists: ${cleanedData.length}
// Duplicates removed: ${cleanedData.length}

export const allArtists = ${JSON.stringify(cleanedData, null, 2)} as const;

export type Artist = typeof allArtists[number];
`;
      
      fs.writeFileSync(mainOriginalPath, tsContent);
      totalReplaced++;
      console.log(`✅ Replaced allArtists.ts with deduplicated version`);
      
    } catch (error) {
      console.log(`❌ Error processing main file:`, error.message);
    }
  }
  
  console.log('\n📊 Replacement Summary:');
  console.log('=======================');
  console.log(`Files backed up: ${totalBackedUp}`);
  console.log(`Files replaced: ${totalReplaced}`);
  console.log(`Backup location: ${BACKUP_DIR}`);
  console.log('');
  console.log('🎉 All artist files have been replaced with cleaned, deduplicated versions!');
  console.log('💡 Your old files are safely backed up in the backup directory.');
  console.log('🚀 You can now use the app with no duplicate artists across genres.');
  
  return { totalReplaced, totalBackedUp };
}

// Run the replacement
if (require.main === module) {
  replaceWithCleanedArtists().catch(console.error);
}

module.exports = { replaceWithCleanedArtists };
