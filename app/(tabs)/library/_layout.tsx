/**
 * Library Layout
 * Handles nested routes within the library tab
 */

import { Stack } from "expo-router";
import { COLORS } from "../../../constants/theme";

export default function LibraryLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontFamily: "InterBold",
        },
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Library",
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          title: "Listening History",
        }}
      />
      <Stack.Screen
        name="liked"
        options={{
          title: "Liked Songs",
        }}
      />
      <Stack.Screen
        name="playlists"
        options={{
          title: "Playlists",
        }}
      />
    </Stack>
  );
}
