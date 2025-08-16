/**
 * Enhanced Audio Service
 * Handles audio playback using Expo AV with actual YouTube audio streaming
 */

import { Audio } from "expo-av";
import { Track } from "../types/track";
import { getYouTubeStreamUrl } from "./youtube";

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
  audioQuality: "low" | "medium" | "high";
}

// Audio controls
export interface AudioControls {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  seek: (position: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  setAudioQuality: (quality: "low" | "medium" | "high") => void;
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
    audioQuality: "medium",
  };

  private listeners: ((state: AudioPlayerState) => void)[] = [];
  private isLoading: boolean = false;
  private retryCount: number = 0;
  private maxRetries: number = 3;

  constructor() {
    this.initializePlayer();
  }

  private async initializePlayer() {
    try {
      console.log("🔧 Initializing enhanced audio service...");

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
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });

      console.log("✅ Enhanced audio service initialized successfully");
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

  // Enhanced stream URL resolution using the YouTube service
  private async getStreamUrl(track: Track): Promise<string> {
    if (track.sourceType === "youtube") {
      try {
        console.log("🎵 Getting YouTube stream URL for:", track.sourceId);

        // Get audio stream with current quality setting
        const streamUrl = await getYouTubeStreamUrl(
          track.sourceId,
          this.state.audioQuality
        );

        if (streamUrl) {
          console.log(
            "✅ Audio stream extracted successfully:",
            streamUrl.substring(0, 100) + "..."
          );
          return streamUrl;
        } else {
          throw new Error("No stream URL returned from YouTube service");
        }
      } catch (error) {
        console.warn("⚠️ Enhanced audio extraction failed:", error);

        // Fallback: Try basic extraction methods
        try {
          const fallbackUrl = await this.getBasicFallback(track.sourceId);
          if (fallbackUrl) {
            console.log("✅ Basic fallback stream found");
            return fallbackUrl;
          }
        } catch (fallbackError) {
          console.warn("⚠️ Basic fallback also failed:", fallbackError);
        }
      }

      // Final fallback: Use a direct approach
      const directUrl = this.getDirectFallback(track.sourceId);
      console.log("🔄 Using direct fallback");
      return directUrl;
    }

    throw new Error(`Unsupported source type: ${track.sourceType}`);
  }

  // Basic fallback method for audio extraction
  private async getBasicFallback(videoId: string): Promise<string | null> {
    try {
      // Method 1: Try using a public YouTube audio extraction API
      const response = await fetch(
        `https://api.vevioz.com/@api/json/mp3/${videoId}`
      );
      const data = await response.json();

      if (data && data.url) {
        return data.url;
      }
    } catch (error) {
      console.log("Method 1 failed, trying method 2...");
    }

    try {
      // Method 2: Try another public service
      const response = await fetch(
        `https://loader.to/api/button/?url=https://www.youtube.com/watch?v=${videoId}&f=mp3`
      );
      const html = await response.text();

      // Extract download URL from response
      const match = html.match(/href="([^"]*\.mp3[^"]*)"/);
      if (match && match[1]) {
        return match[1];
      }
    } catch (error) {
      console.log("Method 2 failed, trying method 3...");
    }

    try {
      // Method 3: Try using y2mate-like service
      const response = await fetch(`https://www.y2mate.com/youtube/${videoId}`);
      const html = await response.text();

      // Look for audio download links
      const audioMatch = html.match(
        /href="([^"]*\.mp3[^"]*)"[^>]*>.*?Audio.*?<\/a>/i
      );
      if (audioMatch && audioMatch[1]) {
        return audioMatch[1];
      }
    } catch (error) {
      console.log("Method 3 failed");
    }

    return null;
  }

  // Direct fallback method
  private getDirectFallback(videoId: string): string {
    // Use a direct approach that might work for some videos
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  // Play a track with enhanced error handling and retries
  async playTrack(track: Track): Promise<void> {
    try {
      console.log("🎵 Playing track:", track.title);

      // Reset loading state if it's stuck
      if (this.isLoading) {
        console.log("🔄 Resetting stuck loading state...");
        this.isLoading = false;
      }

      this.isLoading = true;
      this.state.isBuffering = true;
      this.state.error = null;
      this.retryCount = 0;
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

      // Get streaming URL with retries
      let streamUrl: string;
      while (this.retryCount < this.maxRetries) {
        try {
          streamUrl = await this.getStreamUrl(track);
          break;
        } catch (error) {
          this.retryCount++;
          console.warn(
            `⚠️ Stream URL attempt ${this.retryCount} failed:`,
            error
          );

          if (this.retryCount >= this.maxRetries) {
            throw new Error(
              "Failed to get audio stream after multiple attempts"
            );
          }

          // Wait before retry
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * this.retryCount)
          );
        }
      }

      if (!streamUrl) {
        throw new Error("No stream URL obtained");
      }

      console.log("🔗 Stream URL:", streamUrl);

      // Create new sound object
      this.sound = new Audio.Sound();

      // Set up status update listener
      this.sound.setOnPlaybackStatusUpdate(this.handleStatusUpdate.bind(this));

      // Load the audio source with timeout
      const loadPromise = this.sound.loadAsync({ uri: streamUrl });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Audio loading timeout")), 30000)
      );

      await Promise.race([loadPromise, timeoutPromise]);

      // Start playing
      await this.sound.playAsync();

      this.state.isPlaying = true;
      this.state.isBuffering = false;
      this.notifyListeners();

      console.log(`✅ Now playing: ${track.title} by ${track.artist}`);
    } catch (error) {
      console.error("❌ Failed to play track:", error);
      this.state.error = `Failed to play track: ${error.message}`;
      this.state.isBuffering = false;
      this.state.isPlaying = false;
      this.notifyListeners();
      throw error;
    } finally {
      this.isLoading = false;
      this.notifyListeners();
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

  // Set audio quality
  async setAudioQuality(quality: "low" | "medium" | "high"): Promise<void> {
    this.state.audioQuality = quality;
    console.log(`🎵 Audio quality set to: ${quality}`);
    this.notifyListeners();

    // If a track is currently playing, reload with new quality
    if (this.currentTrack && this.sound) {
      try {
        await this.playTrack(this.currentTrack);
      } catch (error) {
        console.error("❌ Failed to reload track with new quality:", error);
      }
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
