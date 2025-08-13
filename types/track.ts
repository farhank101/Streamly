/**
 * Track Types
 * Type definitions for music tracks from various sources
 */

export type TrackSource = 'youtube' | 'audius';

export interface Track {
  id: string;
  sourceId: string;      // YouTube or Audius ID
  sourceType: TrackSource;
  title: string;
  artist: string;
  album?: string;
  duration: number;      // in seconds
  thumbnailUrl: string;
  createdAt: Date;
  playCount: number;
}

export interface PlaylistTrack extends Track {
  position: number;
  addedAt: Date;
}

export interface LikedTrack extends Track {
  likedAt: Date;
}

export interface HistoryTrack extends Track {
  listenedAt: Date;
  completed: boolean;
  listenDuration: number; // in seconds
}

export interface YouTubeTrack {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    publishedAt: string;
  };
  contentDetails?: {
    duration: string; // ISO 8601 format
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
  };
}

// Legacy provider interface removed; app standardizes on YouTube and Audius

export interface AudiusTrack {
  id: string;
  title: string;
  user: {
    name: string;
  };
  artwork: {
    '150x150'?: string;
    '480x480'?: string;
  };
  duration: number; // in seconds
  created_at: string;
  play_count: number;
}

// Utility type for track search results
export interface TrackSearchResult {
  tracks: Track[];
  nextPageToken?: string;
}