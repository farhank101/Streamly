/**
 * Track Types
 * Type definitions for music tracks and related data structures
 */

export type TrackSource = 'youtube';

export interface Track {
  id: string;           // Unique identifier
  sourceId: string;     // YouTube ID
  sourceType: TrackSource;
  title: string;        // Track title
  artist: string;       // Artist name
  duration: number;     // Duration in seconds
  thumbnailUrl: string; // Album art URL
  createdAt: Date;      // When track was added
  playCount?: number;   // Number of times played
  liked?: boolean;      // Whether user liked this track
  playlistId?: string;  // If part of a playlist
}

export interface TrackSearchResult {
  tracks: Track[];
  totalResults: number;
  nextPageToken?: string;
}

export interface TrackMetadata {
  album?: string;
  genre?: string;
  year?: number;
  lyrics?: string;
  description?: string;
  tags?: string[];
}

// Extended track with metadata
export interface TrackWithMetadata extends Track {
  metadata?: TrackMetadata;
}

// Playlist interface
export interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: Track[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

// Search filters
export interface SearchFilters {
  query: string;
  sourceType?: TrackSource;
  duration?: {
    min?: number;
    max?: number;
  };
  sortBy?: 'relevance' | 'date' | 'title' | 'artist';
  limit?: number;
}

// API Response interfaces
export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
    duration?: string;
  };
  contentDetails?: {
    duration: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

// Legacy provider interface removed; app standardizes on YouTube