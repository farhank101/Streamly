import { FONTS, FONT_STYLES, FONT_HELPERS } from "./fonts";

export const COLORS = {
  // Primary Colors
  primaryAccent: "#F23D3D", // SiriusXM-inspired red
  primary: "#F23D3D", // Alias for primaryAccent

  // Background Colors
  background: "#0A0A0A",
  surface: "#1A1A1A",
  surfaceVariant: "#2A2A2A",
  inputBackground: "#1A1A1A",
  backgroundSecondary: "#111111", // Slightly lighter black for cards
  backgroundTertiary: "#222222", // For buttons and interactive elements

  // Text Colors
  textPrimary: "#FFFFFF",
  textSecondary: "#B0B0B0",
  textTertiary: "#808080",

  // Status Colors
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
  info: "#2196F3",

  // Overlay Colors
  overlay: "rgba(0, 0, 0, 0.7)",
  overlayLight: "rgba(255, 255, 255, 0.1)",
  overlayMedium: "rgba(255, 255, 255, 0.2)",

  // UI Elements
  divider: "#333333", // Line separators
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const SIZES = {
  // Component Sizes
  buttonHeight: 56,
  inputHeight: 56,
  borderRadius: 12,
  cardBorderRadius: 12, // Rounded cards like in SiriusXM
  miniPlayerHeight: 60, // Height for the mini player

  // Icon Sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 48,

  // Avatar Sizes
  avatarSmall: 32,
  avatarMedium: 48,
  avatarLarge: 64,
  avatarXLarge: 96,
  miniAvatarSize: 40, // Smaller avatar size
} as const;

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 5.84,
    elevation: 12,
  },
} as const;

// Export fonts and font styles
export { FONTS, FONT_STYLES, FONT_HELPERS };

// Typography helpers
export const TYPOGRAPHY = {
  // Heading styles
  h1: FONT_STYLES.heading.h1,
  h2: FONT_STYLES.heading.h2,
  h3: FONT_STYLES.heading.h3,
  h4: FONT_STYLES.heading.h4,
  h5: FONT_STYLES.heading.h5,
  h6: FONT_STYLES.heading.h6,

  // Body text styles
  bodyLarge: FONT_STYLES.body.large,
  body: FONT_STYLES.body.base,
  bodySmall: FONT_STYLES.body.small,
  bodyXs: FONT_STYLES.body.xs,

  // Button text styles
  buttonPrimary: FONT_STYLES.button.primary,
  buttonSecondary: FONT_STYLES.button.secondary,
  buttonSmall: FONT_STYLES.button.small,

  // Utility text styles
  caption: FONT_STYLES.caption,
  label: FONT_STYLES.label,
} as const;

export default {
  COLORS,
  SPACING,
  SIZES,
  SHADOWS,
  FONTS,
  FONT_STYLES,
  FONT_HELPERS,
  TYPOGRAPHY,
};
