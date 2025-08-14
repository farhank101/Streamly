/**
 * YouTube Service
 * Handles YouTube API interactions and audio stream extraction
 */

import { Track, TrackSearchResult } from '../types/track';
import { ENDPOINTS, API_KEYS, DEFAULT_PARAMS } from '../constants/api';

// Convert YouTube API response to our Track format
const convertYouTubeToTrack = (item: any): Track => {
  return {
    id: `youtube_${item.id.videoId}`,
    sourceId: item.id.videoId,
    sourceType: 'youtube',
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    duration: 0, // YouTube API doesn't provide duration in search results
    thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || '',
    createdAt: new Date(),
    playCount: 0,
  };
};

/**
 * Search for music videos on YouTube
 */
export const searchYouTube = async (query: string, maxResults: number = 20): Promise<TrackSearchResult> => {
  try {
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS.YOUTUBE,
      q: query,
      maxResults: maxResults.toString(),
      key: API_KEYS.YOUTUBE_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.YOUTUBE.SEARCH}?${params}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'YouTube API error');
    }

    const tracks = data.items.map((item: any) => convertYouTubeToTrack(item));

    return {
      tracks,
      totalResults: data.pageInfo?.totalResults || 0,
      nextPageToken: data.nextPageToken,
    };
  } catch (error) {
    console.error('YouTube search error:', error);
    throw error;
  }
};

/**
 * Get trending music videos from YouTube
 */
export const getTrendingVideos = async (regionCode: string = 'US', videoCategoryId: string = '10', maxResults: number = 20): Promise<Track[]> => {
  try {
    const params = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      regionCode,
      videoCategoryId,
      maxResults: maxResults.toString(),
      key: API_KEYS.YOUTUBE_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.YOUTUBE.TRENDING}?${params}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'YouTube API error');
    }

    return data.items.map((item: any) => convertYouTubeToTrack(item));
  } catch (error) {
    console.error('YouTube trending videos error:', error);
    throw error;
  }
};

/**
 * Get a specific YouTube video by ID
 */
export const getYouTubeVideo = async (videoId: string): Promise<Track> => {
  try {
    const params = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id: videoId,
      key: API_KEYS.YOUTUBE_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.YOUTUBE.VIDEOS}?${params}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'YouTube API error');
    }

    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found');
    }

    const item = data.items[0];
    return {
      id: `youtube_${item.id}`,
      sourceId: item.id,
      sourceType: 'youtube',
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: parseDuration(item.contentDetails?.duration) || 0,
      thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || '',
      createdAt: new Date(),
      playCount: parseInt(item.statistics?.viewCount) || 0,
    };
  } catch (error) {
    console.error('YouTube get video error:', error);
    throw error;
  }
};

/**
 * Parse ISO 8601 duration format to seconds
 */
const parseDuration = (duration: string): number => {
  if (!duration) return 0;
  
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Get a playable audio stream URL for a YouTube video
 * Note: This is a simplified approach. In production, you'd use a proper service
 */
export const getYouTubeStreamUrl = async (videoId: string): Promise<string> => {
  // For now, return a direct YouTube URL
  // In a real app, you'd use a service like youtube-dl or a proxy service
  return `https://www.youtube.com/watch?v=${videoId}`;
};

/**
 * Get mock trending music for testing
 */
export const getMockTrendingMusic = (): Track[] => {
  return [
    {
      id: 'youtube_mock_1',
      sourceId: 'dQw4w9WgXcQ', // Rick Roll - always works
      sourceType: 'youtube',
      title: 'Rick Astley - Never Gonna Give You Up',
      artist: 'Rick Astley',
      duration: 212,
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      createdAt: new Date(),
      playCount: 1000000,
    },
    {
      id: 'youtube_mock_2',
      sourceId: '9bZkp7q19f0', // PSY - Gangnam Style
      sourceType: 'youtube',
      title: 'PSY - GANGNAM STYLE',
      artist: 'officialpsy',
      duration: 252,
      thumbnailUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg',
      createdAt: new Date(),
      playCount: 5000000,
    },
    {
      id: 'youtube_mock_3',
      sourceId: 'kJQP7kiw5Fk', // Luis Fonsi - Despacito
      sourceType: 'youtube',
      title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
      artist: 'Luis Fonsi',
      duration: 282,
      thumbnailUrl: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
      createdAt: new Date(),
      playCount: 8000000,
    },
  ];
};
