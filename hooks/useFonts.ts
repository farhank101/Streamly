/**
 * Custom Hook for Font Loading
 * Manages the loading of Oswald and Inter fonts with individual font files
 */

import { useState, useEffect } from "react";
import * as Font from "expo-font";

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<string | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontMap = {
          InterRegular: require("../assets/fonts/Inter_18pt-Regular.ttf"),
          InterMedium: require("../assets/fonts/Inter_18pt-Medium.ttf"),
          InterSemiBold: require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
          InterBold: require("../assets/fonts/Inter_18pt-Bold.ttf"),
          OswaldRegular: require("../assets/fonts/Oswald-Regular.ttf"),
          OswaldBold: require("../assets/fonts/Oswald-Bold.ttf"),
        };

        await Font.loadAsync(fontMap);
        setFontsLoaded(true);
      } catch (error) {
        console.error("❌ Error loading fonts:", error);
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []);

  return { fontsLoaded, fontError };
};

export default useFonts;
