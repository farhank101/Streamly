/**
 * Simple test for Spotify artist image fetching
 * This script tests fetching artist images directly from Spotify API
 * with hardcoded credentials for testing purposes
 */

// Hardcode credentials for testing
const SPOTIFY_CLIENT_ID = 'c0ff3006f38b43d39a0c89fd2827b7ec';
const SPOTIFY_CLIENT_SECRET = '398d5fd84007497f948fd1011710abf0';

async function getSpotifyAccessToken() {
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

    return data.access_token;
  } catch (error) {
    console.error('Spotify access token error:', error);
    throw error;
  }
}

async function searchArtists(query, limit = 1) {
  try {
    const token = await getSpotifyAccessToken();
    
    const url = new URL('https://api.spotify.com/v1/search');
    url.searchParams.append('q', query);
    url.searchParams.append('type', 'artist');
    url.searchParams.append('limit', limit.toString());

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

    return data.artists?.items || [];
  } catch (error) {
    console.error('Spotify artist search error:', error);
    throw error;
  }
}

async function getBestImageUrl(images) {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return '';
  }

  // Sort by height (largest first) and return the first one
  const sortedImages = [...images].sort((a, b) => b.height - a.height);
  return sortedImages[0].url;
}

async function testArtistImages() {
  // Test with the exact artist names from the app
  const artistsToTest = [
    'The Smiths',
    'The Clash',
    'Joy Division',
    'Queen'
  ];

  console.log('Testing direct Spotify API artist image fetching...');
  
  for (const artistName of artistsToTest) {
    try {
      console.log(`\nSearching for artist: ${artistName}`);
      const artists = await searchArtists(artistName, 1);
      
      if (artists.length === 0) {
        console.log(`No results found for ${artistName}`);
        continue;
      }
      
      const artist = artists[0];
      console.log(`Found artist: ${artist.name} (ID: ${artist.id})`);
      
      if (artist.name.toLowerCase() !== artistName.toLowerCase()) {
        console.log(`⚠️ Warning: Found artist name "${artist.name}" doesn't exactly match search query "${artistName}"`);
      }
      
      const imageUrl = await getBestImageUrl(artist.images);
      console.log(`Image URL: ${imageUrl}`);
      
      if (!imageUrl) {
        console.log(`❌ No image found for ${artistName}`);
      } else {
        console.log(`✅ Successfully found image for ${artistName}`);
      }
    } catch (error) {
      console.error(`Error testing ${artistName}:`, error);
    }
  }
}

// Run the test
testArtistImages().catch(console.error);