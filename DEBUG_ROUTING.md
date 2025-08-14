# Debugging Routing Issues

## Problem
When clicking on songs, you get "Unmatched Route" error at `localhost:8081/track`.

## Root Cause
The issue was that YouTube tracks didn't have proper IDs set, causing navigation to fail.

## Fixes Applied

### 1. Fixed Track ID Assignment
- **File**: `services/youtube.ts`
- **Change**: Updated `convertYouTubeToTrack` to use YouTube video ID as track ID
- **Before**: `id: ""`
- **After**: `id: item.id`

### 2. Enhanced Search Screen Navigation
- **File**: `app/(tabs)/search.tsx`
- **Change**: Added fallback navigation logic
- **Logic**: 
  - Use `track.id` if available
  - Fallback to `track.sourceId` if no ID
  - Just play without navigation as last resort

### 3. Updated Track Detail Page
- **File**: `app/track/[id].tsx`
- **Change**: Added YouTube video fetching
- **Logic**: 
  - Detect YouTube video IDs (11 characters, alphanumeric)
  - Fetch real data from YouTube API
  - Fallback to mock data if API fails

### 4. Fixed Home Screen Navigation
- **File**: `app/(tabs)/index.tsx`
- **Change**: Added proper track handling in `handleCardPress`
- **Logic**: 
  - Check for `sourceType === "youtube"`
  - Navigate to `/track/[id]` for tracks
  - Added play functionality to `handlePlayPress`

## Testing Steps

1. **Search for a song** in the search tab
2. **Click on a search result** - should navigate to track detail
3. **Click play button** on home screen trending tracks
4. **Check console** for any error messages

## Debug Information

### Check Track Data
```typescript
console.log('Track data:', {
  id: track.id,
  sourceId: track.sourceId,
  sourceType: track.sourceType,
  title: track.title
});
```

### Check Navigation
```typescript
console.log('Navigating to:', `/track/${track.id || track.sourceId}`);
```

### Common Issues

1. **Empty Track ID**: Track ID is empty or undefined
2. **Invalid Route**: Route doesn't exist in Expo Router
3. **API Errors**: YouTube API calls failing
4. **Type Mismatches**: Track object structure issues

## Expected Behavior

- ✅ Clicking search results navigates to `/track/[youtube-video-id]`
- ✅ Track detail page loads with real YouTube data
- ✅ Play button starts playback and navigates
- ✅ No "Unmatched Route" errors

## If Issues Persist

1. Check browser console for errors
2. Verify YouTube API key is configured
3. Check network requests in DevTools
4. Ensure all route files exist in `app/` directory
