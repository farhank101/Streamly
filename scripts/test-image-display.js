/**
 * Test script to check image display in the app
 * This script is completely self-contained and doesn't require any imports
 * from the project to test Spotify image fetching and display
 */

// Import dotenv to load environment variables
require('dotenv').config();

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

// Mock the UI rendering process
const testImageDisplay = async () => {
  console.log('🧪 Testing image display process');
  
  // Check environment variables
  console.log('📋 Checking Environment Variables:');
  console.log(`SPOTIFY_CLIENT_ID: ${SPOTIFY_CLIENT_ID ? '✅ Present' : '❌ Missing'}`);
  console.log(`SPOTIFY_CLIENT_SECRET: ${SPOTIFY_CLIENT_SECRET ? '✅ Present' : '❌ Missing'}`);
  
  // Test artists
  const artists = [
    { name: 'The Beatles', image: 'https://picsum.photos/300/300?random=1' },
    { name: 'Queen', image: 'https://picsum.photos/300/300?random=2' },
    { name: 'Metallica', image: 'https://picsum.photos/300/300?random=3' }
  ];

  console.log('\n📋 Initial artist data:');
  artists.forEach(artist => {
    console.log(`${artist.name}: ${artist.image}`);
  });

  // Fetch images from Spotify
  console.log('\n🔄 Fetching images from Spotify...');
  for (const artist of artists) {
    try {
      const spotifyImage = await getArtistImage(artist.name);
      console.log(`✅ Spotify image for ${artist.name}: ${spotifyImage}`);
      
      // Simulate the image update process in the app
      const oldImage = artist.image;
      artist.image = spotifyImage || artist.image;
      
      console.log(`🔄 Image update for ${artist.name}:`);
      console.log(`   Before: ${oldImage}`);
      console.log(`   After: ${artist.image}`);
      console.log(`   Changed: ${oldImage !== artist.image ? 'Yes' : 'No'}`);
      
      // Check if the image URL is valid
      if (artist.image) {
        try {
          const response = await fetch(artist.image, { method: 'HEAD' });
          console.log(`   Image URL valid: ${response.ok ? 'Yes' : 'No'} (${response.status})`);
        } catch (error) {
          console.log(`   Image URL valid: No (Error: ${error.message})`);
        }
      }
    } catch (error) {
      console.error(`❌ Error fetching image for ${artist.name}:`, error);
    }
  }

  // Check final state
  console.log('\n📋 Final artist data:');
  artists.forEach(artist => {
    console.log(`${artist.name}: ${artist.image}`);
  });

  // Simulate image rendering
  console.log('\n🖼️ Simulating image rendering:');
  artists.forEach(artist => {
    const imageSource = artist.image ? { uri: artist.image } : { uri: 'placeholder_image' };
    console.log(`Rendering ${artist.name} with image source:`, imageSource);
    
    // Check if the image URL is a valid Spotify URL
    const isSpotifyUrl = artist.image && artist.image.includes('scdn.co');
    console.log(`   Is Spotify URL: ${isSpotifyUrl ? 'Yes' : 'No'}`);
    
    // Check if the image would be displayed correctly
    if (artist.image) {
      const imageUrlValid = artist.image.startsWith('http') || artist.image.startsWith('https');
      console.log(`   Image URL format valid: ${imageUrlValid ? 'Yes' : 'No'}`);
    } else {
      console.log(`   Image URL format valid: No (Empty URL)`);
    }
  });
};

// Run the test
testImageDisplay().catch(error => {
  console.error('Test failed:', error);
});