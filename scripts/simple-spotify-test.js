/**
 * Simple Spotify Test
 * A minimal test to verify Spotify API access
 */

require('dotenv').config();

const testSpotify = async () => {
  console.log('🎵 Simple Spotify Test\n');

  const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

  console.log('📋 Using credentials:');
  console.log(`   Client ID: ${clientId ? clientId.substring(0, 8) + '...' : 'Missing'}`);
  console.log(`   Client Secret: ${clientSecret ? clientSecret.substring(0, 8) + '...' : 'Missing'}`);

  if (!clientId || !clientSecret) {
    console.log('❌ Missing credentials');
    return;
  }

  try {
    // Step 1: Get access token
    console.log('\n🔐 Step 1: Getting access token...');
    
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.log(`❌ Token request failed: ${tokenResponse.status} ${tokenResponse.statusText}`);
      console.log(`   Error: ${errorData.error}`);
      console.log(`   Description: ${errorData.error_description}`);
      return;
    }

    const tokenData = await tokenResponse.json();
    console.log('✅ Access token obtained successfully!');

    // Step 2: Test API call
    console.log('\n🎤 Step 2: Testing API call...');
    
    const apiResponse = await fetch('https://api.spotify.com/v1/search?q=The%20Beatles&type=artist&limit=1', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      console.log(`❌ API call failed: ${apiResponse.status} ${apiResponse.statusText}`);
      return;
    }

    const apiData = await apiResponse.json();
    console.log('✅ API call successful!');
    
    if (apiData.artists?.items?.length > 0) {
      const artist = apiData.artists.items[0];
      console.log(`   Found artist: ${artist.name}`);
      console.log(`   Has images: ${artist.images?.length > 0 ? 'Yes' : 'No'}`);
      if (artist.images?.length > 0) {
        console.log(`   Image URL: ${artist.images[0].url}`);
      }
    }

    console.log('\n🎉 Spotify integration is working perfectly!');

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
};

testSpotify();
