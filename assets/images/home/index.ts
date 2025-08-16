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
    uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
  },
  artist_zedd: {
    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=face",
  },
  artist_marshmello: {
    uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
  },
  artist_deadmau5: {
    uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
  },
  artist_eric_prydz: {
    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=face",
  },
  artist_tchami: {
    uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
  },
  artist_adam_beyer: {
    uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
  },
  artist_nina_kraviz: {
    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=face",
  },
  artist_amelie_lens: {
    uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
  },
  artist_armin_van_buuren: {
    uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
  },
  artist_tiesto: {
    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=face",
  },
  artist_paul_van_dyk: {
    uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
  },
  artist_odesza: {
    uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
  },
  artist_flume: {
    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=face",
  },
  artist_illenium: {
    uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
  },
  artist_pendulum: {
    uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
  },
  artist_netsky: {
    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=face",
  },
  artist_aphex_twin: {
    uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
  },
  artist_boards_of_canada: {
    uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
  },
  artist_meduza: {
    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=face",
  },
  artist_acraze: {
    uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
  },
  artist_john_summit: {
    uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
  },

  // Recommended Artists with Real Spotify Images
  artist_21_savage: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb4f8f76117470957c0e81e5b2",
  },
  artist_cardi_b: {
    uri: "https://i.scdn.co/image/ab6761610000e5eba23286f24edd4a7dbdc6311d",
  },
  artist_dababy: {
    uri: "https://i.scdn.co/image/ab6761610000e5ebbd6918901c1714560669f570",
  },
  artist_drake: {
    uri: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
  },
  artist_eminem: {
    uri: "https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b",
  },
  artist_gunna: {
    uri: "https://i.scdn.co/image/ab6761610000e5eba998bc86f87b9fe7e2466110",
  },

  // Add more home screen specific images here as needed
};

export default homeImages;
