/**
 * API Configuration
 * Centralized configuration for all API endpoints and parameters
 */

import { config } from "../config/environment";

// Base URLs
export const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";
export const LASTFM_API_BASE_URL = "https://ws.audioscrobbler.com/2.0";
export const GENIUS_API_BASE_URL = "https://api.genius.com";
export const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

// API Endpoints
export const ENDPOINTS = {
  // YouTube endpoints
  YOUTUBE: {
    SEARCH: `${YOUTUBE_API_BASE_URL}/search`,
    VIDEOS: `${YOUTUBE_API_BASE_URL}/videos`,
    CHANNELS: `${YOUTUBE_API_BASE_URL}/channels`,
    TRENDING: `${YOUTUBE_API_BASE_URL}/videos`,
  },
  // Last.fm endpoints
  LASTFM: {
    ARTIST_INFO: `${LASTFM_API_BASE_URL}/?method=artist.getinfo`,
    TRACK_INFO: `${LASTFM_API_BASE_URL}/?method=track.getinfo`,
    ALBUM_INFO: `${LASTFM_API_BASE_URL}/?method=album.getinfo`,
    ARTIST_TOP_TRACKS: `${LASTFM_API_BASE_URL}/?method=artist.gettoptracks`,
    SEARCH_ARTIST: `${LASTFM_API_BASE_URL}/?method=artist.search`,
    SEARCH_TRACK: `${LASTFM_API_BASE_URL}/?method=track.search`,
  },
  // Genius endpoints
  GENIUS: {
    SEARCH: `${GENIUS_API_BASE_URL}/search`,
    SONG: `${GENIUS_API_BASE_URL}/songs`,
  },
  // Spotify endpoints
  SPOTIFY: {
    SEARCH: `${SPOTIFY_API_BASE_URL}/search`,
    ARTISTS: `${SPOTIFY_API_BASE_URL}/artists`,
    TRACKS: `${SPOTIFY_API_BASE_URL}/tracks`,
    ALBUMS: `${SPOTIFY_API_BASE_URL}/albums`,
    RECOMMENDATIONS: `${SPOTIFY_API_BASE_URL}/recommendations`,
  },
};

// API Keys
export const API_KEYS = {
  YOUTUBE_API_KEY: config.youtube.apiKey,
  LASTFM_API_KEY: config.lastfm?.apiKey || "placeholder",
  GENIUS_API_KEY: config.genius?.apiKey || "placeholder",
  SPOTIFY_CLIENT_ID: config.spotify?.clientId || "placeholder",
  SPOTIFY_CLIENT_SECRET: config.spotify?.clientSecret || "placeholder",
};

// Default parameters for API calls
export const DEFAULT_PARAMS = {
  YOUTUBE: {
    part: "snippet,contentDetails,statistics",
    maxResults: 20,
    type: "video",
    videoCategoryId: "10", // Music category
  },
  LASTFM: {
    format: "json",
    limit: 20,
  },
  GENIUS: {
    per_page: 20,
  },
  SPOTIFY: {
    limit: 20,
    market: "US",
  },
};

// Search parameters
export const SEARCH_PARAMS = {
  YOUTUBE: {
    q: "", // Query will be set dynamically
    part: "snippet",
    maxResults: 20,
    type: "video",
    videoCategoryId: "10",
    order: "relevance",
  },
  LASTFM: {
    method: "track.search",
    track: "", // Query will be set dynamically
    format: "json",
    limit: 20,
  },
  GENIUS: {
    q: "", // Query will be set dynamically
    per_page: 20,
  },
};

export default {
  ENDPOINTS,
  API_KEYS,
  DEFAULT_PARAMS,
  SEARCH_PARAMS,
};
