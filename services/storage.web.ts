/**
 * Local Storage Service (Web Version)
 * Provides web-compatible alternatives to SQLite operations
 */

import { Track } from "../types/track";

export interface HistoryEntry {
  id: string;
  trackId: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
  duration: number;
  sourceType: string;
  sourceId: string;
  playedAt: Date;
  playCount: number;
}

export interface ScrobbleEntry {
  id: string;
  trackId: string;
  title: string;
  artist: string;
  timestamp: Date;
  sourceType: string;
  sourceId: string;
}

export interface CachedLyrics {
  id: string;
  trackId: string;
  title: string;
  artist: string;
  lyrics: string;
  cachedAt: Date;
}

export interface CachedMetadata {
  id: string;
  trackId: string;
  title: string;
  artist: string;
  metadata: any;
  cachedAt: Date;
}

// Web storage implementation using localStorage instead of SQLite
class LocalStorageService {
  private db: any = null;
  
  constructor() {
    // Constructor is empty as initialization happens in init()
  }

  /**
   * Initialize the storage
   */
  async init(): Promise<void> {
    try {
      // Initialize localStorage if needed
      if (typeof localStorage !== 'undefined') {
        // Initialize default values if they don't exist
        if (!localStorage.getItem('history')) {
          localStorage.setItem('history', JSON.stringify([]));
        }
        if (!localStorage.getItem('scrobbles')) {
          localStorage.setItem('scrobbles', JSON.stringify([]));
        }
        if (!localStorage.getItem('cachedLyrics')) {
          localStorage.setItem('cachedLyrics', JSON.stringify([]));
        }
        if (!localStorage.getItem('cachedMetadata')) {
          localStorage.setItem('cachedMetadata', JSON.stringify([]));
        }
      }
      console.log("✅ Web local storage initialized");
    } catch (error) {
      console.error("❌ Failed to initialize web local storage:", error);
      throw error;
    }
  }

  // History methods
  async addToHistory(track: Track): Promise<void> {
    if (typeof localStorage === 'undefined') return;
    
    try {
      const history = JSON.parse(localStorage.getItem('history') || '[]');
      const existingIndex = history.findIndex((item: HistoryEntry) => item.trackId === track.id);
      
      const historyEntry: HistoryEntry = {
        id: Date.now().toString(),
        trackId: track.id,
        title: track.title,
        artist: track.artist,
        thumbnailUrl: track.thumbnailUrl || '',
        duration: track.duration || 0,
        sourceType: track.sourceType || 'unknown',
        sourceId: track.sourceId || '',
        playedAt: new Date(),
        playCount: 1
      };
      
      if (existingIndex >= 0) {
        // Update existing entry
        historyEntry.playCount = (history[existingIndex].playCount || 0) + 1;
        history.splice(existingIndex, 1);
      }
      
      // Add to beginning of array
      history.unshift(historyEntry);
      
      // Limit history size
      const limitedHistory = history.slice(0, 100);
      localStorage.setItem('history', JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  }

  async getHistory(limit: number = 50): Promise<HistoryEntry[]> {
    if (typeof localStorage === 'undefined') return [];
    
    try {
      const history = JSON.parse(localStorage.getItem('history') || '[]');
      return history.slice(0, limit);
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  }

  async clearHistory(): Promise<void> {
    if (typeof localStorage === 'undefined') return;
    
    try {
      localStorage.setItem('history', JSON.stringify([]));
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }

  // Scrobble methods
  async addScrobble(track: Track): Promise<void> {
    if (typeof localStorage === 'undefined') return;
    
    try {
      const scrobbles = JSON.parse(localStorage.getItem('scrobbles') || '[]');
      
      const scrobbleEntry: ScrobbleEntry = {
        id: Date.now().toString(),
        trackId: track.id,
        title: track.title,
        artist: track.artist,
        timestamp: new Date(),
        sourceType: track.sourceType || 'unknown',
        sourceId: track.sourceId || ''
      };
      
      scrobbles.unshift(scrobbleEntry);
      localStorage.setItem('scrobbles', JSON.stringify(scrobbles));
    } catch (error) {
      console.error('Error adding scrobble:', error);
    }
  }

  async getScrobbles(limit: number = 50): Promise<ScrobbleEntry[]> {
    if (typeof localStorage === 'undefined') return [];
    
    try {
      const scrobbles = JSON.parse(localStorage.getItem('scrobbles') || '[]');
      return scrobbles.slice(0, limit);
    } catch (error) {
      console.error('Error getting scrobbles:', error);
      return [];
    }
  }

  // Lyrics caching
  async cacheLyrics(track: Track, lyrics: string): Promise<void> {
    if (typeof localStorage === 'undefined') return;
    
    try {
      const cachedLyrics = JSON.parse(localStorage.getItem('cachedLyrics') || '[]');
      const existingIndex = cachedLyrics.findIndex((item: CachedLyrics) => 
        item.trackId === track.id || 
        (item.title === track.title && item.artist === track.artist)
      );
      
      const lyricsEntry: CachedLyrics = {
        id: Date.now().toString(),
        trackId: track.id,
        title: track.title,
        artist: track.artist,
        lyrics: lyrics,
        cachedAt: new Date()
      };
      
      if (existingIndex >= 0) {
        cachedLyrics.splice(existingIndex, 1);
      }
      
      cachedLyrics.unshift(lyricsEntry);
      
      // Limit cache size
      const limitedCache = cachedLyrics.slice(0, 50);
      localStorage.setItem('cachedLyrics', JSON.stringify(limitedCache));
    } catch (error) {
      console.error('Error caching lyrics:', error);
    }
  }

  async getLyrics(track: Track): Promise<string | null> {
    if (typeof localStorage === 'undefined') return null;
    
    try {
      const cachedLyrics = JSON.parse(localStorage.getItem('cachedLyrics') || '[]');
      const entry = cachedLyrics.find((item: CachedLyrics) => 
        item.trackId === track.id || 
        (item.title === track.title && item.artist === track.artist)
      );
      
      return entry ? entry.lyrics : null;
    } catch (error) {
      console.error('Error getting cached lyrics:', error);
      return null;
    }
  }

  // Metadata caching
  async cacheMetadata(track: Track, metadata: any): Promise<void> {
    if (typeof localStorage === 'undefined') return;
    
    try {
      const cachedMetadata = JSON.parse(localStorage.getItem('cachedMetadata') || '[]');
      const existingIndex = cachedMetadata.findIndex((item: CachedMetadata) => 
        item.trackId === track.id || 
        (item.title === track.title && item.artist === track.artist)
      );
      
      const metadataEntry: CachedMetadata = {
        id: Date.now().toString(),
        trackId: track.id,
        title: track.title,
        artist: track.artist,
        metadata: metadata,
        cachedAt: new Date()
      };
      
      if (existingIndex >= 0) {
        cachedMetadata.splice(existingIndex, 1);
      }
      
      cachedMetadata.unshift(metadataEntry);
      
      // Limit cache size
      const limitedCache = cachedMetadata.slice(0, 50);
      localStorage.setItem('cachedMetadata', JSON.stringify(limitedCache));
    } catch (error) {
      console.error('Error caching metadata:', error);
    }
  }

  async getMetadata(track: Track): Promise<any | null> {
    if (typeof localStorage === 'undefined') return null;
    
    try {
      const cachedMetadata = JSON.parse(localStorage.getItem('cachedMetadata') || '[]');
      const entry = cachedMetadata.find((item: CachedMetadata) => 
        item.trackId === track.id || 
        (item.title === track.title && item.artist === track.artist)
      );
      
      return entry ? entry.metadata : null;
    } catch (error) {
      console.error('Error getting cached metadata:', error);
      return null;
    }
  }
}

const storageService = new LocalStorageService();
export default storageService;