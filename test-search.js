/**
 * Test Script for Search Functionality
 * Run this to test if the search is working properly
 */

const testSearch = async () => {
  console.log("🧪 Testing Search Functionality...");
  
  try {
    // Test 1: Basic search
    console.log("\n🔍 Test 1: Basic search for 'Saajna'");
    const searchResults = await searchYouTube("Saajna", 5);
    console.log(`✅ Found ${searchResults.tracks.length} tracks`);
    
    if (searchResults.tracks.length > 0) {
      const firstTrack = searchResults.tracks[0];
      console.log("📱 First track:", {
        title: firstTrack.title,
        artist: firstTrack.artist,
        sourceId: firstTrack.sourceId
      });
    }
    
    // Test 2: Trending music
    console.log("\n🔥 Test 2: Getting trending music");
    const trendingMusic = await getMockTrendingMusic();
    console.log(`✅ Found ${trendingMusic.length} trending tracks`);
    
    // Test 3: Audio stream extraction
    if (searchResults.tracks.length > 0) {
      console.log("\n🎵 Test 3: Audio stream extraction");
      const testTrack = searchResults.tracks[0];
      try {
        const streamUrl = await getYouTubeStreamUrl(testTrack.sourceId, 'medium');
        console.log("✅ Stream URL extracted:", streamUrl.substring(0, 100) + "...");
      } catch (error) {
        console.log("⚠️ Stream extraction failed (expected for some videos):", error.message);
      }
    }
    
    console.log("\n🎉 Search functionality test completed!");
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

// Export for use in the app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testSearch };
}

// Run test if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  testSearch();
}
