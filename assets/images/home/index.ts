import { ImageSourcePropType } from "react-native";

// Temporarily use a simple fallback instead of the default track image
const DEFAULT_TRACK = {
  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
};

// Named export used by Explore screen for both Genres & Moods
export const genreImages: Record<string, ImageSourcePropType> = {
  // Genres - matching the exact order and names from the reference image
  hiphop: require("./genres/hiphop.png"),
  dance_electro: require("./genres/dance_electro.png"),
  pop: require("./genres/pop.png"),
  country: require("./genres/country.png"),
  rock: require("./genres/rock.png"),
  indie: require("./genres/indie.png"),
  latin: require("./genres/latin.png"),
  kpop: require("./genres/kpop.png"),
  metal: DEFAULT_TRACK,
  radio: DEFAULT_TRACK,
  progressive: DEFAULT_TRACK,
  decades: require("./genres/decades.png"),
  classical: require("./genres/classical.png"),
  jazz: require("./genres/jazz.png"),
instrumentals: require("./genres/instrumental.png"),
  punk: require("./genres/punk.png"),
  blues: require("./genres/blues.png"),
  soul_funk: require("./genres/soul_funk.png"),
  reggae: require("./genres/reggae.png"),

  // Moods (used in the same grid renderer)
  party: DEFAULT_TRACK,
  chill: DEFAULT_TRACK,
  workout: DEFAULT_TRACK,
  focus: DEFAULT_TRACK,
  driving: DEFAULT_TRACK,
  rainy_day: DEFAULT_TRACK,
  romance: DEFAULT_TRACK,
  sleep: DEFAULT_TRACK,
  comedy: DEFAULT_TRACK,
  family: DEFAULT_TRACK,
  dinner: DEFAULT_TRACK,
  travel: DEFAULT_TRACK,
};

// Default export for Home screen mappings; extend as you add more images
const homeImages: Record<string, ImageSourcePropType> = {
  genre_hiphop: require("./genres/hiphop.png"),
  genre_dance_electro: require("./genres/dance_electro.png"),
  genre_pop: require("./genres/pop.png"),
  genre_country: require("./genres/country.png"),
  genre_rock: require("./genres/rock.png"),
  genre_indie: require("./genres/indie.png"),
  genre_latin: require("./genres/latin.png"),
  genre_kpop: require("./genres/kpop.png"),
  // Additional categories
  decades: require("./genres/decades.png"),
  classical: require("./genres/classical.png"),
  jazz: require("./genres/jazz.png"),
 instrumentals: require("./genres/instrumental.png"),
  punk: require("./genres/punk.png"),
  blues: require("./genres/blues.png"),
  soul_funk: require("./genres/soul_funk.png"),
  reggae: require("./genres/reggae.png"),
  // Moods
  party: DEFAULT_TRACK,
  chill: DEFAULT_TRACK,
  workout: DEFAULT_TRACK,
  focus: DEFAULT_TRACK,
  driving: DEFAULT_TRACK,
  rainy_day: DEFAULT_TRACK,
  romance: DEFAULT_TRACK,
  sleep: DEFAULT_TRACK,
  comedy: DEFAULT_TRACK,
  family: DEFAULT_TRACK,
  dinner: DEFAULT_TRACK,
  travel: DEFAULT_TRACK,
  // Add more home screen specific images here as needed
};

export default homeImages;
