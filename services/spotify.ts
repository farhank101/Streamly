/**
 * Spotify API Service
 * Handles fetching artist metadata, album information, and track details
 * Provides high-quality images and comprehensive music data
 */

import { ENDPOINTS, API_KEYS, DEFAULT_PARAMS } from "../constants/api";

export interface SpotifyArtist {
  id: string;
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  popularity: number;
  genres: string[];
  external_urls: {
    spotify: string;
  };
  followers?: {
    total: number;
  };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    release_date: string;
  };
  duration_ms: number;
  popularity: number;
  external_urls: {
    spotify: string;
  };
  preview_url?: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  release_date: string;
  total_tracks: number;
  popularity: number;
  external_urls: {
    spotify: string;
  };
  tracks?: {
    items: SpotifyTrack[];
    total: number;
  };
}

export interface SpotifySearchResponse {
  artists?: {
    items: SpotifyArtist[];
    total: number;
  };
  tracks?: {
    items: SpotifyTrack[];
    total: number;
  };
  albums?: {
    items: SpotifyAlbum[];
    total: number;
  };
}

// Image size priorities for Spotify images (largest first)
const IMAGE_SIZE_PRIORITY = ['640', '300', '160', '64'];

/**
 * Extract the best available image URL from Spotify image array
 */
export const getBestImageUrl = (images: Array<{ url: string; height: number; width: number }>): string => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return '';
  }

  // Sort by height (largest first) and return the first one
  const sortedImages = [...images].sort((a, b) => b.height - a.height);
  return sortedImages[0].url;
};

/**
 * Get Spotify access token using Client Credentials flow
 */
let accessToken: string | null = null;
let tokenExpiry: number = 0;

const getSpotifyAccessToken = async (): Promise<string> => {
  // Check if we have a valid token
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${API_KEYS.SPOTIFY_CLIENT_ID}:${API_KEYS.SPOTIFY_CLIENT_SECRET}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_description || 'Failed to get Spotify access token');
    }

    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Subtract 1 minute for safety

    return accessToken;
  } catch (error) {
    console.error('Spotify access token error:', error);
    throw error;
  }
};

/**
 * Make authenticated request to Spotify API
 */
const makeSpotifyRequest = async (endpoint: string, params?: Record<string, string>): Promise<any> => {
  try {
    const token = await getSpotifyAccessToken();
    
    const url = new URL(`https://api.spotify.com/v1${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Spotify API request failed');
    }

    return data;
  } catch (error) {
    console.error('Spotify API request error:', error);
    throw error;
  }
};

/**
 * Search for artists on Spotify
 */
export const searchArtists = async (
  query: string,
  limit = 20
): Promise<SpotifyArtist[]> => {
  try {
    const data = await makeSpotifyRequest('/search', {
      q: query,
      type: 'artist',
      limit: limit.toString(),
    });

    return data.artists?.items || [];
  } catch (error) {
    console.error('Spotify artist search error:', error);
    throw error;
  }
};

/**
 * Get artist information from Spotify
 */
export const getArtistInfo = async (artistId: string): Promise<SpotifyArtist> => {
  try {
    return await makeSpotifyRequest(`/artists/${artistId}`);
  } catch (error) {
    console.error('Spotify artist info error:', error);
    throw error;
  }
};

/**
 * Get artist image URL from Spotify by artist name
 */
export const getArtistImage = async (artistName: string): Promise<string> => {
  try {
    const artists = await searchArtists(artistName, 1);
    
    if (artists.length === 0) {
      return '';
    }

    return getBestImageUrl(artists[0].images);
  } catch (error) {
    console.error(`Failed to get artist image for ${artistName}:`, error);
    return '';
  }
};

/**
 * Get artist image URL from Spotify by artist ID
 */
export const getArtistImageById = async (artistId: string): Promise<string> => {
  try {
    const artist = await getArtistInfo(artistId);
    return getBestImageUrl(artist.images);
  } catch (error) {
    console.error(`Failed to get artist image for ID ${artistId}:`, error);
    return '';
  }
};

/**
 * Search for tracks on Spotify
 */
export const searchTracks = async (
  query: string,
  limit = 20
): Promise<SpotifyTrack[]> => {
  try {
    const data = await makeSpotifyRequest('/search', {
      q: query,
      type: 'track',
      limit: limit.toString(),
    });

    return data.tracks?.items || [];
  } catch (error) {
    console.error('Spotify track search error:', error);
    throw error;
  }
};

/**
 * Get track information from Spotify
 */
export const getTrackInfo = async (trackId: string): Promise<SpotifyTrack> => {
  try {
    return await makeSpotifyRequest(`/tracks/${trackId}`);
  } catch (error) {
    console.error('Spotify track info error:', error);
    throw error;
  }
};

/**
 * Get track image URL from Spotify by track name and artist
 */
export const getTrackImage = async (trackName: string, artistName: string): Promise<string> => {
  try {
    const query = `${trackName} artist:${artistName}`;
    const tracks = await searchTracks(query, 1);
    
    if (tracks.length === 0) {
      return '';
    }

    return getBestImageUrl(tracks[0].album.images);
  } catch (error) {
    console.error(`Failed to get track image for ${trackName} by ${artistName}:`, error);
    return '';
  }
};

/**
 * Get album information from Spotify
 */
export const getAlbumInfo = async (albumId: string): Promise<SpotifyAlbum> => {
  try {
    return await makeSpotifyRequest(`/albums/${albumId}`);
  } catch (error) {
    console.error('Spotify album info error:', error);
    throw error;
  }
};

/**
 * Get album image URL from Spotify by album name and artist
 */
export const getAlbumImage = async (albumName: string, artistName: string): Promise<string> => {
  try {
    const query = `${albumName} artist:${artistName}`;
    const data = await makeSpotifyRequest('/search', {
      q: query,
      type: 'album',
      limit: '1',
    });

    const albums = data.albums?.items || [];
    
    if (albums.length === 0) {
      return '';
    }

    return getBestImageUrl(albums[0].images);
  } catch (error) {
    console.error(`Failed to get album image for ${albumName} by ${artistName}:`, error);
    return '';
  }
};

/**
 * Get artist's top tracks from Spotify
 */
export const getArtistTopTracks = async (
  artistId: string,
  market = 'US'
): Promise<SpotifyTrack[]> => {
  try {
    const data = await makeSpotifyRequest(`/artists/${artistId}/top-tracks`, {
      market,
    });

    return data.tracks || [];
  } catch (error) {
    console.error('Spotify artist top tracks error:', error);
    throw error;
  }
};

/**
 * Get artist's albums from Spotify
 */
export const getArtistAlbums = async (
  artistId: string,
  limit = 20
): Promise<SpotifyAlbum[]> => {
  try {
    const data = await makeSpotifyRequest(`/artists/${artistId}/albums`, {
      limit: limit.toString(),
      include_groups: 'album,single',
    });

    return data.items || [];
  } catch (error) {
    console.error('Spotify artist albums error:', error);
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

/**
 * Get recommendations based on artist, track, or genre seeds
 */
export const getRecommendations = async (
  seedArtists?: string[],
  seedTracks?: string[],
  seedGenres?: string[],
  limit = 20
): Promise<SpotifyTrack[]> => {
  try {
    const params: Record<string, string> = {
      limit: limit.toString(),
    };

    if (seedArtists && seedArtists.length > 0) {
      params.seed_artists = seedArtists.slice(0, 5).join(',');
    }
    if (seedTracks && seedTracks.length > 0) {
      params.seed_tracks = seedTracks.slice(0, 5).join(',');
    }
    if (seedGenres && seedGenres.length > 0) {
      params.seed_genres = seedGenres.slice(0, 5).join(',');
    }

    const data = await makeSpotifyRequest('/recommendations', params);
    return data.tracks || [];
  } catch (error) {
    console.error('Spotify recommendations error:', error);
    throw error;
  }
};

export default {
  searchArtists,
  getArtistInfo,
  getArtistImage,
  getArtistImageById,
  searchTracks,
  getTrackInfo,
  getTrackImage,
  getAlbumInfo,
  getAlbumImage,
  getArtistTopTracks,
  getArtistAlbums,
  batchGetArtistImages,
  batchGetTrackImages,
  getRecommendations,
  getBestImageUrl,
};
