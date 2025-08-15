import { bollywoodArtists } from "./bollywoodArtistsWithImages";
import { hiphopArtists } from "./hiphopArtistsWithImages";
import { danceElectroArtistsWithImages } from "./danceElectroArtistsWithImages";
import { discoveredEDMArtists } from "./discoveredEDMArtists";

// Import all the new genre artists from JSON files
const rockArtists = require("./rockArtists.json");
const popArtists = require("./popArtists.json");
const countryArtists = require("./countryArtists.json");
const latinArtists = require("./latinArtists.json");
const metalArtists = require("./metalArtists.json");
const jazzArtists = require("./jazzArtists.json");
const classicalArtists = require("./classicalArtists.json");
const bluesArtists = require("./bluesArtists.json");
const folkArtists = require("./folkArtists.json");
const punkArtists = require("./punkArtists.json");
const soulFunkArtists = require("./soul_funkArtists.json");
const reggaeArtists = require("./reggaeArtists.json");
const indieArtists = require("./indieArtists.json");

// Import enhanced artist collections
const rockArtistsEnhanced = require("./rockArtistsEnhanced.json");
const popArtistsEnhanced = require("./popArtistsEnhanced.json");
const countryArtistsEnhanced = require("./countryArtistsEnhanced.json");
const latinArtistsEnhanced = require("./latinArtistsEnhanced.json");
const metalArtistsEnhanced = require("./metalArtistsEnhanced.json");
const jazzArtistsEnhanced = require("./jazzArtistsEnhanced.json");
const classicalArtistsEnhanced = require("./classicalArtistsEnhanced.json");
const bluesArtistsEnhanced = require("./bluesArtistsEnhanced.json");
const folkArtistsEnhanced = require("./folkArtistsEnhanced.json");
const punkArtistsEnhanced = require("./punkArtistsEnhanced.json");
const soulFunkArtistsEnhanced = require("./soul_funkArtistsEnhanced.json");
const reggaeArtistsEnhanced = require("./reggaeArtistsEnhanced.json");
const indieArtistsEnhanced = require("./indieArtistsEnhanced.json");
const electronicArtistsEnhanced = require("./electronicArtistsEnhanced.json");

// Import top global artists
const topGlobalArtists = require("./topGlobalArtists.json");

// Import massive artist collection
const massiveArtistsCollection = require("./massiveArtistsCollection.json");

export interface UnifiedArtist {
  id: string;
  name: string;
  genre: string;
  image: string;
  likes: string;
  followers: string;
  tier: string;
  spotifyId?: string;
  spotifyPopularity?: number;
  isArtist: boolean;
}

// Convert Bollywood artists to unified format
const unifiedBollywoodArtists: UnifiedArtist[] = bollywoodArtists.map(
  (artist) => ({
    id: artist.id,
    name: artist.name,
    genre: "Bollywood",
    image: artist.image || "",
    likes: artist.likes,
    followers: artist.followers.toString(),
    tier:
      artist.spotifyPopularity >= 80
        ? "Top"
        : artist.spotifyPopularity >= 60
        ? "Major"
        : artist.spotifyPopularity >= 40
        ? "Established"
        : "Rising",
    spotifyId: artist.spotifyId || undefined,
    spotifyPopularity: artist.spotifyPopularity || 0,
    isArtist: true,
  })
);

// Convert Hip-Hop artists to unified format
const unifiedHipHopArtists: UnifiedArtist[] = hiphopArtists.map((artist) => ({
  id: `hiphop_${artist.id}`,
  name: artist.name,
  genre: "Hip-Hop",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Dance/Electronic artists to unified format
const unifiedDanceElectroArtists: UnifiedArtist[] =
  danceElectroArtistsWithImages.map((artist) => ({
    id: `dance_${artist.id}`,
    name: artist.name,
    genre: "Dance/Electronic",
    image: artist.image || "",
    likes: artist.likes,
    followers: artist.followers.toString(),
    tier:
      artist.spotifyPopularity >= 80
        ? "Top"
        : artist.spotifyPopularity >= 60
        ? "Major"
        : artist.spotifyPopularity >= 40
        ? "Established"
        : "Rising",
    spotifyId: artist.spotifyId || undefined,
    spotifyPopularity: artist.spotifyPopularity || 0,
    isArtist: true,
  }));

// Convert newly discovered EDM artists to unified format
const unifiedEDMArtists: UnifiedArtist[] = discoveredEDMArtists.map(
  (artist) => ({
    id: `edm_${artist.id}`,
    name: artist.name,
    genre: "EDM", // New EDM genre category
    image: artist.image || "",
    likes: artist.likes,
    followers: artist.followers.toString(),
    tier:
      artist.spotifyPopularity >= 80
        ? "Top"
        : artist.spotifyPopularity >= 60
        ? "Major"
        : artist.spotifyPopularity >= 40
        ? "Established"
        : "Rising",
    spotifyId: artist.spotifyId || undefined,
    spotifyPopularity: artist.spotifyPopularity || 0,
    isArtist: true,
  })
);

// Convert Rock artists to unified format (combined original + enhanced)
const unifiedRockArtists: UnifiedArtist[] = [
  ...rockArtists,
  ...rockArtistsEnhanced,
].map((artist) => ({
  id: `rock_${artist.id}`,
  name: artist.name,
  genre: "Rock",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Pop artists to unified format (combined original + enhanced)
const unifiedPopArtists: UnifiedArtist[] = [
  ...popArtists,
  ...popArtistsEnhanced,
].map((artist) => ({
  id: `pop_${artist.id}`,
  name: artist.name,
  genre: "Pop",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Country artists to unified format (combined original + enhanced)
const unifiedCountryArtists: UnifiedArtist[] = [
  ...countryArtists,
  ...countryArtistsEnhanced,
].map((artist) => ({
  id: `country_${artist.id}`,
  name: artist.name,
  genre: "Country",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Latin artists to unified format (combined original + enhanced)
const unifiedLatinArtists: UnifiedArtist[] = [
  ...latinArtists,
  ...latinArtistsEnhanced,
].map((artist) => ({
  id: `latin_${artist.id}`,
  name: artist.name,
  genre: "Latin",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Metal artists to unified format (combined original + enhanced)
const unifiedMetalArtists: UnifiedArtist[] = [
  ...metalArtists,
  ...metalArtistsEnhanced,
].map((artist) => ({
  id: `metal_${artist.id}`,
  name: artist.name,
  genre: "Metal",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Jazz artists to unified format (combined original + enhanced)
const unifiedJazzArtists: UnifiedArtist[] = [
  ...jazzArtists,
  ...jazzArtistsEnhanced,
].map((artist) => ({
  id: `jazz_${artist.id}`,
  name: artist.name,
  genre: "Jazz",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Classical artists to unified format (combined original + enhanced)
const unifiedClassicalArtists: UnifiedArtist[] = [
  ...classicalArtists,
  ...classicalArtistsEnhanced,
].map((artist) => ({
  id: `classical_${artist.id}`,
  name: artist.name,
  genre: "Classical",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Blues artists to unified format (combined original + enhanced)
const unifiedBluesArtists: UnifiedArtist[] = [
  ...bluesArtists,
  ...bluesArtistsEnhanced,
].map((artist) => ({
  id: `blues_${artist.id}`,
  name: artist.name,
  genre: "Blues",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Folk artists to unified format (combined original + enhanced)
const unifiedFolkArtists: UnifiedArtist[] = [
  ...folkArtists,
  ...folkArtistsEnhanced,
].map((artist) => ({
  id: `folk_${artist.id}`,
  name: artist.name,
  genre: "Folk",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Punk artists to unified format (combined original + enhanced)
const unifiedPunkArtists: UnifiedArtist[] = [
  ...punkArtists,
  ...punkArtistsEnhanced,
].map((artist) => ({
  id: `punk_${artist.id}`,
  name: artist.name,
  genre: "Punk",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Soul/Funk artists to unified format (combined original + enhanced)
const unifiedSoulFunkArtists: UnifiedArtist[] = [
  ...soulFunkArtists,
  ...soulFunkArtistsEnhanced,
].map((artist) => ({
  id: `soul_funk_${artist.id}`,
  name: artist.name,
  genre: "Soul/Funk",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Reggae artists to unified format (combined original + enhanced)
const unifiedReggaeArtists: UnifiedArtist[] = [
  ...reggaeArtists,
  ...reggaeArtistsEnhanced,
].map((artist) => ({
  id: `reggae_${artist.id}`,
  name: artist.name,
  genre: "Reggae",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Indie artists to unified format (combined original + enhanced)
const unifiedIndieArtists: UnifiedArtist[] = [
  ...indieArtists,
  ...indieArtistsEnhanced,
].map((artist) => ({
  id: `indie_${artist.id}`,
  name: artist.name,
  genre: "Indie",
  image: artist.image || "",
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier:
    artist.spotifyPopularity >= 80
      ? "Top"
      : artist.spotifyPopularity >= 60
      ? "Major"
      : artist.spotifyPopularity >= 40
      ? "Established"
      : "Rising",
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Electronic artists to unified format (enhanced only)
const unifiedElectronicArtists: UnifiedArtist[] = electronicArtistsEnhanced.map(
  (artist) => ({
    id: `electronic_${artist.id}`,
    name: artist.name,
    genre: "Electronic",
    image: artist.image || "",
    likes: artist.likes,
    followers: artist.followers.toString(),
    tier:
      artist.spotifyPopularity >= 80
        ? "Top"
        : artist.spotifyPopularity >= 60
        ? "Major"
        : artist.spotifyPopularity >= 40
        ? "Established"
        : "Rising",
    spotifyId: artist.spotifyId || undefined,
    spotifyPopularity: artist.spotifyPopularity || 0,
    isArtist: true,
  })
);

// Convert Top Global artists to unified format
const unifiedTopGlobalArtists: UnifiedArtist[] = topGlobalArtists.map(
  (artist) => ({
    id: `top_global_${artist.id}`,
    name: artist.name,
    genre: "Top Global", // Special category for world's biggest stars
    image: artist.image || "",
    likes: artist.likes,
    followers: artist.followers.toString(),
    tier:
      artist.tier ||
      (artist.spotifyPopularity >= 95
        ? "Superstar"
        : artist.spotifyPopularity >= 90
        ? "Global Star"
        : artist.spotifyPopularity >= 85
        ? "Major Star"
        : "Popular Star"),
    spotifyId: artist.spotifyId || undefined,
    spotifyPopularity: artist.spotifyPopularity || 0,
    isArtist: true,
  })
);

// Convert Massive artist collection to unified format
const unifiedMassiveArtists: UnifiedArtist[] = massiveArtistsCollection.map(
  (artist) => ({
    id: `massive_${artist.id}`,
    name: artist.name,
    genre: artist.primaryGenre || "Other",
    image: artist.image || "",
    likes: artist.likes || "0",
    followers: artist.followers?.toString() || "0",
    tier: artist.tier || "Rising",
    spotifyId: artist.spotifyId || undefined,
    spotifyPopularity: artist.spotifyPopularity || 0,
    isArtist: true,
  })
);

// Combine all artists
export const allArtists: UnifiedArtist[] = [
  ...unifiedBollywoodArtists,
  ...unifiedHipHopArtists,
  ...unifiedDanceElectroArtists,
  ...unifiedEDMArtists,
  ...unifiedRockArtists,
  ...unifiedPopArtists,
  ...unifiedCountryArtists,
  ...unifiedLatinArtists,
  ...unifiedMetalArtists,
  ...unifiedJazzArtists,
  ...unifiedClassicalArtists,
  ...unifiedBluesArtists,
  ...unifiedFolkArtists,
  ...unifiedPunkArtists,
  ...unifiedSoulFunkArtists,
  ...unifiedReggaeArtists,
  ...unifiedIndieArtists,
  ...unifiedElectronicArtists,
  ...unifiedTopGlobalArtists,
  ...unifiedMassiveArtists, // Added massive artist collection
];

// Export separate arrays for filtering
export { unifiedBollywoodArtists as bollywoodArtists };
export { unifiedHipHopArtists as hipHopArtists };
export { unifiedDanceElectroArtists as danceElectroArtists };
export { unifiedEDMArtists as edmArtists };
export { unifiedRockArtists as rockArtists };
export { unifiedPopArtists as popArtists };
export { unifiedCountryArtists as countryArtists };
export { unifiedLatinArtists as latinArtists };
export { unifiedMetalArtists as metalArtists };
export { unifiedJazzArtists as jazzArtists };
export { unifiedClassicalArtists as classicalArtists };
export { unifiedBluesArtists as bluesArtists };
export { unifiedFolkArtists as folkArtists };
export { unifiedPunkArtists as punkArtists };
export { unifiedSoulFunkArtists as soulFunkArtists };
export { unifiedReggaeArtists as reggaeArtists };
export { unifiedIndieArtists as indieArtists };
export { unifiedElectronicArtists as electronicArtists };
export { unifiedTopGlobalArtists as topGlobalArtists };
export { unifiedMassiveArtists as massiveArtists };

// Get artists by genre
export const getArtistsByGenre = (genre: string): UnifiedArtist[] => {
  return allArtists.filter((artist) => artist.genre === genre);
};

// Get all unique genres
export const getAllGenres = (): string[] => {
  return Array.from(new Set(allArtists.map((artist) => artist.genre)));
};
