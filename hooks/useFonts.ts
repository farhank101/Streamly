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
          // Inter font variants - 18pt
          InterThin: require("../assets/fonts/Inter_18pt-Thin.ttf"),
          InterExtraLight: require("../assets/fonts/Inter_18pt-ExtraLight.ttf"),
          InterLight: require("../assets/fonts/Inter_18pt-Light.ttf"),
          InterRegular: require("../assets/fonts/Inter_18pt-Regular.ttf"),
          InterMedium: require("../assets/fonts/Inter_18pt-Medium.ttf"),
          InterSemiBold: require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
          InterBold: require("../assets/fonts/Inter_18pt-Bold.ttf"),
          InterExtraBold: require("../assets/fonts/Inter_18pt-ExtraBold.ttf"),
          InterBlack: require("../assets/fonts/Inter_18pt-Black.ttf"),
          
          // Inter italic variants - 18pt
          InterThinItalic: require("../assets/fonts/Inter_18pt-ThinItalic.ttf"),
          InterExtraLightItalic: require("../assets/fonts/Inter_18pt-ExtraLightItalic.ttf"),
          InterLightItalic: require("../assets/fonts/Inter_18pt-LightItalic.ttf"),
          InterItalic: require("../assets/fonts/Inter_18pt-Italic.ttf"),
          InterMediumItalic: require("../assets/fonts/Inter_18pt-MediumItalic.ttf"),
          InterSemiBoldItalic: require("../assets/fonts/Inter_18pt-SemiBoldItalic.ttf"),
          InterBoldItalic: require("../assets/fonts/Inter_18pt-BoldItalic.ttf"),
          InterExtraBoldItalic: require("../assets/fonts/Inter_18pt-ExtraBoldItalic.ttf"),
          InterBlackItalic: require("../assets/fonts/Inter_18pt-BlackItalic.ttf"),
          
          // Inter font variants - 24pt
          Inter24ptThin: require("../assets/fonts/Inter_24pt-Thin.ttf"),
          Inter24ptExtraLight: require("../assets/fonts/Inter_24pt-ExtraLight.ttf"),
          Inter24ptLight: require("../assets/fonts/Inter_24pt-Light.ttf"),
          Inter24ptRegular: require("../assets/fonts/Inter_24pt-Regular.ttf"),
          Inter24ptMedium: require("../assets/fonts/Inter_24pt-Medium.ttf"),
          Inter24ptSemiBold: require("../assets/fonts/Inter_24pt-SemiBold.ttf"),
          Inter24ptBold: require("../assets/fonts/Inter_24pt-Bold.ttf"),
          Inter24ptExtraBold: require("../assets/fonts/Inter_24pt-ExtraBold.ttf"),
          Inter24ptBlack: require("../assets/fonts/Inter_24pt-Black.ttf"),
          
          // Inter italic variants - 24pt
          Inter24ptThinItalic: require("../assets/fonts/Inter_24pt-ThinItalic.ttf"),
          Inter24ptExtraLightItalic: require("../assets/fonts/Inter_24pt-ExtraLightItalic.ttf"),
          Inter24ptLightItalic: require("../assets/fonts/Inter_24pt-LightItalic.ttf"),
          Inter24ptItalic: require("../assets/fonts/Inter_24pt-Italic.ttf"),
          Inter24ptMediumItalic: require("../assets/fonts/Inter_24pt-MediumItalic.ttf"),
          Inter24ptSemiBoldItalic: require("../assets/fonts/Inter_24pt-SemiBoldItalic.ttf"),
          Inter24ptBoldItalic: require("../assets/fonts/Inter_24pt-BoldItalic.ttf"),
          Inter24ptExtraBoldItalic: require("../assets/fonts/Inter_24pt-ExtraBoldItalic.ttf"),
          Inter24ptBlackItalic: require("../assets/fonts/Inter_24pt-BlackItalic.ttf"),
          
          // Inter font variants - 28pt
          Inter28ptThin: require("../assets/fonts/Inter_28pt-Thin.ttf"),
          Inter28ptExtraLight: require("../assets/fonts/Inter_28pt-ExtraLight.ttf"),
          Inter28ptLight: require("../assets/fonts/Inter_28pt-Light.ttf"),
          Inter28ptRegular: require("../assets/fonts/Inter_28pt-Regular.ttf"),
          Inter28ptMedium: require("../assets/fonts/Inter_28pt-Medium.ttf"),
          Inter28ptSemiBold: require("../assets/fonts/Inter_28pt-SemiBold.ttf"),
          Inter28ptBold: require("../assets/fonts/Inter_28pt-Bold.ttf"),
          Inter28ptExtraBold: require("../assets/fonts/Inter_28pt-ExtraBold.ttf"),
          Inter28ptBlack: require("../assets/fonts/Inter_28pt-Black.ttf"),
          
          // Inter italic variants - 28pt
          Inter28ptThinItalic: require("../assets/fonts/Inter_28pt-ThinItalic.ttf"),
          Inter28ptExtraLightItalic: require("../assets/fonts/Inter_28pt-ExtraLightItalic.ttf"),
          Inter28ptLightItalic: require("../assets/fonts/Inter_28pt-LightItalic.ttf"),
          Inter28ptItalic: require("../assets/fonts/Inter_28pt-Italic.ttf"),
          Inter28ptMediumItalic: require("../assets/fonts/Inter_28pt-MediumItalic.ttf"),
          Inter28ptSemiBoldItalic: require("../assets/fonts/Inter_28pt-SemiBoldItalic.ttf"),
          Inter28ptBoldItalic: require("../assets/fonts/Inter_28pt-BoldItalic.ttf"),
          Inter28ptExtraBoldItalic: require("../assets/fonts/Inter_28pt-ExtraBoldItalic.ttf"),
          Inter28ptBlackItalic: require("../assets/fonts/Inter_28pt-BlackItalic.ttf"),
          
          // Oswald font variants
          OswaldExtraLight: require("../assets/fonts/Oswald-ExtraLight.ttf"),
          OswaldLight: require("../assets/fonts/Oswald-Light.ttf"),
          OswaldRegular: require("../assets/fonts/Oswald-Regular.ttf"),
          OswaldMedium: require("../assets/fonts/Oswald-Medium.ttf"),
          OswaldSemiBold: require("../assets/fonts/Oswald-SemiBold.ttf"),
          OswaldBold: require("../assets/fonts/Oswald-Bold.ttf"),
          
          // Legacy aliases for backward compatibility
          Inter: require("../assets/fonts/Inter_18pt-Regular.ttf"),
          Oswald: require("../assets/fonts/Oswald-Regular.ttf"),
        };

        await Font.loadAsync(fontMap);
        setFontsLoaded(true);
        console.log("✅ All fonts loaded successfully");
      } catch (error) {
        console.error("❌ Error loading fonts:", error);
        setFontError(error instanceof Error ? error.message : "Unknown font error");
        // Still set fonts as loaded to prevent app from getting stuck
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []);

  return { fontsLoaded, fontError };
};

export default useFonts;
