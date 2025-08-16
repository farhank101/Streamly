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
    console.log(`🔄 getArtistImage called for: ${artistName}`);
    console.log(`🔄 Config:`, finalConfig);

    // Try primary source first
    let imageUrl = "";

    if (finalConfig.primarySource === "spotify") {
      console.log(`🔄 Trying Spotify first for: ${artistName}`);
      imageUrl = await getSpotifyArtistImage(artistName);
      console.log(`🔄 Spotify result for ${artistName}:`, imageUrl ? imageUrl.substring(0, 50) + "..." : "No image");
    } else {
      console.log(`🔄 Trying LastFM first for: ${artistName}`);
      imageUrl = await getLastfmArtistImage(artistName);
      console.log(`🔄 LastFM result for ${artistName}:`, imageUrl ? imageUrl.substring(0, 50) + "..." : "No image");
    }

    // If we got an image, return it
    if (imageUrl && imageUrl.length > 0) {
      console.log(`✅ Primary source successful for ${artistName}`);
      return imageUrl;
    }

    // If fallback is enabled and primary failed, try the other source
    if (finalConfig.enableFallback) {
      console.log(`🔄 Trying fallback source for: ${artistName}`);
      if (finalConfig.primarySource === "spotify") {
        imageUrl = await getLastfmArtistImage(artistName);
        console.log(`🔄 LastFM fallback result for ${artistName}:`, imageUrl ? imageUrl.substring(0, 50) + "..." : "No image");
      } else {
        imageUrl = await getSpotifyArtistImage(artistName);
        console.log(`🔄 Spotify fallback result for ${artistName}:`, imageUrl ? imageUrl.substring(0, 50) + "..." : "No image");
      }
    }

    // If still no image, provide a better fallback
    if (!imageUrl || imageUrl.length === 0) {
      // Generate a unique fallback image based on artist name
      const fallbackImage = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face&artist=${encodeURIComponent(artistName)}`;
      console.log(`🔄 Using fallback image for ${artistName}:`, fallbackImage);
      return fallbackImage;
    }

    return imageUrl;
  } catch (error) {
    console.error(`❌ Failed to get artist image for ${artistName}:`, error);
    
    // Even if everything fails, provide a fallback image
    const fallbackImage = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face&artist=${encodeURIComponent(artistName)}`;
    console.log(`🔄 Using emergency fallback image for ${artistName}:`, fallbackImage);
    return fallbackImage;
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
