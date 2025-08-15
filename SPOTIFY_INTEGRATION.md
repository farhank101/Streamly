# Spotify API Integration Guide

This guide explains how to set up and use the Spotify API integration for fetching high-quality artist images in your Streamly app.

## 🎯 Overview

The Spotify API integration provides:
- High-quality artist, track, and album images
- Comprehensive music metadata
- Automatic token management
- Fallback support with LastFM API
- Batch image fetching capabilities

## 🔧 Setup Instructions

### 1. Create a Spotify Developer Account

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - **App name**: `Streamly` (or your preferred name)
   - **App description**: `Music streaming app for fetching artist images`
   - **Website**: `http://localhost:3000` (for development)
   - **Redirect URI**: `http://localhost:3000/callback` (for development)
   - **API/SDKs**: Check "Web API"

### 2. Get Your Credentials

After creating the app, you'll get:
- **Client ID**: A long string like `abc123def456ghi789`
- **Client Secret**: Another long string like `xyz789uvw456rst123`

### 3. Add Environment Variables

Add these to your `.env` file:

```env
EXPO_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### 4. Test the Setup

Run the test script to verify everything is working:

```bash
node scripts/test-spotify-setup.js
```

## 🚀 Usage

### Basic Usage

```typescript
import { getArtistImage } from './services/spotify';

// Get artist image
const imageUrl = await getArtistImage('The Beatles');
console.log(imageUrl); // https://i.scdn.co/image/...

// Get track image
const trackImageUrl = await getTrackImage('Hey Jude', 'The Beatles');

// Get album image
const albumImageUrl = await getAlbumImage('Abbey Road', 'The Beatles');
```

### Using the Unified Image Service

The unified image service provides fallback between Spotify and LastFM:

```typescript
import { getArtistImage } from './services/imageService';

// Use Spotify as primary, LastFM as fallback
const imageUrl = await getArtistImage('Artist Name', {
  primarySource: 'spotify',
  enableFallback: true
});

// Use LastFM as primary, Spotify as fallback
const imageUrl2 = await getArtistImage('Artist Name', {
  primarySource: 'lastfm',
  enableFallback: true
});
```

### Batch Operations

```typescript
import { batchGetArtistImages } from './services/imageService';

const artistNames = ['The Beatles', 'Queen', 'Pink Floyd'];
const images = await batchGetArtistImages(artistNames);

console.log(images);
// {
//   'The Beatles': 'https://i.scdn.co/image/...',
//   'Queen': 'https://i.scdn.co/image/...',
//   'Pink Floyd': 'https://i.scdn.co/image/...'
// }
```

## 📁 File Structure

```
services/
├── spotify.ts          # Spotify API service
├── imageService.ts     # Unified image service with fallback
└── lastfm.ts          # Existing LastFM service

constants/
└── api.ts             # Updated with Spotify endpoints

config/
└── environment.ts     # Updated with Spotify credentials

scripts/
└── test-spotify-setup.js  # Test script for verification
```

## 🔄 API Methods

### Spotify Service (`services/spotify.ts`)

| Method | Description |
|--------|-------------|
| `getArtistImage(artistName)` | Get artist image by name |
| `getArtistImageById(artistId)` | Get artist image by Spotify ID |
| `getTrackImage(trackName, artistName)` | Get track image |
| `getAlbumImage(albumName, artistName)` | Get album image |
| `searchArtists(query, limit)` | Search for artists |
| `searchTracks(query, limit)` | Search for tracks |
| `getArtistTopTracks(artistId)` | Get artist's top tracks |
| `getArtistAlbums(artistId)` | Get artist's albums |
| `getRecommendations(seeds)` | Get music recommendations |
| `batchGetArtistImages(artistNames)` | Batch fetch artist images |
| `batchGetTrackImages(tracks)` | Batch fetch track images |

### Image Service (`services/imageService.ts`)

| Method | Description |
|--------|-------------|
| `getArtistImage(artistName, config)` | Get artist image with fallback |
| `getTrackImage(trackName, artistName, config)` | Get track image with fallback |
| `getAlbumImage(albumName, artistName, config)` | Get album image with fallback |
| `batchGetArtistImages(artistNames, config)` | Batch fetch with fallback |
| `testImageService()` | Test connectivity to both APIs |

## ⚙️ Configuration Options

### Image Service Config

```typescript
interface ImageServiceConfig {
  primarySource: 'spotify' | 'lastfm';  // Which API to try first
  enableFallback: boolean;              // Whether to try the other API if primary fails
  timeoutMs: number;                    // Request timeout in milliseconds
}
```

### Default Configuration

```typescript
const DEFAULT_CONFIG = {
  primarySource: 'spotify',    // Spotify is the primary source
  enableFallback: true,        // Enable fallback to LastFM
  timeoutMs: 5000,            // 5 second timeout
};
```

## 🔍 Error Handling

The services include comprehensive error handling:

- **Authentication errors**: Invalid credentials
- **Rate limiting**: Too many requests
- **Network errors**: Connection issues
- **Missing data**: No images found

All methods return empty strings (`''`) on failure, so your app won't crash.

## 📊 Performance Considerations

### Token Management

- Access tokens are automatically cached and refreshed
- Tokens expire after 1 hour
- The service handles token renewal transparently

### Rate Limits

- Spotify: 25 requests per second
- LastFM: 5 requests per second
- The services include built-in error handling for rate limits

### Caching

Consider implementing image caching in your app:

```typescript
// Example with AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCachedArtistImage = async (artistName: string) => {
  const cacheKey = `artist_image_${artistName}`;
  
  // Check cache first
  const cached = await AsyncStorage.getItem(cacheKey);
  if (cached) return cached;
  
  // Fetch from API
  const imageUrl = await getArtistImage(artistName);
  
  // Cache the result
  if (imageUrl) {
    await AsyncStorage.setItem(cacheKey, imageUrl);
  }
  
  return imageUrl;
};
```

## 🧪 Testing

### Test Script

Run the test script to verify your setup:

```bash
node scripts/test-spotify-setup.js
```

### Manual Testing

```typescript
import { testImageService } from './services/imageService';

const results = await testImageService();
console.log(results);
// { spotify: true, lastfm: true }
```

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid client" error**
   - Check your Client ID and Secret
   - Ensure they're correctly set in environment variables

2. **"Rate limit exceeded" error**
   - Reduce request frequency
   - Implement caching

3. **"No images found"**
   - Try different artist names
   - Check if the artist exists on Spotify
   - Use the fallback service

4. **Network errors**
   - Check your internet connection
   - Verify the API endpoints are accessible

### Debug Mode

Enable debug logging by setting:

```env
EXPO_PUBLIC_DEBUG_MODE=true
```

## 📚 Additional Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- [LastFM API Documentation](https://www.last.fm/api)

## 🤝 Migration from LastFM

If you're currently using LastFM and want to migrate to Spotify:

1. **Gradual Migration**: Use the unified image service with Spotify as primary
2. **Fallback Support**: Keep LastFM as fallback for better coverage
3. **Testing**: Test with your existing artist data
4. **Monitoring**: Monitor success rates and adjust configuration

```typescript
// Example migration strategy
const imageUrl = await getArtistImage(artistName, {
  primarySource: 'spotify',    // Try Spotify first
  enableFallback: true         // Fall back to LastFM if needed
});
```

## 📝 Notes

- Spotify images are generally higher quality than LastFM
- Spotify has better coverage for popular artists
- LastFM may have better coverage for obscure artists
- The unified service provides the best of both worlds
- All API calls are rate-limited and cached appropriately

