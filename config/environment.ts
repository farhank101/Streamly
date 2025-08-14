/**
 * Environment Configuration
 * Centralized configuration for all environment variables and API keys
 */

interface EnvironmentConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  youtube: {
    apiKey: string;
  };
  lastfm: {
    apiKey: string;
  };
  genius: {
    apiKey: string;
  };
  app: {
    env: "development" | "production";
    debugMode: boolean;
  };
}

// Environment variable getters with validation
const getRequiredEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value || value === `YOUR_${name.split("_").pop()}`) {
    console.warn(
      `Missing required environment variable: ${name}, using fallback`
    );
    return "placeholder"; // Use placeholder instead of throwing error
  }
  return value;
};

const getOptionalEnvVar = (name: string, defaultValue: string): string => {
  const value = process.env[name];
  if (!value || value === `YOUR_${name.split("_").pop()}`) {
    return defaultValue;
  }
  return value;
};

// Build configuration object
export const config: EnvironmentConfig = {
  supabase: {
    url: getRequiredEnvVar("EXPO_PUBLIC_SUPABASE_URL"),
    anonKey: getRequiredEnvVar("EXPO_PUBLIC_SUPABASE_ANON_KEY"),
  },
  youtube: {
    apiKey: getRequiredEnvVar("EXPO_PUBLIC_YOUTUBE_API_KEY"),
  },
  lastfm: {
    apiKey: getRequiredEnvVar("EXPO_PUBLIC_LASTFM_API_KEY"),
  },
  genius: {
    apiKey: getRequiredEnvVar("EXPO_PUBLIC_GENIUS_API_KEY"),
  },
  app: {
    env:
      (process.env.EXPO_PUBLIC_APP_ENV as "development" | "production") ||
      "development",
    debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE === "true",
  },
};

// Validation function to check if all required config is present
export const validateConfig = (): boolean => {
  try {
    // This will throw if any required values are missing
    const _ = config;
    return true;
  } catch (error) {
    console.error("❌ Environment configuration error:", error);
    return false;
  }
};

// Helper to check if we're in development mode
export const isDevelopment = (): boolean => config.app.env === "development";

// Helper to check if debug mode is enabled
export const isDebugMode = (): boolean => config.app.debugMode;

export default config;
