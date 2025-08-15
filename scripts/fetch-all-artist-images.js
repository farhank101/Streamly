/**
 * Fetch ALL Artist Images from Spotify
 * - Parses artist names from `constants/hiphopArtists.ts` and `constants/bollywoodArtists.ts`
 * - Uses Spotify Client Credentials to fetch official images + popularity + followers
 * - Writes:
 *   - `constants/hiphopArtistsWithImages.ts`
 *   - `constants/bollywoodArtistsWithImages.ts`
 *   - `constants/artistImages.json` (name → { image, spotifyId, popularity, followers })
 *
 * Usage (non-interactive):
 *   EXPO_PUBLIC_SPOTIFY_CLIENT_ID=xxx EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET=yyy node scripts/fetch-all-artist-images.js
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
const HIPHOP_TS = path.join(ROOT, "constants/hiphopArtists.ts");
const BOLLYWOOD_TS = path.join(ROOT, "constants/bollywoodArtists.ts");

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

function readFileOrThrow(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

/**
 * Extract a JSON-like array from a TypeScript file that declares:
 *   export const <exportName>: Type[] = [ ... ];
 * Assumes the array literal uses valid JSON values (strings/numbers/null)
 */
function extractArrayFromTs(fileContent, exportName) {
  console.log(`\n🔍 Parsing ${exportName} from TypeScript file...`);
  
  // Look for the main array declaration with type annotation
  const mainExportPattern = `export const ${exportName}:`;
  const startIndex = fileContent.indexOf(mainExportPattern);
  if (startIndex === -1) {
    console.error(`❌ Could not find "export const ${exportName}:" in file`);
    return null;
  }
  
  console.log(`✅ Found main export at position ${startIndex}`);
  
  // Find the '=' after the type annotation
  const equalsIndex = fileContent.indexOf('=', startIndex);
  if (equalsIndex === -1) {
    console.error(`❌ Could not find '=' after type annotation`);
    return null;
  }
  
  // Find the first '[' after the equals sign
  const arrayStart = fileContent.indexOf('[', equalsIndex);
  if (arrayStart === -1) {
    console.error(`❌ Could not find '[' after equals sign`);
    return null;
  }
  
  console.log(`✅ Found array start at position ${arrayStart}`);
  
  // Naive bracket matching to find the matching ']'
  let depth = 0;
  let endIndex = -1;
  for (let i = arrayStart; i < fileContent.length; i++) {
    const ch = fileContent[i];
    if (ch === '[') depth += 1;
    else if (ch === ']') {
      depth -= 1;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }
  
  if (endIndex === -1) {
    console.error(`❌ Could not find matching ']' for array`);
    return null;
  }
  
  console.log(`✅ Found array end at position ${endIndex}`);
  
  const arrayLiteral = fileContent.slice(arrayStart, endIndex + 1);
  console.log(`📝 Array literal preview: ${arrayLiteral.substring(0, 200)}...`);
  
  try {
    // Try to clean up the array literal to make it JSON-compatible
    let cleaned = arrayLiteral
      .replace(/\n/g, ' ')           // Remove newlines
      .replace(/\s+/g, ' ')          // Normalize whitespace
      .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
      .replace(/\/\*.*?\*\//g, '')   // Remove block comments
      .replace(/\/\/.*$/gm, '');     // Remove line comments
    
    console.log(`🧹 Cleaned array preview: ${cleaned.substring(0, 200)}...`);
    
    const parsed = JSON.parse(cleaned);
    console.log(`✅ Successfully parsed ${parsed.length} items`);
    return parsed;
  } catch (err) {
    console.error(`❌ JSON parse failed: ${err.message}`);
    console.error(`🔍 First 500 chars of array: ${arrayLiteral.substring(0, 500)}`);
    
    // Fallback: try to extract just the artist names as a simple array
    console.log(`🔄 Attempting fallback name extraction...`);
    try {
      const nameMatches = arrayLiteral.match(/"name"\s*:\s*"([^"]+)"/g);
      if (nameMatches && nameMatches.length > 0) {
        const names = nameMatches.map(match => {
          const nameMatch = match.match(/"name"\s*:\s*"([^"]+)"/);
          return nameMatch ? nameMatch[1] : null;
        }).filter(Boolean);
        
        console.log(`✅ Fallback: extracted ${names.length} artist names`);
        return names.map((name, index) => ({
          id: `${index + 1}`,
          name: name,
          genre: exportName === 'hiphopArtists' ? 'Hip-Hop' : 'Bollywood',
          image: null,
          likes: '0',
          followers: '0',
          tier: 'Unknown',
          popularity: 0,
          isArtist: true
        }));
      }
    } catch (fallbackErr) {
      console.error(`❌ Fallback also failed: ${fallbackErr.message}`);
    }
    
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
        spotifyId: null,
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

function writeHipHopWithImagesTs(updated) {
  const outPath = path.join(ROOT, "constants/hiphopArtistsWithImages.ts");
  const content = `/**
 * Hip Hop Artists Database with Spotify Images (auto-generated)
 */

export interface HipHopArtist {
  id: string;
  name: string;
  genre: string;
  image: string | null;
  likes: string;
  followers: string | number;
  tier: string;
  spotifyId?: string | null;
  spotifyPopularity?: number;
}

export const hiphopArtists: HipHopArtist[] = ${JSON.stringify(
    updated,
    null,
    2
  )};

export const majorHipHopArtists = hiphopArtists.filter(artist => artist.tier === "Top" || artist.tier === "Major" || artist.tier === "Established" || artist.tier === "Rising" || artist.tier === "Legend");
export const undergroundHipHopArtists = hiphopArtists.filter(artist => artist.tier === "Underground");

export default hiphopArtists;
`;
  fs.writeFileSync(outPath, content, "utf8");
  return outPath;
}

function writeBollywoodWithImagesTs(updated) {
  const outPath = path.join(ROOT, "constants/bollywoodArtistsWithImages.ts");
  const content = `/**
 * Bollywood Artists with Spotify Images (auto-generated)
 */

export interface BollywoodArtist {
  id: string;
  name: string;
  genre: string;
  popularity: number;
  image: string | null;
  likes: string;
  isArtist: boolean;
  spotifyId?: string | null;
  spotifyPopularity?: number;
  followers?: number;
}

export const bollywoodArtists: BollywoodArtist[] = ${JSON.stringify(
    updated,
    null,
    2
  )};

export default bollywoodArtists;
`;
  fs.writeFileSync(outPath, content, "utf8");
  return outPath;
}

function writeConsolidatedJson(mappingByName) {
  const outPath = path.join(ROOT, "constants/artistImages.json");
  fs.writeFileSync(outPath, JSON.stringify(mappingByName, null, 2), "utf8");
  return outPath;
}

async function main() {
  console.log("🎵 Fetching ALL artist images using Spotify...");
  const token = await getSpotifyToken();
  console.log("✅ Got Spotify access token");

  const hiphopRaw = readFileOrThrow(HIPHOP_TS);
  const bollywoodRaw = readFileOrThrow(BOLLYWOOD_TS);

  const hiphop = extractArrayFromTs(hiphopRaw, "hiphopArtists");
  const bollywood = extractArrayFromTs(bollywoodRaw, "bollywoodArtists");
  if (!Array.isArray(hiphop) || !Array.isArray(bollywood)) {
    throw new Error("Failed to parse artists from TS sources");
  }

  const hiphopResult = await processArtists(hiphop, token, "Hip-Hop");
  const bollyResult = await processArtists(bollywood, token, "Bollywood");

  const hiphopOut = writeHipHopWithImagesTs(hiphopResult.updated);
  const bollyOut = writeBollywoodWithImagesTs(bollyResult.updated);

  const nameMap = {};
  for (const a of [...hiphopResult.updated, ...bollyResult.updated]) {
    const key = a.name;
    nameMap[key] = {
      image: a.image || null,
      spotifyId: a.spotifyId || null,
      popularity: a.spotifyPopularity || 0,
      followers: a.followers || 0,
    };
  }
  const jsonOut = writeConsolidatedJson(nameMap);

  console.log("\n🎉 Done!");
  console.log(`📝 Updated: ${hiphopOut}`);
  console.log(`📝 Updated: ${bollyOut}`);
  console.log(`🗂️  Mapping: ${jsonOut}`);
  console.log(`✅ Success: ${hiphopResult.success + bollyResult.success}`);
  console.log(`❌ Failed: ${hiphopResult.failure + bollyResult.failure}`);
}

main().catch((err) => {
  console.error("\n💥 Script failed:", err);
  process.exit(1);
});
