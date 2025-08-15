/**
 * Index Screen
 * Redirects based on authentication state
 */

import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();

  // If authenticated, go to main app, otherwise to onboarding
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/onboarding" />;
  }
}
