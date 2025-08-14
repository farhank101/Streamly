/**
 * Genius API Service
 * Handles fetching song lyrics and song information
 */

import { ENDPOINTS, API_KEYS, DEFAULT_PARAMS } from "../constants/api";

export interface GeniusSong {
  id: number;
  title: string;
  title_with_featured: string;
  full_title: string;
  artist_names: string;
  header_image_url: string;
  header_image_thumbnail_url: string;
  release_date_for_display: string;
  release_date_components: {
    year: number;
    month: number;
    day: number;
  };
  song_art_image_url: string;
  song_art_image_thumbnail_url: string;
  album: {
    id: number;
    name: string;
    url: string;
    cover_art_url: string;
  };
  primary_artist: {
    id: number;
    name: string;
    url: string;
    image_url: string;
  };
  featured_artists: Array<{
    id: number;
    name: string;
    url: string;
    image_url: string;
  }>;
  lyrics_state: string;
  lyrics_owner_id: number;
  url: string;
}

export interface GeniusSearchResult {
  id: number;
  title: string;
  title_with_featured: string;
  full_title: string;
  artist_names: string;
  header_image_url: string;
  header_image_thumbnail_url: string;
  release_date_for_display: string;
  song_art_image_url: string;
  song_art_image_thumbnail_url: string;
  primary_artist: {
    id: number;
    name: string;
    url: string;
    image_url: string;
  };
  url: string;
}

export interface GeniusSearchResponse {
  hits: Array<{
    result: GeniusSearchResult;
  }>;
}

/**
 * Search for songs on Genius
 */
export const searchSongs = async (
  query: string,
  perPage = 20
): Promise<GeniusSearchResult[]> => {
  try {
    const params = new URLSearchParams({
      q: query,
      per_page: perPage.toString(),
    });

    const response = await fetch(`${ENDPOINTS.GENIUS.SEARCH}?${params}`, {
      headers: {
        Authorization: `Bearer ${API_KEYS.GENIUS_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to search songs");
    }

    return data.response.hits.map((hit: any) => hit.result);
  } catch (error) {
    console.error("Genius search error:", error);
    throw error;
  }
};

/**
 * Get song details by ID
 */
export const getSongById = async (songId: number): Promise<GeniusSong> => {
  try {
    const response = await fetch(`${ENDPOINTS.GENIUS.SONG}/${songId}`, {
      headers: {
        Authorization: `Bearer ${API_KEYS.GENIUS_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to get song details");
    }

    return data.response.song;
  } catch (error) {
    console.error("Genius get song error:", error);
    throw error;
  }
};

/**
 * Extract lyrics from Genius song page
 * Note: This requires scraping the actual lyrics from the song page
 * as Genius API doesn't provide lyrics directly
 */
export const getSongLyrics = async (songUrl: string): Promise<string> => {
  try {
    // For now, return a placeholder since we need to implement web scraping
    // In a real implementation, you would:
    // 1. Fetch the song page HTML
    // 2. Parse the lyrics from the page
    // 3. Clean and format the lyrics

    console.log("🔍 Fetching lyrics from:", songUrl);

    // Placeholder implementation
    return "Lyrics will be available soon...\n\nThis feature requires web scraping implementation to extract lyrics from Genius song pages.";
  } catch (error) {
    console.error("Genius lyrics error:", error);
    throw error;
  }
};

/**
 * Search for a song and get its lyrics
 */
export const searchAndGetLyrics = async (
  songTitle: string,
  artistName: string
): Promise<{ song: GeniusSong; lyrics: string } | null> => {
  try {
    // Search for the song
    const searchQuery = `${songTitle} ${artistName}`;
    const searchResults = await searchSongs(searchQuery, 5);

    if (searchResults.length === 0) {
      return null;
    }

    // Get the first result (most relevant)
    const song = await getSongById(searchResults[0].id);

    // Get lyrics
    const lyrics = await getSongLyrics(song.url);

    return { song, lyrics };
  } catch (error) {
    console.error("Genius search and lyrics error:", error);
    throw error;
  }
};

export default {
  searchSongs,
  getSongById,
  getSongLyrics,
  searchAndGetLyrics,
};
