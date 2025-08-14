/**
 * Profile Layout
 * Handles nested routes within the profile tab
 */

import { Stack } from "expo-router";
import { COLORS } from "../../../constants/theme";

export default function ProfileLayout() {
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
          title: "Profile",
        }}
      />
    </Stack>
  );
}
