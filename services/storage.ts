/**
 * Local Storage Service
 * Handles SQLite database operations for history, scrobbling, and cached data
 */

import * as SQLite from "expo-sqlite";
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

class LocalStorageService {
  private db: SQLite.SQLiteDatabase | null = null;

  /**
   * Initialize the database
   */
  async init(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync("streamly.db");
      await this.createTables();
      console.log("✅ Local storage initialized");
    } catch (error) {
      console.error("❌ Failed to initialize local storage:", error);
      // Don't throw error, just log it and continue
      // This prevents the app from getting stuck on storage initialization
      console.warn("⚠️ Continuing without local storage");
    }
  }

  /**
   * Create database tables
   */
  private async createTables(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    const createHistoryTable = `
      CREATE TABLE IF NOT EXISTS history (
        id TEXT PRIMARY KEY,
        trackId TEXT NOT NULL,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        thumbnailUrl TEXT,
        duration INTEGER DEFAULT 0,
        sourceType TEXT NOT NULL,
        sourceId TEXT NOT NULL,
        playedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        playCount INTEGER DEFAULT 1
      )
    `;

    const createScrobblesTable = `
      CREATE TABLE IF NOT EXISTS scrobbles (
        id TEXT PRIMARY KEY,
        trackId TEXT NOT NULL,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        sourceType TEXT NOT NULL,
        sourceId TEXT NOT NULL
      )
    `;

    const createLyricsCacheTable = `
      CREATE TABLE IF NOT EXISTS lyrics_cache (
        id TEXT PRIMARY KEY,
        trackId TEXT NOT NULL,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        lyrics TEXT NOT NULL,
        cachedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createMetadataCacheTable = `
      CREATE TABLE IF NOT EXISTS metadata_cache (
        id TEXT PRIMARY KEY,
        trackId TEXT NOT NULL,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        metadata TEXT NOT NULL,
        cachedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await this.db.execAsync(createHistoryTable);
    await this.db.execAsync(createScrobblesTable);
    await this.db.execAsync(createLyricsCacheTable);
    await this.db.execAsync(createMetadataCacheTable);
  }

  /**
   * Add a track to history
   */
  async addToHistory(track: Track): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    const entry: HistoryEntry = {
      id: `${track.id}_${Date.now()}`,
      trackId: track.id,
      title: track.title,
      artist: track.artist,
      thumbnailUrl: track.thumbnailUrl,
      duration: track.duration,
      sourceType: track.sourceType,
      sourceId: track.sourceId,
      playedAt: new Date(),
      playCount: track.playCount,
    };

    const query = `
      INSERT OR REPLACE INTO history 
      (id, trackId, title, artist, thumbnailUrl, duration, sourceType, sourceId, playedAt, playCount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db.runAsync(query, [
      entry.id,
      entry.trackId,
      entry.title,
      entry.artist,
      entry.thumbnailUrl,
      entry.duration,
      entry.sourceType,
      entry.sourceId,
      entry.playedAt.toISOString(),
      entry.playCount,
    ]);
  }

  /**
   * Get listening history
   */
  async getHistory(
    sortBy: "date" | "artist" | "title" = "date",
    limit = 100
  ): Promise<HistoryEntry[]> {
    if (!this.db) throw new Error("Database not initialized");

    let orderBy = "playedAt DESC";
    if (sortBy === "artist") orderBy = "artist ASC";
    if (sortBy === "title") orderBy = "title ASC";

    const query = `
      SELECT * FROM history 
      ORDER BY ${orderBy} 
      LIMIT ?
    `;

    const result = await this.db.getAllAsync(query, [limit]);
    return result.map((row) => ({
      ...row,
      playedAt: new Date(row.playedAt),
    }));
  }

  /**
   * Clear history
   */
  async clearHistory(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");
    await this.db.runAsync("DELETE FROM history");
  }

  /**
   * Add a scrobble entry
   */
  async addScrobble(track: Track): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    const entry: ScrobbleEntry = {
      id: `${track.id}_${Date.now()}`,
      trackId: track.id,
      title: track.title,
      artist: track.artist,
      timestamp: new Date(),
      sourceType: track.sourceType,
      sourceId: track.sourceId,
    };

    const query = `
      INSERT INTO scrobbles 
      (id, trackId, title, artist, timestamp, sourceType, sourceId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db.runAsync(query, [
      entry.id,
      entry.trackId,
      entry.title,
      entry.artist,
      entry.timestamp.toISOString(),
      entry.sourceType,
      entry.sourceId,
    ]);
  }

  /**
   * Get scrobbles
   */
  async getScrobbles(limit = 100): Promise<ScrobbleEntry[]> {
    if (!this.db) throw new Error("Database not initialized");

    const query = `
      SELECT * FROM scrobbles 
      ORDER BY timestamp DESC 
      LIMIT ?
    `;

    const result = await this.db.getAllAsync(query, [limit]);
    return result.map((row) => ({
      ...row,
      timestamp: new Date(row.timestamp),
    }));
  }

  /**
   * Cache lyrics
   */
  async cacheLyrics(
    trackId: string,
    title: string,
    artist: string,
    lyrics: string
  ): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    const entry: CachedLyrics = {
      id: `${trackId}_lyrics`,
      trackId,
      title,
      artist,
      lyrics,
      cachedAt: new Date(),
    };

    const query = `
      INSERT OR REPLACE INTO lyrics_cache 
      (id, trackId, title, artist, lyrics, cachedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await this.db.runAsync(query, [
      entry.id,
      entry.trackId,
      entry.title,
      entry.artist,
      entry.lyrics,
      entry.cachedAt.toISOString(),
    ]);
  }

  /**
   * Get cached lyrics
   */
  async getCachedLyrics(trackId: string): Promise<CachedLyrics | null> {
    if (!this.db) throw new Error("Database not initialized");

    const query = `
      SELECT * FROM lyrics_cache 
      WHERE trackId = ?
    `;

    const result = await this.db.getFirstAsync(query, [trackId]);
    if (!result) return null;

    return {
      ...result,
      cachedAt: new Date(result.cachedAt),
    };
  }

  /**
   * Cache metadata
   */
  async cacheMetadata(
    trackId: string,
    title: string,
    artist: string,
    metadata: any
  ): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    const entry: CachedMetadata = {
      id: `${trackId}_metadata`,
      trackId,
      title,
      artist,
      metadata: JSON.stringify(metadata),
      cachedAt: new Date(),
    };

    const query = `
      INSERT OR REPLACE INTO metadata_cache 
      (id, trackId, title, artist, metadata, cachedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await this.db.runAsync(query, [
      entry.id,
      entry.trackId,
      entry.title,
      entry.artist,
      entry.metadata,
      entry.cachedAt.toISOString(),
    ]);
  }

  /**
   * Get cached metadata
   */
  async getCachedMetadata(trackId: string): Promise<CachedMetadata | null> {
    if (!this.db) throw new Error("Database not initialized");

    const query = `
      SELECT * FROM metadata_cache 
      WHERE trackId = ?
    `;

    const result = await this.db.getFirstAsync(query, [trackId]);
    if (!result) return null;

    return {
      ...result,
      metadata: JSON.parse(result.metadata),
      cachedAt: new Date(result.cachedAt),
    };
  }

  /**
   * Clear all cached data
   */
  async clearCache(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    await this.db.runAsync("DELETE FROM lyrics_cache");
    await this.db.runAsync("DELETE FROM metadata_cache");
  }

  /**
   * Clear all user data (for account deletion)
   */
  async clearAllUserData(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    try {
      // Clear all tables
      await this.db.runAsync("DELETE FROM history");
      await this.db.runAsync("DELETE FROM scrobbles");
      await this.db.runAsync("DELETE FROM lyrics_cache");
      await this.db.runAsync("DELETE FROM metadata_cache");

      console.log("✅ All local user data cleared");
    } catch (error) {
      console.error("❌ Failed to clear local user data:", error);
      throw error;
    }
  }

  /**
   * Get database statistics
   */
  async getStats(): Promise<{
    historyCount: number;
    scrobblesCount: number;
    lyricsCacheCount: number;
    metadataCacheCount: number;
  }> {
    if (!this.db) throw new Error("Database not initialized");

    const historyResult = await this.db.getFirstAsync(
      "SELECT COUNT(*) as count FROM history"
    );
    const scrobblesResult = await this.db.getFirstAsync(
      "SELECT COUNT(*) as count FROM scrobbles"
    );
    const lyricsResult = await this.db.getFirstAsync(
      "SELECT COUNT(*) as count FROM lyrics_cache"
    );
    const metadataResult = await this.db.getFirstAsync(
      "SELECT COUNT(*) as count FROM metadata_cache"
    );

    return {
      historyCount: historyResult?.count || 0,
      scrobblesCount: scrobblesResult?.count || 0,
      lyricsCacheCount: lyricsResult?.count || 0,
      metadataCacheCount: metadataResult?.count || 0,
    };
  }
}

// Export singleton instance
export const storage = new LocalStorageService();
export default storage;
