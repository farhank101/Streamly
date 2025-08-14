/**
 * Root Layout
 * Main app layout with authentication and navigation setup
 */

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { PlayerProvider } from "../context/PlayerContext";
import { useFonts } from "../hooks/useFonts";
import { storage } from "../services/storage";
import { COLORS, SPACING, FONTS } from "../constants/theme";

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
    </Stack>
  );
}

// Main layout component with auth logic
function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { fontsLoaded } = useFonts();
  const [storageInitialized, setStorageInitialized] = React.useState(false);

  // Initialize storage
  React.useEffect(() => {
    const initStorage = async () => {
      try {
        await storage.init();
        setStorageInitialized(true);
      } catch (error) {
        console.error("Failed to initialize storage:", error);
        // Continue without storage for now
        setStorageInitialized(true);
      }
    };
    initStorage();
  }, []);

  // Show loading component while fonts are loading, auth is checking, or storage is initializing
  if (!fontsLoaded || isLoading || !storageInitialized) {
    return <LoadingComponent />;
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
    <AuthProvider>
      <PlayerProvider>
        <StatusBar style="light" />
        <AppLayout />
      </PlayerProvider>
    </AuthProvider>
  );
}
