// Test script for Spotify image service
const fs = require('fs');
const path = require('path');

// Set environment variables
process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID = 'c0ff3006f38b43d39a0c89fd2827b7ec';
process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET = '398d5fd84007497f948fd1011710abf0';

// Simple fetch implementation to test Spotify API directly
async function getSpotifyToken() {
  const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;
  
  console.log('Using credentials:', { clientId, clientSecret });
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get token: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw error;
  }
}

async function searchSpotifyArtist(token, artistName) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Search failed: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    return data.artists.items[0];
  } catch (error) {
    console.error(`Error searching for artist ${artistName}:`, error);
    throw error;
  }
}

async function testSpotifyAPI() {
  try {
    console.log('Testing Spotify API directly...');
    
    // Get token
    const token = await getSpotifyToken();
    console.log('Access token obtained successfully');
    
    // Test artist search
    const artists = ['Taylor Swift', 'The Beatles', 'Beyoncé', 'Kendrick Lamar'];
    
    for (const artistName of artists) {
      try {
        console.log(`\nSearching for ${artistName}...`);
        const artist = await searchSpotifyArtist(token, artistName);
        
        if (artist && artist.images && artist.images.length > 0) {
          console.log(`Found ${artist.name} (${artist.id})`);
          console.log(`Image URL: ${artist.images[0].url}`);
        } else {
          console.log(`No images found for ${artistName}`);
        }
      } catch (error) {
        console.error(`Failed for ${artistName}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSpotifyAPI();