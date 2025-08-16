import { ImageSourcePropType } from "react-native";

// Default placeholder image
const DEFAULT_PLACEHOLDER = {
  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
};

// Named export used by Explore screen for both Genres & Moods
export const genreImages: Record<string, ImageSourcePropType> = {
  // Genres - using local images
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

  // Moods - using local images
  party: require("./moods/partymood.png"),
  chill: require("./moods/chillmood.png"),
  workout: require("./moods/workoutmood.png"),
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

// Default export for Home screen mappings
const homeImages: Record<string, ImageSourcePropType> = {
  // Genre images with prefix
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

  // Add missing genre_ prefixed keys
  genre_classical: require("./genres/classical.png"),
  genre_jazz: require("./genres/jazz.png"),
  genre_instrumentals: require("./genres/instrumental.png"),
  genre_punk: require("./genres/punk.png"),
  genre_blues: require("./genres/blues.png"),
  genre_soul_funk: require("./genres/soul_funk.png"),
  genre_reggae: require("./genres/reggae.png"),
  genre_folk: require("./genres/folk.png"),

  // Moods - using local images
  party: require("./moods/partymood.png"),
  chill: require("./moods/chillmood.png"),
  workout: require("./moods/workoutmood.png"),
  focus: require("./moods/focusmood.png"),
  driving: require("./moods/drivingmood.png"),
  rainy_day: require("./moods/rainymood.png"),
  romance: require("./moods/romancemood.png"),
  sleep: require("./moods/sleepmood.png"),
  comedy: require("./moods/comedymood.png"),
  family: require("./moods/familymood.png"),
  dinner: require("./moods/dinnermood.png"),
  travel: require("./moods/travelmood.png"),

  // Dance/Electronic Artists
  artist_daft_punk: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_avicii: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_calvin_harris: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_martin_garrix: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_david_guetta: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_skrillex: {
    uri: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=SKRILLEX",
  },
  artist_zedd: {
    uri: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=ZEDD",
  },
  artist_marshmello: {
    uri: "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=MARSHMELLO",
  },
  artist_deadmau5: {
    uri: "https://via.placeholder.com/300x300/FDCB6E/FFFFFF?text=DEADMAU5",
  },
  artist_eric_prydz: {
    uri: "https://via.placeholder.com/300x300/74B9FF/FFFFFF?text=ERIC+PRYDZ",
  },
  artist_tchami: {
    uri: "https://via.placeholder.com/300x300/55A3FF/FFFFFF?text=TCHAMI",
  },
  artist_adam_beyer: {
    uri: "https://via.placeholder.com/300x300/A29BFE/FFFFFF?text=ADAM+BEYER",
  },
  artist_nina_kraviz: {
    uri: "https://via.placeholder.com/300x300/FF7675/FFFFFF?text=NINA+KRAVIZ",
  },
  artist_amelie_lens: {
    uri: "https://via.placeholder.com/300x300/6C5CE7/FFFFFF?text=AMELIE+LENS",
  },
  artist_armin_van_buuren: {
    uri: "https://via.placeholder.com/300x300/00B894/FFFFFF?text=ARMIN",
  },
  artist_tiesto: {
    uri: "https://via.placeholder.com/300x300/FD79A8/FFFFFF?text=TIESTO",
  },
  artist_paul_van_dyk: {
    uri: "https://via.placeholder.com/300x300/E17055/FFFFFF?text=PAUL+VAN+DYK",
  },
  artist_odesza: {
    uri: "https://via.placeholder.com/300x300/00CEC9/FFFFFF?text=ODESZA",
  },
  artist_flume: {
    uri: "https://via.placeholder.com/300x300/A29BFE/FFFFFF?text=FLUME",
  },
  artist_illenium: {
    uri: "https://via.placeholder.com/300x300/FF7675/FFFFFF?text=ILLENIUM",
  },
  artist_pendulum: {
    uri: "https://via.placeholder.com/300x300/6C5CE7/FFFFFF?text=PENDULUM",
  },
  artist_netsky: {
    uri: "https://via.placeholder.com/300x300/00B894/FFFFFF?text=NETSKY",
  },
  artist_aphex_twin: {
    uri: "https://via.placeholder.com/300x300/FD79A8/FFFFFF?text=APHEX+TWIN",
  },
  artist_boards_of_canada: {
    uri: "https://via.placeholder.com/300x300/E17055/FFFFFF?text=BOARDS+OF+CANADA",
  },
  artist_meduza: {
    uri: "https://via.placeholder.com/300x300/00CEC9/FFFFFF?text=MEDUZA",
  },
  artist_acraze: {
    uri: "https://via.placeholder.com/300x300/A29BFE/FFFFFF?text=ACRAZE",
  },
  artist_john_summit: {
    uri: "https://via.placeholder.com/300x300/FF7675/FFFFFF?text=JOHN+SUMMIT",
  },

  // Add more home screen specific images here as needed
};

export default homeImages;
