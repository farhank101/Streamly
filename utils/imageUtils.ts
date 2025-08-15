import { ImageSourcePropType } from "react-native";

// Keep this map empty by default to avoid bundling missing assets.
// Add entries only for files that actually exist in the repo.
const STATIC_IMAGES: Record<string, ImageSourcePropType> = {};

// Default fallback image (1x1 transparent PNG)
const DEFAULT_FALLBACK = {
  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
};

// Artist placeholder images
const ARTIST_PLACEHOLDERS: Record<string, string> = {
  "The Smiths":
    "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=The+Smiths",
  "The Clash":
    "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=The+Clash",
  "Joy Division":
    "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Joy+Division",
  Queen: "https://via.placeholder.com/300x300/FDCB6E/FFFFFF?text=Queen",
  "David Bowie":
    "https://via.placeholder.com/300x300/74B9FF/FFFFFF?text=David+Bowie",
  "The Beatles":
    "https://via.placeholder.com/300x300/55A3FF/FFFFFF?text=The+Beatles",
  "Pink Floyd":
    "https://via.placeholder.com/300x300/A29BFE/FFFFFF?text=Pink+Floyd",
  "Led Zeppelin":
    "https://via.placeholder.com/300x300/FF7675/FFFFFF?text=Led+Zeppelin",
};

/**
 * Get artist image with fallback handling
 * @param artistName - The name of the artist
 * @param customImage - Optional custom image URL
 * @returns The image source with proper fallback
 */
export const getArtistImage = (
  artistName: string,
  customImage?: string
): ImageSourcePropType => {
  // If a custom image is provided and it's a valid URL, use it
  if (
    customImage &&
    (customImage.startsWith("http") || customImage.startsWith("https"))
  ) {
    return { uri: customImage };
  }

  // Check if we have a placeholder for this artist
  const placeholder = ARTIST_PLACEHOLDERS[artistName];
  if (placeholder) {
    return { uri: placeholder };
  }

  // Generate a generic placeholder based on artist name
  const encodedName = encodeURIComponent(artistName);
  const color = getColorFromName(artistName);
  const genericPlaceholder = `https://via.placeholder.com/300x300/${color}/FFFFFF?text=${encodedName}`;

  return { uri: genericPlaceholder };
};

/**
 * Generate a consistent color from artist name
 * @param name - The artist name
 * @returns A hex color code
 */
const getColorFromName = (name: string): string => {
  const colors = [
    "FF6B6B",
    "4ECDC4",
    "45B7D1",
    "FDCB6E",
    "74B9FF",
    "55A3FF",
    "A29BFE",
    "FF7675",
    "6C5CE7",
    "00B894",
    "FD79A8",
    "FDCB6E",
    "E17055",
    "00CEC9",
    "A29BFE",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
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

/**
 * Validate if an image URL is accessible
 * @param url - The image URL to validate
 * @returns Promise that resolves to true if image is accessible
 */
export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.warn(`Failed to validate image URL: ${url}`, error);
    return false;
  }
};
