import { ImageSourcePropType } from "react-native";

const DEFAULT_TRACK = require("../default-track.png");

// Named export used by Explore screen for both Genres & Moods
export const genreImages: Record<string, ImageSourcePropType> = {
  // Genres
  hiphop: require("./genres/hiphop.png"),
  dance_electro: DEFAULT_TRACK,
  pop: DEFAULT_TRACK,
  country: DEFAULT_TRACK,
  rock: DEFAULT_TRACK,
  indie: DEFAULT_TRACK,
  latin: DEFAULT_TRACK,
  kpop: DEFAULT_TRACK,
  metal: DEFAULT_TRACK,
  radio: DEFAULT_TRACK,
  progressive: DEFAULT_TRACK,
  // Moods (used in the same grid renderer)
  party: DEFAULT_TRACK,
  chill: DEFAULT_TRACK,
  workout: DEFAULT_TRACK,
  romance: DEFAULT_TRACK,
  sleep: DEFAULT_TRACK,
  comedy: DEFAULT_TRACK,
  family: DEFAULT_TRACK,
  travel: DEFAULT_TRACK,
};

// Default export for Home screen mappings; extend as you add more images
const homeImages: Record<string, ImageSourcePropType> = {
  genre_hiphop: require("./genres/hiphop.png"),
};

export default homeImages;
