/**
 * Root Layout
 * Main app layout with authentication and navigation setup
 */

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { PlayerProvider } from "../context/PlayerContext";
import { useFonts } from "../hooks/useFonts";
import storage from "../services/storage.platform";
import { COLORS, SPACING, FONTS, SIZES } from "../constants/theme";
import ErrorBoundary from "../components/ErrorBoundary";

// Loading component
function LoadingComponent() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primaryAccent} />
      <Text
        style={{
          color: COLORS.textSecondary,
          marginTop: SPACING.md,
          fontFamily: FONTS.family.interMedium,
          fontSize: 16,
        }}
      >
        Loading...
      </Text>
    </View>
  );
}

// Auth layout component
function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/register" />
      <Stack.Screen name="(auth)/forgot-password" />
    </Stack>
  );
}

// Main app layout component
function MainAppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="category/[id]" />
      <Stack.Screen name="mood/[id]" />
      <Stack.Screen name="playlist/[id]" />
      <Stack.Screen name="playlist/edit/[id]" />
      <Stack.Screen name="track/[id]" />
      <Stack.Screen name="user/[id]" />
      <Stack.Screen name="user/[id]/followers" />
      <Stack.Screen name="user/[id]/following" />
      <Stack.Screen name="profile/edit" />
      <Stack.Screen name="profile/following" />
      <Stack.Screen name="search" />
      <Stack.Screen name="search-results" />
      <Stack.Screen name="now-playing" />
      <Stack.Screen name="create-playlist" />
      <Stack.Screen name="subscription-plans" />
      <Stack.Screen name="audio-test" />
    </Stack>
  );
}

// Main layout component with auth logic
function AppLayout() {
  const { isAuthenticated, isLoading, error, refreshSession } = useAuth();
  const { fontsLoaded } = useFonts();
  const [storageInitialized, setStorageInitialized] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);

  // Initialize storage
  React.useEffect(() => {
    const initStorage = async () => {
      try {
        await storage.init();
        setStorageInitialized(true);
      } catch (error) {
        console.error("Failed to initialize storage:", error);
        setStorageInitialized(true);
      }
    };
    initStorage();
  }, []);

  // Handle auth errors and retry
  React.useEffect(() => {
    if (error && retryCount < 3) {
      console.log(`Auth error detected, retrying... (${retryCount + 1}/3)`);
      const timer = setTimeout(async () => {
        try {
          await refreshSession();
          setRetryCount((prev) => prev + 1);
        } catch (retryError) {
          console.error("Retry failed:", retryError);
        }
      }, 2000 * (retryCount + 1)); // Exponential backoff

      return () => clearTimeout(timer);
    }
  }, [error, retryCount, refreshSession]);

  // Show loading component while fonts are loading, auth is checking, or storage is initializing
  if (!fontsLoaded || isLoading || !storageInitialized) {
    return <LoadingComponent />;
  }

  // Show error state if we've exhausted retries
  if (error && retryCount >= 3) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          justifyContent: "center",
          alignItems: "center",
          padding: SPACING.lg,
        }}
      >
        <Text
          style={{
            color: COLORS.error,
            fontFamily: FONTS.family.interBold,
            fontSize: 18,
            textAlign: "center",
            marginBottom: SPACING.md,
          }}
        >
          Authentication Error
        </Text>
        <Text
          style={{
            color: COLORS.textSecondary,
            fontFamily: FONTS.family.interMedium,
            fontSize: 14,
            textAlign: "center",
            marginBottom: SPACING.lg,
          }}
        >
          {error}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primaryAccent,
            paddingHorizontal: SPACING.lg,
            paddingVertical: SPACING.md,
            borderRadius: SIZES.borderRadius,
          }}
          onPress={() => {
            setRetryCount(0);
            refreshSession();
          }}
        >
          <Text
            style={{
              color: COLORS.textPrimary,
              fontFamily: FONTS.family.interBold,
              fontSize: 16,
            }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    return <AuthLayout />;
  }

  // Show main app if authenticated
  return <MainAppLayout />;
}

// Root component with providers
export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <PlayerProvider>
          <StatusBar style="light" hidden={true} />
          <AppLayout />
        </PlayerProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
