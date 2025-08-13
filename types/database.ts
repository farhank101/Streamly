/**
 * Database Types
 * Type definitions for Supabase database schema
 */

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          username: string | null;
          avatar_url: string | null;
          premium_status: boolean;
          preferences: Record<string, any>;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
          username?: string | null;
          avatar_url?: string | null;
          premium_status?: boolean;
          preferences?: Record<string, any>;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
          username?: string | null;
          avatar_url?: string | null;
          premium_status?: boolean;
          preferences?: Record<string, any>;
        };
      };
      playlists: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          cover_image_url: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
          play_count: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          cover_image_url?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
          play_count?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          cover_image_url?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
          play_count?: number;
        };
      };
      tracks: {
        Row: {
          id: string;
          source_id: string;
          source_type: string;
          title: string;
          artist: string | null;
          album: string | null;
          duration: number | null;
          thumbnail_url: string | null;
          created_at: string;
          play_count: number;
        };
        Insert: {
          id?: string;
          source_id: string;
          source_type: string;
          title: string;
          artist?: string | null;
          album?: string | null;
          duration?: number | null;
          thumbnail_url?: string | null;
          created_at?: string;
          play_count?: number;
        };
        Update: {
          id?: string;
          source_id?: string;
          source_type?: string;
          title?: string;
          artist?: string | null;
          album?: string | null;
          duration?: number | null;
          thumbnail_url?: string | null;
          created_at?: string;
          play_count?: number;
        };
      };
      playlist_tracks: {
        Row: {
          id: string;
          playlist_id: string;
          track_id: string;
          position: number;
          added_at: string;
        };
        Insert: {
          id?: string;
          playlist_id: string;
          track_id: string;
          position: number;
          added_at?: string;
        };
        Update: {
          id?: string;
          playlist_id?: string;
          track_id?: string;
          position?: number;
          added_at?: string;
        };
      };
      liked_tracks: {
        Row: {
          id: string;
          user_id: string;
          track_id: string;
          liked_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          track_id: string;
          liked_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          track_id?: string;
          liked_at?: string;
        };
      };
      listen_history: {
        Row: {
          id: string;
          user_id: string;
          track_id: string;
          listened_at: string;
          completed: boolean;
          listen_duration: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          track_id: string;
          listened_at?: string;
          completed?: boolean;
          listen_duration?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          track_id?: string;
          listened_at?: string;
          completed?: boolean;
          listen_duration?: number | null;
        };
      };
      user_follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          follower_id?: string;
          following_id?: string;
          created_at?: string;
        };
      };
    };
  };
}