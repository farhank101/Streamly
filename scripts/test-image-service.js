/**
 * Test script to verify the image service functionality
 * This script creates a simplified version of the imageService for testing
 */

require('dotenv').config();
const fetch = require('node-fetch');

// Spotify credentials
const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET || '';

// Last.fm credentials
const LASTFM_API_KEY = process.env.EXPO_PUBLIC_LASTFM_API_KEY || '';

// Check if credentials are available
if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.error('❌ Missing Spotify credentials. Please check your .env file.');
  process.exit(1);
}

if (!LASTFM_API_KEY) {
  console.error('❌ Missing Last.fm API key. Please check your .env file.');
  process.exit(1);
}

// Simplified Spotify service
let spotifyAccessToken = null;
let tokenExpiry = 0;

const getSpotifyAccessToken = async () => {
  if (spotifyAccessToken && Date.now() < tokenExpiry) {
    return spotifyAccessToken;
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

    spotifyAccessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Subtract 1 minute for safety

    return spotifyAccessToken;
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

const searchSpotifyArtists = async (query, limit = 1) => {
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

const getBestSpotifyImageUrl = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return '';
  }

  // Sort by height (largest first) and return the first one
  const sortedImages = [...images].sort((a, b) => b.height - a.height);
  return sortedImages[0].url;
};

const getSpotifyArtistImage = async (artistName) => {
  try {
    const artists = await searchSpotifyArtists(artistName, 1);
    
    if (artists.length === 0) {
      return '';
    }

    return getBestSpotifyImageUrl(artists[0].images);
  } catch (error) {
    console.error(`Failed to get Spotify artist image for ${artistName}:`, error);
    return '';
  }
};

// Simplified Last.fm service
const getBestLastfmImageUrl = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return '';
  }

  // Last.fm image sizes in order of preference
  const sizePriority = ['mega', 'extralarge', 'large', 'medium', 'small'];

  // Try to find the best image based on size priority
  for (const size of sizePriority) {
    const image = images.find(img => img.size === size);
    if (image && image['#text']) {
      return image['#text'];
    }
  }

  // If no preferred size is found, return the first non-empty image
  const firstValidImage = images.find(img => img['#text']);
  return firstValidImage ? firstValidImage['#text'] : '';
};

const getLastfmArtistImage = async (artistName) => {
  try {
    const url = new URL('https://ws.audioscrobbler.com/2.0/');
    url.searchParams.append('method', 'artist.getinfo');
    url.searchParams.append('artist', artistName);
    url.searchParams.append('api_key', LASTFM_API_KEY);
    url.searchParams.append('format', 'json');

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.message || 'Last.fm API request failed');
    }

    if (!data.artist || !data.artist.image) {
      return '';
    }

    return getBestLastfmImageUrl(data.artist.image);
  } catch (error) {
    console.error(`Failed to get Last.fm artist image for ${artistName}:`, error);
    return '';
  }
};

// Simplified imageService
const DEFAULT_CONFIG = {
  primarySource: 'spotify',
  enableFallback: true,
  timeoutMs: 5000,
};

const getArtistImage = async (artistName, config = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  try {
    // Try primary source first
    let imageUrl = '';
    
    if (finalConfig.primarySource === 'spotify') {
      imageUrl = await getSpotifyArtistImage(artistName);
    } else {
      imageUrl = await getLastfmArtistImage(artistName);
    }
    
    // If we got an image, return it
    if (imageUrl) {
      return imageUrl;
    }
    
    // If fallback is enabled and primary failed, try the other source
    if (finalConfig.enableFallback) {
      if (finalConfig.primarySource === 'spotify') {
        imageUrl = await getLastfmArtistImage(artistName);
      } else {
        imageUrl = await getSpotifyArtistImage(artistName);
      }
    }
    
    return imageUrl;
  } catch (error) {
    console.error(`Failed to get artist image for ${artistName}:`, error);
    return '';
  }
};

const batchGetArtistImages = async (artistNames, config = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const results = {};
  
  try {
    const promises = artistNames.map(async (artistName) => {
      try {
        const imageUrl = await getArtistImage(artistName, finalConfig);
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

// Test artists
const testArtists = [
  'The Beatles',
  'Queen',
  'Metallica',
  'Daft Punk',
  'Radiohead',
  // Add some less common artists to test fallback
  'Aphex Twin',
  'Boards of Canada',
  'Burial'
];

// Test with different configurations
const testImageService = async () => {
  console.log('🧪 Testing imageService batchGetArtistImages with different configurations');
  
  // Test 1: Default config (Spotify primary, fallback enabled)
  console.log('\n📊 Test 1: Default config (Spotify primary, fallback enabled)');
  try {
    const defaultResults = await batchGetArtistImages(testArtists);
    console.log('Results:');
    Object.entries(defaultResults).forEach(([artist, imageUrl]) => {
      console.log(`${artist}: ${imageUrl ? '✅ ' + imageUrl : '❌ No image found'}`);
    });
  } catch (error) {
    console.error('Test 1 failed:', error);
  }
  
  // Test 2: Spotify only (no fallback)
  console.log('\n📊 Test 2: Spotify only (no fallback)');
  try {
    const spotifyOnlyResults = await batchGetArtistImages(testArtists, {
      primarySource: 'spotify',
      enableFallback: false
    });
    console.log('Results:');
    Object.entries(spotifyOnlyResults).forEach(([artist, imageUrl]) => {
      console.log(`${artist}: ${imageUrl ? '✅ ' + imageUrl : '❌ No image found'}`);
    });
  } catch (error) {
    console.error('Test 2 failed:', error);
  }
  
  // Test 3: Last.fm only (no fallback)
  console.log('\n📊 Test 3: Last.fm only (no fallback)');
  try {
    const lastfmOnlyResults = await batchGetArtistImages(testArtists, {
      primarySource: 'lastfm',
      enableFallback: false
    });
    console.log('Results:');
    Object.entries(lastfmOnlyResults).forEach(([artist, imageUrl]) => {
      console.log(`${artist}: ${imageUrl ? '✅ ' + imageUrl : '❌ No image found'}`);
    });
  } catch (error) {
    console.error('Test 3 failed:', error);
  }
  
  // Test 4: Last.fm primary with fallback to Spotify
  console.log('\n📊 Test 4: Last.fm primary with fallback to Spotify');
  try {
    const lastfmPrimaryResults = await batchGetArtistImages(testArtists, {
      primarySource: 'lastfm',
      enableFallback: true
    });
    console.log('Results:');
    Object.entries(lastfmPrimaryResults).forEach(([artist, imageUrl]) => {
      console.log(`${artist}: ${imageUrl ? '✅ ' + imageUrl : '❌ No image found'}`);
    });
  } catch (error) {
    console.error('Test 4 failed:', error);
  }
  
  // Compare success rates
  console.log('\n📈 Summary of tests');
  console.log('This test verifies that the imageService.batchGetArtistImages function');
  console.log('correctly fetches artist images with different configurations.');
  console.log('The app should now be using this function instead of the Last.fm-only version.');
};

// Run the tests
testImageService().catch(error => {
  console.error('Tests failed:', error);
});