/**
 * Dance/Electronic Artists Data
 * Comprehensive list of dance and electronic music artists
 */

export interface DanceElectroArtist {
  id: string;
  name: string;
  image: string;
  likes: string;
  followers: string;
  spotifyId?: string;
  spotifyPopularity?: number;
  subgenre?: string;
  country?: string;
  activeYears?: string;
}

export const danceElectroArtists: DanceElectroArtist[] = [
  // Legendary/Iconic Artists
  {
    id: "daft_punk",
    name: "Daft Punk",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "2.8M",
    followers: "15.2M",
    spotifyId: "4tZwfgrHOc3mvqYlEYSvVi",
    spotifyPopularity: 85,
    subgenre: "French House",
    country: "France",
    activeYears: "1993-2021"
  },
  {
    id: "avicii",
    name: "Avicii",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "3.0M",
    followers: "18.7M",
    spotifyId: "1vCWHaC5f2uS3y19w5Kk7y",
    spotifyPopularity: 88,
    subgenre: "Progressive House",
    country: "Sweden",
    activeYears: "2006-2018"
  },
  {
    id: "calvin_harris",
    name: "Calvin Harris",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "2.1M",
    followers: "12.3M",
    spotifyId: "7CajNmpbOovFoOoasH2HaY",
    spotifyPopularity: 82,
    subgenre: "EDM",
    country: "Scotland",
    activeYears: "2002-present"
  },

  // Major EDM Artists
  {
    id: "martin_garrix",
    name: "Martin Garrix",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.9M",
    followers: "11.8M",
    spotifyId: "60d24wfXkVzDSfLS6hyCjZ",
    spotifyPopularity: 80,
    subgenre: "Progressive House",
    country: "Netherlands",
    activeYears: "2012-present"
  },
  {
    id: "david_guetta",
    name: "David Guetta",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.7M",
    followers: "10.5M",
    spotifyId: "1Cs0zKBU1kc0i8ypK3B9ai",
    spotifyPopularity: 78,
    subgenre: "House",
    country: "France",
    activeYears: "1984-present"
  },
  {
    id: "skrillex",
    name: "Skrillex",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.6M",
    followers: "9.8M",
    spotifyId: "5he5w2lnU9x7JFhnwcekXX",
    spotifyPopularity: 76,
    subgenre: "Dubstep",
    country: "USA",
    activeYears: "2004-present"
  },
  {
    id: "zedd",
    name: "Zedd",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.4M",
    followers: "8.9M",
    spotifyId: "2qxJFvFYMEDqd7ui6gSAOE",
    spotifyPopularity: 74,
    subgenre: "Progressive House",
    country: "Germany",
    activeYears: "2009-present"
  },
  {
    id: "marshmello",
    name: "Marshmello",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.3M",
    followers: "8.2M",
    spotifyId: "64KEffDW9EtZ1y2vBYgq8T",
    spotifyPopularity: 72,
    subgenre: "Future Bass",
    country: "USA",
    activeYears: "2015-present"
  },

  // House Music Legends
  {
    id: "deadmau5",
    name: "deadmau5",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.2M",
    followers: "7.6M",
    spotifyId: "2CIMQHirSU0MQqyYHq0eOx",
    spotifyPopularity: 70,
    subgenre: "Progressive House",
    country: "Canada",
    activeYears: "1998-present"
  },
  {
    id: "eric_prydz",
    name: "Eric Prydz",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "980K",
    followers: "6.1M",
    spotifyId: "5me0Irg2ANcsgc93uaYrpb",
    spotifyPopularity: 68,
    subgenre: "Progressive House",
    country: "Sweden",
    activeYears: "2001-present"
  },
  {
    id: "tchami",
    name: "Tchami",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "850K",
    followers: "5.3M",
    spotifyId: "6Kb1eh9mcQx24VDHv6Iq0K",
    spotifyPopularity: 65,
    subgenre: "Future House",
    country: "France",
    activeYears: "2011-present"
  },

  // Techno Artists
  {
    id: "adam_beyer",
    name: "Adam Beyer",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "720K",
    followers: "4.5M",
    spotifyId: "6EkNaALxcmAsj0j2L76m6e",
    spotifyPopularity: 62,
    subgenre: "Techno",
    country: "Sweden",
    activeYears: "1993-present"
  },
  {
    id: "nina_kraviz",
    name: "Nina Kraviz",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "680K",
    followers: "4.2M",
    spotifyId: "1oZmFNkGAT93yDNGxngsI6",
    spotifyPopularity: 60,
    subgenre: "Techno",
    country: "Russia",
    activeYears: "2008-present"
  },
  {
    id: "amelie_lens",
    name: "Amelie Lens",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "620K",
    followers: "3.8M",
    spotifyId: "5jf48r6nykt12dG15bzqlN",
    spotifyPopularity: 58,
    subgenre: "Techno",
    country: "Belgium",
    activeYears: "2014-present"
  },

  // Trance Artists
  {
    id: "armin_van_buuren",
    name: "Armin van Buuren",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.1M",
    followers: "6.8M",
    spotifyId: "0SfsnGyD8FpIN4U4WCkBZ5",
    spotifyPopularity: 66,
    subgenre: "Trance",
    country: "Netherlands",
    activeYears: "1995-present"
  },
  {
    id: "tiesto",
    name: "Tiësto",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.0M",
    followers: "6.2M",
    spotifyId: "2o5jDhtHVPhrJdv3cEQ99Z",
    spotifyPopularity: 64,
    subgenre: "Trance",
    country: "Netherlands",
    activeYears: "1994-present"
  },
  {
    id: "paul_van_dyk",
    name: "Paul van Dyk",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "890K",
    followers: "5.5M",
    spotifyId: "7uUez8lqDc87mLWJCiLFmX",
    spotifyPopularity: 56,
    subgenre: "Trance",
    country: "Germany",
    activeYears: "1991-present"
  },

  // Future Bass/Chill
  {
    id: "odesza",
    name: "Odesza",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.5M",
    followers: "9.1M",
    spotifyId: "21mKp7DqtJX9HZ8eNSbJ20",
    spotifyPopularity: 75,
    subgenre: "Future Bass",
    country: "USA",
    activeYears: "2012-present"
  },
  {
    id: "flume",
    name: "Flume",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.3M",
    followers: "8.1M",
    spotifyId: "6nxWCVXbOlEVRUPbFtvMpA",
    spotifyPopularity: 73,
    subgenre: "Future Bass",
    country: "Australia",
    activeYears: "2011-present"
  },
  {
    id: "illenium",
    name: "Illenium",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.2M",
    followers: "7.4M",
    spotifyId: "1xJGoqmWEm7VR8MgVGOqOh",
    spotifyPopularity: 71,
    subgenre: "Future Bass",
    country: "USA",
    activeYears: "2013-present"
  },

  // Drum & Bass
  {
    id: "pendulum",
    name: "Pendulum",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "950K",
    followers: "5.9M",
    spotifyId: "7MqnCTCAX6SsIYYdJC4jBg",
    spotifyPopularity: 67,
    subgenre: "Drum & Bass",
    country: "Australia",
    activeYears: "2002-present"
  },
  {
    id: "netsky",
    name: "Netsky",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "820K",
    followers: "5.1M",
    spotifyId: "5TclPyDNxgNE7jxLHm1mTX",
    spotifyPopularity: 63,
    subgenre: "Drum & Bass",
    country: "Belgium",
    activeYears: "2009-present"
  },

  // Underground/Experimental
  {
    id: "aphex_twin",
    name: "Aphex Twin",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "780K",
    followers: "4.8M",
    spotifyId: "6kBDZFXuLrZgHnvmTw9Nq9",
    spotifyPopularity: 61,
    subgenre: "IDM",
    country: "UK",
    activeYears: "1985-present"
  },
  {
    id: "boards_of_canada",
    name: "Boards of Canada",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "650K",
    followers: "4.0M",
    spotifyId: "2A9opHyD7X5cpS2N9N8xBJ",
    spotifyPopularity: 57,
    subgenre: "IDM",
    country: "Scotland",
    activeYears: "1986-present"
  },

  // Rising Stars
  {
    id: "meduza",
    name: "MEDUZA",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "580K",
    followers: "3.6M",
    spotifyId: "0xRXCcSX89eobfrshSVdyu",
    spotifyPopularity: 69,
    subgenre: "House",
    country: "Italy",
    activeYears: "2018-present"
  },
  {
    id: "acraze",
    name: "ACRAZE",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "520K",
    followers: "3.2M",
    spotifyId: "4k4bz9XTQZAg9Vh9aF2gTb",
    spotifyPopularity: 66,
    subgenre: "House",
    country: "USA",
    activeYears: "2019-present"
  },
  {
    id: "john_summit",
    name: "John Summit",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "480K",
    followers: "2.9M",
    spotifyId: "7bqj9kRbxM3EKcynoBacDW",
    spotifyPopularity: 64,
    subgenre: "House",
    country: "USA",
    activeYears: "2020-present"
  }
];

// Get artists by subgenre
export const getArtistsBySubgenre = (subgenre: string): DanceElectroArtist[] => {
  return danceElectroArtists.filter(artist => artist.subgenre === subgenre);
};

// Get top artists by popularity
export const getTopArtists = (limit: number = 10): DanceElectroArtist[] => {
  return danceElectroArtists
    .sort((a, b) => (b.spotifyPopularity || 0) - (a.spotifyPopularity || 0))
    .slice(0, limit);
};

// Get artists by country
export const getArtistsByCountry = (country: string): DanceElectroArtist[] => {
  return danceElectroArtists.filter(artist => artist.country === country);
};

export default danceElectroArtists;
