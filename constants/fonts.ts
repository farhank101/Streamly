/**
 * Font Configuration
 * Defines font families, weights, and sizes for the app
 */

export const FONTS = {
  family: {
    // Inter font families - using specific font names
    interThin: "InterThin",
    interExtraLight: "InterExtraLight",
    interLight: "InterLight",
    interRegular: "InterRegular",
    interMedium: "InterMedium",
    interSemiBold: "InterSemiBold",
    interBold: "InterBold",
    interExtraBold: "InterExtraBold",
    interBlack: "InterBlack",

    // Inter italic variants
    interThinItalic: "InterThinItalic",
    interExtraLightItalic: "InterExtraLightItalic",
    interLightItalic: "InterLightItalic",
    interItalic: "InterItalic",
    interMediumItalic: "InterMediumItalic",
    interSemiBoldItalic: "InterSemiBoldItalic",
    interBoldItalic: "InterBoldItalic",
    interExtraBoldItalic: "InterExtraBoldItalic",
    interBlackItalic: "InterBlackItalic",

    // Oswald font families
    oswaldExtraLight: "OswaldExtraLight",
    oswaldLight: "OswaldLight",
    oswaldRegular: "OswaldRegular",
    oswaldMedium: "OswaldMedium",
    oswaldSemiBold: "OswaldSemiBold",
    oswaldBold: "OswaldBold",

    // Legacy aliases for backward compatibility
    inter: "InterRegular",
    oswald: "OswaldRegular",
  },
  weight: {
    thin: "100",
    extraLight: "200",
    light: "300",
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
    extraBold: "800",
    black: "900",
  },
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
    "9xl": 128,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },
} as const;

export const FONT_STYLES = {
  heading: {
    h1: {
      fontFamily: FONTS.family.oswaldBold,
      fontSize: FONTS.size["5xl"],
      lineHeight: FONTS.lineHeight.tight,
      letterSpacing: FONTS.letterSpacing.tight,
    },
    h2: {
      fontFamily: FONTS.family.oswaldBold,
      fontSize: FONTS.size["4xl"],
      lineHeight: FONTS.lineHeight.tight,
      letterSpacing: FONTS.letterSpacing.tight,
    },
    h3: {
      fontFamily: FONTS.family.oswaldBold,
      fontSize: FONTS.size["3xl"],
      lineHeight: FONTS.lineHeight.tight,
      letterSpacing: FONTS.letterSpacing.tight,
    },
    h4: {
      fontFamily: FONTS.family.oswaldSemiBold,
      fontSize: FONTS.size["2xl"],
      lineHeight: FONTS.lineHeight.tight,
      letterSpacing: FONTS.letterSpacing.tight,
    },
    h5: {
      fontFamily: FONTS.family.oswaldSemiBold,
      fontSize: FONTS.size.xl,
      lineHeight: FONTS.lineHeight.tight,
      letterSpacing: FONTS.letterSpacing.tight,
    },
    h6: {
      fontFamily: FONTS.family.oswaldSemiBold,
      fontSize: FONTS.size.lg,
      lineHeight: FONTS.lineHeight.tight,
      letterSpacing: FONTS.letterSpacing.tight,
    },
  },
  body: {
    large: {
      fontFamily: FONTS.family.interRegular,
      fontSize: FONTS.size.lg,
      lineHeight: FONTS.lineHeight.relaxed,
      letterSpacing: FONTS.letterSpacing.normal,
    },
    base: {
      fontFamily: FONTS.family.interRegular,
      fontSize: FONTS.size.base,
      lineHeight: FONTS.lineHeight.relaxed,
      letterSpacing: FONTS.letterSpacing.normal,
    },
    small: {
      fontFamily: FONTS.family.interRegular,
      fontSize: FONTS.size.sm,
      lineHeight: FONTS.lineHeight.relaxed,
      letterSpacing: FONTS.letterSpacing.normal,
    },
    xs: {
      fontFamily: FONTS.family.interRegular,
      fontSize: FONTS.size.xs,
      lineHeight: FONTS.lineHeight.relaxed,
      letterSpacing: FONTS.letterSpacing.normal,
    },
  },
  button: {
    primary: {
      fontFamily: FONTS.family.interSemiBold,
      fontSize: FONTS.size.base,
      lineHeight: FONTS.lineHeight.none,
      letterSpacing: FONTS.letterSpacing.wide,
      textTransform: "uppercase" as const,
    },
    secondary: {
      fontFamily: FONTS.family.interMedium,
      fontSize: FONTS.size.base,
      lineHeight: FONTS.lineHeight.none,
      letterSpacing: FONTS.letterSpacing.wide,
      textTransform: "uppercase" as const,
    },
    small: {
      fontFamily: FONTS.family.interMedium,
      fontSize: FONTS.size.sm,
      lineHeight: FONTS.lineHeight.none,
      letterSpacing: FONTS.letterSpacing.wide,
      textTransform: "uppercase" as const,
    },
  },
  caption: {
    fontFamily: FONTS.family.interRegular,
    fontSize: FONTS.size.xs,
    lineHeight: FONTS.lineHeight.normal,
    letterSpacing: FONTS.letterSpacing.normal,
  },
  label: {
    fontFamily: FONTS.family.interMedium,
    fontSize: FONTS.size.sm,
    lineHeight: FONTS.lineHeight.normal,
    letterSpacing: FONTS.letterSpacing.wide,
  },
} as const;

// Helper functions for common font combinations
export const FONT_HELPERS = {
  // Inter font helpers
  interThin: () => ({ fontFamily: FONTS.family.interThin }),
  interExtraLight: () => ({ fontFamily: FONTS.family.interExtraLight }),
  interLight: () => ({ fontFamily: FONTS.family.interLight }),
  interRegular: () => ({ fontFamily: FONTS.family.interRegular }),
  interMedium: () => ({ fontFamily: FONTS.family.interMedium }),
  interSemiBold: () => ({ fontFamily: FONTS.family.interSemiBold }),
  interBold: () => ({ fontFamily: FONTS.family.interBold }),
  interExtraBold: () => ({ fontFamily: FONTS.family.interExtraBold }),
  interBlack: () => ({ fontFamily: FONTS.family.interBlack }),

  // Oswald font helpers
  oswaldExtraLight: () => ({ fontFamily: FONTS.family.oswaldExtraLight }),
  oswaldLight: () => ({ fontFamily: FONTS.family.oswaldLight }),
  oswaldRegular: () => ({ fontFamily: FONTS.family.oswaldRegular }),
  oswaldMedium: () => ({ fontFamily: FONTS.family.oswaldMedium }),
  oswaldSemiBold: () => ({ fontFamily: FONTS.family.oswaldSemiBold }),
  oswaldBold: () => ({ fontFamily: FONTS.family.oswaldBold }),
} as const;

export default FONTS;
