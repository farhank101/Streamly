/**
 * Last.fm API Service
 * Handles fetching artist metadata, album information, and track details
 */

import { ENDPOINTS, API_KEYS, DEFAULT_PARAMS } from "../constants/api";

export interface LastfmArtist {
  name: string;
  mbid: string;
  url: string;
  image: Array<{
    size: string;
    "#text": string;
  }>;
  bio: {
    summary: string;
    content: string;
  };
  tags: {
    tag: Array<{
      name: string;
      url: string;
    }>;
  };
  stats: {
    listeners: string;
    playcount: string;
  };
}

export interface LastfmTrack {
  name: string;
  artist: string;
  album?: string;
  duration?: string;
  listeners?: string;
  playcount?: string;
  image: Array<{
    size: string;
    "#text": string;
  }>;
  tags?: {
    tag: Array<{
      name: string;
      url: string;
    }>;
  };
}

export interface LastfmAlbum {
  name: string;
  artist: string;
  mbid: string;
  url: string;
  image: Array<{
    size: string;
    "#text": string;
  }>;
  tracks: {
    track: Array<{
      name: string;
      duration: string;
      url: string;
    }>;
  };
  tags?: {
    tag: Array<{
      name: string;
      url: string;
    }>;
  };
}

/**
 * Get artist information from Last.fm
 */
export const getArtistInfo = async (artistName: string): Promise<LastfmArtist> => {
  try {
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS.LASTFM,
      artist: artistName,
      api_key: API_KEYS.LASTFM_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.LASTFM.ARTIST_INFO}&${params}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.message || "Failed to get artist info");
    }

    return data.artist;
  } catch (error) {
    console.error("Last.fm artist info error:", error);
    throw error;
  }
};

/**
 * Get track information from Last.fm
 */
export const getTrackInfo = async (
  trackName: string,
  artistName: string
): Promise<LastfmTrack> => {
  try {
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS.LASTFM,
      track: trackName,
      artist: artistName,
      api_key: API_KEYS.LASTFM_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.LASTFM.TRACK_INFO}&${params}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.message || "Failed to get track info");
    }

    return data.track;
  } catch (error) {
    console.error("Last.fm track info error:", error);
    throw error;
  }
};

/**
 * Get album information from Last.fm
 */
export const getAlbumInfo = async (
  albumName: string,
  artistName: string
): Promise<LastfmAlbum> => {
  try {
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS.LASTFM,
      album: albumName,
      artist: artistName,
      api_key: API_KEYS.LASTFM_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.LASTFM.ALBUM_INFO}&${params}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.message || "Failed to get album info");
    }

    return data.album;
  } catch (error) {
    console.error("Last.fm album info error:", error);
    throw error;
  }
};

/**
 * Get top tracks for an artist
 */
export const getArtistTopTracks = async (
  artistName: string,
  limit = 10
): Promise<LastfmTrack[]> => {
  try {
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS.LASTFM,
      artist: artistName,
      limit: limit.toString(),
      api_key: API_KEYS.LASTFM_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.LASTFM.ARTIST_TOP_TRACKS}&${params}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.message || "Failed to get artist top tracks");
    }

    return data.toptracks.track;
  } catch (error) {
    console.error("Last.fm artist top tracks error:", error);
    throw error;
  }
};

/**
 * Search for artists on Last.fm
 */
export const searchArtists = async (
  query: string,
  limit = 20
): Promise<LastfmArtist[]> => {
  try {
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS.LASTFM,
      artist: query,
      limit: limit.toString(),
      api_key: API_KEYS.LASTFM_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.LASTFM.SEARCH_ARTIST}&${params}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.message || "Failed to search artists");
    }

    return data.results.artistmatches.artist;
  } catch (error) {
    console.error("Last.fm artist search error:", error);
    throw error;
  }
};

/**
 * Search for tracks on Last.fm
 */
export const searchTracks = async (
  query: string,
  limit = 20
): Promise<LastfmTrack[]> => {
  try {
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS.LASTFM,
      track: query,
      limit: limit.toString(),
      api_key: API_KEYS.LASTFM_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.LASTFM.SEARCH_TRACK}&${params}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.message || "Failed to search tracks");
    }

    return data.results.trackmatches.track;
  } catch (error) {
    console.error("Last.fm track search error:", error);
    throw error;
  }
};

export default {
  getArtistInfo,
  getTrackInfo,
  getAlbumInfo,
  getArtistTopTracks,
  searchArtists,
  searchTracks,
};
