/**
 * Mood Data
 * Structured content for all moods, modeled after genre data
 */

export interface MoodContent {
  id: string;
  title: string;
  image: string;
  likes?: string;
}

export interface MoodPlaylist {
  id: string;
  title: string;
  image: string;
  likes?: string;
}

export interface MoodNewRelease {
  id: string;
  title: string;
  artist: string;
  image: string;
  releaseDate: string;
}

export interface MoodArtist {
  id: string;
  name: string;
  image: string;
  likes?: string;
}

export interface MoodData {
  name: string;
  color: string;
  popular: MoodContent[];
  playlists: MoodPlaylist[];
  newReleases: MoodNewRelease[];
  artists: MoodArtist[];
}

const placeholder = (bg: string, text: string, w = 200, h = 200) =>
  `https://via.placeholder.com/${w}x${h}/${bg}/FFFFFF?text=${encodeURIComponent(
    text
  )}`;

export const partyMoodData: MoodData = {
  name: "PARTY",
  color: "#FF6B6B",
  popular: [
    {
      id: "1",
      title: "Party Starters",
      image: placeholder("FF6B6B", "PARTY STARTERS"),
    },
    {
      id: "2",
      title: "Dance Floor",
      image: placeholder("EE5253", "DANCE FLOOR"),
    },
    {
      id: "3",
      title: "Midnight Bass",
      image: placeholder("FF9F43", "MIDNIGHT BASS"),
    },
  ],
  playlists: [
    {
      id: "1",
      title: "House Party",
      image: placeholder("54A0FF", "HOUSE PARTY"),
    },
    {
      id: "2",
      title: "Throwback Party",
      image: placeholder("5F27CD", "THROWBACK"),
    },
    {
      id: "3",
      title: "EDM Bangers",
      image: placeholder("48DBFB", "EDM BANGERS"),
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "Lights Up",
      artist: "Nova",
      image: placeholder("FF6B6B", "LIGHTS UP"),
      releaseDate: "Album release: 09/02/25",
    },
    {
      id: "2",
      title: "Heatwave",
      artist: "Vibe Crew",
      image: placeholder("EE5253", "HEATWAVE"),
      releaseDate: "Album release: 28/01/25",
    },
    {
      id: "3",
      title: "Glow",
      artist: "Strobe",
      image: placeholder("FF9F43", "GLOW"),
      releaseDate: "Album release: 15/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Calvin Harris",
      image: placeholder("FF6B6B", "CALVIN"),
      likes: "2.1M",
    },
    {
      id: "2",
      name: "David Guetta",
      image: placeholder("EE5253", "GUETTA"),
      likes: "3.0M",
    },
    {
      id: "3",
      name: "Tiesto",
      image: placeholder("FF9F43", "TIESTO"),
      likes: "2.7M",
    },
  ],
};

export const chillMoodData: MoodData = {
  name: "CHILL",
  color: "#74B9FF",
  popular: [
    {
      id: "1",
      title: "Chill Hits",
      image: placeholder("74B9FF", "CHILL HITS"),
    },
    {
      id: "2",
      title: "Lo-fi Lounge",
      image: placeholder("55A3FF", "LO-FI LOUNGE"),
    },
    {
      id: "3",
      title: "Evening Acoustic",
      image: placeholder("A29BFE", "ACOUSTIC"),
    },
  ],
  playlists: [
    {
      id: "1",
      title: "Coffee Shop",
      image: placeholder("81ECEC", "COFFEE SHOP"),
    },
    {
      id: "2",
      title: "Chill Vibes",
      image: placeholder("00CEC9", "CHILL VIBES"),
    },
    { id: "3", title: "Soft Pop", image: placeholder("0984E3", "SOFT POP") },
  ],
  newReleases: [
    {
      id: "1",
      title: "Blue Hour",
      artist: "Luna Day",
      image: placeholder("74B9FF", "BLUE HOUR"),
      releaseDate: "Album release: 05/02/25",
    },
    {
      id: "2",
      title: "Gentle",
      artist: "Aery",
      image: placeholder("55A3FF", "GENTLE"),
      releaseDate: "Album release: 21/01/25",
    },
    {
      id: "3",
      title: "Slow Tide",
      artist: "Waves",
      image: placeholder("A29BFE", "SLOW TIDE"),
      releaseDate: "Album release: 08/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Cigarettes After Sex",
      image: placeholder("74B9FF", "CAS"),
      likes: "1.3M",
    },
    {
      id: "2",
      name: "Novo Amor",
      image: placeholder("55A3FF", "NOVO"),
      likes: "910K",
    },
    {
      id: "3",
      name: "Laufey",
      image: placeholder("A29BFE", "LAUFEY"),
      likes: "1.2M",
    },
  ],
};

export const workoutMoodData: MoodData = {
  name: "WORKOUT",
  color: "#E84393",
  popular: [
    {
      id: "1",
      title: "Beast Mode",
      image: placeholder("E84393", "BEAST MODE"),
    },
    { id: "2", title: "Pump Up", image: placeholder("FF7675", "PUMP UP") },
    { id: "3", title: "HIIT", image: placeholder("FF6B6B", "HIIT") },
  ],
  playlists: [
    { id: "1", title: "Gym Rock", image: placeholder("636E72", "GYM ROCK") },
    {
      id: "2",
      title: "EDM Workout",
      image: placeholder("48DBFB", "EDM WORKOUT"),
    },
    {
      id: "3",
      title: "Hip-Hop Grind",
      image: placeholder("341F97", "HIP-HOP GRIND"),
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "Amped",
      artist: "Volt",
      image: placeholder("E84393", "AMPED"),
      releaseDate: "Album release: 02/02/25",
    },
    {
      id: "2",
      title: "Surge",
      artist: "Kinetic",
      image: placeholder("FF7675", "SURGE"),
      releaseDate: "Album release: 20/01/25",
    },
    {
      id: "3",
      title: "Charge",
      artist: "Alpha-1",
      image: placeholder("FF6B6B", "CHARGE"),
      releaseDate: "Album release: 03/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Skrillex",
      image: placeholder("E84393", "SKRILLEX"),
      likes: "2.4M",
    },
    {
      id: "2",
      name: "Kanye West",
      image: placeholder("FF7675", "KANYE"),
      likes: "4.2M",
    },
    {
      id: "3",
      name: "Rihanna",
      image: placeholder("FF6B6B", "RIHANNA"),
      likes: "3.7M",
    },
  ],
};

export const focusMoodData: MoodData = {
  name: "FOCUS",
  color: "#10AC84",
  popular: [
    {
      id: "1",
      title: "Deep Focus",
      image: placeholder("10AC84", "DEEP FOCUS"),
    },
    {
      id: "2",
      title: "Coding Mode",
      image: placeholder("1DD1A1", "CODING MODE"),
    },
    {
      id: "3",
      title: "Brain Food",
      image: placeholder("00D2D3", "BRAIN FOOD"),
    },
  ],
  playlists: [
    {
      id: "1",
      title: "Lo-fi Beats",
      image: placeholder("81ECEC", "LO-FI BEATS"),
    },
    {
      id: "2",
      title: "Piano Focus",
      image: placeholder("74B9FF", "PIANO FOCUS"),
    },
    {
      id: "3",
      title: "Ambient Study",
      image: placeholder("A29BFE", "AMBIENT STUDY"),
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "Sierra",
      artist: "Aether",
      image: placeholder("10AC84", "SIERRA"),
      releaseDate: "Album release: 12/02/25",
    },
    {
      id: "2",
      title: "Serene",
      artist: "Noctua",
      image: placeholder("1DD1A1", "SERENE"),
      releaseDate: "Album release: 25/01/25",
    },
    {
      id: "3",
      title: "Nimbus",
      artist: "Lofi Labs",
      image: placeholder("00D2D3", "NIMBUS"),
      releaseDate: "Album release: 07/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Nils Frahm",
      image: placeholder("10AC84", "FRAHM"),
      likes: "654K",
    },
    {
      id: "2",
      name: "Ólafur Arnalds",
      image: placeholder("1DD1A1", "OLAFUR"),
      likes: "712K",
    },
    {
      id: "3",
      name: "Max Richter",
      image: placeholder("00D2D3", "RICHTER"),
      likes: "812K",
    },
  ],
};

export const drivingMoodData: MoodData = {
  name: "DRIVING",
  color: "#341F97",
  popular: [
    {
      id: "1",
      title: "Highway Rock",
      image: placeholder("341F97", "HIGHWAY ROCK"),
    },
    {
      id: "2",
      title: "Night Drive",
      image: placeholder("6C5CE7", "NIGHT DRIVE"),
    },
    { id: "3", title: "Road Trip", image: placeholder("A29BFE", "ROAD TRIP") },
  ],
  playlists: [
    {
      id: "1",
      title: "Synthwave Drive",
      image: placeholder("341F97", "SYNTHWAVE"),
    },
    {
      id: "2",
      title: "Indie Drive",
      image: placeholder("6C5CE7", "INDIE DRIVE"),
    },
    {
      id: "3",
      title: "Hip-Hop Cruise",
      image: placeholder("A29BFE", "HIP-HOP CRUISE"),
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "Motor",
      artist: "Turbo",
      image: placeholder("341F97", "MOTOR"),
      releaseDate: "Album release: 11/02/25",
    },
    {
      id: "2",
      title: "Tunnel",
      artist: "Afterglow",
      image: placeholder("6C5CE7", "TUNNEL"),
      releaseDate: "Album release: 29/01/25",
    },
    {
      id: "3",
      title: "Horizon",
      artist: "Voyage",
      image: placeholder("A29BFE", "HORIZON"),
      releaseDate: "Album release: 09/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "The Weeknd",
      image: placeholder("341F97", "WEEKND"),
      likes: "6.2M",
    },
    {
      id: "2",
      name: "The Midnight",
      image: placeholder("6C5CE7", "MIDNIGHT"),
      likes: "1.3M",
    },
    {
      id: "3",
      name: "The Killers",
      image: placeholder("A29BFE", "KILLERS"),
      likes: "2.0M",
    },
  ],
};

export const rainyDayMoodData: MoodData = {
  name: "RAINY DAY",
  color: "#55A3FF",
  popular: [
    {
      id: "1",
      title: "Rainy Chill",
      image: placeholder("55A3FF", "RAINY CHILL"),
    },
    {
      id: "2",
      title: "Reading Nook",
      image: placeholder("74B9FF", "READING NOOK"),
    },
    { id: "3", title: "Warm Tea", image: placeholder("A29BFE", "WARM TEA") },
  ],
  playlists: [
    {
      id: "1",
      title: "Acoustic Rain",
      image: placeholder("55A3FF", "ACOUSTIC RAIN"),
    },
    {
      id: "2",
      title: "Piano Drizzle",
      image: placeholder("74B9FF", "PIANO DRIZZLE"),
    },
    {
      id: "3",
      title: "Lo-fi Rain",
      image: placeholder("A29BFE", "LO-FI RAIN"),
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "Umbrella",
      artist: "Drizzle",
      image: placeholder("55A3FF", "UMBRELLA"),
      releaseDate: "Album release: 04/02/25",
    },
    {
      id: "2",
      title: "Puddles",
      artist: "Cloud Nine",
      image: placeholder("74B9FF", "PUDDLES"),
      releaseDate: "Album release: 19/01/25",
    },
    {
      id: "3",
      title: "Fog",
      artist: "Haze",
      image: placeholder("A29BFE", "FOG"),
      releaseDate: "Album release: 02/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Bon Iver",
      image: placeholder("55A3FF", "BON IVER"),
      likes: "1.8M",
    },
    {
      id: "2",
      name: "Damien Rice",
      image: placeholder("74B9FF", "RICE"),
      likes: "812K",
    },
    {
      id: "3",
      name: "Keaton Henson",
      image: placeholder("A29BFE", "HENSON"),
      likes: "402K",
    },
  ],
};

export const romanceMoodData: MoodData = {
  name: "ROMANCE",
  color: "#FDCB6E",
  popular: [
    {
      id: "1",
      title: "Love Songs",
      image: placeholder("FDCB6E", "LOVE SONGS"),
    },
    {
      id: "2",
      title: "Date Night",
      image: placeholder("FFA801", "DATE NIGHT"),
    },
    {
      id: "3",
      title: "Slow Dance",
      image: placeholder("FFB142", "SLOW DANCE"),
    },
  ],
  playlists: [
    { id: "1", title: "Rom-Com", image: placeholder("FDCB6E", "ROM-COM") },
    {
      id: "2",
      title: "Candlelight",
      image: placeholder("FFA801", "CANDLELIGHT"),
    },
    { id: "3", title: "Wedding", image: placeholder("FFB142", "WEDDING") },
  ],
  newReleases: [
    {
      id: "1",
      title: "Heartlines",
      artist: "Amara",
      image: placeholder("FDCB6E", "HEARTLINES"),
      releaseDate: "Album release: 14/02/25",
    },
    {
      id: "2",
      title: "Blush",
      artist: "Rose & Co.",
      image: placeholder("FFA801", "BLUSH"),
      releaseDate: "Album release: 24/01/25",
    },
    {
      id: "3",
      title: "Promise",
      artist: "Seraph",
      image: placeholder("FFB142", "PROMISE"),
      releaseDate: "Album release: 05/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Ed Sheeran",
      image: placeholder("FDCB6E", "SHEERAN"),
      likes: "6.0M",
    },
    {
      id: "2",
      name: "Adele",
      image: placeholder("FFA801", "ADELE"),
      likes: "7.1M",
    },
    {
      id: "3",
      name: "John Legend",
      image: placeholder("FFB142", "LEGEND"),
      likes: "4.4M",
    },
  ],
};

export const sleepMoodData: MoodData = {
  name: "SLEEP",
  color: "#2D3436",
  popular: [
    { id: "1", title: "Sleep", image: placeholder("2D3436", "SLEEP") },
    {
      id: "2",
      title: "Night Rain",
      image: placeholder("636E72", "NIGHT RAIN"),
    },
    {
      id: "3",
      title: "Deep Sleep",
      image: placeholder("95A5A6", "DEEP SLEEP"),
    },
  ],
  playlists: [
    {
      id: "1",
      title: "White Noise",
      image: placeholder("2D3436", "WHITE NOISE"),
    },
    {
      id: "2",
      title: "Sleep Piano",
      image: placeholder("636E72", "SLEEP PIANO"),
    },
    { id: "3", title: "Ocean", image: placeholder("95A5A6", "OCEAN") },
  ],
  newReleases: [
    {
      id: "1",
      title: "Moon",
      artist: "Somnus",
      image: placeholder("2D3436", "MOON"),
      releaseDate: "Album release: 03/02/25",
    },
    {
      id: "2",
      title: "Starlit",
      artist: "Lull",
      image: placeholder("636E72", "STARLIT"),
      releaseDate: "Album release: 18/01/25",
    },
    {
      id: "3",
      title: "Drift",
      artist: "Calm Sea",
      image: placeholder("95A5A6", "DRIFT"),
      releaseDate: "Album release: 01/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Hammock",
      image: placeholder("2D3436", "HAMMOCK"),
      likes: "412K",
    },
    {
      id: "2",
      name: "Ólafur Arnalds",
      image: placeholder("636E72", "OLAFUR"),
      likes: "712K",
    },
    {
      id: "3",
      name: "Brian Eno",
      image: placeholder("95A5A6", "ENO"),
      likes: "1.1M",
    },
  ],
};

export const comedyMoodData: MoodData = {
  name: "COMEDY",
  color: "#E17055",
  popular: [
    {
      id: "1",
      title: "Stand-up Mix",
      image: placeholder("E17055", "STAND-UP"),
    },
    { id: "2", title: "Humor Hub", image: placeholder("FAB1A0", "HUMOR HUB") },
    {
      id: "3",
      title: "Comic Relief",
      image: placeholder("FFEAA7", "COMIC RELIEF"),
    },
  ],
  playlists: [
    {
      id: "1",
      title: "Sitcom Classics",
      image: placeholder("E17055", "SITCOMS"),
    },
    { id: "2", title: "Funny Skits", image: placeholder("FAB1A0", "SKITS") },
    { id: "3", title: "Feel Good", image: placeholder("FFEAA7", "FEEL GOOD") },
  ],
  newReleases: [
    {
      id: "1",
      title: "Giggle",
      artist: "Smiles",
      image: placeholder("E17055", "GIGGLE"),
      releaseDate: "Album release: 06/02/25",
    },
    {
      id: "2",
      title: "Punchline",
      artist: "StandUp Co.",
      image: placeholder("FAB1A0", "PUNCHLINE"),
      releaseDate: "Album release: 22/01/25",
    },
    {
      id: "3",
      title: "Cheer",
      artist: "Sunny",
      image: placeholder("FFEAA7", "CHEER"),
      releaseDate: "Album release: 07/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Bo Burnham",
      image: placeholder("E17055", "BO"),
      likes: "1.3M",
    },
    {
      id: "2",
      name: "Weird Al",
      image: placeholder("FAB1A0", "WEIRD AL"),
      likes: "1.0M",
    },
    {
      id: "3",
      name: "Flight of the Conchords",
      image: placeholder("FFEAA7", "FOTC"),
      likes: "890K",
    },
  ],
};

export const familyMoodData: MoodData = {
  name: "FAMILY",
  color: "#A3CB38",
  popular: [
    {
      id: "1",
      title: "Family Time",
      image: placeholder("A3CB38", "FAMILY TIME"),
    },
    { id: "2", title: "Kids Fun", image: placeholder("78E08F", "KIDS FUN") },
    { id: "3", title: "Road Fun", image: placeholder("C4E538", "ROAD FUN") },
  ],
  playlists: [
    {
      id: "1",
      title: "Disney Favorites",
      image: placeholder("A3CB38", "DISNEY"),
    },
    {
      id: "2",
      title: "Sing Along",
      image: placeholder("78E08F", "SING ALONG"),
    },
    {
      id: "3",
      title: "Feel Good Pop",
      image: placeholder("C4E538", "FEEL GOOD POP"),
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "Smiles",
      artist: "Joy",
      image: placeholder("A3CB38", "SMILES"),
      releaseDate: "Album release: 10/02/25",
    },
    {
      id: "2",
      title: "Play",
      artist: "Funhouse",
      image: placeholder("78E08F", "PLAY"),
      releaseDate: "Album release: 27/01/25",
    },
    {
      id: "3",
      title: "Together",
      artist: "Home",
      image: placeholder("C4E538", "TOGETHER"),
      releaseDate: "Album release: 08/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "They Might Be Giants",
      image: placeholder("A3CB38", "TMBG"),
      likes: "612K",
    },
    {
      id: "2",
      name: "Rascal Flatts",
      image: placeholder("78E08F", "RASCAL"),
      likes: "1.2M",
    },
    {
      id: "3",
      name: "Imagine Dragons",
      image: placeholder("C4E538", "ID"),
      likes: "4.0M",
    },
  ],
};

export const dinnerMoodData: MoodData = {
  name: "DINNER",
  color: "#8B5CF6",
  popular: [
    {
      id: "1",
      title: "Dinner Jazz",
      image: placeholder("8B5CF6", "DINNER JAZZ"),
    },
    {
      id: "2",
      title: "Bossa Nova",
      image: placeholder("7C3AED", "BOSSA NOVA"),
    },
    {
      id: "3",
      title: "Italian Night",
      image: placeholder("6D28D9", "ITALIAN NIGHT"),
    },
  ],
  playlists: [
    {
      id: "1",
      title: "Romantic Dinner",
      image: placeholder("8B5CF6", "ROMANTIC"),
    },
    {
      id: "2",
      title: "Fine Dining",
      image: placeholder("7C3AED", "FINE DINING"),
    },
    {
      id: "3",
      title: "Family Dinner",
      image: placeholder("6D28D9", "FAMILY DINNER"),
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "Candle",
      artist: "Seraph",
      image: placeholder("8B5CF6", "CANDLE"),
      releaseDate: "Album release: 13/02/25",
    },
    {
      id: "2",
      title: "Olive",
      artist: "Roma",
      image: placeholder("7C3AED", "OLIVE"),
      releaseDate: "Album release: 30/01/25",
    },
    {
      id: "3",
      title: "Toast",
      artist: "Maison",
      image: placeholder("6D28D9", "TOAST"),
      releaseDate: "Album release: 11/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Norah Jones",
      image: placeholder("8B5CF6", "NORAH"),
      likes: "2.1M",
    },
    {
      id: "2",
      name: "Michael Bublé",
      image: placeholder("7C3AED", "BUBLE"),
      likes: "3.2M",
    },
    {
      id: "3",
      name: "Frank Sinatra",
      image: placeholder("6D28D9", "SINATRA"),
      likes: "5.0M",
    },
  ],
};

export const travelMoodData: MoodData = {
  name: "TRAVEL",
  color: "#00B894",
  popular: [
    {
      id: "1",
      title: "Airplane Mode",
      image: placeholder("00B894", "AIRPLANE MODE"),
    },
    {
      id: "2",
      title: "Wanderlust",
      image: placeholder("55EFC4", "WANDERLUST"),
    },
    { id: "3", title: "City Walk", image: placeholder("00CEC9", "CITY WALK") },
  ],
  playlists: [
    {
      id: "1",
      title: "Global Hits",
      image: placeholder("00B894", "GLOBAL HITS"),
    },
    {
      id: "2",
      title: "Bollywood Road",
      image: placeholder("55EFC4", "BOLLYWOOD ROAD"),
    },
    {
      id: "3",
      title: "Latin Travel",
      image: placeholder("00CEC9", "LATIN TRAVEL"),
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "Jet",
      artist: "Atlas",
      image: placeholder("00B894", "JET"),
      releaseDate: "Album release: 16/02/25",
    },
    {
      id: "2",
      title: "Soul",
      artist: "Nomad",
      image: placeholder("55EFC4", "SOUL"),
      releaseDate: "Album release: 31/01/25",
    },
    {
      id: "3",
      title: "Rail",
      artist: "Transit",
      image: placeholder("00CEC9", "RAIL"),
      releaseDate: "Album release: 12/01/25",
    },
  ],
  artists: [
    {
      id: "1",
      name: "Coldplay",
      image: placeholder("00B894", "COLDPLAY"),
      likes: "8.1M",
    },
    {
      id: "2",
      name: "Of Monsters and Men",
      image: placeholder("55EFC4", "OMAM"),
      likes: "1.9M",
    },
    {
      id: "3",
      name: "Avicii",
      image: placeholder("00CEC9", "AVICII"),
      likes: "3.0M",
    },
  ],
};

export const moodData: Record<string, MoodData> = {
  party: partyMoodData,
  chill: chillMoodData,
  workout: workoutMoodData,
  focus: focusMoodData,
  driving: drivingMoodData,
  rainy_day: rainyDayMoodData,
  romance: romanceMoodData,
  sleep: sleepMoodData,
  comedy: comedyMoodData,
  family: familyMoodData,
  dinner: dinnerMoodData,
  travel: travelMoodData,
};
