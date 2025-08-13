/**
 * Custom Hook for Font Loading
 * Manages the loading of Oswald and Inter fonts with individual font files
 */

import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<string | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        console.log('🔄 Starting font loading...');
        
        // Load individual font files for better mobile compatibility
        const fontMap = {
          // Inter fonts - using specific weight files
          'InterThin': require('../assets/fonts/Inter_18pt-Thin.ttf'),
          'InterExtraLight': require('../assets/fonts/Inter_18pt-ExtraLight.ttf'),
          'InterLight': require('../assets/fonts/Inter_18pt-Light.ttf'),
          'InterRegular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
          'InterMedium': require('../assets/fonts/Inter_18pt-Medium.ttf'),
          'InterSemiBold': require('../assets/fonts/Inter_18pt-SemiBold.ttf'),
          'InterBold': require('../assets/fonts/Inter_18pt-Bold.ttf'),
          'InterExtraBold': require('../assets/fonts/Inter_18pt-ExtraBold.ttf'),
          'InterBlack': require('../assets/fonts/Inter_18pt-Black.ttf'),
          
          // Inter italic variants
          'InterThinItalic': require('../assets/fonts/Inter_18pt-ThinItalic.ttf'),
          'InterExtraLightItalic': require('../assets/fonts/Inter_18pt-ExtraLightItalic.ttf'),
          'InterLightItalic': require('../assets/fonts/Inter_18pt-LightItalic.ttf'),
          'InterItalic': require('../assets/fonts/Inter_18pt-Italic.ttf'),
          'InterMediumItalic': require('../assets/fonts/Inter_18pt-MediumItalic.ttf'),
          'InterSemiBoldItalic': require('../assets/fonts/Inter_18pt-SemiBoldItalic.ttf'),
          'InterBoldItalic': require('../assets/fonts/Inter_18pt-BoldItalic.ttf'),
          'InterExtraBoldItalic': require('../assets/fonts/Inter_18pt-ExtraBoldItalic.ttf'),
          'InterBlackItalic': require('../assets/fonts/Inter_18pt-BlackItalic.ttf'),
          
          // Oswald fonts
          'OswaldExtraLight': require('../assets/fonts/Oswald-ExtraLight.ttf'),
          'OswaldLight': require('../assets/fonts/Oswald-Light.ttf'),
          'OswaldRegular': require('../assets/fonts/Oswald-Regular.ttf'),
          'OswaldMedium': require('../assets/fonts/Oswald-Medium.ttf'),
          'OswaldSemiBold': require('../assets/fonts/Oswald-SemiBold.ttf'),
          'OswaldBold': require('../assets/fonts/Oswald-Bold.ttf'),
        };

        console.log('📁 Font map created with', Object.keys(fontMap).length, 'fonts');
        
        await Font.loadAsync(fontMap);
        
        console.log('✅ All fonts loaded successfully!');
        setFontsLoaded(true);
      } catch (error) {
        console.error('❌ Error loading fonts:', error);
        setFontError('Failed to load fonts');
        // Fallback to system fonts
        console.log('🔄 Falling back to system fonts...');
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []);

  return { fontsLoaded, fontError };
};

export default useFonts;
