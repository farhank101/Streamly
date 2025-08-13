import { ImageSourcePropType } from "react-native";

// Keep this map empty by default to avoid bundling missing assets.
// Add entries only for files that actually exist in the repo.
const STATIC_IMAGES: Record<string, ImageSourcePropType> = {};

// Default fallback image (1x1 transparent PNG)
const DEFAULT_FALLBACK = {
  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
};

/**
 * Load an image with fallback handling
 * @param path - The image path to load
 * @param fallback - Optional fallback image
 * @returns The loaded image or fallback
 */
export const loadImage = (
  path: string,
  fallback?: ImageSourcePropType
): ImageSourcePropType => {
  // Check if the path exists in our static mapping
  if (STATIC_IMAGES[path as keyof typeof STATIC_IMAGES]) {
    return STATIC_IMAGES[path as keyof typeof STATIC_IMAGES];
  }

  // If not found, log warning and return fallback
  console.warn(`Image not found: ${path}, using fallback`);
  return fallback || DEFAULT_FALLBACK;
};

/**
 * Load multiple images and return a map
 * @param imageMap - Object with keys and image paths
 * @returns Object with loaded images
 */
export const loadImages = <T extends Record<string, string>>(
  imageMap: T
): Record<keyof T, ImageSourcePropType> => {
  const result: Record<string, ImageSourcePropType> = {};

  for (const [key, path] of Object.entries(imageMap)) {
    result[key] = loadImage(path);
  }

  return result as Record<keyof T, ImageSourcePropType>;
};

/**
 * Check if an image path exists in the static mapping
 */
export const hasImage = (path: string): boolean => {
  return path in STATIC_IMAGES;
};

/**
 * Get all available image paths
 */
export const getAvailableImages = (): string[] => {
  return Object.keys(STATIC_IMAGES);
};
