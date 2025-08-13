/**
 * User Types
 * Type definitions for user-related data
 */

export interface User {
  id: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  premiumStatus: boolean;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  audioQuality?: 'auto' | 'low' | 'medium' | 'high';
  favoriteGenres?: string[];
  favoriteArtists?: string[];
  notificationsEnabled?: boolean;
}

export interface Playlist {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  playCount: number;
  tracks?: PlaylistTrackInfo[];
}

export interface PlaylistTrackInfo {
  id: string;
  playlistId: string;
  trackId: string;
  position: number;
  addedAt: Date;
}

export interface UserFollow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

// Auth related types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  emailOrUsername: string; // Can be either email or username
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  dateOfBirth?: string; // Optional date of birth
}