const fs = require("fs");
const path = require("path");

// Configuration
const CONSTANTS_DIR = path.join(__dirname, "../constants");
const CLEANED_DIR = path.join(__dirname, "../constants/cleaned");
const FINAL_DIR = path.join(__dirname, "../constants/final");

// Ensure final directory exists
if (!fs.existsSync(FINAL_DIR)) {
  fs.mkdirSync(FINAL_DIR, { recursive: true });
}

async function createFinalCleanStructure() {
  console.log("🎯 Creating final clean artist structure...\n");

  // Read the deduplicated main file
  const mainFile = path.join(CONSTANTS_DIR, "allGenreArtists.json");
  const mainContent = fs.readFileSync(mainFile, "utf8");
  const allArtists = JSON.parse(mainContent);

  console.log(`📊 Processing ${allArtists.length} unique artists...`);

  // Create genre buckets
  const genreBuckets = {};
  const unassignedArtists = [];

  for (const artist of allArtists) {
    // Determine primary genre
    let primaryGenre = artist.primaryGenre || "";

    // If no primary genre, try to determine from genres array
    if (!primaryGenre && artist.genres && artist.genres.length > 0) {
      const genre = artist.genres[0];
      if (genre.includes("rock")) primaryGenre = "rock";
      else if (genre.includes("pop")) primaryGenre = "pop";
      else if (genre.includes("hip") || genre.includes("rap"))
        primaryGenre = "hiphop";
      else if (genre.includes("jazz")) primaryGenre = "jazz";
      else if (genre.includes("classical")) primaryGenre = "classical";
      else if (genre.includes("country")) primaryGenre = "country";
      else if (genre.includes("metal")) primaryGenre = "metal";
      else if (genre.includes("folk")) primaryGenre = "folk";
      else if (genre.includes("blues")) primaryGenre = "blues";
      else if (genre.includes("reggae")) primaryGenre = "reggae";
      else if (genre.includes("punk")) primaryGenre = "punk";
      else if (genre.includes("soul") || genre.includes("funk"))
        primaryGenre = "soul_funk";
      else if (genre.includes("latin")) primaryGenre = "latin";
      else if (genre.includes("indie")) primaryGenre = "indie";
      else if (
        genre.includes("electronic") ||
        genre.includes("edm") ||
        genre.includes("dance")
      )
        primaryGenre = "electronic";
      else if (genre.includes("bollywood") || genre.includes("hindi"))
        primaryGenre = "bollywood";
      else primaryGenre = "other";
    }

    // If still no genre, check the genre field
    if (!primaryGenre && artist.genre) {
      const genre = artist.genre.toLowerCase();
      if (genre.includes("rock")) primaryGenre = "rock";
      else if (genre.includes("pop")) primaryGenre = "pop";
      else if (genre.includes("hip") || genre.includes("rap"))
        primaryGenre = "hiphop";
      else if (genre.includes("jazz")) primaryGenre = "jazz";
      else if (genre.includes("classical")) primaryGenre = "classical";
      else if (genre.includes("country")) primaryGenre = "country";
      else if (genre.includes("metal")) primaryGenre = "metal";
      else if (genre.includes("folk")) primaryGenre = "folk";
      else if (genre.includes("blues")) primaryGenre = "blues";
      else if (genre.includes("reggae")) primaryGenre = "reggae";
      else if (genre.includes("punk")) primaryGenre = "punk";
      else if (genre.includes("soul") || genre.includes("funk"))
        primaryGenre = "soul_funk";
      else if (genre.includes("latin")) primaryGenre = "latin";
      else if (genre.includes("indie")) primaryGenre = "indie";
      else if (
        genre.includes("electronic") ||
        genre.includes("edm") ||
        genre.includes("dance")
      )
        primaryGenre = "electronic";
      else if (genre.includes("bollywood") || genre.includes("hindi"))
        primaryGenre = "bollywood";
      else primaryGenre = "other";
    }

    // If still no genre, assign to other
    if (!primaryGenre) {
      primaryGenre = "other";
    }

    // Add to appropriate bucket
    if (!genreBuckets[primaryGenre]) {
      genreBuckets[primaryGenre] = [];
    }

    genreBuckets[primaryGenre].push(artist);
  }

  console.log("\n📊 Genre Distribution:");
  console.log("=======================");
  Object.entries(genreBuckets).forEach(([genre, artists]) => {
    console.log(
      `${genre.padEnd(15)}: ${artists.length.toString().padStart(3)} artists`
    );
  });

  // Save genre-specific files
  console.log("\n💾 Saving clean genre files...");
  let totalSaved = 0;

  for (const [genre, artists] of Object.entries(genreBuckets)) {
    if (artists.length === 0) continue;

    // Sort by popularity
    artists.sort(
      (a, b) => (b.spotifyPopularity || 0) - (a.spotifyPopularity || 0)
    );

    const filename = `${genre}Artists.json`;
    const filePath = path.join(FINAL_DIR, filename);

    fs.writeFileSync(filePath, JSON.stringify(artists, null, 2));
    console.log(`   ✅ Saved ${filename} (${artists.length} artists)`);
    totalSaved++;
  }

  // Create a summary
  const summary = {
    totalArtists: allArtists.length,
    genreBreakdown: Object.fromEntries(
      Object.entries(genreBuckets).map(([genre, artists]) => [
        genre,
        artists.length,
      ])
    ),
    timestamp: new Date().toISOString(),
  };

  const summaryPath = path.join(FINAL_DIR, "finalStructureSummary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`   ✅ Saved finalStructureSummary.json`);

  console.log("\n🎉 Final clean structure created!");
  console.log(`📁 Check the '${FINAL_DIR}' directory for clean files.`);
  console.log(
    `📊 Total artists: ${allArtists.length}, Files created: ${totalSaved}`
  );

  return { genreBuckets, totalSaved };
}

// Run the creation
if (require.main === module) {
  createFinalCleanStructure().catch(console.error);
}

module.exports = { createFinalCleanStructure };
