/**
 * Image Service
 * Unified service for fetching artist, track, and album images
 * Provides fallback between Spotify and LastFM APIs
 */

import {
  getArtistImage as getLastfmArtistImage,
  getTrackImage as getLastfmTrackImage,
  getAlbumImage as getLastfmAlbumImage,
} from "./lastfm";
import {
  getArtistImage as getSpotifyArtistImage,
  getTrackImage as getSpotifyTrackImage,
  getAlbumImage as getSpotifyAlbumImage,
} from "./spotify";

export interface ImageServiceConfig {
  primarySource: "spotify" | "lastfm";
  enableFallback: boolean;
  timeoutMs: number;
}

const DEFAULT_CONFIG: ImageServiceConfig = {
  primarySource: "spotify",
  enableFallback: true,
  timeoutMs: 5000,
};

/**
 * Get artist image with fallback support
 */
export const getArtistImage = async (
  artistName: string,
  config: Partial<ImageServiceConfig> = {}
): Promise<string> => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    // Try primary source first
    let imageUrl = "";

    if (finalConfig.primarySource === "spotify") {
      imageUrl = await getSpotifyArtistImage(artistName);
    } else {
      imageUrl = await getLastfmArtistImage(artistName);
    }

    // If we got an image, return it
    if (imageUrl) {
      return imageUrl;
    }

    // If fallback is enabled and primary failed, try the other source
    if (finalConfig.enableFallback) {
      if (finalConfig.primarySource === "spotify") {
        imageUrl = await getLastfmArtistImage(artistName);
      } else {
        imageUrl = await getSpotifyArtistImage(artistName);
      }
    }

    return imageUrl;
  } catch (error) {
    console.error(`Failed to get artist image for ${artistName}:`, error);
    return "";
  }
};

/**
 * Get track image with fallback support
 */
export const getTrackImage = async (
  trackName: string,
  artistName: string,
  config: Partial<ImageServiceConfig> = {}
): Promise<string> => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    // Try primary source first
    let imageUrl = "";

    if (finalConfig.primarySource === "spotify") {
      imageUrl = await getSpotifyTrackImage(trackName, artistName);
    } else {
      imageUrl = await getLastfmTrackImage(trackName, artistName);
    }

    // If we got an image, return it
    if (imageUrl) {
      return imageUrl;
    }

    // If fallback is enabled and primary failed, try the other source
    if (finalConfig.enableFallback) {
      if (finalConfig.primarySource === "spotify") {
        imageUrl = await getLastfmTrackImage(trackName, artistName);
      } else {
        imageUrl = await getSpotifyTrackImage(trackName, artistName);
      }
    }

    return imageUrl;
  } catch (error) {
    console.error(
      `Failed to get track image for ${trackName} by ${artistName}:`,
      error
    );
    return "";
  }
};

/**
 * Get album image with fallback support
 */
export const getAlbumImage = async (
  albumName: string,
  artistName: string,
  config: Partial<ImageServiceConfig> = {}
): Promise<string> => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    // Try primary source first
    let imageUrl = "";

    if (finalConfig.primarySource === "spotify") {
      imageUrl = await getSpotifyAlbumImage(albumName, artistName);
    } else {
      imageUrl = await getLastfmAlbumImage(albumName, artistName);
    }

    // If we got an image, return it
    if (imageUrl) {
      return imageUrl;
    }

    // If fallback is enabled and primary failed, try the other source
    if (finalConfig.enableFallback) {
      if (finalConfig.primarySource === "spotify") {
        imageUrl = await getLastfmAlbumImage(albumName, artistName);
      } else {
        imageUrl = await getSpotifyAlbumImage(albumName, artistName);
      }
    }

    return imageUrl;
  } catch (error) {
    console.error(
      `Failed to get album image for ${albumName} by ${artistName}:`,
      error
    );
    return "";
  }
};

/**
 * Batch fetch artist images with fallback support
 */
export const batchGetArtistImages = async (
  artistNames: string[],
  config: Partial<ImageServiceConfig> = {}
): Promise<Record<string, string>> => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const results: Record<string, string> = {};

  try {
    const promises = artistNames.map(async (artistName) => {
      try {
        const imageUrl = await getArtistImage(artistName, finalConfig);
        return { artistName, imageUrl };
      } catch (error) {
        console.error(`Failed to get image for ${artistName}:`, error);
        return { artistName, imageUrl: "" };
      }
    });

    const resolved = await Promise.all(promises);

    resolved.forEach(({ artistName, imageUrl }) => {
      results[artistName] = imageUrl;
    });
  } catch (error) {
    console.error("Batch artist image fetch error:", error);
  }

  return results;
};

/**
 * Batch fetch track images with fallback support
 */
export const batchGetTrackImages = async (
  tracks: Array<{ name: string; artist: string }>,
  config: Partial<ImageServiceConfig> = {}
): Promise<Record<string, string>> => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const results: Record<string, string> = {};

  try {
    const promises = tracks.map(async (track) => {
      try {
        const imageUrl = await getTrackImage(
          track.name,
          track.artist,
          finalConfig
        );
        const key = `${track.artist} - ${track.name}`;
        return { key, imageUrl };
      } catch (error) {
        console.error(
          `Failed to get image for ${track.name} by ${track.artist}:`,
          error
        );
        const key = `${track.artist} - ${track.name}`;
        return { key, imageUrl: "" };
      }
    });

    const resolved = await Promise.all(promises);

    resolved.forEach(({ key, imageUrl }) => {
      results[key] = imageUrl;
    });
  } catch (error) {
    console.error("Batch track image fetch error:", error);
  }

  return results;
};

/**
 * Test image service connectivity
 */
export const testImageService = async (): Promise<{
  spotify: boolean;
  lastfm: boolean;
}> => {
  const testArtist = "The Beatles";

  const results = {
    spotify: false,
    lastfm: false,
  };

  try {
    // Test Spotify
    const spotifyImage = await getSpotifyArtistImage(testArtist);
    results.spotify = !!spotifyImage;
  } catch (error) {
    console.error("Spotify test failed:", error);
  }

  try {
    // Test LastFM
    const lastfmImage = await getLastfmArtistImage(testArtist);
    results.lastfm = !!lastfmImage;
  } catch (error) {
    console.error("LastFM test failed:", error);
  }

  return results;
};

export default {
  getArtistImage,
  getTrackImage,
  getAlbumImage,
  batchGetArtistImages,
  batchGetTrackImages,
  testImageService,
};
