/**
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
