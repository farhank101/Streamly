/**
 * Audio Service
 * Handles audio playback using Expo AV
 */

import { Audio } from "expo-av";
import { Track } from "../types/track";

// Audio player state
export interface AudioPlayerState {
  isPlaying: boolean;
  isLoaded: boolean;
  currentTrack: Track | null;
  position: number; // Current position in seconds
  duration: number; // Total duration in seconds
  isBuffering: boolean;
  error: string | null;
  volume: number;
}

// Audio controls
export interface AudioControls {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  seek: (position: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
}

// Audio service class
class AudioService {
  private sound: Audio.Sound | null = null;
  private currentTrack: Track | null = null;
  private state: AudioPlayerState = {
    isPlaying: false,
    isLoaded: false,
    currentTrack: null,
    position: 0,
    duration: 0,
    isBuffering: false,
    error: null,
    volume: 1.0,
  };

  private listeners: ((state: AudioPlayerState) => void)[] = [];
  private isLoading: boolean = false;

  constructor() {
    this.initializePlayer();
  }

  private async initializePlayer() {
    try {
      console.log("🔧 Initializing audio service...");

      // Request audio permissions
      const { status } = await Audio.requestPermissionsAsync();
      console.log("📱 Audio permission status:", status);

      if (status !== "granted") {
        console.warn("⚠️ Audio permission not granted, but continuing...");
      }

      // Set audio mode for background playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      console.log("✅ Audio service initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize audio service:", error);
      this.state.error = "Failed to initialize audio player";
      this.notifyListeners();
    }
  }

  // Get current state
  getState(): AudioPlayerState {
    return { ...this.state };
  }

  // Subscribe to state changes
  subscribe(listener: (state: AudioPlayerState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of state changes
  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.getState()));
  }

  // Play a track
  async playTrack(track: Track): Promise<void> {
    try {
      console.log("🎵 Playing track:", track.title);

      // Prevent concurrent loading
      if (this.isLoading) {
        console.log("⏳ Already loading, skipping...");
        return;
      }

      this.isLoading = true;
      this.state.isBuffering = true;
      this.state.error = null;
      this.notifyListeners();

      // Unload current track if different
      if (this.currentTrack && this.currentTrack.id !== track.id) {
        if (this.sound) {
          await this.sound.unloadAsync();
          this.sound = null;
        }
      }

      this.currentTrack = track;
      this.state.currentTrack = track;

      // Get streaming URL - for now, use a simple approach
      const streamUrl = this.getStreamUrl(track);
      console.log("🔗 Stream URL:", streamUrl);

      // Create new sound object
      this.sound = new Audio.Sound();

      // Set up status update listener
      this.sound.setOnPlaybackStatusUpdate(this.handleStatusUpdate.bind(this));

      // Load the audio source
      await this.sound.loadAsync({ uri: streamUrl });

      // Start playing
      await this.sound.playAsync();

      this.state.isPlaying = true;
      this.state.isBuffering = false;
      this.notifyListeners();

      console.log(`✅ Now playing: ${track.title} by ${track.artist}`);
    } catch (error) {
      console.error("❌ Failed to play track:", error);
      this.state.error = "Failed to play track";
      this.state.isBuffering = false;
      this.notifyListeners();
    } finally {
      this.isLoading = false;
    }
  }

  // Handle playback status updates
  private handleStatusUpdate(status: any) {
    if (!status.isLoaded) {
      this.state.isLoaded = false;
      this.state.isPlaying = false;
      this.state.duration = 0;
      this.state.position = 0;
      this.state.isBuffering = false;
    } else {
      this.state.isLoaded = true;
      this.state.isPlaying = status.isPlaying;
      this.state.duration = status.durationMillis
        ? status.durationMillis / 1000
        : 0;
      this.state.position = status.positionMillis
        ? status.positionMillis / 1000
        : 0;
      this.state.volume = status.volume || 1.0;
      this.state.isBuffering = status.isBuffering || false;
    }

    this.notifyListeners();
  }

  // Get streaming URL for a track
  private getStreamUrl(track: Track): string {
    if (track.sourceType === "youtube") {
      // For now, use a simple approach with direct YouTube URLs
      // In a real app, you'd use a service to extract audio streams
      return `https://www.youtube.com/watch?v=${track.sourceId}`;
    } else {
      throw new Error(`Unsupported source type: ${track.sourceType}`);
    }
  }

  // Play current track
  async play(): Promise<void> {
    if (!this.sound) {
      throw new Error("No track loaded");
    }

    try {
      await this.sound.playAsync();
      console.log("▶️ Playback started");
    } catch (error) {
      console.error("❌ Failed to start playback:", error);
      this.state.error = "Failed to start playback";
      this.notifyListeners();
    }
  }

  // Pause current track
  async pause(): Promise<void> {
    if (!this.sound) {
      return;
    }

    try {
      await this.sound.pauseAsync();
      console.log("⏸️ Playback paused");
    } catch (error) {
      console.error("❌ Failed to pause playback:", error);
    }
  }

  // Stop current track
  async stop(): Promise<void> {
    if (!this.sound) {
      return;
    }

    try {
      await this.sound.stopAsync();
      await this.sound.setPositionAsync(0);
      console.log("⏹️ Playback stopped");
    } catch (error) {
      console.error("❌ Failed to stop playback:", error);
    }
  }

  // Seek to position
  async seek(position: number): Promise<void> {
    if (!this.sound) {
      return;
    }

    try {
      const positionMillis = position * 1000;
      await this.sound.setPositionAsync(positionMillis);
      console.log(`🔍 Seeked to position: ${position}s`);
    } catch (error) {
      console.error("❌ Failed to seek:", error);
    }
  }

  // Set volume (0.0 to 1.0)
  async setVolume(volume: number): Promise<void> {
    if (!this.sound) {
      return;
    }

    try {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      await this.sound.setVolumeAsync(clampedVolume);
      this.state.volume = clampedVolume;
      console.log(`🔊 Volume set to: ${clampedVolume}`);
    } catch (error) {
      console.error("❌ Failed to set volume:", error);
    }
  }

  // Set playback rate
  async setPlaybackRate(rate: number): Promise<void> {
    if (!this.sound) {
      return;
    }

    try {
      const clampedRate = Math.max(0.5, Math.min(2, rate));
      await this.sound.setRateAsync(clampedRate, true);
      console.log(`⚡ Playback rate set to: ${clampedRate}x`);
    } catch (error) {
      console.error("❌ Failed to set playback rate:", error);
    }
  }

  // Get current track
  getCurrentTrack(): Track | null {
    return this.currentTrack;
  }

  // Check if a track is currently playing
  isTrackPlaying(trackId: string): boolean {
    return this.state.isPlaying && this.currentTrack?.id === trackId;
  }

  // Cleanup
  async destroy(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }
      this.listeners = [];
      console.log("🧹 Audio service destroyed");
    } catch (error) {
      console.error("❌ Failed to cleanup audio service:", error);
    }
  }
}

// Export singleton instance
export const audioService = new AudioService();

// Export types
export type { AudioPlayerState, AudioControls };
