const https = require('https');

// Test the batch Last.fm API calls
const API_KEY = 'df473232e05c3a414914e0eab3b9d172';
const ARTISTS = ['The Smiths', 'The Clash', 'Joy Division'];

console.log('🧪 Testing Batch Last.fm API Calls...\n');

// Simulate the batchGetArtistImages function
const batchGetArtistImages = async (artistNames) => {
  const results = {};
  
  for (const artistName of artistNames) {
    try {
      console.log(`🔍 Fetching image for: ${artistName}`);
      
      const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`;
      
      const imageUrl = await new Promise((resolve, reject) => {
        https.get(url, (response) => {
          let data = '';
          
          response.on('data', (chunk) => {
            data += chunk;
          });
          
          response.on('end', () => {
            try {
              const result = JSON.parse(data);
              
              if (result.error) {
                console.log(`❌ API Error for ${artistName}:`, result.message);
                resolve('');
              } else {
                // Extract the best image URL
                const images = result.artist?.image || [];
                const priority = ['mega', 'extralarge', 'large', 'medium', 'small'];
                
                let bestImage = '';
                for (const size of priority) {
                  const image = images.find(img => img.size === size && img['#text']);
                  if (image && image['#text']) {
                    bestImage = image['#text'];
                    break;
                  }
                }
                
                console.log(`✅ ${artistName}: ${bestImage || 'No image found'}`);
                resolve(bestImage);
              }
            } catch (error) {
              console.log(`❌ Parse error for ${artistName}:`, error.message);
              resolve('');
            }
          });
        }).on('error', (error) => {
          console.log(`❌ Network error for ${artistName}:`, error.message);
          resolve('');
        });
      });
      
      results[artistName] = imageUrl;
    } catch (error) {
      console.error(`❌ Failed to get image for ${artistName}:`, error.message);
      results[artistName] = '';
    }
  }
  
  return results;
};

// Run the test
const runTest = async () => {
  console.log('🚀 Starting batch test...\n');
  
  const images = await batchGetArtistImages(ARTISTS);
  
  console.log('\n📋 Final Results:');
  Object.entries(images).forEach(([artist, imageUrl]) => {
    console.log(`   ${artist}: ${imageUrl || 'No image'}`);
  });
  
  console.log('\n🎉 Batch test completed!');
};

runTest().catch(console.error);
