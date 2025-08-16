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
    {
      id: "4",
      name: "Pink Floyd",
      image:
        "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=PINK+FLOYD",
      likes: "756,234",
    },
    {
      id: "5",
      name: "The Rolling Stones",
      image:
        "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=ROLLING+STONES",
      likes: "892,567",
    },
    {
      id: "6",
      name: "AC/DC",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=AC+DC",
      likes: "654,321",
    },
    {
      id: "7",
      name: "Guns N' Roses",
      image:
        "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=GUNS+N+ROSES",
      likes: "789,123",
    },
    {
      id: "8",
      name: "Metallica",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=METALLICA",
      likes: "912,456",
    },
    {
      id: "9",
      name: "Nirvana",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=NIRVANA",
      likes: "678,901",
    },
    {
      id: "10",
      name: "Red Hot Chili Peppers",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=RHCP",
      likes: "543,678",
    },
    {
      id: "11",
      name: "Foo Fighters",
      image:
        "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=FOO+FIGHTERS",
      likes: "456,789",
    },
    {
      id: "12",
      name: "Green Day",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=GREEN+DAY",
      likes: "345,678",
    },
    {
      id: "13",
      name: "Linkin Park",
      image:
        "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=LINKIN+PARK",
      likes: "567,890",
    },
    {
      id: "14",
      name: "System of a Down",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=SOAD",
      likes: "234,567",
    },
    {
      id: "15",
      name: "Tool",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=TOOL",
      likes: "123,456",
    },
    {
      id: "16",
      name: "Radiohead",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=RADIOHEAD",
      likes: "789,012",
    },
    {
      id: "17",
      name: "The Strokes",
      image:
        "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=THE+STROKES",
      likes: "456,123",
    },
    {
      id: "18",
      name: "Arctic Monkeys",
      image:
        "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=ARCTIC+MONKEYS",
      likes: "567,234",
    },
    {
      id: "19",
      name: "Muse",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=MUSE",
      likes: "678,345",
    },
    {
      id: "20",
      name: "Coldplay",
      image: "https://via.placeholder.com/150x150/74B9FF/FFFFFF?text=COLDPLAY",
      likes: "789,456",
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
    artists: [
      {
        id: "1",
        name: "Eminem",
        image: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=EMINEM",
        likes: "2.1M",
      },
      {
        id: "2",
        name: "Drake",
        image: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=DRAKE",
        likes: "3.2M",
      },
      {
        id: "3",
        name: "Kendrick Lamar",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=KENDRICK",
        likes: "2.8M",
      },
      {
        id: "4",
        name: "J. Cole",
        image: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=J+COLE",
        likes: "2.5M",
      },
      {
        id: "5",
        name: "Travis Scott",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=TRAVIS+SCOTT",
        likes: "2.3M",
      },
      {
        id: "6",
        name: "Post Malone",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=POST+MALONE",
        likes: "2.7M",
      },
      {
        id: "7",
        name: "21 Savage",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=21+SAVAGE",
        likes: "1.9M",
      },
      {
        id: "8",
        name: "Lil Baby",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=LIL+BABY",
        likes: "2.0M",
      },
      {
        id: "9",
        name: "DaBaby",
        image: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=DABABY",
        likes: "1.8M",
      },
      {
        id: "10",
        name: "Megan Thee Stallion",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=MEGAN+THEE+STALLION",
        likes: "1.6M",
      },
      {
        id: "11",
        name: "Cardi B",
        image: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=CARDI+B",
        likes: "2.4M",
      },
      {
        id: "12",
        name: "Nicki Minaj",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=NICKI+MINAJ",
        likes: "2.6M",
      },
      {
        id: "13",
        name: "Lil Uzi Vert",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=LIL+UZI+VERT",
        likes: "1.7M",
      },
      {
        id: "14",
        name: "Playboi Carti",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=PLAYBOI+CARTI",
        likes: "1.5M",
      },
      {
        id: "15",
        name: "Juice WRLD",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=JUICE+WRLD",
        likes: "2.2M",
      },
      {
        id: "16",
        name: "Pop Smoke",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=POP+SMOKE",
        likes: "1.4M",
      },
      {
        id: "17",
        name: "Lil Tjay",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=LIL+TJAY",
        likes: "1.3M",
      },
      {
        id: "18",
        name: "Polo G",
        image: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=POLO+G",
        likes: "1.2M",
      },
      {
        id: "19",
        name: "Roddy Ricch",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=RODDY+RICCH",
        likes: "1.8M",
      },
      {
        id: "20",
        name: "Lil Durk",
        image:
          "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=LIL+DURK",
        likes: "1.6M",
      },
    ],
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
    color: "#FF9FF3",
    popular: [
      {
        id: "1",
        title: "Pop Hits",
        image:
          "https://via.placeholder.com/200x200/FF9FF3/FFFFFF?text=POP+HITS",
        likes: "1.2M",
      },
      {
        id: "2",
        title: "Pop Love Songs",
        image:
          "https://via.placeholder.com/200x200/FF9FF3/FFFFFF?text=LOVE+SONGS",
        likes: "890K",
      },
      {
        id: "3",
        title: "Pop Party",
        image:
          "https://via.placeholder.com/200x200/FF9FF3/FFFFFF?text=POP+PARTY",
        likes: "756K",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Top 40 Pop",
        image: "https://via.placeholder.com/200x200/FF9FF3/FFFFFF?text=TOP+40",
        likes: "2.1M",
      },
      {
        id: "2",
        title: "Pop Classics",
        image:
          "https://via.placeholder.com/200x200/FF9FF3/FFFFFF?text=CLASSICS",
        likes: "1.8M",
      },
      {
        id: "3",
        title: "Modern Pop",
        image:
          "https://via.placeholder.com/200x200/FF9FF3/FFFFFF?text=MODERN+POP",
        likes: "1.5M",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Midnight Dreams",
        artist: "Pop Star",
        image:
          "https://via.placeholder.com/200x200/FF9FF3/FFFFFF?text=MIDNIGHT+DREAMS",
        releaseDate: "Album release: 15/03/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Taylor Swift",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=TAYLOR+SWIFT",
        likes: "3.5M",
      },
      {
        id: "2",
        name: "Ariana Grande",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=ARIANA+GRANDE",
        likes: "3.2M",
      },
      {
        id: "3",
        name: "Ed Sheeran",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=ED+SHEERAN",
        likes: "2.8M",
      },
      {
        id: "4",
        name: "Billie Eilish",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=BILLIE+EILISH",
        likes: "2.6M",
      },
      {
        id: "5",
        name: "Dua Lipa",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=DUA+LIPA",
        likes: "2.4M",
      },
      {
        id: "6",
        name: "The Weeknd",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=THE+WEEKND",
        likes: "2.9M",
      },
      {
        id: "7",
        name: "Justin Bieber",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=JUSTIN+BIEBER",
        likes: "2.7M",
      },
      {
        id: "8",
        name: "Lady Gaga",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=LADY+GAGA",
        likes: "2.3M",
      },
      {
        id: "9",
        name: "Katy Perry",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=KATY+PERRY",
        likes: "2.1M",
      },
      {
        id: "10",
        name: "Bruno Mars",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=BRUNO+MARS",
        likes: "2.5M",
      },
      {
        id: "11",
        name: "Shawn Mendes",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=SHAWN+MENDES",
        likes: "1.9M",
      },
      {
        id: "12",
        name: "Camila Cabello",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=CAMILA+CABELLO",
        likes: "1.8M",
      },
      {
        id: "13",
        name: "Post Malone",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=POST+MALONE",
        likes: "2.2M",
      },
      {
        id: "14",
        name: "Halsey",
        image: "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=HALSEY",
        likes: "1.7M",
      },
      {
        id: "15",
        name: "Lorde",
        image: "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=LORDE",
        likes: "1.6M",
      },
      {
        id: "16",
        name: "Lana Del Rey",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=LANA+DEL+REY",
        likes: "1.5M",
      },
      {
        id: "17",
        name: "SZA",
        image: "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=SZA",
        likes: "1.8M",
      },
      {
        id: "18",
        name: "Doja Cat",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=DOJA+CAT",
        likes: "1.9M",
      },
      {
        id: "19",
        name: "Olivia Rodrigo",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=OLIVIA+RODRIGO",
        likes: "2.0M",
      },
      {
        id: "20",
        name: "Conan Gray",
        image:
          "https://via.placeholder.com/150x150/FF9FF3/FFFFFF?text=CONAN+GRAY",
        likes: "1.4M",
      },
    ],
  },

  country: {
    name: "COUNTRY",
    color: "#FFD93D",
    popular: [
      {
        id: "1",
        title: "Country Hits",
        image: "https://via.placeholder.com/200x200/FFD93D/FFFFFF?text=COUNTRY+HITS",
        likes: "1.5M",
      },
      {
        id: "2",
        title: "Classic Country",
        image: "https://via.placeholder.com/200x200/FFD93D/FFFFFF?text=CLASSIC+COUNTRY",
        likes: "1.1M",
      },
      {
        id: "3",
        title: "Modern Country",
        image: "https://via.placeholder.com/200x200/FFD93D/FFFFFF?text=MODERN+COUNTRY",
        likes: "987K",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Country Roads",
        image: "https://via.placeholder.com/200x200/FFD93D/FFFFFF?text=COUNTRY+ROADS",
        likes: "2.1M",
      },
      {
        id: "2",
        title: "Outlaw Country",
        image: "https://via.placeholder.com/200x200/FFD93D/FFFFFF?text=OUTLAW+COUNTRY",
        likes: "1.7M",
      },
      {
        id: "3",
        title: "Country Love Songs",
        image: "https://via.placeholder.com/200x200/FFD93D/FFFFFF?text=LOVE+SONGS",
        likes: "1.4M",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Prairie Wind",
        artist: "Country Star",
        image: "https://via.placeholder.com/200x200/FFD93D/FFFFFF?text=PRAIRIE+WIND",
        releaseDate: "Album release: 22/03/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Johnny Cash",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=JOHNNY+CASH",
        likes: "2.9M",
      },
      {
        id: "2",
        name: "Willie Nelson",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=WILLIE+NELSON",
        likes: "2.7M",
      },
      {
        id: "3",
        name: "Dolly Parton",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=DOLLY+PARTON",
        likes: "2.8M",
      },
      {
        id: "4",
        name: "George Strait",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=GEORGE+STRAIT",
        likes: "2.5M",
      },
      {
        id: "5",
        name: "Garth Brooks",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=GARTH+BROOKS",
        likes: "2.6M",
      },
      {
        id: "6",
        name: "Shania Twain",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=SHANIA+TWAIN",
        likes: "2.4M",
      },
      {
        id: "7",
        name: "Alan Jackson",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=ALAN+JACKSON",
        likes: "2.2M",
      },
      {
        id: "8",
        name: "Reba McEntire",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=REBA+MCENTIRE",
        likes: "2.1M",
      },
      {
        id: "9",
        name: "Tim McGraw",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=TIM+MCGRAW",
        likes: "2.3M",
      },
      {
        id: "10",
        name: "Faith Hill",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=FAITH+HILL",
        likes: "2.0M",
      },
      {
        id: "11",
        name: "Kenny Chesney",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=KENNY+CHESNEY",
        likes: "1.9M",
      },
      {
        id: "12",
        name: "Toby Keith",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=TOBY+KEITH",
        likes: "1.8M",
      },
      {
        id: "13",
        name: "Brad Paisley",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=BRAD+PAISLEY",
        likes: "1.7M",
      },
      {
        id: "14",
        name: "Carrie Underwood",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=CARRIE+UNDERWOOD",
        likes: "2.2M",
      },
      {
        id: "15",
        name: "Miranda Lambert",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=MIRANDA+LAMBERT",
        likes: "1.9M",
      },
      {
        id: "16",
        name: "Luke Bryan",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=LUKE+BRYAN",
        likes: "1.8M",
      },
      {
        id: "17",
        name: "Blake Shelton",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=BLAKE+SHELTON",
        likes: "1.7M",
      },
      {
        id: "18",
        name: "Keith Urban",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=KEITH+URBAN",
        likes: "1.6M",
      },
      {
        id: "19",
        name: "Zac Brown Band",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=ZAC+BROWN+BAND",
        likes: "1.5M",
      },
      {
        id: "20",
        name: "Florida Georgia Line",
        image: "https://via.placeholder.com/150x150/FFD93D/FFFFFF?text=FLORIDA+GEORGIA+LINE",
        likes: "1.4M",
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
    color: "#FF6B35",
    popular: [
      {
        id: "1",
        title: "Jazz Classics",
        image: "https://via.placeholder.com/200x200/FF6B35/FFFFFF?text=JAZZ+CLASSICS",
        likes: "1.2M",
      },
      {
        id: "2",
        title: "Smooth Jazz",
        image: "https://via.placeholder.com/200x200/FF6B35/FFFFFF?text=SMOOTH+JAZZ",
        likes: "890K",
      },
      {
        id: "3",
        title: "Bebop Masters",
        image: "https://via.placeholder.com/200x200/FF6B35/FFFFFF?text=BEBOP+MASTERS",
        likes: "654K",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Jazz Standards",
        image: "https://via.placeholder.com/200x200/FF6B35/FFFFFF?text=JAZZ+STANDARDS",
        likes: "1.8M",
      },
      {
        id: "2",
        title: "Modern Jazz",
        image: "https://via.placeholder.com/200x200/FF6B35/FFFFFF?text=MODERN+JAZZ",
        likes: "1.4M",
      },
      {
        id: "3",
        title: "Jazz Fusion",
        image: "https://via.placeholder.com/200x200/FF6B35/FFFFFF?text=JAZZ+FUSION",
        likes: "1.1M",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Midnight Session",
        artist: "Jazz Collective",
        image: "https://via.placeholder.com/200x200/FF6B35/FFFFFF?text=MIDNIGHT+SESSION",
        releaseDate: "Album release: 20/03/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Miles Davis",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=MILES+DAVIS",
        likes: "2.8M",
      },
      {
        id: "2",
        name: "John Coltrane",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=JOHN+COLTRANE",
        likes: "2.6M",
      },
      {
        id: "3",
        name: "Louis Armstrong",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=LOUIS+ARMSTRONG",
        likes: "2.4M",
      },
      {
        id: "4",
        name: "Duke Ellington",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=DUKE+ELLINGTON",
        likes: "2.2M",
      },
      {
        id: "5",
        name: "Charlie Parker",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=CHARLIE+PARKER",
        likes: "2.0M",
      },
      {
        id: "6",
        name: "Thelonious Monk",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=THELONIOUS+MONK",
        likes: "1.9M",
      },
      {
        id: "7",
        name: "Ella Fitzgerald",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=ELLA+FITZGERALD",
        likes: "2.1M",
      },
      {
        id: "8",
        name: "Billie Holiday",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=BILLIE+HOLIDAY",
        likes: "1.8M",
      },
      {
        id: "9",
        name: "Dave Brubeck",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=DAVE+BRUBECK",
        likes: "1.7M",
      },
      {
        id: "10",
        name: "Herbie Hancock",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=HERBIE+HANCOCK",
        likes: "1.9M",
      },
      {
        id: "11",
        name: "Wynton Kelly",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=WYNTON+KELLY",
        likes: "1.5M",
      },
      {
        id: "12",
        name: "Cannonball Adderley",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=CANNONBALL+ADDERLEY",
        likes: "1.6M",
      },
      {
        id: "13",
        name: "Art Blakey",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=ART+BLAKEY",
        likes: "1.4M",
      },
      {
        id: "14",
        name: "Sonny Rollins",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=SONNY+ROLLINS",
        likes: "1.7M",
      },
      {
        id: "15",
        name: "Wes Montgomery",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=WES+MONTGOMERY",
        likes: "1.6M",
      },
      {
        id: "16",
        name: "Grant Green",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=GRANT+GREEN",
        likes: "1.3M",
      },
      {
        id: "17",
        name: "Jimmy Smith",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=JIMMY+SMITH",
        likes: "1.5M",
      },
      {
        id: "18",
        name: "Stan Getz",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=STAN+GETZ",
        likes: "1.4M",
      },
      {
        id: "19",
        name: "Gerry Mulligan",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=GERRY+MULLIGAN",
        likes: "1.2M",
      },
      {
        id: "20",
        name: "Chet Baker",
        image: "https://via.placeholder.com/150x150/FF6B35/FFFFFF?text=CHET+BAKER",
        likes: "1.8M",
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

  // Electronic genre with expanded artists
  electronic: {
    name: "ELECTRONIC",
    color: "#00D2FF",
    popular: [
      {
        id: "1",
        title: "EDM Hits",
        image: "https://via.placeholder.com/200x200/00D2FF/FFFFFF?text=EDM+HITS",
        likes: "1.8M",
      },
      {
        id: "2",
        title: "Deep House",
        image: "https://via.placeholder.com/200x200/00D2FF/FFFFFF?text=DEEP+HOUSE",
        likes: "956K",
      },
      {
        id: "3",
        title: "Techno Vibes",
        image: "https://via.placeholder.com/200x200/00D2FF/FFFFFF?text=TECHNO+VIBES",
        likes: "723K",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Electronic Essentials",
        image: "https://via.placeholder.com/200x200/00D2FF/FFFFFF?text=ESSENTIALS",
        likes: "2.3M",
      },
      {
        id: "2",
        title: "Chill Electronic",
        image: "https://via.placeholder.com/200x200/00D2FF/FFFFFF?text=CHILL+ELECTRONIC",
        likes: "1.6M",
      },
      {
        id: "3",
        title: "Dance Floor",
        image: "https://via.placeholder.com/200x200/00D2FF/FFFFFF?text=DANCE+FLOOR",
        likes: "1.9M",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Neon Nights",
        artist: "Digital Dreams",
        image: "https://via.placeholder.com/200x200/00D2FF/FFFFFF?text=NEON+NIGHTS",
        releaseDate: "Album release: 18/03/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Daft Punk",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=DAFT+PUNK",
        likes: "3.1M",
      },
      {
        id: "2",
        name: "The Chemical Brothers",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=CHEMICAL+BROTHERS",
        likes: "2.8M",
      },
      {
        id: "3",
        name: "Aphex Twin",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=APHEX+TWIN",
        likes: "2.5M",
      },
      {
        id: "4",
        name: "Deadmau5",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=DEADMAU5",
        likes: "2.7M",
      },
      {
        id: "5",
        name: "Skrillex",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=SKRILLEX",
        likes: "2.9M",
      },
      {
        id: "6",
        name: "Calvin Harris",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=CALVIN+HARRIS",
        likes: "2.6M",
      },
      {
        id: "7",
        name: "David Guetta",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=DAVID+GUETTA",
        likes: "2.4M",
      },
      {
        id: "8",
        name: "Tiesto",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=TIESTO",
        likes: "2.3M",
      },
      {
        id: "9",
        name: "Avicii",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=AVICII",
        likes: "2.8M",
      },
      {
        id: "10",
        name: "Swedish House Mafia",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=SWEDISH+HOUSE+MAFIA",
        likes: "2.2M",
      },
      {
        id: "11",
        name: "Zedd",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=ZEDD",
        likes: "2.0M",
      },
      {
        id: "12",
        name: "Martin Garrix",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=MARTIN+GARRIX",
        likes: "1.9M",
      },
      {
        id: "13",
        name: "Marshmello",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=MARSHMELLO",
        likes: "2.1M",
      },
      {
        id: "14",
        name: "The Prodigy",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=THE+PRODIGY",
        likes: "1.8M",
      },
      {
        id: "15",
        name: "Underworld",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=UNDERWORLD",
        likes: "1.7M",
      },
      {
        id: "16",
        name: "Massive Attack",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=MASSIVE+ATTACK",
        likes: "1.9M",
      },
      {
        id: "17",
        name: "Portishead",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=PORTISHEAD",
        likes: "1.6M",
      },
      {
        id: "18",
        name: "Moby",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=MOBY",
        likes: "1.8M",
      },
      {
        id: "19",
        name: "Fatboy Slim",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=FATBOY+SLIM",
        likes: "1.5M",
      },
      {
        id: "20",
        name: "The Crystal Method",
        image: "https://via.placeholder.com/150x150/00D2FF/FFFFFF?text=CRYSTAL+METHOD",
        likes: "1.4M",
      },
    ],
  },
};
