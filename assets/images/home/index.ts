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
  metal: require("./genres/metal.png"),
  radio: require("./genres/radio.png"),
  progressive: require("./genres/progressive.png"),
  decades: require("./genres/decades.png"),
  classical: require("./genres/classical.png"),
  jazz: require("./genres/jazz.png"),
  instrumentals: require("./genres/instrumental.png"),
  punk: require("./genres/punk.png"),
  blues: require("./genres/blues.png"),
  soul_funk: require("./genres/soul_funk.png"),
  reggae: require("./genres/reggae.png"),
  folk: require("./genres/folk.png"),

  // Moods (used in the same grid renderer)
  party: require("./moods/partymood.png"),
  chill: require("./moods/chillmood.png"),
  workout: require("./moods/wokoutmood.png"),
  focus: require("./moods/focusmood.png"),
  driving: require("./moods/drivingmood.png"),
  rainy_day: require("./moods/rainymood.png"),
  romance: require("./moods/romancemood.png"),
  sleep: require("./moods/sleepmood.png"),
  comedy: require("./moods/comedymood.png"),
  family: require("./moods/familymood.png"),
  dinner: require("./moods/dinnermood.png"),
  travel: require("./moods/travelmood.png"),
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
  genre_metal: require("./genres/metal.png"),
  genre_radio: require("./genres/radio.png"),
  genre_progressive: require("./genres/progressive.png"),
  // Additional categories
  decades: require("./genres/decades.png"),
  classical: require("./genres/classical.png"),
  jazz: require("./genres/jazz.png"),
  instrumentals: require("./genres/instrumental.png"),
  punk: require("./genres/punk.png"),
  blues: require("./genres/blues.png"),
  soul_funk: require("./genres/soul_funk.png"),
  reggae: require("./genres/reggae.png"),
  folk: require("./genres/folk.png"),
  // Moods
  party: require("./moods/partymood.png"),
  chill: require("./moods/chillmood.png"),
  workout: require("./moods/wokoutmood.png"),
  focus: require("./moods/focusmood.png"),
  driving: require("./moods/drivingmood.png"),
  rainy_day: require("./moods/rainymood.png"),
  romance: require("./moods/romancemood.png"),
  sleep: require("./moods/sleepmood.png"),
  comedy: require("./moods/comedymood.png"),
  family: require("./moods/familymood.png"),
  dinner: require("./moods/dinnermood.png"),
  travel: require("./moods/travelmood.png"),
  // Add more home screen specific images here as needed
};

export default homeImages;
