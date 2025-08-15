// Test script for Spotify image service
const fs = require('fs');
const path = require('path');

// Mock the environment variables
process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID = 'c0ff3006f38b43d39a0c89fd2827b7ec';
process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET = '398d5fd84007497f948fd1011710abf0';

// Import the necessary modules
const { getSpotifyAccessToken, getArtistImage } = require('./dist/services/spotify');

async function testSpotifyAPI() {
  try {
    console.log('Testing Spotify API...');
    
    // Test getting access token
    console.log('Getting Spotify access token...');
    const token = await getSpotifyAccessToken();
    console.log('Access token obtained:', token ? 'Yes' : 'No');
    
    // Test getting artist image
    console.log('\nTesting artist image retrieval:');
    const artists = ['Taylor Swift', 'The Beatles', 'Beyoncé', 'Kendrick Lamar'];
    
    for (const artist of artists) {
      try {
        console.log(`\nSearching for ${artist}...`);
        const imageUrl = await getArtistImage(artist);
        console.log(`Result for ${artist}: ${imageUrl || 'No image found'}`);
      } catch (error) {
        console.error(`Error getting image for ${artist}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSpotifyAPI();