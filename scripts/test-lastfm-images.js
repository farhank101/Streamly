const {
  getArtistImage,
  getTrackImage,
  getAlbumImage,
  batchGetArtistImages,
  batchGetTrackImages,
} = require("../services/lastfm");

// Test artist names
const testArtists = [
  "The Smiths",
  "The Clash",
  "Joy Division",
  "Queen",
  "David Bowie",
  "The Beatles",
  "Pink Floyd",
  "Led Zeppelin",
];

// Test tracks
const testTracks = [
  { name: "Bohemian Rhapsody", artist: "Queen" },
  { name: "Stairway to Heaven", artist: "Led Zeppelin" },
  { name: "Imagine", artist: "John Lennon" },
  { name: "Hotel California", artist: "Eagles" },
];

// Test albums
const testAlbums = [
  { name: "Abbey Road", artist: "The Beatles" },
  { name: "The Dark Side of the Moon", artist: "Pink Floyd" },
  { name: "A Night at the Opera", artist: "Queen" },
  { name: "Led Zeppelin IV", artist: "Led Zeppelin" },
];

async function testIndividualArtistImages() {
  console.log("🎵 Testing individual artist image fetching...\n");

  for (const artist of testArtists) {
    try {
      console.log(`🔍 Fetching image for: ${artist}`);
      const imageUrl = await getArtistImage(artist);
      console.log(`✅ ${artist}: ${imageUrl || "No image found"}\n`);
    } catch (error) {
      console.error(`❌ Failed to get image for ${artist}:`, error.message);
    }
  }
}

async function testBatchArtistImages() {
  console.log("🎵 Testing batch artist image fetching...\n");

  try {
    console.log("🔍 Fetching images for all artists...");
    const images = await batchGetArtistImages(testArtists);

    console.log("✅ Batch results:");
    Object.entries(images).forEach(([artist, imageUrl]) => {
      console.log(`   ${artist}: ${imageUrl || "No image found"}`);
    });
    console.log("");
  } catch (error) {
    console.error("❌ Batch fetch failed:", error.message);
  }
}

async function testTrackImages() {
  console.log("🎵 Testing track image fetching...\n");

  for (const track of testTracks) {
    try {
      console.log(`🔍 Fetching image for: ${track.name} by ${track.artist}`);
      const imageUrl = await getTrackImage(track.name, track.artist);
      console.log(`✅ ${track.name}: ${imageUrl || "No image found"}\n`);
    } catch (error) {
      console.error(`❌ Failed to get image for ${track.name}:`, error.message);
    }
  }
}

async function testAlbumImages() {
  console.log("🎵 Testing album image fetching...\n");

  for (const album of testAlbums) {
    try {
      console.log(`🔍 Fetching image for: ${album.name} by ${album.artist}`);
      const imageUrl = await getAlbumImage(album.name, album.artist);
      console.log(`✅ ${album.name}: ${imageUrl || "No image found"}\n`);
    } catch (error) {
      console.error(`❌ Failed to get image for ${album.name}:`, error.message);
    }
  }
}

async function testBatchTrackImages() {
  console.log("🎵 Testing batch track image fetching...\n");

  try {
    console.log("🔍 Fetching images for all tracks...");
    const images = await batchGetTrackImages(testTracks);

    console.log("✅ Batch results:");
    Object.entries(images).forEach(([trackKey, imageUrl]) => {
      console.log(`   ${trackKey}: ${imageUrl || "No image found"}`);
    });
    console.log("");
  } catch (error) {
    console.error("❌ Batch track fetch failed:", error.message);
  }
}

async function runAllTests() {
  console.log("🚀 Starting Last.fm Image Fetching Tests\n");
  console.log("=".repeat(50));

  await testIndividualArtistImages();
  console.log("=".repeat(50));

  await testBatchArtistImages();
  console.log("=".repeat(50));

  await testTrackImages();
  console.log("=".repeat(50));

  await testAlbumImages();
  console.log("=".repeat(50));

  await testBatchTrackImages();
  console.log("=".repeat(50));

  console.log("🎉 All tests completed!");
}

// Run the tests
runAllTests().catch(console.error);
