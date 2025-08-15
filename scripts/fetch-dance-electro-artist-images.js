/**
 * Fetch Dance/Electronic Artist Images from Spotify
 * - Uses hardcoded dance/electronic artists data
 * - Uses Spotify Client Credentials to fetch official images + popularity + followers
 * - Updates the existing dance/electronic artists data with real Spotify data
 *
 * Usage (non-interactive):
 *   EXPO_PUBLIC_SPOTIFY_CLIENT_ID=xxx EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=yyy node scripts/fetch-dance-electro-artist-images.js
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Prefer global fetch (Node >=18); fall back to node-fetch v2 from package.json
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetchFn = typeof fetch !== "undefined" ? fetch : require("node-fetch");

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.error(
    "❌ Spotify API credentials not found. Set EXPO_PUBLIC_SPOTIFY_CLIENT_ID and EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET"
  );
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");

// Hardcoded dance/electronic artists data
const danceElectroArtists = [
  {
    id: "daft_punk",
    name: "Daft Punk",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "2.8M",
    followers: 15200000,
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
    followers: 18700000,
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
    followers: 12300000,
    spotifyId: "7CajNmpbOovFoOoasH2HaY",
    spotifyPopularity: 82,
    subgenre: "EDM",
    country: "Scotland",
    activeYears: "2002-present"
  },
  {
    id: "martin_garrix",
    name: "Martin Garrix",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.9M",
    followers: 11800000,
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
    followers: 10500000,
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
    followers: 9800000,
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
    followers: 8900000,
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
    followers: 8200000,
    spotifyId: "64KEffDW9EtZ1y2vBYgq8T",
    spotifyPopularity: 72,
    subgenre: "Future Bass",
    country: "USA",
    activeYears: "2015-present"
  },
  {
    id: "deadmau5",
    name: "deadmau5",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.2M",
    followers: 7600000,
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
    followers: 6100000,
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
    followers: 5300000,
    spotifyId: "6Kb1eh9mcQx24VDHv6Iq0K",
    spotifyPopularity: 65,
    subgenre: "Future House",
    country: "France",
    activeYears: "2011-present"
  },
  {
    id: "adam_beyer",
    name: "Adam Beyer",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "720K",
    followers: 4500000,
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
    followers: 4200000,
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
    followers: 3800000,
    spotifyId: "5jf48r6nykt12dG15bzqlN",
    spotifyPopularity: 58,
    subgenre: "Techno",
    country: "Belgium",
    activeYears: "2014-present"
  },
  {
    id: "armin_van_buuren",
    name: "Armin van Buuren",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.1M",
    followers: 6800000,
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
    followers: 6200000,
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
    followers: 5500000,
    spotifyId: "7uUez8lqDc87mLWJCiLFmX",
    spotifyPopularity: 56,
    subgenre: "Trance",
    country: "Germany",
    activeYears: "1991-present"
  },
  {
    id: "odesza",
    name: "Odesza",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "1.5M",
    followers: 9100000,
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
    followers: 8100000,
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
    followers: 7400000,
    spotifyId: "1xJGoqmWEm7VR8MgVGOqOh",
    spotifyPopularity: 71,
    subgenre: "Future Bass",
    country: "USA",
    activeYears: "2013-present"
  },
  {
    id: "pendulum",
    name: "Pendulum",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "950K",
    followers: 5900000,
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
    followers: 5100000,
    spotifyId: "5TclPyDNxgNE7jxLHm1mTX",
    spotifyPopularity: 63,
    subgenre: "Drum & Bass",
    country: "Belgium",
    activeYears: "2009-present"
  },
  {
    id: "aphex_twin",
    name: "Aphex Twin",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "780K",
    followers: 4800000,
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
    followers: 4000000,
    spotifyId: "2A9opHyD7X5cpS2N9N8xBJ",
    spotifyPopularity: 57,
    subgenre: "IDM",
    country: "Scotland",
    activeYears: "1986-present"
  },
  {
    id: "meduza",
    name: "MEDUZA",
    image: "https://i.scdn.co/image/ab6761610000e5eb8e8c5c3b1c0c0c0c0c0c0c0c",
    likes: "580K",
    followers: 3600000,
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
    followers: 3200000,
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
    followers: 2900000,
    spotifyId: "7bqj9kRbxM3EKcynoBacDW",
    spotifyPopularity: 64,
    subgenre: "House",
    country: "USA",
    activeYears: "2020-present"
  }
];

async function getSpotifyToken() {
  const response = await fetchFn("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
          "base64"
        ),
    },
    body: "grant_type=client_credentials",
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to get token (${response.status}): ${text}`);
  }
  const data = await response.json();
  if (!data.access_token)
    throw new Error("No access_token in Spotify response");
  return data.access_token;
}

async function searchArtistOnSpotify(artistName, token) {
  try {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      artistName
    )}&type=artist&limit=1`;
    const response = await fetchFn(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    const item = data?.artists?.items?.[0];
    if (!item) return null;
    return {
      id: item.id,
      name: item.name,
      image:
        Array.isArray(item.images) && item.images.length > 0
          ? item.images[0].url
          : null,
      popularity: typeof item.popularity === "number" ? item.popularity : 0,
      followers: item.followers?.total ?? 0,
    };
  } catch (error) {
    console.warn(`Search error for "${artistName}":`, error.message);
    return null;
  }
}

function toKNotation(num) {
  if (!Number.isFinite(num)) return "0";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${Math.floor(num / 1_000)}K`;
  return `${num}`;
}

async function processArtists(artists, token, label) {
  const updated = [];
  let success = 0;
  let failure = 0;

  for (let i = 0; i < artists.length; i++) {
    const a = artists[i];
    const name = a.name || a.title || "";
    const ordinal = `${i + 1}/${artists.length}`;
    process.stdout.write(`\n🔍 [${label}] ${ordinal} ${name} ... `);

    const found = await searchArtistOnSpotify(name, token);
    if (found) {
      success += 1;
      process.stdout.write(`✅ (${found.popularity})\n`);
      updated.push({
        ...a,
        spotifyId: found.id,
        image: found.image || a.image || null,
        spotifyPopularity: found.popularity,
        followers: found.followers,
        likes: a.likes || toKNotation(found.followers),
      });
    } else {
      failure += 1;
      process.stdout.write("❌\n");
      updated.push({
        ...a,
        spotifyId: a.spotifyId || null,
        image: a.image || null,
        spotifyPopularity: a.spotifyPopularity || 0,
        followers: a.followers || 0,
      });
    }

    // Gentle rate limit to avoid 429s
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 120));
  }

  return { updated, success, failure };
}

function writeDanceElectroWithImagesTs(updated) {
  const outPath = path.join(ROOT, "constants/danceElectroArtistsWithImages.ts");
  const content = `/**
 * Dance/Electronic Artists with Images
 * TypeScript version of the dance/electronic artists data
 */

import danceElectroArtistsData from './danceElectroArtistsWithImages.json';

export interface DanceElectroArtistWithImage {
  id: string;
  name: string;
  image: string;
  likes: string;
  followers: number;
  spotifyId?: string;
  spotifyPopularity?: number;
  subgenre?: string;
  country?: string;
  activeYears?: string;
}

export const danceElectroArtistsWithImages: DanceElectroArtistWithImage[] = danceElectroArtistsData;

// Export the default data
export default danceElectroArtistsWithImages;

// Helper functions
export const getDanceElectroArtistsBySubgenre = (subgenre: string): DanceElectroArtistWithImage[] => {
  return danceElectroArtistsWithImages.filter(artist => artist.subgenre === subgenre);
};

export const getTopDanceElectroArtists = (limit: number = 10): DanceElectroArtistWithImage[] => {
  return danceElectroArtistsWithImages
    .sort((a, b) => (b.spotifyPopularity || 0) - (a.spotifyPopularity || 0))
    .slice(0, limit);
};

export const getDanceElectroArtistsByCountry = (country: string): DanceElectroArtistWithImage[] => {
  return danceElectroArtistsWithImages.filter(artist => artist.country === country);
};

export const getDanceElectroArtistsByPopularity = (minPopularity: number): DanceElectroArtistWithImage[] => {
  return danceElectroArtistsWithImages.filter(artist => (artist.spotifyPopularity || 0) >= minPopularity);
};
`;
  fs.writeFileSync(outPath, content, "utf8");
  return outPath;
}

function writeDanceElectroJson(updated) {
  const outPath = path.join(ROOT, "constants/danceElectroArtistsWithImages.json");
  fs.writeFileSync(outPath, JSON.stringify(updated, null, 2), "utf8");
  return outPath;
}

async function main() {
  console.log("🎵 Fetching Dance/Electronic artist images using Spotify...");
  const token = await getSpotifyToken();
  console.log("✅ Got Spotify access token");

  console.log(`📊 Processing ${danceElectroArtists.length} dance/electronic artists...`);

  const danceElectroResult = await processArtists(danceElectroArtists, token, "Dance/Electronic");

  const tsOut = writeDanceElectroWithImagesTs(danceElectroResult.updated);
  const jsonOut = writeDanceElectroJson(danceElectroResult.updated);

  console.log("\n🎉 Done!");
  console.log(`📝 Updated: ${tsOut}`);
  console.log(`📝 Updated: ${jsonOut}`);
  console.log(`✅ Success: ${danceElectroResult.success}`);
  console.log(`❌ Failed: ${danceElectroResult.failure}`);
  
  // Show some stats
  const topArtists = danceElectroResult.updated
    .filter(a => a.spotifyPopularity && a.spotifyPopularity >= 80)
    .sort((a, b) => (b.spotifyPopularity || 0) - (a.spotifyPopularity || 0))
    .slice(0, 5);
  
  if (topArtists.length > 0) {
    console.log("\n🏆 Top 5 Most Popular Artists:");
    topArtists.forEach((artist, index) => {
      console.log(`  ${index + 1}. ${artist.name} - Popularity: ${artist.spotifyPopularity}`);
    });
  }
}

main().catch((err) => {
  console.error("\n💥 Script failed:", err);
  process.exit(1);
});
