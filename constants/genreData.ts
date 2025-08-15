/**
 * Genre Data
 * Comprehensive data for all music genres
 */

export interface GenreContent {
  id: string;
  title: string;
  image: string;
  likes: string;
}

export interface GenrePlaylist {
  id: string;
  title: string;
  image: string;
  likes: string;
}

export interface GenreNewRelease {
  id: string;
  title: string;
  artist: string;
  image: string;
  releaseDate: string;
}

export interface GenreArtist {
  id: string;
  name: string;
  image: string;
  likes: string;
}

export interface GenreData {
  name: string;
  color: string;
  popular: GenreContent[];
  playlists: GenrePlaylist[];
  newReleases: GenreNewRelease[];
  artists: GenreArtist[];
}

// Example data for Rock genre (matching the image exactly)
export const rockGenreData: GenreData = {
  name: "ROCK",
  color: "#FECA57",
  popular: [
    {
      id: "1",
      title: "Workout Rock",
      image:
        "https://via.placeholder.com/200x200/FECA57/FFFFFF?text=WORKOUT+ROCK",
      likes: "414,228",
    },
    {
      id: "2",
      title: "Love Rock",
      image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=LOVE+ROCK",
      likes: "98,284",
    },
    {
      id: "3",
      title: "Rockab",
      image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=ROCKAB",
      likes: "82,125",
    },
  ],
  playlists: [
    {
      id: "1",
      title: "Pop Rock",
      image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=POP+ROCK",
      likes: "420,112",
    },
    {
      id: "2",
      title: "Woodstock Legends",
      image:
        "https://via.placeholder.com/200x200/00B894/FFFFFF?text=WOODSTOCK+LEGENDS",
      likes: "64,199",
    },
    {
      id: "3",
      title: "Guitar!",
      image: "https://via.placeholder.com/200x200/FAB1A0/FFFFFF?text=GUITAR",
      likes: "299,156",
    },
    {
      id: "4",
      title: "90s Alternative Rock",
      image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=90S+ALT",
      likes: "711,692",
    },
    {
      id: "5",
      title: "Indie Rock",
      image:
        "https://via.placeholder.com/200x200/00B894/FFFFFF?text=INDIE+ROCK",
      likes: "490,172",
    },
    {
      id: "6",
      title: "Progressive Rock",
      image: "https://via.placeholder.com/200x200/20BF6B/FFFFFF?text=PROG+ROCK",
      likes: "128,045",
    },
    {
      id: "7",
      title: "80s Rock Anthems",
      image: "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=80S+ROCK",
      likes: "381,737",
    },
    {
      id: "8",
      title: "Love Rock",
      image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=LOVE+ROCK",
      likes: "98,284",
    },
    {
      id: "9",
      title: "Rockabilly",
      image:
        "https://via.placeholder.com/200x200/E84393/FFFFFF?text=ROCKABILLY",
      likes: "82,127",
    },
    {
      id: "10",
      title: "Guitar Solos",
      image:
        "https://via.placeholder.com/200x200/0984E3/FFFFFF?text=GUITAR+SOLOS",
      likes: "299,154",
    },
    {
      id: "11",
      title: "Pop Rock",
      image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=POP+ROCK",
      likes: "420,112",
    },
    {
      id: "12",
      title: "Woodstock Legends",
      image:
        "https://via.placeholder.com/200x200/00B894/FFFFFF?text=WOODSTOCK+LEGENDS",
      likes: "64,199",
    },
    {
      id: "13",
      title: "70s Rock Anthems",
      image: "https://via.placeholder.com/200x200/E84393/FFFFFF?text=70S+ROCK",
      likes: "387,722",
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "V",
      artist: "The Vegabonds",
      image: "https://via.placeholder.com/200x200/FECA57/FFFFFF?text=VEGABONDS",
      releaseDate: "Album release: 18/01/19",
    },
    {
      id: "2",
      title: "Powerwolf",
      artist: "Metallum Nostrum",
      image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=POWERWOLF",
      releaseDate: "Album release: 11/01/19",
    },
    {
      id: "3",
      title: "Glanto",
      artist: "David B",
      image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=DAVID+B",
      releaseDate: "Album release: 15/03/19",
    },
  ],
  artists: [
    {
      id: "1",
      name: "The Beatles",
      image: "https://via.placeholder.com/150x150/FECA57/FFFFFF?text=BEATLES",
      likes: "871,189",
    },
    {
      id: "2",
      name: "Queen",
      image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=QUEEN",
      likes: "948,117",
    },
    {
      id: "3",
      name: "Led Zeppelin",
      image:
        "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=LED+ZEPPELIN",
      likes: "823,456",
    },
  ],
};

/**
 * Comprehensive in-memory database for all genres.
 * Keys are URL/route-friendly slugs used by `app/category/[id].tsx`.
 */
export const genreData: Record<string, GenreData> = {
  // Rock uses the detailed example above
  rock: rockGenreData,

  hiphop: {
    name: "HIP-HOP",
    color: "#FF6B6B",
    popular: [
      {
        id: "1",
        title: "Workout Hip-Hop",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "512,204",
      },
      {
        id: "2",
        title: "Love Hip-Hop",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "289,432",
      },
      {
        id: "3",
        title: "Rap Essentials",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "901,112",
      },
      {
        id: "4",
        title: "Trap Anthems",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "678,345",
      },
      {
        id: "5",
        title: "Hip-Hop Party",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "445,789",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Hip-Hop Hits",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "720,009",
      },
      {
        id: "2",
        title: "Old School Rap",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "356,871",
      },
      {
        id: "3",
        title: "Trap Wave",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "198,664",
      },
      {
        id: "4",
        title: "Modern Hip-Hop",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "445,221",
      },
      {
        id: "5",
        title: "Underground Rap",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "234,567",
      },
      {
        id: "6",
        title: "Hip-Hop Classics",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "567,890",
      },
      {
        id: "7",
        title: "Trap Nation",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "345,678",
      },
      {
        id: "8",
        title: "Rap Legends",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "678,901",
      },
      {
        id: "9",
        title: "Hip-Hop Vibes",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "123,456",
      },
      {
        id: "10",
        title: "Fresh Rap",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "456,789",
      },
      {
        id: "11",
        title: "Boom Bap",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "289,432",
      },
      {
        id: "12",
        title: "West Coast Hip-Hop",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "378,901",
      },
      {
        id: "13",
        title: "East Coast Rap",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "412,567",
      },
      {
        id: "14",
        title: "Southern Hip-Hop",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "298,765",
      },
      {
        id: "15",
        title: "Conscious Rap",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        likes: "156,789",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Midnight City",
        artist: "MC Orion",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        releaseDate: "Album release: 11/02/25",
      },
      {
        id: "2",
        title: "Neon Dreams",
        artist: "Kali V",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        releaseDate: "Album release: 22/01/25",
      },
      {
        id: "3",
        title: "Midnight Ride",
        artist: "808 Syndicate",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        releaseDate: "Album release: 05/01/25",
      },
      {
        id: "4",
        title: "Street Symphony",
        artist: "Rhyme Master",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        releaseDate: "Single: 28/12/24",
      },
      {
        id: "5",
        title: "Urban Legends",
        artist: "Beat Prophet",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
        releaseDate: "EP: 15/12/24",
      },
    ],
    artists: hipHopArtists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      image: artist.image,
      likes: artist.likes,
    })),
  },

  dance_electro: {
    name: "DANCE/ELECTRO",
    color: "#4ECDC4",
    popular: [
      {
        id: "1",
        title: "Club Bangers",
        image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=CLUB",
        likes: "389,222",
      },
      {
        id: "2",
        title: "EDM Love",
        image:
          "https://via.placeholder.com/200x200/1DD1A1/FFFFFF?text=EDM+LOVE",
        likes: "245,991",
      },
      {
        id: "3",
        title: "Electro Essentials",
        image: "https://via.placeholder.com/200x200/5F27CD/FFFFFF?text=ELECTRO",
        likes: "310,442",
      },
      {
        id: "4",
        title: "Techno Underground",
        image: "https://via.placeholder.com/200x200/48DBFB/FFFFFF?text=TECHNO",
        likes: "198,567",
      },
      {
        id: "5",
        title: "Trance Classics",
        image: "https://via.placeholder.com/200x200/54A0FF/FFFFFF?text=TRANCE",
        likes: "267,890",
      },
      {
        id: "6",
        title: "Future Bass",
        image:
          "https://via.placeholder.com/200x200/222F3E/FFFFFF?text=FUTURE+BASS",
        likes: "156,734",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Festival Anthems",
        image:
          "https://via.placeholder.com/200x200/48DBFB/FFFFFF?text=FESTIVAL",
        likes: "544,880",
      },
      {
        id: "2",
        title: "House Party",
        image: "https://via.placeholder.com/200x200/54A0FF/FFFFFF?text=HOUSE",
        likes: "311,120",
      },
      {
        id: "3",
        title: "Techno Night",
        image: "https://via.placeholder.com/200x200/222F3E/FFFFFF?text=TECHNO",
        likes: "201,337",
      },
      {
        id: "4",
        title: "Trance Journey",
        image:
          "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=TRANCE+JOURNEY",
        likes: "298,456",
      },
      {
        id: "5",
        title: "Dubstep Warriors",
        image: "https://via.placeholder.com/200x200/1DD1A1/FFFFFF?text=DUBSTEP",
        likes: "187,234",
      },
      {
        id: "6",
        title: "Chill Electronic",
        image:
          "https://via.placeholder.com/200x200/5F27CD/FFFFFF?text=CHILL+ELECTRONIC",
        likes: "234,567",
      },
      {
        id: "7",
        title: "Progressive House",
        image:
          "https://via.placeholder.com/200x200/48DBFB/FFFFFF?text=PROGRESSIVE",
        likes: "276,890",
      },
      {
        id: "8",
        title: "IDM Essentials",
        image: "https://via.placeholder.com/200x200/54A0FF/FFFFFF?text=IDM",
        likes: "145,678",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Voltage",
        artist: "Astra",
        image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=VOLTAGE",
        releaseDate: "Album release: 09/02/25",
      },
      {
        id: "2",
        title: "Spectra",
        artist: "DJ Nova",
        image: "https://via.placeholder.com/200x200/1DD1A1/FFFFFF?text=SPECTRA",
        releaseDate: "Album release: 29/01/25",
      },
      {
        id: "3",
        title: "Pulse",
        artist: "NEXA",
        image: "https://via.placeholder.com/200x200/5F27CD/FFFFFF?text=PULSE",
        releaseDate: "Album release: 18/01/25",
      },
      {
        id: "4",
        title: "Neon Dreams",
        artist: "Martin Garrix",
        image:
          "https://via.placeholder.com/200x200/48DBFB/FFFFFF?text=NEON+DREAMS",
        releaseDate: "Single release: 15/02/25",
      },
      {
        id: "5",
        title: "Midnight Groove",
        artist: "David Guetta",
        image:
          "https://via.placeholder.com/200x200/54A0FF/FFFFFF?text=MIDNIGHT+GROOVE",
        releaseDate: "EP release: 22/02/25",
      },
      {
        id: "6",
        title: "Digital Rain",
        artist: "Skrillex",
        image:
          "https://via.placeholder.com/200x200/222F3E/FFFFFF?text=DIGITAL+RAIN",
        releaseDate: "Album release: 08/03/25",
      },
    ],
    artists: [
      {
        id: "dance_daft_punk",
        name: "Daft Punk",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "2.8M",
      },
      {
        id: "dance_avicii",
        name: "Avicii",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "3.0M",
      },
      {
        id: "dance_martin_garrix",
        name: "Martin Garrix",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "1.9M",
      },
      {
        id: "dance_david_guetta",
        name: "David Guetta",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "1.7M",
      },
      {
        id: "dance_skrillex",
        name: "Skrillex",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "1.6M",
      },
      {
        id: "dance_zedd",
        name: "Zedd",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "1.4M",
      },
      {
        id: "dance_marshmello",
        name: "Marshmello",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "1.3M",
      },
      {
        id: "dance_odesza",
        name: "Odesza",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "1.5M",
      },
      {
        id: "dance_flume",
        name: "Flume",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "1.3M",
      },
      {
        id: "dance_deadmau5",
        name: "deadmau5",
        image:
          "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
        likes: "1.2M",
      },
    ],
  },

  pop: {
    name: "POP",
    color: "#55A3FF",
    popular: [
      {
        id: "1",
        title: "Workout Pop",
        image:
          "https://via.placeholder.com/200x200/55A3FF/FFFFFF?text=WORKOUT+POP",
        likes: "654,321",
      },
      {
        id: "2",
        title: "Love Pop",
        image:
          "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=LOVE+POP",
        likes: "523,980",
      },
      {
        id: "3",
        title: "Pop Essentials",
        image:
          "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=POP+ESSENTIALS",
        likes: "789,111",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Top Pop",
        image: "https://via.placeholder.com/200x200/E84393/FFFFFF?text=TOP+POP",
        likes: "900,222",
      },
      {
        id: "2",
        title: "Teen Pop",
        image:
          "https://via.placeholder.com/200x200/FAB1A0/FFFFFF?text=TEEN+POP",
        likes: "332,118",
      },
      {
        id: "3",
        title: "Indie Pop",
        image:
          "https://via.placeholder.com/200x200/81ECEC/FFFFFF?text=INDIE+POP",
        likes: "214,992",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Shine",
        artist: "Luna Day",
        image: "https://via.placeholder.com/200x200/55A3FF/FFFFFF?text=SHINE",
        releaseDate: "Album release: 03/02/25",
      },
      {
        id: "2",
        title: "Violet",
        artist: "Amara",
        image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=VIOLET",
        releaseDate: "Album release: 21/01/25",
      },
      {
        id: "3",
        title: "Echo",
        artist: "The Waves",
        image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=ECHO",
        releaseDate: "Album release: 12/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Taylor S.",
        image: "https://via.placeholder.com/150x150/55A3FF/FFFFFF?text=TAYLOR",
        likes: "3.8M",
      },
      {
        id: "2",
        name: "Ariana G.",
        image: "https://via.placeholder.com/150x150/A29BFE/FFFFFF?text=ARIANA",
        likes: "2.9M",
      },
      {
        id: "3",
        name: "Dua Lipa",
        image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=DUA",
        likes: "2.4M",
      },
    ],
  },

  country: {
    name: "COUNTRY",
    color: "#E17055",
    popular: [
      {
        id: "1",
        title: "Workout Country",
        image:
          "https://via.placeholder.com/200x200/E17055/FFFFFF?text=WORKOUT+COUNTRY",
        likes: "145,332",
      },
      {
        id: "2",
        title: "Love Country",
        image:
          "https://via.placeholder.com/200x200/FAB1A0/FFFFFF?text=LOVE+COUNTRY",
        likes: "189,004",
      },
      {
        id: "3",
        title: "Country Essentials",
        image:
          "https://via.placeholder.com/200x200/FFEAA7/FFFFFF?text=ESSENTIALS",
        likes: "254,881",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Pop Country",
        image:
          "https://via.placeholder.com/200x200/81ECEC/FFFFFF?text=POP+COUNTRY",
        likes: "102,992",
      },
      {
        id: "2",
        title: "Country Legends",
        image: "https://via.placeholder.com/200x200/00CEC9/FFFFFF?text=LEGENDS",
        likes: "301,119",
      },
      {
        id: "3",
        title: "Guitar Country",
        image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=GUITAR",
        likes: "87,334",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Dust Road",
        artist: "Amber Lynn",
        image:
          "https://via.placeholder.com/200x200/E17055/FFFFFF?text=DUST+ROAD",
        releaseDate: "Album release: 07/02/25",
      },
      {
        id: "2",
        title: "Home Town",
        artist: "Randy J.",
        image:
          "https://via.placeholder.com/200x200/FAB1A0/FFFFFF?text=HOME+TOWN",
        releaseDate: "Album release: 24/01/25",
      },
      {
        id: "3",
        title: "Wild Horses",
        artist: "Western Sky",
        image:
          "https://via.placeholder.com/200x200/FFEAA7/FFFFFF?text=WILD+HORSES",
        releaseDate: "Album release: 10/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Luke Bryan",
        image: "https://via.placeholder.com/150x150/E17055/FFFFFF?text=LUKE",
        likes: "1.2M",
      },
      {
        id: "2",
        name: "Carrie Underwood",
        image: "https://via.placeholder.com/150x150/FAB1A0/FFFFFF?text=CARRIE",
        likes: "1.1M",
      },
      {
        id: "3",
        name: "Dolly Parton",
        image: "https://via.placeholder.com/150x150/FFEAA7/FFFFFF?text=DOLLY",
        likes: "1.5M",
      },
    ],
  },

  indie: {
    name: "INDIE",
    color: "#81ECEC",
    popular: [
      {
        id: "1",
        title: "Lo-fi Indie",
        image:
          "https://via.placeholder.com/200x200/81ECEC/FFFFFF?text=LO-FI+INDIE",
        likes: "221,090",
      },
      {
        id: "2",
        title: "Bedroom Pop",
        image:
          "https://via.placeholder.com/200x200/00CEC9/FFFFFF?text=BEDROOM+POP",
        likes: "167,205",
      },
      {
        id: "3",
        title: "Indie Essentials",
        image:
          "https://via.placeholder.com/200x200/0984E3/FFFFFF?text=INDIE+ESSENTIALS",
        likes: "310,004",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Indie Chill",
        image:
          "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=INDIE+CHILL",
        likes: "145,876",
      },
      {
        id: "2",
        title: "Indie Rock",
        image:
          "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=INDIE+ROCK",
        likes: "221,432",
      },
      {
        id: "3",
        title: "Indie Fresh",
        image:
          "https://via.placeholder.com/200x200/00CEC9/FFFFFF?text=INDIE+FRESH",
        likes: "88,340",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Canvas",
        artist: "The Astrals",
        image: "https://via.placeholder.com/200x200/81ECEC/FFFFFF?text=CANVAS",
        releaseDate: "Album release: 15/02/25",
      },
      {
        id: "2",
        title: "Sunset Motel",
        artist: "June & Co.",
        image: "https://via.placeholder.com/200x200/00CEC9/FFFFFF?text=SUNSET",
        releaseDate: "Album release: 27/01/25",
      },
      {
        id: "3",
        title: "Pine",
        artist: "Arcadia",
        image: "https://via.placeholder.com/200x200/0984E3/FFFFFF?text=PINE",
        releaseDate: "Album release: 06/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Phoebe Bridgers",
        image: "https://via.placeholder.com/150x150/81ECEC/FFFFFF?text=PHOEBE",
        likes: "689K",
      },
      {
        id: "2",
        name: "Tame Impala",
        image: "https://via.placeholder.com/150x150/00CEC9/FFFFFF?text=TAME",
        likes: "1.8M",
      },
      {
        id: "3",
        name: "Arctic Monkeys",
        image: "https://via.placeholder.com/150x150/0984E3/FFFFFF?text=AM",
        likes: "2.2M",
      },
    ],
  },

  latin: {
    name: "LATIN",
    color: "#FDCB6E",
    popular: [
      {
        id: "1",
        title: "Reggaeton Party",
        image:
          "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=REGGAETON",
        likes: "501,991",
      },
      {
        id: "2",
        title: "Latin Love",
        image:
          "https://via.placeholder.com/200x200/FFA801/FFFFFF?text=LATIN+LOVE",
        likes: "342,880",
      },
      {
        id: "3",
        title: "Latin Essentials",
        image:
          "https://via.placeholder.com/200x200/FFB142/FFFFFF?text=ESSENTIALS",
        likes: "698,111",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Top Latin",
        image:
          "https://via.placeholder.com/200x200/FF9F1A/FFFFFF?text=TOP+LATIN",
        likes: "603,113",
      },
      {
        id: "2",
        title: "Salsa Classics",
        image: "https://via.placeholder.com/200x200/FFB142/FFFFFF?text=SALSA",
        likes: "250,115",
      },
      {
        id: "3",
        title: "Bachata Nights",
        image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=BACHATA",
        likes: "190,700",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Luna",
        artist: "Rosalía",
        image: "https://via.placeholder.com/200x200/FDCB6E/FFFFFF?text=LUNA",
        releaseDate: "Album release: 02/02/25",
      },
      {
        id: "2",
        title: "Caliente",
        artist: "J Balvin",
        image:
          "https://via.placeholder.com/200x200/FF9F1A/FFFFFF?text=CALIENTE",
        releaseDate: "Album release: 18/01/25",
      },
      {
        id: "3",
        title: "Olas",
        artist: "Bad Bunny",
        image: "https://via.placeholder.com/200x200/FFB142/FFFFFF?text=OLAS",
        releaseDate: "Album release: 09/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Bad Bunny",
        image: "https://via.placeholder.com/150x150/FDCB6E/FFFFFF?text=BUNNY",
        likes: "3.2M",
      },
      {
        id: "2",
        name: "Shakira",
        image: "https://via.placeholder.com/150x150/FF9F1A/FFFFFF?text=SHAKIRA",
        likes: "2.7M",
      },
      {
        id: "3",
        name: "J Balvin",
        image: "https://via.placeholder.com/150x150/FFB142/FFFFFF?text=BALVIN",
        likes: "2.1M",
      },
    ],
  },

  kpop: {
    name: "K-POP",
    color: "#FF6B81",
    popular: [
      {
        id: "1",
        title: "Workout K-Pop",
        image:
          "https://via.placeholder.com/200x200/FF6B81/FFFFFF?text=WORKOUT+K-POP",
        likes: "432,009",
      },
      {
        id: "2",
        title: "K-Pop Love",
        image:
          "https://via.placeholder.com/200x200/FF7F97/FFFFFF?text=K-POP+LOVE",
        likes: "389,110",
      },
      {
        id: "3",
        title: "K-Pop Essentials",
        image:
          "https://via.placeholder.com/200x200/FF9AA2/FFFFFF?text=K-POP+ESSENTIALS",
        likes: "510,842",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Top K-Pop",
        image:
          "https://via.placeholder.com/200x200/FF6B81/FFFFFF?text=TOP+K-POP",
        likes: "701,223",
      },
      {
        id: "2",
        title: "Girl Groups",
        image:
          "https://via.placeholder.com/200x200/FF7F97/FFFFFF?text=GIRL+GROUPS",
        likes: "298,764",
      },
      {
        id: "3",
        title: "Boy Bands",
        image:
          "https://via.placeholder.com/200x200/FF9AA2/FFFFFF?text=BOY+BANDS",
        likes: "344,001",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Starlight",
        artist: "ECLIPSE",
        image:
          "https://via.placeholder.com/200x200/FF6B81/FFFFFF?text=STARLIGHT",
        releaseDate: "Album release: 12/02/25",
      },
      {
        id: "2",
        title: "Bloom",
        artist: "LOONA X",
        image: "https://via.placeholder.com/200x200/FF7F97/FFFFFF?text=BLOOM",
        releaseDate: "Album release: 23/01/25",
      },
      {
        id: "3",
        title: "Dive",
        artist: "NEO9",
        image: "https://via.placeholder.com/200x200/FF9AA2/FFFFFF?text=DIVE",
        releaseDate: "Album release: 04/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "BTS",
        image: "https://via.placeholder.com/150x150/FF6B81/FFFFFF?text=BTS",
        likes: "5.0M",
      },
      {
        id: "2",
        name: "BLACKPINK",
        image:
          "https://via.placeholder.com/150x150/FF7F97/FFFFFF?text=BLACKPINK",
        likes: "4.4M",
      },
      {
        id: "3",
        name: "TWICE",
        image: "https://via.placeholder.com/150x150/FF9AA2/FFFFFF?text=TWICE",
        likes: "3.1M",
      },
    ],
  },

  metal: {
    name: "METAL",
    color: "#636E72",
    popular: [
      {
        id: "1",
        title: "Workout Metal",
        image:
          "https://via.placeholder.com/200x200/636E72/FFFFFF?text=WORKOUT+METAL",
        likes: "222,440",
      },
      {
        id: "2",
        title: "Metal Ballads",
        image: "https://via.placeholder.com/200x200/2D3436/FFFFFF?text=BALLADS",
        likes: "141,112",
      },
      {
        id: "3",
        title: "Metal Essentials",
        image:
          "https://via.placeholder.com/200x200/95A5A6/FFFFFF?text=ESSENTIALS",
        likes: "310,001",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Heavy Metal",
        image: "https://via.placeholder.com/200x200/2D3436/FFFFFF?text=HEAVY",
        likes: "188,900",
      },
      {
        id: "2",
        title: "Power Metal",
        image: "https://via.placeholder.com/200x200/636E72/FFFFFF?text=POWER",
        likes: "120,884",
      },
      {
        id: "3",
        title: "Symphonic Metal",
        image:
          "https://via.placeholder.com/200x200/95A5A6/FFFFFF?text=SYMPHONIC",
        likes: "99,773",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Iron Soul",
        artist: "Valhalla",
        image: "https://via.placeholder.com/200x200/2D3436/FFFFFF?text=IRON",
        releaseDate: "Album release: 01/02/25",
      },
      {
        id: "2",
        title: "Forge",
        artist: "Anvilstorm",
        image: "https://via.placeholder.com/200x200/636E72/FFFFFF?text=FORGE",
        releaseDate: "Album release: 25/01/25",
      },
      {
        id: "3",
        title: "Gargoyle",
        artist: "Nightfall",
        image:
          "https://via.placeholder.com/200x200/95A5A6/FFFFFF?text=GARGOYLE",
        releaseDate: "Album release: 08/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Metallica",
        image:
          "https://via.placeholder.com/150x150/2D3436/FFFFFF?text=METALLICA",
        likes: "3.3M",
      },
      {
        id: "2",
        name: "Iron Maiden",
        image: "https://via.placeholder.com/150x150/636E72/FFFFFF?text=MAIDEN",
        likes: "2.5M",
      },
      {
        id: "3",
        name: "Nightwish",
        image:
          "https://via.placeholder.com/150x150/95A5A6/FFFFFF?text=NIGHTWISH",
        likes: "1.4M",
      },
    ],
  },

  radio: {
    name: "RADIO",
    color: "#A29BFE",
    popular: [
      {
        id: "1",
        title: "Rock Radio",
        image:
          "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=ROCK+RADIO",
        likes: "77,221",
      },
      {
        id: "2",
        title: "Pop Radio",
        image:
          "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=POP+RADIO",
        likes: "68,112",
      },
      {
        id: "3",
        title: "Hip-Hop Radio",
        image:
          "https://via.placeholder.com/200x200/341F97/FFFFFF?text=HIP-HOP+RADIO",
        likes: "59,031",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "70s Rock Radio",
        image:
          "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=70S+ROCK",
        likes: "40,901",
      },
      {
        id: "2",
        title: "Chill Pop Radio",
        image:
          "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=CHILL+POP",
        likes: "38,882",
      },
      {
        id: "3",
        title: "Rap Classics Radio",
        image:
          "https://via.placeholder.com/200x200/341F97/FFFFFF?text=RAP+CLASSICS",
        likes: "44,002",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Top 50",
        artist: "Various",
        image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=TOP+50",
        releaseDate: "Updated weekly",
      },
      {
        id: "2",
        title: "Hotlist",
        artist: "Various",
        image: "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=HOTLIST",
        releaseDate: "Updated weekly",
      },
      {
        id: "3",
        title: "New Music Friday",
        artist: "Various",
        image: "https://via.placeholder.com/200x200/341F97/FFFFFF?text=NMF",
        releaseDate: "Updated weekly",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Radio Hosts",
        image: "https://via.placeholder.com/150x150/A29BFE/FFFFFF?text=HOSTS",
        likes: "20K",
      },
      {
        id: "2",
        name: "Curators",
        image:
          "https://via.placeholder.com/150x150/6C5CE7/FFFFFF?text=CURATORS",
        likes: "18K",
      },
      {
        id: "3",
        name: "DJs",
        image: "https://via.placeholder.com/150x150/341F97/FFFFFF?text=DJS",
        likes: "22K",
      },
    ],
  },

  progressive: {
    name: "PROGRESSIVE",
    color: "#00B894",
    popular: [
      {
        id: "1",
        title: "Progressive House",
        image:
          "https://via.placeholder.com/200x200/00B894/FFFFFF?text=PROG+HOUSE",
        likes: "120,221",
      },
      {
        id: "2",
        title: "Progressive Trance",
        image:
          "https://via.placeholder.com/200x200/55EFC4/FFFFFF?text=PROG+TRANCE",
        likes: "98,222",
      },
      {
        id: "3",
        title: "Progressive Rock",
        image:
          "https://via.placeholder.com/200x200/00CEC9/FFFFFF?text=PROG+ROCK",
        likes: "131,008",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Prog Essentials",
        image:
          "https://via.placeholder.com/200x200/00B894/FFFFFF?text=ESSENTIALS",
        likes: "77,211",
      },
      {
        id: "2",
        title: "Modern Prog",
        image:
          "https://via.placeholder.com/200x200/55EFC4/FFFFFF?text=MODERN+PROG",
        likes: "61,902",
      },
      {
        id: "3",
        title: "Classic Prog",
        image:
          "https://via.placeholder.com/200x200/00CEC9/FFFFFF?text=CLASSIC+PROG",
        likes: "58,120",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Parallax",
        artist: "Helix",
        image:
          "https://via.placeholder.com/200x200/00B894/FFFFFF?text=PARALLAX",
        releaseDate: "Album release: 14/02/25",
      },
      {
        id: "2",
        title: "Equinox",
        artist: "Nova Terra",
        image: "https://via.placeholder.com/200x200/55EFC4/FFFFFF?text=EQUINOX",
        releaseDate: "Album release: 25/01/25",
      },
      {
        id: "3",
        title: "Atlas",
        artist: "Voyager",
        image: "https://via.placeholder.com/200x200/00CEC9/FFFFFF?text=ATLAS",
        releaseDate: "Album release: 02/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Porcupine Tree",
        image: "https://via.placeholder.com/150x150/00B894/FFFFFF?text=PT",
        likes: "402K",
      },
      {
        id: "2",
        name: "Dream Theater",
        image: "https://via.placeholder.com/150x150/55EFC4/FFFFFF?text=DT",
        likes: "1.1M",
      },
      {
        id: "3",
        name: "Steven Wilson",
        image: "https://via.placeholder.com/150x150/00CEC9/FFFFFF?text=SW",
        likes: "612K",
      },
    ],
  },

  decades: {
    name: "DECADES",
    color: "#A3CB38",
    popular: [
      {
        id: "1",
        title: "60s Classics",
        image: "https://via.placeholder.com/200x200/A3CB38/FFFFFF?text=60S",
        likes: "210,004",
      },
      {
        id: "2",
        title: "80s Hits",
        image: "https://via.placeholder.com/200x200/78E08F/FFFFFF?text=80S",
        likes: "290,883",
      },
      {
        id: "3",
        title: "90s Vibes",
        image: "https://via.placeholder.com/200x200/C4E538/FFFFFF?text=90S",
        likes: "315,201",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "70s Rock Anthems",
        image:
          "https://via.placeholder.com/200x200/20BF6B/FFFFFF?text=70S+ROCK",
        likes: "150,778",
      },
      {
        id: "2",
        title: "90s Pop",
        image: "https://via.placeholder.com/200x200/26DE81/FFFFFF?text=90S+POP",
        likes: "200,442",
      },
      {
        id: "3",
        title: "2000s Throwback",
        image: "https://via.placeholder.com/200x200/78E08F/FFFFFF?text=2000S",
        likes: "175,009",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Curated Classics",
        artist: "Various",
        image:
          "https://via.placeholder.com/200x200/A3CB38/FFFFFF?text=CLASSICS",
        releaseDate: "Updated weekly",
      },
      {
        id: "2",
        title: "Retro Mix",
        artist: "Various",
        image: "https://via.placeholder.com/200x200/78E08F/FFFFFF?text=RETRO",
        releaseDate: "Updated weekly",
      },
      {
        id: "3",
        title: "Golden Oldies",
        artist: "Various",
        image: "https://via.placeholder.com/200x200/C4E538/FFFFFF?text=OLDIES",
        releaseDate: "Updated weekly",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Elvis Presley",
        image: "https://via.placeholder.com/150x150/A3CB38/FFFFFF?text=ELVIS",
        likes: "2.0M",
      },
      {
        id: "2",
        name: "Madonna",
        image: "https://via.placeholder.com/150x150/78E08F/FFFFFF?text=MADONNA",
        likes: "2.3M",
      },
      {
        id: "3",
        name: "Nirvana",
        image: "https://via.placeholder.com/150x150/C4E538/FFFFFF?text=NIRVANA",
        likes: "2.6M",
      },
    ],
  },

  classical: {
    name: "CLASSICAL",
    color: "#B8E994",
    popular: [
      {
        id: "1",
        title: "Study Classical",
        image: "https://via.placeholder.com/200x200/B8E994/000000?text=STUDY",
        likes: "145,667",
      },
      {
        id: "2",
        title: "Romantic Era",
        image:
          "https://via.placeholder.com/200x200/78E08F/000000?text=ROMANTIC",
        likes: "112,330",
      },
      {
        id: "3",
        title: "Baroque Essentials",
        image: "https://via.placeholder.com/200x200/A3CB38/000000?text=BAROQUE",
        likes: "210,400",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Russian Composers",
        image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=RUSSIAN",
        likes: "71,000",
      },
      {
        id: "2",
        title: "Piano Focus",
        image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=PIANO",
        likes: "66,221",
      },
      {
        id: "3",
        title: "Strings",
        image: "https://via.placeholder.com/200x200/FAB1A0/FFFFFF?text=STRINGS",
        likes: "58,907",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Requiem",
        artist: "A. Composer",
        image: "https://via.placeholder.com/200x200/B8E994/000000?text=REQUIEM",
        releaseDate: "Album release: 30/01/25",
      },
      {
        id: "2",
        title: "Etudes",
        artist: "Virtuoso",
        image: "https://via.placeholder.com/200x200/78E08F/000000?text=ETUDES",
        releaseDate: "Album release: 16/01/25",
      },
      {
        id: "3",
        title: "Concertos",
        artist: "Symphonia",
        image:
          "https://via.placeholder.com/200x200/A3CB38/000000?text=CONCERTOS",
        releaseDate: "Album release: 05/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Mozart",
        image: "https://via.placeholder.com/150x150/B8E994/000000?text=MOZART",
        likes: "1.2M",
      },
      {
        id: "2",
        name: "Beethoven",
        image:
          "https://via.placeholder.com/150x150/78E08F/000000?text=BEETHOVEN",
        likes: "1.5M",
      },
      {
        id: "3",
        name: "Bach",
        image: "https://via.placeholder.com/150x150/A3CB38/000000?text=BACH",
        likes: "1.1M",
      },
    ],
  },

  jazz: {
    name: "JAZZ",
    color: "#6C5CE7",
    popular: [
      {
        id: "1",
        title: "Smooth Jazz",
        image: "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=SMOOTH",
        likes: "132,004",
      },
      {
        id: "2",
        title: "Love Jazz",
        image:
          "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=LOVE+JAZZ",
        likes: "90,113",
      },
      {
        id: "3",
        title: "Jazz Essentials",
        image:
          "https://via.placeholder.com/200x200/341F97/FFFFFF?text=ESSENTIALS",
        likes: "201,551",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Jazz Classics",
        image:
          "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=CLASSICS",
        likes: "118,002",
      },
      {
        id: "2",
        title: "Modern Jazz",
        image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=MODERN",
        likes: "97,882",
      },
      {
        id: "3",
        title: "Fusion",
        image: "https://via.placeholder.com/200x200/341F97/FFFFFF?text=FUSION",
        likes: "81,440",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Midnight Blue",
        artist: "Sax Union",
        image:
          "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=MIDNIGHT",
        releaseDate: "Album release: 08/02/25",
      },
      {
        id: "2",
        title: "Sunrise",
        artist: "Quartet 4",
        image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=SUNRISE",
        releaseDate: "Album release: 20/01/25",
      },
      {
        id: "3",
        title: "Blue Train",
        artist: "Coltrane Inspired",
        image:
          "https://via.placeholder.com/200x200/341F97/FFFFFF?text=BLUE+TRAIN",
        releaseDate: "Album release: 06/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Miles Davis",
        image: "https://via.placeholder.com/150x150/6C5CE7/FFFFFF?text=MILES",
        likes: "1.7M",
      },
      {
        id: "2",
        name: "John Coltrane",
        image:
          "https://via.placeholder.com/150x150/A29BFE/FFFFFF?text=COLTRANE",
        likes: "1.5M",
      },
      {
        id: "3",
        name: "Herbie Hancock",
        image: "https://via.placeholder.com/150x150/341F97/FFFFFF?text=HERBIE",
        likes: "1.1M",
      },
    ],
  },

  instrumentals: {
    name: "INSTRUMENTALS",
    color: "#10AC84",
    popular: [
      {
        id: "1",
        title: "Focus Beats",
        image: "https://via.placeholder.com/200x200/10AC84/FFFFFF?text=FOCUS",
        likes: "156,770",
      },
      {
        id: "2",
        title: "Piano Study",
        image: "https://via.placeholder.com/200x200/1DD1A1/FFFFFF?text=PIANO",
        likes: "132,441",
      },
      {
        id: "3",
        title: "Lo-fi",
        image: "https://via.placeholder.com/200x200/00D2D3/FFFFFF?text=LO-FI",
        likes: "201,003",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Deep Focus",
        image:
          "https://via.placeholder.com/200x200/10AC84/FFFFFF?text=DEEP+FOCUS",
        likes: "310,441",
      },
      {
        id: "2",
        title: "Ambient",
        image: "https://via.placeholder.com/200x200/1DD1A1/FFFFFF?text=AMBIENT",
        likes: "121,550",
      },
      {
        id: "3",
        title: "Strings",
        image: "https://via.placeholder.com/200x200/00D2D3/FFFFFF?text=STRINGS",
        likes: "88,007",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Breeze",
        artist: "Noctua",
        image: "https://via.placeholder.com/200x200/10AC84/FFFFFF?text=BREEZE",
        releaseDate: "Album release: 05/02/25",
      },
      {
        id: "2",
        title: "Aurora",
        artist: "Lofi Labs",
        image: "https://via.placeholder.com/200x200/1DD1A1/FFFFFF?text=AURORA",
        releaseDate: "Album release: 19/01/25",
      },
      {
        id: "3",
        title: "Nimbus",
        artist: "Pianova",
        image: "https://via.placeholder.com/200x200/00D2D3/FFFFFF?text=NIMBUS",
        releaseDate: "Album release: 02/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Ludovico Einaudi",
        image: "https://via.placeholder.com/150x150/10AC84/FFFFFF?text=EINAUDI",
        likes: "1.0M",
      },
      {
        id: "2",
        name: "Max Richter",
        image: "https://via.placeholder.com/150x150/1DD1A1/FFFFFF?text=RICHTER",
        likes: "812K",
      },
      {
        id: "3",
        name: "Nils Frahm",
        image: "https://via.placeholder.com/150x150/00D2D3/FFFFFF?text=FRAHM",
        likes: "654K",
      },
    ],
  },

  punk: {
    name: "PUNK",
    color: "#E84393",
    popular: [
      {
        id: "1",
        title: "Hardcore Punk",
        image:
          "https://via.placeholder.com/200x200/E84393/FFFFFF?text=HARDCORE",
        likes: "110,221",
      },
      {
        id: "2",
        title: "Pop Punk",
        image:
          "https://via.placeholder.com/200x200/FF7675/FFFFFF?text=POP+PUNK",
        likes: "132,882",
      },
      {
        id: "3",
        title: "Punk Essentials",
        image:
          "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=ESSENTIALS",
        likes: "150,004",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Skate Punk",
        image: "https://via.placeholder.com/200x200/E84393/FFFFFF?text=SKATE",
        likes: "90,121",
      },
      {
        id: "2",
        title: "Grunge",
        image: "https://via.placeholder.com/200x200/FF7675/FFFFFF?text=GRUNGE",
        likes: "101,445",
      },
      {
        id: "3",
        title: "Post Punk",
        image:
          "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=POST+PUNK",
        likes: "88,334",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Static",
        artist: "Ampersand",
        image: "https://via.placeholder.com/200x200/E84393/FFFFFF?text=STATIC",
        releaseDate: "Album release: 10/02/25",
      },
      {
        id: "2",
        title: "Wires",
        artist: "Fuse",
        image: "https://via.placeholder.com/200x200/FF7675/FFFFFF?text=WIRES",
        releaseDate: "Album release: 22/01/25",
      },
      {
        id: "3",
        title: "Ashes",
        artist: "No Signal",
        image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=ASHES",
        releaseDate: "Album release: 03/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "The Clash",
        image: "https://via.placeholder.com/150x150/E84393/FFFFFF?text=CLASH",
        likes: "1.1M",
      },
      {
        id: "2",
        name: "Ramones",
        image: "https://via.placeholder.com/150x150/FF7675/FFFFFF?text=RAMONES",
        likes: "1.0M",
      },
      {
        id: "3",
        name: "Sex Pistols",
        image: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=PISTOLS",
        likes: "812K",
      },
    ],
  },

  blues: {
    name: "BLUES",
    color: "#0984E3",
    popular: [
      {
        id: "1",
        title: "Delta Blues",
        image: "https://via.placeholder.com/200x200/0984E3/FFFFFF?text=DELTA",
        likes: "81,004",
      },
      {
        id: "2",
        title: "Blues Love",
        image:
          "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=LOVE+BLUES",
        likes: "64,220",
      },
      {
        id: "3",
        title: "Blues Essentials",
        image:
          "https://via.placeholder.com/200x200/55A3FF/FFFFFF?text=ESSENTIALS",
        likes: "92,110",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Guitar Blues",
        image: "https://via.placeholder.com/200x200/0984E3/FFFFFF?text=GUITAR",
        likes: "70,201",
      },
      {
        id: "2",
        title: "Chicago Blues",
        image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=CHICAGO",
        likes: "55,880",
      },
      {
        id: "3",
        title: "Soul Blues",
        image: "https://via.placeholder.com/200x200/55A3FF/FFFFFF?text=SOUL",
        likes: "62,333",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Blue Smoke",
        artist: "Riley James",
        image: "https://via.placeholder.com/200x200/0984E3/FFFFFF?text=SMOKE",
        releaseDate: "Album release: 01/02/25",
      },
      {
        id: "2",
        title: "Dust Bowl",
        artist: "Memphis Co.",
        image: "https://via.placeholder.com/200x200/74B9FF/FFFFFF?text=DUST",
        releaseDate: "Album release: 17/01/25",
      },
      {
        id: "3",
        title: "Slow Train",
        artist: "Big River",
        image: "https://via.placeholder.com/200x200/55A3FF/FFFFFF?text=TRAIN",
        releaseDate: "Album release: 05/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "B.B. King",
        image: "https://via.placeholder.com/150x150/0984E3/FFFFFF?text=BB+KING",
        likes: "1.3M",
      },
      {
        id: "2",
        name: "Muddy Waters",
        image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=MUDDY",
        likes: "902K",
      },
      {
        id: "3",
        name: "John Lee Hooker",
        image: "https://via.placeholder.com/150x150/55A3FF/FFFFFF?text=HOOKER",
        likes: "811K",
      },
    ],
  },

  soul_funk: {
    name: "SOUL/FUNK",
    color: "#341F97",
    popular: [
      {
        id: "1",
        title: "Funky Workout",
        image: "https://via.placeholder.com/200x200/341F97/FFFFFF?text=FUNKY",
        likes: "98,002",
      },
      {
        id: "2",
        title: "Soul Love",
        image:
          "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=SOUL+LOVE",
        likes: "77,332",
      },
      {
        id: "3",
        title: "Funk Essentials",
        image:
          "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=ESSENTIALS",
        likes: "120,441",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Groove",
        image: "https://via.placeholder.com/200x200/341F97/FFFFFF?text=GROOVE",
        likes: "66,210",
      },
      {
        id: "2",
        title: "Soul Classics",
        image:
          "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=CLASSICS",
        likes: "70,002",
      },
      {
        id: "3",
        title: "Funkadelic",
        image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=FUNK",
        likes: "59,882",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Velvet",
        artist: "The Groovers",
        image: "https://via.placeholder.com/200x200/341F97/FFFFFF?text=VELVET",
        releaseDate: "Album release: 13/02/25",
      },
      {
        id: "2",
        title: "Sugar",
        artist: "Funk City",
        image: "https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=SUGAR",
        releaseDate: "Album release: 28/01/25",
      },
      {
        id: "3",
        title: "Move",
        artist: "Soul Vibes",
        image: "https://via.placeholder.com/200x200/A29BFE/FFFFFF?text=MOVE",
        releaseDate: "Album release: 08/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "James Brown",
        image: "https://via.placeholder.com/150x150/341F97/FFFFFF?text=BROWN",
        likes: "1.4M",
      },
      {
        id: "2",
        name: "Prince",
        image: "https://via.placeholder.com/150x150/6C5CE7/FFFFFF?text=PRINCE",
        likes: "2.0M",
      },
      {
        id: "3",
        name: "Aretha Franklin",
        image: "https://via.placeholder.com/150x150/A29BFE/FFFFFF?text=ARETHA",
        likes: "1.9M",
      },
    ],
  },

  reggae: {
    name: "REGGAE",
    color: "#20BF6B",
    popular: [
      {
        id: "1",
        title: "Reggae Vibes",
        image: "https://via.placeholder.com/200x200/20BF6B/FFFFFF?text=VIBES",
        likes: "120,002",
      },
      {
        id: "2",
        title: "Roots Love",
        image: "https://via.placeholder.com/200x200/1DD1A1/FFFFFF?text=ROOTS",
        likes: "90,441",
      },
      {
        id: "3",
        title: "Reggae Essentials",
        image:
          "https://via.placeholder.com/200x200/10AC84/FFFFFF?text=ESSENTIALS",
        likes: "140,771",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Roots Reggae",
        image: "https://via.placeholder.com/200x200/20BF6B/FFFFFF?text=ROOTS",
        likes: "88,338",
      },
      {
        id: "2",
        title: "Dubwise",
        image: "https://via.placeholder.com/200x200/1DD1A1/FFFFFF?text=DUBWISE",
        likes: "61,110",
      },
      {
        id: "3",
        title: "Dancehall",
        image:
          "https://via.placeholder.com/200x200/10AC84/FFFFFF?text=DANCEHALL",
        likes: "72,990",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Island Sun",
        artist: "Skanking Crew",
        image: "https://via.placeholder.com/200x200/20BF6B/FFFFFF?text=ISLAND",
        releaseDate: "Album release: 09/02/25",
      },
      {
        id: "2",
        title: "Roots & Culture",
        artist: "Dub Nation",
        image: "https://via.placeholder.com/200x200/1DD1A1/FFFFFF?text=CULTURE",
        releaseDate: "Album release: 21/01/25",
      },
      {
        id: "3",
        title: "Riddim",
        artist: "King Sound",
        image: "https://via.placeholder.com/200x200/10AC84/FFFFFF?text=RIDDIM",
        releaseDate: "Album release: 03/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Bob Marley",
        image: "https://via.placeholder.com/150x150/20BF6B/FFFFFF?text=MARLEY",
        likes: "3.5M",
      },
      {
        id: "2",
        name: "Peter Tosh",
        image: "https://via.placeholder.com/150x150/1DD1A1/FFFFFF?text=TOSH",
        likes: "1.1M",
      },
      {
        id: "3",
        name: "Burning Spear",
        image: "https://via.placeholder.com/150x150/10AC84/FFFFFF?text=SPEAR",
        likes: "912K",
      },
    ],
  },

  folk: {
    name: "FOLK",
    color: "#2ECC71",
    popular: [
      {
        id: "1",
        title: "Acoustic Folk",
        image:
          "https://via.placeholder.com/200x200/2ECC71/FFFFFF?text=ACOUSTIC",
        likes: "120,441",
      },
      {
        id: "2",
        title: "Indie Folk",
        image:
          "https://via.placeholder.com/200x200/27AE60/FFFFFF?text=INDIE+FOLK",
        likes: "98,210",
      },
      {
        id: "3",
        title: "Folk Essentials",
        image:
          "https://via.placeholder.com/200x200/1ABC9C/FFFFFF?text=ESSENTIALS",
        likes: "141,007",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Modern Folk",
        image:
          "https://via.placeholder.com/200x200/2ECC71/FFFFFF?text=MODERN+FOLK",
        likes: "210,334",
      },
      {
        id: "2",
        title: "Classic Folk",
        image:
          "https://via.placeholder.com/200x200/27AE60/FFFFFF?text=CLASSIC+FOLK",
        likes: "155,228",
      },
      {
        id: "3",
        title: "Campfire",
        image:
          "https://via.placeholder.com/200x200/1ABC9C/FFFFFF?text=CAMPFIRE",
        likes: "120,778",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Meadow",
        artist: "Willow Creek",
        image: "https://via.placeholder.com/200x200/2ECC71/FFFFFF?text=MEADOW",
        releaseDate: "Album release: 08/02/25",
      },
      {
        id: "2",
        title: "Lanterns",
        artist: "Evergreen",
        image:
          "https://via.placeholder.com/200x200/27AE60/FFFFFF?text=LANTERNS",
        releaseDate: "Album release: 22/01/25",
      },
      {
        id: "3",
        title: "Northwind",
        artist: "Harbor & Pine",
        image:
          "https://via.placeholder.com/200x200/1ABC9C/FFFFFF?text=NORTHWIND",
        releaseDate: "Album release: 04/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Bon Iver",
        image:
          "https://via.placeholder.com/150x150/2ECC71/FFFFFF?text=BON+IVER",
        likes: "1.8M",
      },
      {
        id: "2",
        name: "Mumford & Sons",
        image: "https://via.placeholder.com/150x150/27AE60/FFFFFF?text=MUMFORD",
        likes: "2.5M",
      },
      {
        id: "3",
        name: "The Lumineers",
        image:
          "https://via.placeholder.com/150x150/1ABC9C/FFFFFF?text=LUMINEERS",
        likes: "2.2M",
      },
    ],
  },
};

import { hipHopArtists } from "./allArtists";
