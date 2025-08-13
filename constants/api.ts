/**
 * Streamly App API Constants
 * Contains endpoints and configuration for external services
 */

// Base URLs
export const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";
export const AUDIUS_API_BASE_URL = "https://discoveryprovider.audius.co/v1";

// Endpoints
export const ENDPOINTS = {
  // YouTube endpoints
  YOUTUBE: {
    SEARCH: `${YOUTUBE_API_BASE_URL}/search`,
    VIDEOS: `${YOUTUBE_API_BASE_URL}/videos`,
    PLAYLISTS: `${YOUTUBE_API_BASE_URL}/playlists`,
    PLAYLIST_ITEMS: `${YOUTUBE_API_BASE_URL}/playlistItems`,
  },

  // Audius endpoints
  AUDIUS: {
    SEARCH: `${AUDIUS_API_BASE_URL}/search/tracks`,
    TRACKS: `${AUDIUS_API_BASE_URL}/tracks`,
    TRENDING: `${AUDIUS_API_BASE_URL}/tracks/trending`,
  },
};

import { config } from "../config/environment";

// API Keys from centralized config
export const API_KEYS = {
  YOUTUBE_API_KEY: config.youtube.apiKey,
  AUDIUS_APP_NAME: config.audius.appName,
};

// Request parameters
export const DEFAULT_PARAMS = {
  YOUTUBE: {
    part: "snippet",
    maxResults: 20,
    type: "video",
  },
  AUDIUS: {
    limit: 20,
  },
};

export default {
  ENDPOINTS,
  API_KEYS,
  DEFAULT_PARAMS,
};
