/**
 * YouTube API Service
 * Handles fetching and processing data from YouTube API
 */

import { ENDPOINTS, API_KEYS, DEFAULT_PARAMS } from "../constants/api";
import { Track, YouTubeTrack, TrackSearchResult } from "../types/track";

// Convert YouTube duration format (ISO 8601) to seconds
const convertDuration = (duration: string): number => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = match && match[1] ? parseInt(match[1].slice(0, -1)) : 0;
  const minutes = match && match[2] ? parseInt(match[2].slice(0, -1)) : 0;
  const seconds = match && match[3] ? parseInt(match[3].slice(0, -1)) : 0;

  return hours * 3600 + minutes * 60 + seconds;
};

// Convert YouTube API response to our Track format
const convertYouTubeToTrack = (item: YouTubeTrack): Track => {
  return {
    id: "", // This will be set by Supabase
    sourceId: item.id,
    sourceType: "youtube",
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    duration: item.contentDetails
      ? convertDuration(item.contentDetails.duration)
      : 0,
    thumbnailUrl: item.snippet.thumbnails.high.url,
    createdAt: new Date(item.snippet.publishedAt),
    playCount: item.statistics ? parseInt(item.statistics.viewCount) : 0,
  };
};

/**
 * Search for tracks on YouTube
 */
export const searchYouTube = async (
  query: string,
  pageToken?: string
): Promise<TrackSearchResult> => {
  try {
    const params = new URLSearchParams();
    Object.entries(DEFAULT_PARAMS.YOUTUBE).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    params.append("q", query);
    params.append("key", API_KEYS.YOUTUBE_API_KEY);
    if (pageToken) {
      params.append("pageToken", pageToken);
    }

    const response = await fetch(`${ENDPOINTS.YOUTUBE.SEARCH}?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to search YouTube");
    }

    // Get video IDs to fetch additional details
    const videoIds = data.items.map((item: any) => item.id.videoId).join(",");

    // Fetch video details to get duration and statistics
    const videoDetailsParams = new URLSearchParams({
      part: "snippet,contentDetails,statistics",
      id: videoIds,
      key: API_KEYS.YOUTUBE_API_KEY,
    });

    const detailsResponse = await fetch(
      `${ENDPOINTS.YOUTUBE.VIDEOS}?${videoDetailsParams}`
    );
    const detailsData = await detailsResponse.json();

    if (!detailsResponse.ok) {
      throw new Error(
        detailsData.error?.message || "Failed to get video details"
      );
    }

    // Convert to our Track format
    const tracks = detailsData.items.map(convertYouTubeToTrack);

    return {
      tracks,
      nextPageToken: data.nextPageToken,
    };
  } catch (error) {
    console.error("YouTube search error:", error);
    throw error;
  }
};

/**
 * Get a specific YouTube video by ID
 */
export const getYouTubeVideo = async (videoId: string): Promise<Track> => {
  try {
    const params = new URLSearchParams({
      part: "snippet,contentDetails,statistics",
      id: videoId,
      key: API_KEYS.YOUTUBE_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.YOUTUBE.VIDEOS}?${params}`);
    const data = await response.json();

    if (!response.ok || !data.items || data.items.length === 0) {
      throw new Error(data.error?.message || "Failed to get YouTube video");
    }

    return convertYouTubeToTrack(data.items[0]);
  } catch (error) {
    console.error("YouTube get video error:", error);
    throw error;
  }
};

/**
 * Get trending videos from YouTube
 */
export const getTrendingVideos = async (
  regionCode = "US",
  categoryId = "10",
  maxResults = 20
): Promise<Track[]> => {
  try {
    const params = new URLSearchParams({
      part: "snippet,contentDetails,statistics",
      chart: "mostPopular",
      regionCode,
      videoCategoryId: categoryId, // 10 is for Music
      maxResults: maxResults.toString(),
      key: API_KEYS.YOUTUBE_API_KEY,
    });

    const response = await fetch(`${ENDPOINTS.YOUTUBE.VIDEOS}?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to get trending videos");
    }

    return data.items.map(convertYouTubeToTrack);
  } catch (error) {
    console.error("YouTube trending error:", error);
    throw error;
  }
};

export default {
  searchYouTube,
  getYouTubeVideo,
  getTrendingVideos,
};
