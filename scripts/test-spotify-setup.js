/**
 * Test Spotify API Setup
 * This script helps verify that your Spotify API credentials are working correctly
 */

// Load environment variables from .env file
require('dotenv').config();

const testSpotifySetup = async () => {
  console.log('🎵 Testing Spotify API Setup...\n');

  // Check environment variables
  const requiredEnvVars = [
    'EXPO_PUBLIC_SPOTIFY_CLIENT_ID',
    'EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET'
  ];

  console.log('📋 Checking Environment Variables:');
  let allEnvVarsPresent = true;
  
  requiredEnvVars.forEach(envVar => {
    const value = process.env[envVar];
    if (!value || value === 'placeholder' || value.includes('YOUR_')) {
      console.log(`❌ ${envVar}: Missing or placeholder value`);
      allEnvVarsPresent = false;
    } else {
      console.log(`✅ ${envVar}: Present`);
    }
  });

  if (!allEnvVarsPresent) {
    console.log('\n⚠️  Please set up your Spotify API credentials:');
    console.log('1. Go to https://developer.spotify.com/dashboard');
    console.log('2. Create a new app or use an existing one');
    console.log('3. Get your Client ID and Client Secret');
    console.log('4. Add them to your .env file:');
    console.log('   EXPO_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here');
    console.log('   EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=your_client_secret_here');
    console.log('\n5. Restart your development server');
    return;
  }

  console.log('\n🔐 Testing Spotify API Authentication...');
  
  try {
    // Test getting access token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('❌ Authentication failed:', data.error_description || data.error);
      return;
    }

    console.log('✅ Authentication successful!');
    console.log(`   Token expires in: ${data.expires_in} seconds`);

    // Test API call
    console.log('\n🎤 Testing Artist Search...');
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=The%20Beatles&type=artist&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const searchData = await searchResponse.json();

    if (!searchResponse.ok) {
      console.log('❌ API call failed:', searchData.error?.message);
      return;
    }

    console.log('✅ API call successful!');
    
    if (searchData.artists?.items?.length > 0) {
      const artist = searchData.artists.items[0];
      console.log(`   Found artist: ${artist.name}`);
      console.log(`   Artist ID: ${artist.id}`);
      console.log(`   Has images: ${artist.images?.length > 0 ? 'Yes' : 'No'}`);
      
      if (artist.images?.length > 0) {
        console.log(`   Best image URL: ${artist.images[0].url}`);
      }
    }

    console.log('\n🎉 Spotify API setup is working correctly!');
    console.log('\nYou can now use the Spotify service in your app:');
    console.log('import { getArtistImage } from "./services/spotify";');
    console.log('const imageUrl = await getArtistImage("Artist Name");');

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
};

// Run the test
testSpotifySetup().catch(console.error);
