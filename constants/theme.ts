/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#3E0629';
const tintColorDark = '#FDAFCB';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FDF9FA',
    tint: tintColorLight,
    action: '#FDAFCB',
    actionDark: '#3E0629',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    surface: '#FDF9FA',
    border: '#F5E8EC',
    shadow: 'rgba(62, 6, 41, 0.08)',
    gradientStart: '#FFEAED',
    gradientEnd: '#FDF9FA',
    // Pink-tinted white and grey palette
    cardBackground: '#FFFBFC',
    inputBackground: '#FDF8F9',
    iconBackground: '#FBF5F7',
    borderLight: '#F5E8EC',
    grey: {
      50: '#FFFBFC',  // Very light pink-white
      100: '#FDF8F9', // Light pink-white
      200: '#F5E8EC', // Pink-tinted light grey
      300: '#E8D5DC', // Soft pink-grey
      400: '#C4A8B3', // Medium pink-grey
      500: '#8B6B78', // Muted pink-grey
      600: '#6B4F5C', // Deep pink-grey
      700: '#4A3540', // Dark pink-grey
      800: '#2D1F26', // Very dark pink-grey
      900: '#1A1215', // Almost black with pink tint
    },
  },
  dark: {
    text: '#ECEDEE',
    background: '#1A1215',
    tint: tintColorDark,
    action: '#FDAFCB',
    actionDark: '#3E0629',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    surface: '#2D1F26',
    border: '#4A3540',
    shadow: 'rgba(253, 175, 203, 0.15)',
    gradientStart: '#2A1F24',
    gradientEnd: '#1A1215',
    // Pink-tinted dark palette
    cardBackground: '#2D1F26',
    inputBackground: '#3A2830',
    iconBackground: '#4A3540',
    borderLight: '#5C4450',
  },
};

// Spacing system based on 8px grid
export const Spacing = {
  xs: 4,    // 0.5 unit
  sm: 8,    // 1 unit
  md: 16,   // 2 units
  lg: 24,   // 3 units
  xl: 32,   // 4 units
  xxl: 40,  // 5 units
  xxxl: 48, // 6 units
};

// Border radius system
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

// Shadow system
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Consolidated color system - Yellow/Blue palette
export const SemanticColors = {
  // Primary semantic colors
  success: '#FDD175',       // Yellow - achievements, success, positive actions
  successDark: '#42330D',   // Dark yellow
  info: '#94D1FE',          // Blue - information, neutral states
  infoDark: '#001731',      // Dark blue
  warning: '#FFB84D',       // Orange - warnings, caution
  warningDark: '#4A2800',   // Dark orange
  error: '#FF6B6B',         // Red - errors only (minimal use)
  errorDark: '#4A0000',     // Dark red
};

// Activity type colors - using consolidated palette
export const ActivityColors = {
  workshop: '#FDD175',      // Yellow (learning, growth)
  'dinner-party': '#FFB84D', // Orange (warmth, food, community)
  meetup: '#94D1FE',        // Blue (community, connection)
};

// Gamification color palette - consolidated
export const GamificationColors = {
  // Achievement rarities - using Yellow/Blue system
  common: '#94D1FE',        // Blue (common)
  rare: '#6BB8F5',          // Medium blue (rare)
  epic: '#3A8FD9',          // Deep blue (epic)
  legendary: '#FDD175',     // Yellow (legendary)
  
  // Level progression - Yellow gradient
  bronze: '#E8C77D',        // Light yellow-bronze
  silver: '#F5D99B',        // Silver-yellow
  gold: '#FDD175',          // Gold yellow
  platinum: '#FFDC8F',      // Bright yellow
  diamond: '#FFF4D6',       // Very light yellow
  
  // Stats and progress - using semantic colors
  experience: '#FDD175',    // Yellow (growth/experience)
  streak: '#FFB84D',        // Orange (streak/fire)
  achievement: '#FDD175',   // Yellow (achievements)
  
  // Diet objectives - using Yellow/Blue variations
  'reduce-meat': '#E8C77D',
  'vegetarian': '#F5D99B',
  'vegan': '#FDD175',
  'flexitarian': '#FFDC8F',
  'pescatarian': '#94D1FE',
  'plant-forward': '#FFEB9F',
};

// Profile section colors - consolidated
export const ProfileColors = {
  economic: {
    'budget-conscious': '#FFB84D',  // Orange
    'moderate': '#FDD175',          // Yellow
    'flexible': '#E8C77D',          // Light yellow
  },
  geographic: {
    'local-only': '#FDD175',        // Yellow
    'regional': '#FFDC8F',          // Light yellow
    'no-preference': '#94D1FE',     // Blue
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
