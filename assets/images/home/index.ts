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
  // Add missing genre_ prefixed keys
  genre_classical: require("./genres/classical.png"),
  genre_jazz: require("./genres/jazz.png"),
  genre_instrumentals: require("./genres/instrumental.png"),
  genre_punk: require("./genres/punk.png"),
  genre_blues: require("./genres/blues.png"),
  genre_soul_funk: require("./genres/soul_funk.png"),
  genre_reggae: require("./genres/reggae.png"),
  genre_folk: require("./genres/folk.png"),
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
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_zedd: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_marshmello: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_deadmau5: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_eric_prydz: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_tchami: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_adam_beyer: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_nina_kraviz: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_amelie_lens: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_armin_van_buuren: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_tiesto: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_paul_van_dyk: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_odesza: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_flume: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_illenium: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_pendulum: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_netsky: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_aphex_twin: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_boards_of_canada: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_meduza: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_acraze: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },
  artist_john_summit: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
  },

  // Add more home screen specific images here as needed
};

export default homeImages;
