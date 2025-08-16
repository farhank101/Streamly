/**
 * Unified Search Service
 * Combines results from multiple APIs for comprehensive music search
 */

import { Track, TrackSearchResult } from "../types/track";
import { searchYouTube } from "./youtube";
import { getMockTrendingMusic } from "./youtube";

/**
 * Search across all available music sources
 */
export const searchAll = async (query: string): Promise<TrackSearchResult> => {
  try {
    console.log("🔍 Searching for:", query);

    // For now, just search YouTube
    const youtubeResults = await searchYouTube(query);

    return {
      tracks: youtubeResults.tracks,
      totalResults: youtubeResults.totalResults,
      nextPageToken: youtubeResults.nextPageToken,
    };
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

/**
 * Search for songs (audio-focused)
 */
export const searchSongs = async (
  query: string
): Promise<TrackSearchResult> => {
  try {
    console.log("🎵 Searching for songs:", query);

    // Try YouTube search first
    const youtubeResults = await searchYouTube(query);
    
    if (youtubeResults.tracks.length > 0) {
      console.log("✅ YouTube search successful, returning results");
      return youtubeResults;
    }
    
    // Fallback to mock data if YouTube search fails
    console.log("⚠️ YouTube search returned no results, using mock data");
    const mockResults = getMockTrendingMusic().filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      tracks: mockResults,
      totalResults: mockResults.length,
      nextPageToken: undefined,
    };
  } catch (error) {
    console.error("❌ Song search error:", error);
    
    // Fallback to mock data
    console.log("🔄 Falling back to mock data due to search error");
    const mockResults = getMockTrendingMusic().filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      tracks: mockResults,
      totalResults: mockResults.length,
      nextPageToken: undefined,
    };
  }
};

/**
 * Search for videos (video-focused)
 */
export const searchVideos = async (
  query: string
): Promise<TrackSearchResult> => {
  try {
    console.log("🎬 Searching for videos:", query);

    // Try YouTube search first
    const youtubeResults = await searchYouTube(query);
    
    if (youtubeResults.tracks.length > 0) {
      console.log("✅ YouTube search successful, returning results");
      return youtubeResults;
    }
    
    // Fallback to mock data if YouTube search fails
    console.log("⚠️ YouTube search returned no results, using mock data");
    const mockResults = getMockTrendingMusic().filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      tracks: mockResults,
      totalResults: mockResults.length,
      nextPageToken: undefined,
    };
  } catch (error) {
    console.error("❌ Video search error:", error);
    
    // Fallback to mock data
    console.log("🔄 Falling back to mock data due to search error");
    const mockResults = getMockTrendingMusic().filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      tracks: mockResults,
      totalResults: mockResults.length,
      nextPageToken: undefined,
    };
  }
};

/**
 * Get trending music from all sources
 */
export const getTrendingMusic = async (
  region: string = "US",
  limit: number = 20
): Promise<Track[]> => {
  try {
    console.log("🔥 Getting trending music for region:", region);

    // For testing, return mock trending music that we know works
    const mockTrending = getMockTrendingMusic();

    console.log(
      "✅ Returning mock trending music:",
      mockTrending.length,
      "tracks"
    );
    return mockTrending.slice(0, limit);
  } catch (error) {
    console.error("Trending music error:", error);

    // Fallback to mock data
    console.log("🔄 Falling back to mock trending music");
    return getMockTrendingMusic().slice(0, limit);
  }
};
