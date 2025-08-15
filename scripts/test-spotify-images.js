/**
 * Test Spotify Image Fetching
 * This script tests fetching artist images from Spotify API
 */

require('dotenv').config();

// Test artists
const testArtists = [
  'The Beatles',
  'Queen',
  'Metallica',
  'Daft Punk',
  'Radiohead'
];

// Mock Spotify API functions for testing
const API_KEYS = {
  SPOTIFY_CLIENT_ID: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET
};

// Get Spotify access token
async function getSpotifyAccessToken() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${API_KEYS.SPOTIFY_CLIENT_ID}:${API_KEYS.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_description || 'Failed to get Spotify access token');
    }

    return data.access_token;
  } catch (error) {
    console.error('Spotify access token error:', error);
    throw error;
  }
}

// Make Spotify API request
async function makeSpotifyRequest(endpoint, params) {
  try {
    const token = await getSpotifyAccessToken();
    
    const url = new URL(`https://api.spotify.com/v1${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Spotify API request failed');
    }

    return data;
  } catch (error) {
    console.error('Spotify API request error:', error);
    throw error;
  }
}

// Search for artists
async function searchArtists(query, limit = 1) {
  try {
    const data = await makeSpotifyRequest('/search', {
      q: query,
      type: 'artist',
      limit: limit.toString(),
    });

    return data.artists?.items || [];
  } catch (error) {
    console.error('Spotify artist search error:', error);
    throw error;
  }
}

// Get best image URL
function getBestImageUrl(images) {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return '';
  }

  // Sort by height (largest first) and return the first one
  const sortedImages = [...images].sort((a, b) => b.height - a.height);
  return sortedImages[0].url;
}

// Get artist image
async function getArtistImage(artistName) {
  try {
    const artists = await searchArtists(artistName, 1);
    
    if (artists.length === 0) {
      return '';
    }

    return getBestImageUrl(artists[0].images);
  } catch (error) {
    console.error(`Failed to get artist image for ${artistName}:`, error);
    return '';
  }
}

// Batch get artist images
async function batchGetArtistImages(artistNames) {
  const results = {};
  
  try {
    const promises = artistNames.map(async (artistName) => {
      try {
        const imageUrl = await getArtistImage(artistName);
        return { artistName, imageUrl };
      } catch (error) {
        console.error(`Failed to get image for ${artistName}:`, error);
        return { artistName, imageUrl: '' };
      }
    });

    const resolved = await Promise.all(promises);
    
    resolved.forEach(({ artistName, imageUrl }) => {
      results[artistName] = imageUrl;
    });
  } catch (error) {
    console.error('Batch artist image fetch error:', error);
  }

  return results;
}

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

async function runTests() {
  console.log("🚀 Starting Spotify image tests...\n");
  
  // Check environment variables
  console.log("📋 Checking Environment Variables:");
  console.log(`SPOTIFY_CLIENT_ID: ${process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ? "✅ Present" : "❌ Missing"}`);
  console.log(`SPOTIFY_CLIENT_SECRET: ${process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET ? "✅ Present" : "❌ Missing"}`);
  console.log();
  
  await testIndividualArtistImages();
  await testBatchArtistImages();
  
  console.log("🏁 All tests completed");
}

runTests().catch(console.error);