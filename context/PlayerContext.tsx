/**
 * Player Context
 * Manages global audio playback state and controls
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { Track } from "../types/track";
import { audioService, AudioPlayerState } from "../services/audio";

interface PlayerContextType {
  // State
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoaded: boolean;
  position: number;
  duration: number;
  isBuffering: boolean;
  error: string | null;
  volume: number;
  audioQuality: 'low' | 'medium' | 'high';

  // Controls
  play: (track: Track) => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  seek: (position: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  setPlaybackRate: (rate: number) => Promise<void>;
  setAudioQuality: (quality: 'low' | 'medium' | 'high') => Promise<void>;

  // Utilities
  isTrackPlaying: (trackId: string) => boolean;
  cleanup: () => Promise<void>;
  retryPlayback: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

interface PlayerProviderProps {
  children: React.ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoaded: false,
    currentTrack: null,
    position: 0,
    duration: 0,
    isBuffering: false,
    error: null,
    volume: 1.0,
    audioQuality: 'medium',
  });

  // Subscribe to audio service state changes
  useEffect(() => {
    const unsubscribe = audioService.subscribe((state) => {
      setPlayerState(state);
    });

    return unsubscribe;
  }, []);

  // Play a track
  const play = async (track: Track): Promise<void> => {
    try {
      console.log("🎵 PlayerContext.play called with track:", track.title);
      await audioService.playTrack(track);
    } catch (error) {
      console.error("❌ PlayerContext.play error:", error);
      throw error;
    }
  };

  // Pause playback
  const pause = async (): Promise<void> => {
    try {
      await audioService.pause();
    } catch (error) {
      console.error("❌ PlayerContext.pause error:", error);
      throw error;
    }
  };

  // Stop playback
  const stop = async (): Promise<void> => {
    try {
      await audioService.stop();
    } catch (error) {
      console.error("❌ PlayerContext.stop error:", error);
      throw error;
    }
  };

  // Seek to position
  const seek = async (position: number): Promise<void> => {
    try {
      await audioService.seek(position);
    } catch (error) {
      console.error("❌ PlayerContext.seek error:", error);
      throw error;
    }
  };

  // Set volume
  const setVolume = async (volume: number): Promise<void> => {
    try {
      await audioService.setVolume(volume);
    } catch (error) {
      console.error("❌ PlayerContext.setVolume error:", error);
      throw error;
    }
  };

  // Set playback rate
  const setPlaybackRate = async (rate: number): Promise<void> => {
    try {
      await audioService.setPlaybackRate(rate);
    } catch (error) {
      console.error("❌ PlayerContext.setPlaybackRate error:", error);
      throw error;
    }
  };

  // Set audio quality
  const setAudioQuality = async (quality: 'low' | 'medium' | 'high'): Promise<void> => {
    try {
      await audioService.setAudioQuality(quality);
    } catch (error) {
      console.error("❌ PlayerContext.setAudioQuality error:", error);
      throw error;
    }
  };

  // Check if a specific track is playing
  const isTrackPlaying = (trackId: string): boolean => {
    return audioService.isTrackPlaying(trackId);
  };

  // Retry playback if there was an error
  const retryPlayback = async (): Promise<void> => {
    if (playerState.currentTrack && playerState.error) {
      try {
        console.log("🔄 Retrying playback...");
        await audioService.playTrack(playerState.currentTrack);
      } catch (error) {
        console.error("❌ Retry failed:", error);
        throw error;
      }
    }
  };

  const cleanup = async () => {
    await audioService.stop();
  };

  const value: PlayerContextType = {
    // State
    currentTrack: playerState.currentTrack,
    isPlaying: playerState.isPlaying,
    isLoaded: playerState.isLoaded,
    position: playerState.position,
    duration: playerState.duration,
    isBuffering: playerState.isBuffering,
    error: playerState.error,
    volume: playerState.volume,
    audioQuality: playerState.audioQuality,

    // Controls
    play,
    pause,
    stop,
    seek,
    setVolume,
    setPlaybackRate,
    setAudioQuality,

    // Utilities
    isTrackPlaying,
    cleanup,
    retryPlayback,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
