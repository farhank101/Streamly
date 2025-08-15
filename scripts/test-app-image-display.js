/**
 * Test script to check image display in the app context
 * This script simulates the app's image handling process
 */

require('dotenv').config();
const fs = require('fs');

// Get Spotify credentials from environment variables
const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET || '';

// Check if credentials are available
if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.error('❌ Missing Spotify credentials. Please check your .env file.');
  process.exit(1);
}

// Simplified Spotify service functions
let accessToken = null;
let tokenExpiry = 0;

const getSpotifyAccessToken = async () => {
  // Check if we have a valid token
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_description || 'Failed to get Spotify access token');
    }

    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Subtract 1 minute for safety

    return accessToken;
  } catch (error) {
    console.error('Spotify access token error:', error);
    throw error;
  }
};

const makeSpotifyRequest = async (endpoint, params) => {
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
};

const searchArtists = async (query, limit = 1) => {
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
};

const getBestImageUrl = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return '';
  }

  // Sort by height (largest first) and return the first one
  const sortedImages = [...images].sort((a, b) => b.height - a.height);
  return sortedImages[0].url;
};

const getArtistImage = async (artistName) => {
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
};

// Batch fetch images for multiple artists
const batchGetArtistImages = async (artistNames) => {
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
};

// Safe image source resolver with proper fallbacks (similar to the app)
const getSafeImageSource = (item) => {
  try {
    // Priority 1: Local image (not applicable in this test)
    
    // Priority 2: Remote image URL
    if (item.image && typeof item.image === "string" && item.image.trim() !== "") {
      return { uri: item.image.trim() };
    }

    // Priority 3: Default placeholder
    return {
      uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    };
  } catch (error) {
    console.error("Error in getSafeImageSource:", error);
    return {
      uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    };
  }
};

// Test the app's image handling process
const testAppImageHandling = async () => {
  console.log('🧪 Testing app image handling process');
  
  // Mock data similar to the app's recommendedArtistsSeed
  const recommendedArtistsSeed = [
    {
      id: "artist_1",
      name: "The Smiths",
      imageKey: "artist_smiths",
      image: "https://picsum.photos/300/300?random=1",
      likes: "371K",
    },
    {
      id: "artist_2",
      name: "The Clash",
      imageKey: "artist_clash",
      image: "https://picsum.photos/300/300?random=2",
      likes: "361K",
    },
    {
      id: "artist_3",
      name: "Joy Division",
      imageKey: "artist_joy_division",
      image: "https://picsum.photos/300/300?random=3",
      likes: "298K",
    },
  ];

  // Mock artist name mapping similar to the app
  const artistNameMapping = {
    "The Smiths": "Morrissey",
    "The Clash": "Joe Strummer",
  };

  console.log('\n📋 Initial artist data:');
  recommendedArtistsSeed.forEach(artist => {
    console.log(`${artist.name}: ${artist.image}`);
    // Check if the image URL is valid
    const imageSource = getSafeImageSource(artist);
    console.log(`   Image source: ${JSON.stringify(imageSource)}`);
  });

  // Simulate the hydrateArtists function from the app
  console.log('\n🔄 Simulating hydrateArtists function...');
  
  try {
    // Use alternative names for better results
    const artistNames = recommendedArtistsSeed.map(
      (a) => artistNameMapping[a.name] || a.name
    );
    console.log("🎵 Artist names to fetch:", artistNames);

    const artistImages = await batchGetArtistImages(artistNames);
    console.log("🖼️ Batch fetched artist images:", artistImages);

    const updated = recommendedArtistsSeed.map((a) => {
      const searchName = artistNameMapping[a.name] || a.name;
      const spotifyImage = artistImages[searchName];
      console.log(
        `🖼️ Spotify image for ${a.name} (searched as ${searchName}):`,
        spotifyImage
      );

      // Use Spotify image if available, otherwise keep original
      const finalImage = spotifyImage || a.image;
      console.log(`✅ Final image for ${a.name}:`, finalImage);

      return { ...a, image: finalImage };
    });

    console.log("🎉 Artists updated:", updated);
    
    // Simulate rendering the updated artists
    console.log('\n🖼️ Simulating rendering updated artists:');
    updated.forEach(artist => {
      const imageSource = getSafeImageSource(artist);
      console.log(`Rendering ${artist.name} with image source: ${JSON.stringify(imageSource)}`);
      
      // Check if the image URL is a valid Spotify URL
      const isSpotifyUrl = artist.image && artist.image.includes('scdn.co');
      console.log(`   Is Spotify URL: ${isSpotifyUrl ? 'Yes' : 'No'}`);
      
      // Check if the image would be displayed correctly
      if (artist.image) {
        const imageUrlValid = artist.image.startsWith('http') || artist.image.startsWith('https');
        console.log(`   Image URL format valid: ${imageUrlValid ? 'Yes' : 'No'}`);
        
        // Test if the image URL is accessible
        fetch(artist.image, { method: 'HEAD' })
          .then(response => {
            console.log(`   Image URL accessible: ${response.ok ? 'Yes' : 'No'} (${response.status})`);
          })
          .catch(error => {
            console.log(`   Image URL accessible: No (Error: ${error.message})`);
          });
      } else {
        console.log(`   Image URL format valid: No (Empty URL)`);
      }
    });
    
    // Wait for fetch operations to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  } catch (error) {
    console.error("❌ Error in hydrateArtists simulation:", error);
  }
};

// Run the test
testAppImageHandling().catch(error => {
  console.error('Test failed:', error);
});