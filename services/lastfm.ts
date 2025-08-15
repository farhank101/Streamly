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

// Image size priorities for Last.fm images
const IMAGE_SIZE_PRIORITY = ['mega', 'extralarge', 'large', 'medium', 'small'];

/**
 * Extract the best available image URL from Last.fm image array
 */
export const getBestImageUrl = (images: Array<{ size: string; "#text": string }>): string => {
  if (!images || !Array.isArray(images)) {
    return '';
  }

  // Try to find the highest priority image size
  for (const size of IMAGE_SIZE_PRIORITY) {
    const image = images.find(img => img.size === size && img["#text"]);
    if (image && image["#text"]) {
      return image["#text"];
    }
  }

  // Fallback to any image with a URL
  const anyImage = images.find(img => img["#text"]);
  return anyImage ? anyImage["#text"] : '';
};

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
 * Get artist image URL from Last.fm
 */
export const getArtistImage = async (artistName: string): Promise<string> => {
  try {
    const artistInfo = await getArtistInfo(artistName);
    return getBestImageUrl(artistInfo.image);
  } catch (error) {
    console.error(`Failed to get artist image for ${artistName}:`, error);
    return '';
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
 * Get track image URL from Last.fm
 */
export const getTrackImage = async (trackName: string, artistName: string): Promise<string> => {
  try {
    const trackInfo = await getTrackInfo(trackName, artistName);
    return getBestImageUrl(trackInfo.image);
  } catch (error) {
    console.error(`Failed to get track image for ${trackName} by ${artistName}:`, error);
    return '';
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
 * Get album image URL from Last.fm
 */
export const getAlbumImage = async (albumName: string, artistName: string): Promise<string> => {
  try {
    const albumInfo = await getAlbumInfo(albumName, artistName);
    return getBestImageUrl(albumInfo.image);
  } catch (error) {
    console.error(`Failed to get album image for ${albumName} by ${artistName}:`, error);
    return '';
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

/**
 * Batch fetch images for multiple artists
 */
export const batchGetArtistImages = async (artistNames: string[]): Promise<Record<string, string>> => {
  const results: Record<string, string> = {};
  
  try {
    const promises = artistNames.map(async (artistName) => {
      try {
        const imageUrl = await getArtistImage(artistName);
        return { artistName, imageUrl };
      } catch (error) {
        console.error(`Failed to get image for ${artistName}:`, error);
        return { artistName, imageUrl: '' };
      }
    });

    const resolved = await Promise.all(promises);
    
    resolved.forEach(({ artistName, imageUrl }) => {
      results[artistName] = imageUrl;
    });
  } catch (error) {
    console.error('Batch artist image fetch error:', error);
  }

  return results;
};

/**
 * Batch fetch images for multiple tracks
 */
export const batchGetTrackImages = async (tracks: Array<{ name: string; artist: string }>): Promise<Record<string, string>> => {
  const results: Record<string, string> = {};
  
  try {
    const promises = tracks.map(async (track) => {
      try {
        const imageUrl = await getTrackImage(track.name, track.artist);
        const key = `${track.artist} - ${track.name}`;
        return { key, imageUrl };
      } catch (error) {
        console.error(`Failed to get image for ${track.name} by ${track.artist}:`, error);
        const key = `${track.artist} - ${track.name}`;
        return { key, imageUrl: '' };
      }
    });

    const resolved = await Promise.all(promises);
    
    resolved.forEach(({ key, imageUrl }) => {
      results[key] = imageUrl;
    });
  } catch (error) {
    console.error('Batch track image fetch error:', error);
  }

  return results;
};

export default {
  getArtistInfo,
  getArtistImage,
  getTrackInfo,
  getTrackImage,
  getAlbumInfo,
  getAlbumImage,
  getArtistTopTracks,
  searchArtists,
  searchTracks,
  batchGetArtistImages,
  batchGetTrackImages,
  getBestImageUrl,
};
