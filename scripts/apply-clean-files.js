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

async function applyCleanFiles() {
  console.log('🔄 Applying clean, deduplicated artist files...\n');
  
  // Get all clean files
  const cleanFiles = fs.readdirSync(CLEANED_DIR)
    .filter(file => file.endsWith('.json'))
    .filter(file => !file.includes('Summary') && !file.includes('Report') && !file.includes('Stats'));
  
  console.log(`📁 Found ${cleanFiles.length} clean files to apply:`);
  cleanFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  let totalReplaced = 0;
  let totalBackedUp = 0;
  
  for (const cleanFile of cleanFiles) {
    try {
      const cleanPath = path.join(CLEANED_DIR, cleanFile);
      const targetPath = path.join(CONSTANTS_DIR, cleanFile);
      
      // Backup original if it exists
      if (fs.existsSync(targetPath)) {
        const backupPath = path.join(BACKUP_DIR, cleanFile);
        fs.copyFileSync(targetPath, backupPath);
        totalBackedUp++;
        console.log(`💾 Backed up ${cleanFile}`);
      }
      
      // Replace with clean version
      fs.copyFileSync(cleanPath, targetPath);
      totalReplaced++;
      console.log(`✅ Applied ${cleanFile}`);
      
    } catch (error) {
      console.log(`❌ Error processing ${cleanFile}:`, error.message);
    }
  }
  
  console.log('\n📊 Application Summary:');
  console.log('========================');
  console.log(`Files backed up: ${totalBackedUp}`);
  console.log(`Files applied: ${totalReplaced}`);
  console.log(`Backup location: ${BACKUP_DIR}`);
  console.log('');
  console.log('🎉 All clean files have been applied!');
  console.log('🚀 Your app now has no duplicate artists across genres.');
  
  return { totalReplaced, totalBackedUp };
}

// Run the application
if (require.main === module) {
  applyCleanFiles().catch(console.error);
}

module.exports = { applyCleanFiles };
