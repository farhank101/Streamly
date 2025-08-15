import { bollywoodArtists } from './bollywoodArtistsWithImages.ts';
import { hiphopArtists } from './hiphopArtists.ts';

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
const unifiedBollywoodArtists: UnifiedArtist[] = bollywoodArtists.map(artist => ({
  id: artist.id,
  name: artist.name,
  genre: 'Bollywood',
  image: artist.image || '',
  likes: artist.likes,
  followers: artist.followers.toString(),
  tier: artist.spotifyPopularity >= 80 ? 'Top' : 
        artist.spotifyPopularity >= 60 ? 'Major' : 
        artist.spotifyPopularity >= 40 ? 'Established' : 'Rising',
  spotifyId: artist.spotifyId || undefined,
  spotifyPopularity: artist.spotifyPopularity || 0,
  isArtist: true,
}));

// Convert Hip-Hop artists to unified format
const unifiedHipHopArtists: UnifiedArtist[] = hiphopArtists.map(artist => ({
  id: `hiphop_${artist.id}`,
  name: artist.name,
  genre: 'Hip-Hop',
  image: artist.image,
  likes: artist.likes,
  followers: artist.followers,
  tier: artist.tier,
  isArtist: true,
  spotifyPopularity: artist.tier === 'Top' ? 95 :
                     artist.tier === 'Major' ? 85 :
                     artist.tier === 'Established' ? 75 :
                     artist.tier === 'Rising' ? 65 :
                     artist.tier === 'Legend' ? 90 : 55,
}));

// Combine all artists
export const allArtists: UnifiedArtist[] = [
  ...unifiedBollywoodArtists,
  ...unifiedHipHopArtists,
];

// Export separate arrays for filtering
export { unifiedBollywoodArtists as bollywoodArtists };
export { unifiedHipHopArtists as hipHopArtists };

// Get artists by genre
export const getArtistsByGenre = (genre: string): UnifiedArtist[] => {
  return allArtists.filter(artist => artist.genre === genre);
};

// Get all unique genres
export const getAllGenres = (): string[] => {
  return [...new Set(allArtists.map(artist => artist.genre))];
};
