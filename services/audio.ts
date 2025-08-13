/**
 * Audio Service
 * Handles all audio playback functionality using Expo AV
 */

import { Audio } from "expo-av";
import { Track } from "../types/track";
import { config } from "../config/environment";

export interface AudioState {
  isPlaying: boolean;
  isLoaded: boolean;
  duration: number;
  position: number;
  volume: number;
  rate: number;
  isLooping: boolean;
  shouldPlay: boolean;
  isBuffering: boolean;
  error: string | null;
}

export interface AudioControls {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
  seek: (position: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  setRate: (rate: number) => Promise<void>;
  setLooping: (looping: boolean) => Promise<void>;
}

class AudioService {
  private sound: Audio.Sound | null = null;
  private currentTrack: Track | null = null;
  private statusUpdateInterval: NodeJS.Timeout | null = null;
  private listeners: Set<(state: AudioState) => void> = new Set();

  private state: AudioState = {
    isPlaying: false,
    isLoaded: false,
    duration: 0,
    position: 0,
    volume: 1.0,
    rate: 1.0,
    isLooping: false,
    shouldPlay: false,
    isBuffering: false,
    error: null,
  };

  constructor() {
    this.initializeAudio();
  }

  private async initializeAudio() {
    try {
      // Request audio permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Audio permission not granted");
      }

      // Set audio mode for background playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Create sound object
      this.sound = new Audio.Sound();

      // Set up status update listener
      this.sound.setOnPlaybackStatusUpdate(this.handleStatusUpdate.bind(this));

      console.log("✅ Audio service initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize audio service:", error);
      this.state.error =
        error instanceof Error ? error.message : "Unknown error";
      this.notifyListeners();
    }
  }

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
      this.state.rate = status.rate || 1.0;
      this.state.isLooping = status.isLooping || false;
      this.state.shouldPlay = status.shouldPlay || false;
      this.state.isBuffering = status.isBuffering || false;
    }

    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public addListener(listener: (state: AudioState) => void) {
    this.listeners.add(listener);
    // Immediately notify with current state
    listener({ ...this.state });
  }

  public removeListener(listener: (state: AudioState) => void) {
    this.listeners.delete(listener);
  }

  public async loadTrack(track: Track): Promise<void> {
    try {
      if (!this.sound) {
        throw new Error("Audio service not initialized");
      }

      this.currentTrack = track;
      this.state.error = null;

      // Get streaming URL based on track source
      const streamUrl = await this.getStreamUrl(track);

      // Load the audio source
      await this.sound.loadAsync({ uri: streamUrl });

      console.log(`✅ Loaded track: ${track.title}`);
    } catch (error) {
      console.error("❌ Failed to load track:", error);
      this.state.error =
        error instanceof Error ? error.message : "Unknown error";
      this.notifyListeners();
      throw error;
    }
  }

  private async getStreamUrl(track: Track): Promise<string> {
    // This is a placeholder - in a real implementation, you would:
    // 1. For YouTube: Use a service like youtube-dl or similar to get direct stream URLs
    // 2. For Audius: Use their streaming endpoints

    if (track.sourceType === "youtube") {
      // For development, return a placeholder
      // In production, you'd need to implement YouTube stream URL extraction
      return `https://example.com/youtube/${track.sourceId}`;
    } else if (track.sourceType === "audius") {
      // Audius streaming URL format
      return `https://discoveryprovider.audius.co/v1/tracks/${track.sourceId}/stream`;
    }

    throw new Error(`Unsupported track source: ${track.sourceType}`);
  }

  public async play(): Promise<void> {
    try {
      if (!this.sound || !this.state.isLoaded) {
        throw new Error("No track loaded");
      }

      await this.sound.playAsync();
      console.log("▶️ Playback started");
    } catch (error) {
      console.error("❌ Failed to start playback:", error);
      this.state.error =
        error instanceof Error ? error.message : "Unknown error";
      this.notifyListeners();
      throw error;
    }
  }

  public async pause(): Promise<void> {
    try {
      if (!this.sound || !this.state.isLoaded) {
        return;
      }

      await this.sound.pauseAsync();
      console.log("⏸️ Playback paused");
    } catch (error) {
      console.error("❌ Failed to pause playback:", error);
      this.state.error =
        error instanceof Error ? error.message : "Unknown error";
      this.notifyListeners();
      throw error;
    }
  }

  public async stop(): Promise<void> {
    try {
      if (!this.sound || !this.state.isLoaded) {
        return;
      }

      await this.sound.stopAsync();
      await this.sound.setPositionAsync(0);
      console.log("⏹️ Playback stopped");
    } catch (error) {
      console.error("❌ Failed to stop playback:", error);
      this.state.error =
        error instanceof Error ? error.message : "Unknown error";
      this.notifyListeners();
      throw error;
    }
  }

  public async seek(position: number): Promise<void> {
    try {
      if (!this.sound || !this.state.isLoaded) {
        return;
      }

      const positionMillis = position * 1000;
      await this.sound.setPositionAsync(positionMillis);
      console.log(`🔍 Seeked to position: ${position}s`);
    } catch (error) {
      console.error("❌ Failed to seek:", error);
      this.state.error =
        error instanceof Error ? error.message : "Unknown error";
      this.notifyListeners();
      throw error;
    }
  }

  public async setVolume(volume: number): Promise<void> {
    try {
      if (!this.sound) {
        return;
      }

      const clampedVolume = Math.max(0, Math.min(1, volume));
      await this.sound.setVolumeAsync(clampedVolume);
      this.state.volume = clampedVolume;
      console.log(`🔊 Volume set to: ${clampedVolume}`);
    } catch (error) {
      console.error("❌ Failed to set volume:", error);
      this.state.error =
        error instanceof Error ? error.message : "Unknown error";
      this.notifyListeners();
      throw error;
    }
  }

  public async setRate(rate: number): Promise<void> {
    try {
      if (!this.sound || !this.state.isLoaded) {
        return;
      }

      const clampedRate = Math.max(0.5, Math.min(2, rate));
      await this.sound.setRateAsync(clampedRate, true);
      this.state.rate = clampedRate;
      console.log(`⚡ Playback rate set to: ${clampedRate}x`);
    } catch (error) {
      console.error("❌ Failed to set playback rate:", error);
      this.state.error =
        error instanceof Error ? error.message : "Unknown error";
      this.notifyListeners();
      throw error;
    }
  }

  public async setLooping(looping: boolean): Promise<void> {
    try {
      if (!this.sound || !this.state.isLoaded) {
        return;
      }

      await this.sound.setIsLoopingAsync(looping);
      this.state.isLooping = looping;
      console.log(`🔁 Looping ${looping ? "enabled" : "disabled"}`);
    } catch (error) {
      console.error("❌ Failed to set looping:", error);
      this.state.error =
        error instanceof Error ? error.message : "Unknown error";
      this.notifyListeners();
      throw error;
    }
  }

  public getCurrentTrack(): Track | null {
    return this.currentTrack;
  }

  public getState(): AudioState {
    return { ...this.state };
  }

  public async cleanup(): Promise<void> {
    try {
      if (this.statusUpdateInterval) {
        clearInterval(this.statusUpdateInterval);
        this.statusUpdateInterval = null;
      }

      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }

      this.listeners.clear();
      console.log("🧹 Audio service cleaned up");
    } catch (error) {
      console.error("❌ Failed to cleanup audio service:", error);
    }
  }
}

// Export singleton instance
export const audioService = new AudioService();

// Export default
export default audioService;
