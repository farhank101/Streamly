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
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
      likes: "414,228",
    },
    {
      id: "2",
      title: "Love Rock",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
      likes: "98,284",
    },
    {
      id: "3",
      title: "Rockab",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
      likes: "82,125",
    },
  ],
  playlists: [
    {
      id: "1",
      title: "Pop Rock",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
      likes: "420,112",
    },
    {
      id: "2",
      title: "Woodstock Legends",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
      likes: "64,199",
    },
    {
      id: "3",
      title: "Guitar!",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
      likes: "299,156",
    },
    {
      id: "4",
      title: "90s Alternative Rock",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
      likes: "711,692",
    },
    {
      id: "5",
      title: "Indie Rock",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
      likes: "490,172",
    },
    {
      id: "6",
      title: "Progressive Rock",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
      likes: "128,045",
    },
    {
      id: "7",
      title: "80s Rock Anthems",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
      likes: "381,737",
    },
    {
      id: "8",
      title: "Love Rock",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
      likes: "98,284",
    },
    {
      id: "9",
      title: "Rockabilly",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
      likes: "82,127",
    },
    {
      id: "10",
      title: "Guitar Solos",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
      likes: "299,154",
    },
    {
      id: "11",
      title: "Pop Rock",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
      likes: "420,112",
    },
    {
      id: "12",
      title: "Woodstock Legends",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
      likes: "64,199",
    },
    {
      id: "13",
      title: "70s Rock Anthems",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
      likes: "387,722",
    },
  ],
  newReleases: [
    {
      id: "1",
      title: "V",
      artist: "The Vegabonds",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
      releaseDate: "Album release: 18/01/19",
    },
    {
      id: "2",
      title: "Powerwolf",
      artist: "Metallum Nostrum",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
      releaseDate: "Album release: 11/01/19",
    },
    {
      id: "3",
      title: "Glanto",
      artist: "David B",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
      releaseDate: "Album release: 15/03/19",
    },
  ],
  artists: [
    {
      id: "1",
      name: "The Beatles",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
      likes: "871,189",
    },
    {
      id: "2",
      name: "Queen",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
      likes: "948,117",
    },
    {
      id: "3",
      name: "Led Zeppelin",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
      likes: "823,456",
    },
    {
      id: "4",
      name: "Pink Floyd",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
      likes: "756,234",
    },
    {
      id: "5",
      name: "The Rolling Stones",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
      likes: "892,567",
    },
    {
      id: "6",
      name: "AC/DC",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
      likes: "654,321",
    },
    {
      id: "7",
      name: "Guns N' Roses",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
      likes: "789,123",
    },
    {
      id: "8",
      name: "Metallica",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
      likes: "912,456",
    },
    {
      id: "9",
      name: "Nirvana",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
      likes: "678,901",
    },
    {
      id: "10",
      name: "Red Hot Chili Peppers",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
      likes: "543,678",
    },
    {
      id: "11",
      name: "Foo Fighters",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
      likes: "456,789",
    },
    {
      id: "12",
      name: "Green Day",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
      likes: "345,678",
    },
    {
      id: "13",
      name: "Linkin Park",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
      likes: "567,890",
    },
    {
      id: "14",
      name: "System of a Down",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
      likes: "234,567",
    },
    {
      id: "15",
      name: "Tool",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
      likes: "123,456",
    },
    {
      id: "16",
      name: "Radiohead",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
      likes: "789,012",
    },
    {
      id: "17",
      name: "The Strokes",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
      likes: "456,123",
    },
    {
      id: "18",
      name: "Arctic Monkeys",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
      likes: "567,234",
    },
    {
      id: "19",
      name: "Muse",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
      likes: "678,345",
    },
    {
      id: "20",
      name: "Coldplay",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
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
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.1M",
      },
      {
        id: "2",
        name: "Drake",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "3.2M",
      },
      {
        id: "3",
        name: "Kendrick Lamar",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.8M",
      },
      {
        id: "4",
        name: "J. Cole",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.5M",
      },
      {
        id: "5",
        name: "Travis Scott",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "2.3M",
      },
      {
        id: "6",
        name: "Post Malone",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.7M",
      },
      {
        id: "7",
        name: "21 Savage",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.9M",
      },
      {
        id: "8",
        name: "Lil Baby",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "2.0M",
      },
      {
        id: "9",
        name: "DaBaby",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "10",
        name: "Megan Thee Stallion",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.6M",
      },
      {
        id: "11",
        name: "Cardi B",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "2.4M",
      },
      {
        id: "12",
        name: "Nicki Minaj",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.6M",
      },
      {
        id: "13",
        name: "Lil Uzi Vert",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.7M",
      },
      {
        id: "14",
        name: "Playboi Carti",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.5M",
      },
      {
        id: "15",
        name: "Juice WRLD",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.2M",
      },
      {
        id: "16",
        name: "Pop Smoke",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.4M",
      },
      {
        id: "17",
        name: "Lil Tjay",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.3M",
      },
      {
        id: "18",
        name: "Polo G",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.2M",
      },
      {
        id: "19",
        name: "Roddy Ricch",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "20",
        name: "Lil Durk",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
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
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "389,222",
      },
      {
        id: "2",
        title: "EDM Love",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "245,991",
      },
      {
        id: "3",
        title: "Electro Essentials",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "310,442",
      },
      {
        id: "4",
        title: "Techno Underground",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "198,567",
      },
      {
        id: "5",
        title: "Trance Classics",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "267,890",
      },
      {
        id: "6",
        title: "Future Bass",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "156,734",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Festival Anthems",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "544,880",
      },
      {
        id: "2",
        title: "House Party",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "311,120",
      },
      {
        id: "3",
        title: "Techno Night",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "201,337",
      },
      {
        id: "4",
        title: "Trance Journey",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "298,456",
      },
      {
        id: "5",
        title: "Dubstep Warriors",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "187,234",
      },
      {
        id: "6",
        title: "Chill Electronic",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "234,567",
      },
      {
        id: "7",
        title: "Progressive House",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "276,890",
      },
      {
        id: "8",
        title: "IDM Essentials",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "145,678",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Voltage",
        artist: "Astra",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 09/02/25",
      },
      {
        id: "2",
        title: "Spectra",
        artist: "DJ Nova",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 29/01/25",
      },
      {
        id: "3",
        title: "Pulse",
        artist: "NEXA",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 18/01/25",
      },
      {
        id: "4",
        title: "Neon Dreams",
        artist: "Martin Garrix",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Single release: 15/02/25",
      },
      {
        id: "5",
        title: "Midnight Groove",
        artist: "David Guetta",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        releaseDate: "EP release: 22/02/25",
      },
      {
        id: "6",
        title: "Digital Rain",
        artist: "Skrillex",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.2M",
      },
      {
        id: "2",
        title: "Pop Love Songs",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "890K",
      },
      {
        id: "3",
        title: "Pop Party",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "756K",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Top 40 Pop",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.1M",
      },
      {
        id: "2",
        title: "Pop Classics",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "3",
        title: "Modern Pop",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "1.5M",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Midnight Dreams",
        artist: "Pop Star",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 15/03/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Taylor Swift",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "3.5M",
      },
      {
        id: "2",
        name: "Ariana Grande",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "3.2M",
      },
      {
        id: "3",
        name: "Ed Sheeran",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.8M",
      },
      {
        id: "4",
        name: "Billie Eilish",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.6M",
      },
      {
        id: "5",
        name: "Dua Lipa",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "2.4M",
      },
      {
        id: "6",
        name: "The Weeknd",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "2.9M",
      },
      {
        id: "7",
        name: "Justin Bieber",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.7M",
      },
      {
        id: "8",
        name: "Lady Gaga",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "2.3M",
      },
      {
        id: "9",
        name: "Katy Perry",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.1M",
      },
      {
        id: "10",
        name: "Bruno Mars",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.5M",
      },
      {
        id: "11",
        name: "Shawn Mendes",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "1.9M",
      },
      {
        id: "12",
        name: "Camila Cabello",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "13",
        name: "Post Malone",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.2M",
      },
      {
        id: "14",
        name: "Halsey",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.7M",
      },
      {
        id: "15",
        name: "Lorde",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.6M",
      },
      {
        id: "16",
        name: "Lana Del Rey",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.5M",
      },
      {
        id: "17",
        name: "SZA",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "18",
        name: "Doja Cat",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.9M",
      },
      {
        id: "19",
        name: "Olivia Rodrigo",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.0M",
      },
      {
        id: "20",
        name: "Conan Gray",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
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
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.5M",
      },
      {
        id: "2",
        title: "Classic Country",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.1M",
      },
      {
        id: "3",
        title: "Modern Country",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "987K",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Country Roads",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "2.1M",
      },
      {
        id: "2",
        title: "Outlaw Country",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.7M",
      },
      {
        id: "3",
        title: "Country Love Songs",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.4M",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Prairie Wind",
        artist: "Country Star",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 22/03/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Johnny Cash",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.9M",
      },
      {
        id: "2",
        name: "Willie Nelson",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "2.7M",
      },
      {
        id: "3",
        name: "Dolly Parton",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "2.8M",
      },
      {
        id: "4",
        name: "George Strait",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.5M",
      },
      {
        id: "5",
        name: "Garth Brooks",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "2.6M",
      },
      {
        id: "6",
        name: "Shania Twain",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.4M",
      },
      {
        id: "7",
        name: "Alan Jackson",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.2M",
      },
      {
        id: "8",
        name: "Reba McEntire",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "2.1M",
      },
      {
        id: "9",
        name: "Tim McGraw",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "2.3M",
      },
      {
        id: "10",
        name: "Faith Hill",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.0M",
      },
      {
        id: "11",
        name: "Kenny Chesney",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.9M",
      },
      {
        id: "12",
        name: "Toby Keith",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "13",
        name: "Brad Paisley",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.7M",
      },
      {
        id: "14",
        name: "Carrie Underwood",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "2.2M",
      },
      {
        id: "15",
        name: "Miranda Lambert",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.9M",
      },
      {
        id: "16",
        name: "Luke Bryan",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "17",
        name: "Blake Shelton",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.7M",
      },
      {
        id: "18",
        name: "Keith Urban",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.6M",
      },
      {
        id: "19",
        name: "Zac Brown Band",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.5M",
      },
      {
        id: "20",
        name: "Florida Georgia Line",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "221,090",
      },
      {
        id: "2",
        title: "Bedroom Pop",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "167,205",
      },
      {
        id: "3",
        title: "Indie Essentials",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "310,004",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Indie Chill",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "145,876",
      },
      {
        id: "2",
        title: "Indie Rock",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "221,432",
      },
      {
        id: "3",
        title: "Indie Fresh",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "88,340",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Canvas",
        artist: "The Astrals",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 15/02/25",
      },
      {
        id: "2",
        title: "Sunset Motel",
        artist: "June & Co.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 27/01/25",
      },
      {
        id: "3",
        title: "Pine",
        artist: "Arcadia",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 06/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Phoebe Bridgers",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "689K",
      },
      {
        id: "2",
        name: "Tame Impala",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "3",
        name: "Arctic Monkeys",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "501,991",
      },
      {
        id: "2",
        title: "Latin Love",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "342,880",
      },
      {
        id: "3",
        title: "Latin Essentials",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "698,111",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Top Latin",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "603,113",
      },
      {
        id: "2",
        title: "Salsa Classics",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "250,115",
      },
      {
        id: "3",
        title: "Bachata Nights",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "190,700",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Luna",
        artist: "Rosalía",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 02/02/25",
      },
      {
        id: "2",
        title: "Caliente",
        artist: "J Balvin",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 18/01/25",
      },
      {
        id: "3",
        title: "Olas",
        artist: "Bad Bunny",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 09/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Bad Bunny",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "3.2M",
      },
      {
        id: "2",
        name: "Shakira",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.7M",
      },
      {
        id: "3",
        name: "J Balvin",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "432,009",
      },
      {
        id: "2",
        title: "K-Pop Love",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "389,110",
      },
      {
        id: "3",
        title: "K-Pop Essentials",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "510,842",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Top K-Pop",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "701,223",
      },
      {
        id: "2",
        title: "Girl Groups",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "298,764",
      },
      {
        id: "3",
        title: "Boy Bands",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "344,001",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Starlight",
        artist: "ECLIPSE",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 12/02/25",
      },
      {
        id: "2",
        title: "Bloom",
        artist: "LOONA X",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 23/01/25",
      },
      {
        id: "3",
        title: "Dive",
        artist: "NEO9",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 04/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "BTS",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "5.0M",
      },
      {
        id: "2",
        name: "BLACKPINK",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "4.4M",
      },
      {
        id: "3",
        name: "TWICE",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "222,440",
      },
      {
        id: "2",
        title: "Metal Ballads",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "141,112",
      },
      {
        id: "3",
        title: "Metal Essentials",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "310,001",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Heavy Metal",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "188,900",
      },
      {
        id: "2",
        title: "Power Metal",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "120,884",
      },
      {
        id: "3",
        title: "Symphonic Metal",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "99,773",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Iron Soul",
        artist: "Valhalla",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 01/02/25",
      },
      {
        id: "2",
        title: "Forge",
        artist: "Anvilstorm",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 25/01/25",
      },
      {
        id: "3",
        title: "Gargoyle",
        artist: "Nightfall",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 08/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Metallica",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "3.3M",
      },
      {
        id: "2",
        name: "Iron Maiden",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.5M",
      },
      {
        id: "3",
        name: "Nightwish",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "77,221",
      },
      {
        id: "2",
        title: "Pop Radio",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "68,112",
      },
      {
        id: "3",
        title: "Hip-Hop Radio",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "59,031",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "70s Rock Radio",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "40,901",
      },
      {
        id: "2",
        title: "Chill Pop Radio",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "38,882",
      },
      {
        id: "3",
        title: "Rap Classics Radio",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "44,002",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Top 50",
        artist: "Various",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Updated weekly",
      },
      {
        id: "2",
        title: "Hotlist",
        artist: "Various",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Updated weekly",
      },
      {
        id: "3",
        title: "New Music Friday",
        artist: "Various",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Updated weekly",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Radio Hosts",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "20K",
      },
      {
        id: "2",
        name: "Curators",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "18K",
      },
      {
        id: "3",
        name: "DJs",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "120,221",
      },
      {
        id: "2",
        title: "Progressive Trance",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "98,222",
      },
      {
        id: "3",
        title: "Progressive Rock",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "131,008",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Prog Essentials",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "77,211",
      },
      {
        id: "2",
        title: "Modern Prog",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "61,902",
      },
      {
        id: "3",
        title: "Classic Prog",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "58,120",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Parallax",
        artist: "Helix",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 14/02/25",
      },
      {
        id: "2",
        title: "Equinox",
        artist: "Nova Terra",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 25/01/25",
      },
      {
        id: "3",
        title: "Atlas",
        artist: "Voyager",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 02/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Porcupine Tree",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "402K",
      },
      {
        id: "2",
        name: "Dream Theater",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.1M",
      },
      {
        id: "3",
        name: "Steven Wilson",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "210,004",
      },
      {
        id: "2",
        title: "80s Hits",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "290,883",
      },
      {
        id: "3",
        title: "90s Vibes",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "315,201",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "70s Rock Anthems",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "150,778",
      },
      {
        id: "2",
        title: "90s Pop",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "200,442",
      },
      {
        id: "3",
        title: "2000s Throwback",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "175,009",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Curated Classics",
        artist: "Various",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Updated weekly",
      },
      {
        id: "2",
        title: "Retro Mix",
        artist: "Various",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Updated weekly",
      },
      {
        id: "3",
        title: "Golden Oldies",
        artist: "Various",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Updated weekly",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Elvis Presley",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.0M",
      },
      {
        id: "2",
        name: "Madonna",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.3M",
      },
      {
        id: "3",
        name: "Nirvana",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "145,667",
      },
      {
        id: "2",
        title: "Romantic Era",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "112,330",
      },
      {
        id: "3",
        title: "Baroque Essentials",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "210,400",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Russian Composers",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "71,000",
      },
      {
        id: "2",
        title: "Piano Focus",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "66,221",
      },
      {
        id: "3",
        title: "Strings",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "58,907",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Requiem",
        artist: "A. Composer",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 30/01/25",
      },
      {
        id: "2",
        title: "Etudes",
        artist: "Virtuoso",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 16/01/25",
      },
      {
        id: "3",
        title: "Concertos",
        artist: "Symphonia",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 05/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Mozart",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.2M",
      },
      {
        id: "2",
        name: "Beethoven",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.5M",
      },
      {
        id: "3",
        name: "Bach",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
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
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.2M",
      },
      {
        id: "2",
        title: "Smooth Jazz",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "890K",
      },
      {
        id: "3",
        title: "Bebop Masters",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "654K",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Jazz Standards",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "2",
        title: "Modern Jazz",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.4M",
      },
      {
        id: "3",
        title: "Jazz Fusion",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "1.1M",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Midnight Session",
        artist: "Jazz Collective",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 20/03/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Miles Davis",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.8M",
      },
      {
        id: "2",
        name: "John Coltrane",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "2.6M",
      },
      {
        id: "3",
        name: "Louis Armstrong",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.4M",
      },
      {
        id: "4",
        name: "Duke Ellington",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.2M",
      },
      {
        id: "5",
        name: "Charlie Parker",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "2.0M",
      },
      {
        id: "6",
        name: "Thelonious Monk",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.9M",
      },
      {
        id: "7",
        name: "Ella Fitzgerald",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.1M",
      },
      {
        id: "8",
        name: "Billie Holiday",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "9",
        name: "Dave Brubeck",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.7M",
      },
      {
        id: "10",
        name: "Herbie Hancock",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.9M",
      },
      {
        id: "11",
        name: "Wynton Kelly",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "1.5M",
      },
      {
        id: "12",
        name: "Cannonball Adderley",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.6M",
      },
      {
        id: "13",
        name: "Art Blakey",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.4M",
      },
      {
        id: "14",
        name: "Sonny Rollins",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.7M",
      },
      {
        id: "15",
        name: "Wes Montgomery",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.6M",
      },
      {
        id: "16",
        name: "Grant Green",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.3M",
      },
      {
        id: "17",
        name: "Jimmy Smith",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "1.5M",
      },
      {
        id: "18",
        name: "Stan Getz",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.4M",
      },
      {
        id: "19",
        name: "Gerry Mulligan",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.2M",
      },
      {
        id: "20",
        name: "Chet Baker",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
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
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "156,770",
      },
      {
        id: "2",
        title: "Piano Study",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "132,441",
      },
      {
        id: "3",
        title: "Lo-fi",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "201,003",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Deep Focus",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "310,441",
      },
      {
        id: "2",
        title: "Ambient",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "121,550",
      },
      {
        id: "3",
        title: "Strings",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "88,007",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Breeze",
        artist: "Noctua",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 05/02/25",
      },
      {
        id: "2",
        title: "Aurora",
        artist: "Lofi Labs",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 19/01/25",
      },
      {
        id: "3",
        title: "Nimbus",
        artist: "Pianova",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 02/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Ludovico Einaudi",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.0M",
      },
      {
        id: "2",
        name: "Max Richter",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "812K",
      },
      {
        id: "3",
        name: "Nils Frahm",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
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
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "110,221",
      },
      {
        id: "2",
        title: "Pop Punk",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "132,882",
      },
      {
        id: "3",
        title: "Punk Essentials",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "150,004",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Skate Punk",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "90,121",
      },
      {
        id: "2",
        title: "Grunge",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "101,445",
      },
      {
        id: "3",
        title: "Post Punk",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "88,334",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Static",
        artist: "Ampersand",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 10/02/25",
      },
      {
        id: "2",
        title: "Wires",
        artist: "Fuse",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 22/01/25",
      },
      {
        id: "3",
        title: "Ashes",
        artist: "No Signal",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 03/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "The Clash",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.1M",
      },
      {
        id: "2",
        name: "Ramones",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.0M",
      },
      {
        id: "3",
        name: "Sex Pistols",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
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
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "81,004",
      },
      {
        id: "2",
        title: "Blues Love",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "64,220",
      },
      {
        id: "3",
        title: "Blues Essentials",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "92,110",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Guitar Blues",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "70,201",
      },
      {
        id: "2",
        title: "Chicago Blues",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "55,880",
      },
      {
        id: "3",
        title: "Soul Blues",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "62,333",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Blue Smoke",
        artist: "Riley James",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 01/02/25",
      },
      {
        id: "2",
        title: "Dust Bowl",
        artist: "Memphis Co.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 17/01/25",
      },
      {
        id: "3",
        title: "Slow Train",
        artist: "Big River",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 05/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "B.B. King",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.3M",
      },
      {
        id: "2",
        name: "Muddy Waters",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "902K",
      },
      {
        id: "3",
        name: "John Lee Hooker",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
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
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "98,002",
      },
      {
        id: "2",
        title: "Soul Love",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "77,332",
      },
      {
        id: "3",
        title: "Funk Essentials",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "120,441",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Groove",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "66,210",
      },
      {
        id: "2",
        title: "Soul Classics",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "70,002",
      },
      {
        id: "3",
        title: "Funkadelic",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "59,882",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Velvet",
        artist: "The Groovers",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 13/02/25",
      },
      {
        id: "2",
        title: "Sugar",
        artist: "Funk City",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 28/01/25",
      },
      {
        id: "3",
        title: "Move",
        artist: "Soul Vibes",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 08/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "James Brown",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.4M",
      },
      {
        id: "2",
        name: "Prince",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.0M",
      },
      {
        id: "3",
        name: "Aretha Franklin",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
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
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "120,002",
      },
      {
        id: "2",
        title: "Roots Love",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "90,441",
      },
      {
        id: "3",
        title: "Reggae Essentials",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "140,771",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Roots Reggae",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "88,338",
      },
      {
        id: "2",
        title: "Dubwise",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "61,110",
      },
      {
        id: "3",
        title: "Dancehall",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "72,990",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Island Sun",
        artist: "Skanking Crew",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 09/02/25",
      },
      {
        id: "2",
        title: "Roots & Culture",
        artist: "Dub Nation",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 21/01/25",
      },
      {
        id: "3",
        title: "Riddim",
        artist: "King Sound",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 03/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Bob Marley",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "3.5M",
      },
      {
        id: "2",
        name: "Peter Tosh",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.1M",
      },
      {
        id: "3",
        name: "Burning Spear",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
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
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "120,441",
      },
      {
        id: "2",
        title: "Indie Folk",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "98,210",
      },
      {
        id: "3",
        title: "Folk Essentials",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "141,007",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Modern Folk",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "210,334",
      },
      {
        id: "2",
        title: "Classic Folk",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "155,228",
      },
      {
        id: "3",
        title: "Campfire",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "120,778",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Meadow",
        artist: "Willow Creek",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 08/02/25",
      },
      {
        id: "2",
        title: "Lanterns",
        artist: "Evergreen",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 22/01/25",
      },
      {
        id: "3",
        title: "Northwind",
        artist: "Harbor & Pine",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        releaseDate: "Album release: 04/01/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Bon Iver",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "2",
        name: "Mumford & Sons",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.5M",
      },
      {
        id: "3",
        name: "The Lumineers",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
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
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "2",
        title: "Deep House",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "956K",
      },
      {
        id: "3",
        title: "Techno Vibes",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "723K",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "Electronic Essentials",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "2.3M",
      },
      {
        id: "2",
        title: "Chill Electronic",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.6M",
      },
      {
        id: "3",
        title: "Dance Floor",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.9M",
      },
    ],
    newReleases: [
      {
        id: "1",
        title: "Neon Nights",
        artist: "Digital Dreams",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        releaseDate: "Album release: 18/03/25",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Daft Punk",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "3.1M",
      },
      {
        id: "2",
        name: "The Chemical Brothers",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "2.8M",
      },
      {
        id: "3",
        name: "Aphex Twin",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "2.5M",
      },
      {
        id: "4",
        name: "Deadmau5",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.7M",
      },
      {
        id: "5",
        name: "Skrillex",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "2.9M",
      },
      {
        id: "6",
        name: "Calvin Harris",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "2.6M",
      },
      {
        id: "7",
        name: "David Guetta",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.4M",
      },
      {
        id: "8",
        name: "Tiesto",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "2.3M",
      },
      {
        id: "9",
        name: "Avicii",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "2.8M",
      },
      {
        id: "10",
        name: "Swedish House Mafia",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "2.2M",
      },
      {
        id: "11",
        name: "Zedd",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "2.0M",
      },
      {
        id: "12",
        name: "Martin Garrix",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.9M",
      },
      {
        id: "13",
        name: "Marshmello",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "2.1M",
      },
      {
        id: "14",
        name: "The Prodigy",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "15",
        name: "Underworld",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
        likes: "1.7M",
      },
      {
        id: "16",
        name: "Massive Attack",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
        likes: "1.9M",
      },
      {
        id: "17",
        name: "Portishead",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face",
        likes: "1.6M",
      },
      {
        id: "18",
        name: "Moby",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face",
        likes: "1.8M",
      },
      {
        id: "19",
        name: "Fatboy Slim",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        likes: "1.5M",
      },
      {
        id: "20",
        name: "The Crystal Method",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=face",
        likes: "1.4M",
      },
    ],
  },
};
