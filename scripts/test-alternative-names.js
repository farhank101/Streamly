const https = require('https');

// Test alternative artist names for better Last.fm results
const API_KEY = 'df473232e05c3a414914e0eab3b9d172';
const ARTISTS = [
  { original: 'The Smiths', alternative: 'Morrissey' },
  { original: 'The Clash', alternative: 'Joe Strummer' },
  { original: 'Joy Division', alternative: 'Ian Curtis' },
  { original: 'Queen', alternative: 'Freddie Mercury' }
];

console.log('🧪 Testing Alternative Artist Names...\n');

const getArtistImage = async (artistName) => {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`;
  
  return new Promise((resolve) => {
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          if (result.error) {
            console.log(`❌ ${artistName}: ${result.message}`);
            resolve('');
          } else {
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
            
            const imageId = bestImage.split('/').pop()?.split('.')[0] || 'none';
            console.log(`✅ ${artistName}: ${imageId}`);
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
};

const runTest = async () => {
  console.log('🚀 Testing original vs alternative names...\n');
  
  for (const artist of ARTISTS) {
    console.log(`🎵 Testing: ${artist.original}`);
    console.log(`   Original name: ${artist.original}`);
    const originalImage = await getArtistImage(artist.original);
    
    console.log(`   Alternative name: ${artist.alternative}`);
    const alternativeImage = await getArtistImage(artist.alternative);
    
    if (originalImage && alternativeImage) {
      const originalId = originalImage.split('/').pop()?.split('.')[0];
      const alternativeId = alternativeImage.split('/').pop()?.split('.')[0];
      
      if (originalId === alternativeId) {
        console.log(`   ⚠️  Same image (${originalId}) - Last.fm using default`);
      } else {
        console.log(`   ✅ Different images: ${originalId} vs ${alternativeId}`);
      }
    } else if (alternativeImage) {
      console.log(`   ✅ Alternative name worked better!`);
    } else {
      console.log(`   ❌ Neither name found images`);
    }
    console.log('');
  }
  
  console.log('🎉 Test completed!');
};

runTest().catch(console.error);
