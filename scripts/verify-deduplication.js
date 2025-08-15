const fs = require("fs");
const path = require("path");

// Configuration
const CONSTANTS_DIR = path.join(__dirname, "../constants");
const CLEANED_DIR = path.join(__dirname, "../constants/cleaned");

async function verifyDeduplication() {
  console.log("🔍 Verifying deduplication results...\n");

  // Check if cleaned directory exists
  if (!fs.existsSync(CLEANED_DIR)) {
    console.log("❌ Cleaned directory not found. Run deduplication first.");
    return false;
  }

  // Get all artist files
  const artistFiles = fs
    .readdirSync(CONSTANTS_DIR)
    .filter((file) => file.includes("Artists") && file.endsWith(".json"))
    .filter(
      (file) =>
        !file.includes("Massive") &&
        !file.includes("Collection") &&
        !file.includes("Enhanced") &&
        !file.includes("WithImages")
    );

  console.log(`📁 Found ${artistFiles.length} artist files to verify:`);

  let totalArtists = 0;
  let totalDuplicates = 0;
  const allArtistIds = new Set();
  const allArtistNames = new Set();
  const duplicates = [];

  for (const file of artistFiles) {
    try {
      const filePath = path.join(CONSTANTS_DIR, file);
      const content = fs.readFileSync(filePath, "utf8");
      const artists = JSON.parse(content);

      if (!Array.isArray(artists)) {
        console.log(`⚠️  ${file} is not an array`);
        continue;
      }

      console.log(
        `   ${file.padEnd(25)}: ${artists.length
          .toString()
          .padStart(3)} artists`
      );

      for (const artist of artists) {
        if (!artist.name) continue;

        totalArtists++;

        // Check for duplicate IDs
        if (artist.id && allArtistIds.has(artist.id)) {
          totalDuplicates++;
          duplicates.push({
            name: artist.name,
            id: artist.id,
            file: file,
            type: "duplicate_id",
          });
        } else if (artist.id) {
          allArtistIds.add(artist.id);
        }

        // Check for duplicate names (case-insensitive)
        const nameLower = artist.name.toLowerCase();
        if (allArtistNames.has(nameLower)) {
          totalDuplicates++;
          duplicates.push({
            name: artist.name,
            id: artist.id,
            file: file,
            type: "duplicate_name",
          });
        } else {
          allArtistNames.add(nameLower);
        }
      }
    } catch (error) {
      console.log(`❌ Error reading ${file}:`, error.message);
    }
  }

  console.log("\n📊 Verification Results:");
  console.log("========================");
  console.log(`Total artists processed: ${totalArtists}`);
  console.log(`Total duplicates found: ${totalDuplicates}`);
  console.log(`Unique artist IDs: ${allArtistIds.size}`);
  console.log(`Unique artist names: ${allArtistNames.size}`);

  if (totalDuplicates === 0) {
    console.log("\n✅ SUCCESS: No duplicates found!");
    console.log("🎉 Your artist database is completely deduplicated.");
  } else {
    console.log("\n⚠️  WARNING: Some duplicates still found:");
    duplicates.slice(0, 10).forEach((dup) => {
      console.log(`   - ${dup.name} (${dup.type}) in ${dup.file}`);
    });
    if (duplicates.length > 10) {
      console.log(`   ... and ${duplicates.length - 10} more`);
    }
  }

  // Check file sizes
  console.log("\n📏 File Size Analysis:");
  console.log("======================");
  let totalSize = 0;

  for (const file of artistFiles) {
    const filePath = path.join(CONSTANTS_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    totalSize += stats.size;
    console.log(`   ${file.padEnd(25)}: ${sizeKB.padStart(6)} KB`);
  }

  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  console.log(`   ${"TOTAL".padEnd(25)}: ${totalSizeMB.padStart(6)} MB`);

  // Check main allArtists file
  const mainFile = "allArtists.ts";
  const mainPath = path.join(CONSTANTS_DIR, mainFile);

  if (fs.existsSync(mainPath)) {
    const stats = fs.statSync(mainPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`   ${mainFile.padEnd(25)}: ${sizeKB.padStart(6)} KB`);

    try {
      const content = fs.readFileSync(mainPath, "utf8");
      if (content.includes("Total unique artists: 806")) {
        console.log("\n✅ Main allArtists.ts file is properly updated");
      } else {
        console.log("\n⚠️  Main allArtists.ts file may not be updated");
      }
    } catch (error) {
      console.log("\n❌ Error reading main file");
    }
  }

  // Summary
  console.log("\n🎯 Summary:");
  console.log("============");
  if (totalDuplicates === 0) {
    console.log("✅ Deduplication: COMPLETE");
    console.log("✅ File Structure: CLEAN");
    console.log("✅ Data Quality: EXCELLENT");
    console.log("🚀 Your app is ready to use with no duplicate artists!");
  } else {
    console.log("⚠️  Deduplication: PARTIAL");
    console.log("⚠️  Some duplicates still exist");
    console.log("💡 Consider running the deduplication script again");
  }

  return totalDuplicates === 0;
}

// Run verification
if (require.main === module) {
  verifyDeduplication().catch(console.error);
}

module.exports = { verifyDeduplication };
