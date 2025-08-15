/**
 * Fetch Bollywood Artist Images from Spotify
 * Gets actual artist images and updates the database
 */

const fs = require('fs');
const path = require('path');

// Load the bollywood artists data
const bollywoodArtistsPath = path.join(__dirname, '../constants/bollywoodArtists.json');
const bollywoodArtists = JSON.parse(fs.readFileSync(bollywoodArtistsPath, 'utf8'));

// Spotify API configuration
const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.log('❌ Spotify API credentials not found in environment variables');
  console.log('Please set EXPO_PUBLIC_SPOTIFY_CLIENT_ID and EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET');
  process.exit(1);
}

// Get Spotify access token
async function getSpotifyToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

// Search for artist on Spotify
async function searchArtist(artistName, token) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    const data = await response.json();
    
    if (data.artists && data.artists.items.length > 0) {
      const artist = data.artists.items[0];
      return {
        id: artist.id,
        name: artist.name,
        image: artist.images && artist.images.length > 0 ? artist.images[0].url : null,
        popularity: artist.popularity,
        followers: artist.followers ? artist.followers.total : 0
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error searching for ${artistName}:`, error.message);
    return null;
  }
}

// Main function to fetch images for all artists
async function fetchArtistImages() {
  console.log('🎵 Starting to fetch Bollywood artist images from Spotify...');
  
  const token = await getSpotifyToken();
  console.log('✅ Got Spotify access token');
  
  const updatedArtists = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < bollywoodArtists.length; i++) {
    const artist = bollywoodArtists[i];
    console.log(`\n🔍 Searching for: ${artist.name} (${i + 1}/${bollywoodArtists.length})`);
    
    try {
      const spotifyArtist = await searchArtist(artist.name, token);
      
      if (spotifyArtist) {
        updatedArtists.push({
          ...artist,
          spotifyId: spotifyArtist.id,
          image: spotifyArtist.image,
          spotifyPopularity: spotifyArtist.popularity,
          followers: spotifyArtist.followers,
          likes: `${Math.floor(spotifyArtist.followers / 1000)}K`
        });
        successCount++;
        console.log(`✅ Found: ${spotifyArtist.name} - Image: ${spotifyArtist.image ? 'Yes' : 'No'}`);
      } else {
        updatedArtists.push({
          ...artist,
          spotifyId: null,
          image: null,
          spotifyPopularity: 0,
          followers: 0
        });
        errorCount++;
        console.log(`❌ Not found: ${artist.name}`);
      }
      
      // Rate limiting - wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Error processing ${artist.name}:`, error.message);
      updatedArtists.push({
        ...artist,
        spotifyId: null,
        image: null,
        spotifyPopularity: 0,
        followers: 0
      });
      errorCount++;
    }
  }
  
  // Save updated data
  const updatedPath = path.join(__dirname, '../constants/bollywoodArtistsWithImages.ts');
  const fileContent = `/**
 * Bollywood Artists Database with Spotify Images
 * Comprehensive list of Bollywood artists with their Spotify data
 */

export interface BollywoodArtist {
  id: string;
  name: string;
  genre: string;
  popularity: number;
  image: string | null;
  likes: string;
  isArtist: boolean;
  spotifyId: string | null;
  spotifyPopularity: number;
  followers: number;
}

export const bollywoodArtists: BollywoodArtist[] = ${JSON.stringify(updatedArtists, null, 2)};

export default bollywoodArtists;
`;

  fs.writeFileSync(updatedPath, fileContent, 'utf8');
  
  // Also save JSON version
  const jsonPath = path.join(__dirname, '../constants/bollywoodArtistsWithImages.json');
  fs.writeFileSync(jsonPath, JSON.stringify(updatedArtists, null, 2), 'utf8');
  
  console.log('\n🎉 Fetching completed!');
  console.log(`✅ Successfully found: ${successCount} artists`);
  console.log(`❌ Not found: ${errorCount} artists`);
  console.log(`📁 Updated TypeScript file: ${updatedPath}`);
  console.log(`📄 Updated JSON file: ${jsonPath}`);
  
  // Show some statistics
  const artistsWithImages = updatedArtists.filter(a => a.image);
  console.log(`🖼️ Artists with images: ${artistsWithImages.length}/${updatedArtists.length}`);
  
  // Show top 10 most popular artists
  const topArtists = updatedArtists
    .filter(a => a.spotifyPopularity > 0)
    .sort((a, b) => b.spotifyPopularity - a.spotifyPopularity)
    .slice(0, 10);
    
  console.log('\n🏆 Top 10 Most Popular Bollywood Artists on Spotify:');
  topArtists.forEach((artist, index) => {
    console.log(`${index + 1}. ${artist.name} - Popularity: ${artist.spotifyPopularity}, Followers: ${artist.followers.toLocaleString()}`);
  });
}

// Run the script
fetchArtistImages().catch(console.error);
