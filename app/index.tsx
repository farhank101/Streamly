/**
 * Index Screen
 * Redirects to the onboarding screen
 */

import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/onboarding" />;
}
