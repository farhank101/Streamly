/**
 * Test Key Generation
 * This script tests the key generation logic to ensure no duplicate keys are created
 */

// Simulate the generateUniqueKey function
const generateUniqueKey = (item, index) => {
  // Ensure we have a valid, unique key
  if (item.id && item.id !== 'undefined' && item.id !== 'null') {
    return item.id;
  }
  if (item.name && item.name !== 'undefined' && item.name !== 'null') {
    return `${item.name}_${index}`;
  }
  if (item.title && item.title !== 'undefined' && item.title !== 'null') {
    return `${item.title}_${index}`;
  }
  // Use a combination of timestamp and index for guaranteed uniqueness
  return `item_${Date.now()}_${index}`;
};

// Simulate the convertYouTubeToTrack function
const convertYouTubeToTrack = (item, index) => {
  // Ensure we have a valid videoId, fallback to index if not available
  const videoId = item.id?.videoId || item.id || `unknown_${index || Date.now()}`;
  
  return {
    id: `youtube_${videoId}`,
    sourceId: videoId,
    sourceType: 'youtube',
    title: item.snippet?.title || 'Unknown Title',
    artist: item.snippet?.channelTitle || 'Unknown Artist',
    duration: 0,
    thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || '',
    createdAt: new Date(),
    playCount: 0,
  };
};

// Test data with problematic items
const testItems = [
  { id: 'youtube_123', title: 'Test Video 1' },
  { id: undefined, title: 'Test Video 2' },
  { id: 'youtube_456', title: 'Test Video 3' },
  { id: undefined, title: 'Test Video 4' },
  { id: 'youtube_789', title: 'Test Video 5' },
];

// Test YouTube API response simulation
const mockYouTubeResponse = [
  { id: { videoId: 'abc123' }, snippet: { title: 'Video 1', channelTitle: 'Channel 1' } },
  { id: { videoId: undefined }, snippet: { title: 'Video 2', channelTitle: 'Channel 2' } },
  { id: { videoId: 'def456' }, snippet: { title: 'Video 3', channelTitle: 'Channel 3' } },
  { id: { videoId: undefined }, snippet: { title: 'Video 4', channelTitle: 'Channel 4' } },
  { id: { videoId: 'ghi789' }, snippet: { title: 'Video 5', channelTitle: 'Channel 5' } },
];

console.log('🧪 Testing Key Generation...\n');

// Test 1: generateUniqueKey function
console.log('📋 Test 1: generateUniqueKey function');
const keys1 = testItems.map((item, index) => generateUniqueKey(item, index));
console.log('Generated keys:', keys1);

// Check for duplicates
const uniqueKeys1 = new Set(keys1);
console.log(`Unique keys: ${uniqueKeys1.size}/${keys1.length}`);
console.log(uniqueKeys1.size === keys1.length ? '✅ No duplicates found' : '❌ Duplicates found');

// Test 2: convertYouTubeToTrack function
console.log('\n📋 Test 2: convertYouTubeToTrack function');
const tracks = mockYouTubeResponse.map((item, index) => convertYouTubeToTrack(item, index));
const keys2 = tracks.map(track => track.id);
console.log('Generated track IDs:', keys2);

// Check for duplicates
const uniqueKeys2 = new Set(keys2);
console.log(`Unique track IDs: ${uniqueKeys2.size}/${keys2.length}`);
console.log(uniqueKeys2.size === keys2.length ? '✅ No duplicates found' : '❌ Duplicates found');

// Test 3: Edge cases
console.log('\n📋 Test 3: Edge cases');
const edgeCases = [
  { id: 'undefined', title: 'Test' },
  { id: 'null', title: 'Test' },
  { id: '', title: 'Test' },
  { id: 0, title: 'Test' },
  { id: false, title: 'Test' },
];

const keys3 = edgeCases.map((item, index) => generateUniqueKey(item, index));
console.log('Edge case keys:', keys3);

// Check for duplicates
const uniqueKeys3 = new Set(keys3);
console.log(`Unique edge case keys: ${uniqueKeys3.size}/${keys3.length}`);
console.log(uniqueKeys3.size === keys3.length ? '✅ No duplicates found' : '❌ Duplicates found');

console.log('\n🎉 Key generation test completed!');
