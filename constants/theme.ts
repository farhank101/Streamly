import { FONTS, FONT_STYLES, FONT_HELPERS } from "./fonts";

export const COLORS = {
  // Primary Colors - Calming & Eye-Friendly Design System
  primary: "#6366F1", // Indigo - Calming blue-purple
  primaryAccent: "#6366F1", // Alias for primary
  secondary: "#8B5CF6", // Violet - Soft purple
  accent: "#06B6D4", // Cyan - Gentle blue-green
  highlight: "#F59E0B", // Amber - Warm orange

  // Background Colors - Sophisticated dark theme
  background: "#0F0F23", // Deep navy-black
  surface: "#1A1A2E", // Dark blue-gray
  surfaceVariant: "#16213E", // Medium blue-gray
  inputBackground: "#1A1A2E",
  backgroundSecondary: "#151530",
  backgroundTertiary: "#1E1E3F",

  // Text Colors
  textPrimary: "#F8FAFC", // Soft white
  textSecondary: "#CBD5E1", // Light gray-blue
  textTertiary: "#94A3B8", // Medium gray-blue

  // Status Colors - Calming variants
  success: "#10B981", // Emerald - Soft green
  warning: "#F59E0B", // Amber - Warm orange
  error: "#EF4444", // Red - Soft red
  info: "#06B6D4", // Cyan - Gentle blue

  // Overlay Colors
  overlay: "rgba(15, 15, 35, 0.8)", // Dark overlay
  overlayLight: "rgba(99, 102, 241, 0.1)", // Indigo glow
  overlayMedium: "rgba(99, 102, 241, 0.2)", // Stronger indigo glow

  // UI Elements
  divider: "#334155", // Slate gray
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
  cardBorderRadius: 12,
  miniPlayerHeight: 60,

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
  miniAvatarSize: 40,
} as const;

export const SHADOWS = {
  small: {
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
  large: {
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
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
