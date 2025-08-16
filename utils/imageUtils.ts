/**
 * Image Utilities
 * Provides fallback mechanisms and safe image loading
 */

import { ImageSourcePropType } from 'react-native';

// Default placeholder image
export const DEFAULT_PLACEHOLDER = {
  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
};

// Safe image source resolver with proper fallbacks
export const getSafeImageSource = (item: any): ImageSourcePropType => {
  try {
    // Priority 1: Local image from homeImages
    if (item.imageKey && typeof item.imageKey === 'string') {
      // For now, just return the imageKey as a string
      // The actual image loading will be handled by the homeImages import in the component
      return item.imageKey;
    }

    // Priority 2: Remote image URL
    if (
      item.image &&
      typeof item.image === "string" &&
      item.image.trim() !== "" &&
      (item.image.startsWith('http://') || item.image.startsWith('https://'))
    ) {
      return { uri: item.image.trim() };
    }

    // Priority 3: Default placeholder
    return DEFAULT_PLACEHOLDER;
  } catch (error) {
    console.error("Error in getSafeImageSource:", error);
    return DEFAULT_PLACEHOLDER;
  }
};

// Validate image source
export const isValidImageSource = (source: any): boolean => {
  if (!source) return false;
  
  if (typeof source === 'string') {
    return source.trim() !== '';
  }
  
  if (typeof source === 'object' && source.uri) {
    return typeof source.uri === 'string' && source.uri.trim() !== '';
  }
  
  return false;
};

// Get fallback image for different content types
export const getFallbackImage = (type: 'artist' | 'album' | 'playlist' | 'genre' | 'mood'): ImageSourcePropType => {
  const fallbackImages = {
    artist: DEFAULT_PLACEHOLDER,
    album: DEFAULT_PLACEHOLDER,
    playlist: DEFAULT_PLACEHOLDER,
    genre: DEFAULT_PLACEHOLDER,
    mood: DEFAULT_PLACEHOLDER,
  };
  
  return fallbackImages[type] || DEFAULT_PLACEHOLDER;
};

export default {
  getSafeImageSource,
  isValidImageSource,
  getFallbackImage,
  DEFAULT_PLACEHOLDER,
};
