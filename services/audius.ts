/**
 * Audius API Service
 * Handles fetching and processing data from Audius API
 */

import { ENDPOINTS, API_KEYS, DEFAULT_PARAMS } from '../constants/api';
import { Track, AudiusTrack, TrackSearchResult } from '../types/track';

// Convert Audius API response to our Track format
const convertAudiusToTrack = (item: AudiusTrack): Track => {
  return {
    id: '', // This will be set by Supabase
    sourceId: item.id,
    sourceType: 'audius',
    title: item.title,
    artist: item.user.name,
    duration: Math.floor(item.duration), // Audius provides duration in seconds
    thumbnailUrl: item.artwork?.['150x150'] || item.artwork?.['480x480'] || '',
    createdAt: new Date(item.created_at),
    playCount: item.play_count || 0,
  };
};

/**
 * Search for tracks on Audius
 */
export const searchTracks = async (query: string, offset = 0, limit = 20): Promise<TrackSearchResult> => {
  try {
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS.AUDIUS,
      query,
      offset: offset.toString(),
      limit: limit.toString(),
      app_name: 'streamly',
    });

    const response = await fetch(`${ENDPOINTS.AUDIUS.SEARCH}?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to search Audius');
    }

    // Convert to our Track format
    const tracks = data.data.map((item: AudiusTrack) => convertAudiusToTrack(item));

    return {
      tracks,
      nextPageToken: data.data.length === limit ? (offset + limit).toString() : undefined,
    };
  } catch (error) {
    console.error('Audius search error:', error);
    throw error;
  }
};

/**
 * Get a specific Audius track by ID
 */
export const getAudiusTrack = async (trackId: string): Promise<Track> => {
  try {
    const params = new URLSearchParams({
      app_name: 'streamly',
    });

    const response = await fetch(`${ENDPOINTS.AUDIUS.TRACKS}/${trackId}?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get Audius track');
    }

    return convertAudiusToTrack(data.data);
  } catch (error) {
    console.error('Audius get track error:', error);
    throw error;
  }
};

/**
 * Get trending tracks from Audius
 */
export const getTrendingTracks = async (limit = 20): Promise<Track[]> => {
  try {
    const params = new URLSearchParams({
      app_name: 'streamly',
      limit: limit.toString(),
    });

    const response = await fetch(`${ENDPOINTS.AUDIUS.TRENDING}?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get trending Audius tracks');
    }

    return data.data.map((item: AudiusTrack) => convertAudiusToTrack(item));
  } catch (error) {
    console.error('Audius trending tracks error:', error);
    throw error;
  }
};