/**
 * Player Context
 * Manages music playback state and controls throughout the app
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Track } from "../types/track";
import { audioService, AudioState } from "../services/audio";

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  duration: number;
  position: number;
  volume: number;
  isLoading: boolean;
  error: string | null;
  isBuffering: boolean;
  rate: number;
  isLooping: boolean;
}

interface PlayerContextType extends PlayerState {
  play: (track?: Track) => Promise<void>;
  pause: () => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
  seek: (position: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  setRate: (rate: number) => Promise<void>;
  setLooping: (looping: boolean) => Promise<void>;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  loadTrack: (track: Track) => Promise<void>;
}

// Create the context with default values
const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  duration: 0,
  position: 0,
  volume: 1,
  isLoading: false,
  error: null,
  isBuffering: false,
  rate: 1,
  isLooping: false,
  play: async () => {},
  pause: async () => {},
  next: async () => {},
  previous: async () => {},
  seek: async () => {},
  setVolume: async () => {},
  setRate: async () => {},
  setLooping: async () => {},
  addToQueue: () => {},
  removeFromQueue: () => {},
  clearQueue: () => {},
  loadTrack: async () => {},
});

// Custom hook to use the player context
export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    queue: [],
    isPlaying: false,
    duration: 0,
    position: 0,
    volume: 1,
    isLoading: false,
    error: null,
    isBuffering: false,
    rate: 1,
    isLooping: false,
  });

  // Subscribe to audio service updates
  useEffect(() => {
    const handleAudioUpdate = (audioState: AudioState) => {
      setState(prev => ({
        ...prev,
        isPlaying: audioState.isPlaying,
        duration: audioState.duration,
        position: audioState.position,
        volume: audioState.volume,
        isLoading: !audioState.isLoaded,
        error: audioState.error,
        isBuffering: audioState.isBuffering,
        rate: audioState.rate,
        isLooping: audioState.isLooping,
      }));
    };

    // Subscribe to audio service updates
    audioService.addListener(handleAudioUpdate);

    // Cleanup on unmount
    return () => {
      audioService.removeListener(handleAudioUpdate);
    };
  }, []);

  // Update current track when audio service track changes
  useEffect(() => {
    const currentTrack = audioService.getCurrentTrack();
    if (currentTrack !== state.currentTrack) {
      setState(prev => ({ ...prev, currentTrack }));
    }
  }, [state.currentTrack]);

  // Load and play a track
  const loadTrack = async (track: Track) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await audioService.loadTrack(track);
      setState(prev => ({ ...prev, currentTrack: track, isLoading: false }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to load track' 
      }));
    }
  };

  // Play function
  const play = async (track?: Track) => {
    try {
      if (track) {
        // Load and play a new track
        await loadTrack(track);
        await audioService.play();
      } else if (state.currentTrack) {
        // Resume current track
        await audioService.play();
      }
    } catch (error) {
      console.error('Play error:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to play track' 
      }));
    }
  };

  // Pause function
  const pause = async () => {
    try {
      await audioService.pause();
    } catch (error) {
      console.error('Pause error:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to pause track' 
      }));
    }
  };

  // Next track function
  const next = async () => {
    try {
      if (state.queue.length > 0) {
        const nextTrack = state.queue[0];
        const newQueue = state.queue.slice(1);
        setState(prev => ({
          ...prev,
          queue: newQueue,
        }));
        await loadTrack(nextTrack);
        await audioService.play();
      } else {
        // No more tracks in queue
        await audioService.stop();
        setState(prev => ({
          ...prev,
          isPlaying: false,
          position: 0,
        }));
      }
    } catch (error) {
      console.error('Next track error:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to play next track' 
      }));
    }
  };

  // Previous track function
  const previous = async () => {
    try {
      if (state.position > 3) {
        // If more than 3 seconds into the song, restart it
        await audioService.seek(0);
      } else {
        // Otherwise, we would go to the previous track in history
        // For now, just restart the current track
        await audioService.seek(0);
      }
    } catch (error) {
      console.error('Previous track error:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to seek track' 
      }));
    }
  };

  // Seek function
  const seek = async (position: number) => {
    try {
      await audioService.seek(position);
    } catch (error) {
      console.error('Seek error:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to seek track' 
      }));
    }
  };

  // Set volume function
  const setVolume = async (volume: number) => {
    try {
      await audioService.setVolume(volume);
    } catch (error) {
      console.error('Volume error:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to set volume' 
      }));
    }
  };

  // Set playback rate function
  const setRate = async (rate: number) => {
    try {
      await audioService.setRate(rate);
    } catch (error) {
      console.error('Rate error:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to set playback rate' 
      }));
    }
  };

  // Set looping function
  const setLooping = async (looping: boolean) => {
    try {
      await audioService.setLooping(looping);
    } catch (error) {
      console.error('Looping error:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to set looping' 
      }));
    }
  };

  // Add to queue function
  const addToQueue = (track: Track) => {
    setState((prev) => ({
      ...prev,
      queue: [...prev.queue, track],
    }));
  };

  // Remove from queue function
  const removeFromQueue = (index: number) => {
    setState((prev) => ({
      ...prev,
      queue: prev.queue.filter((_, i) => i !== index),
    }));
  };

  // Clear queue function
  const clearQueue = () => {
    setState((prev) => ({
      ...prev,
      queue: [],
    }));
  };

  const value = {
    ...state,
    play,
    pause,
    next,
    previous,
    seek,
    setVolume,
    setRate,
    setLooping,
    addToQueue,
    removeFromQueue,
    clearQueue,
    loadTrack,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContext;
