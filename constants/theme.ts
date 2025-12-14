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

// Vibrant nature-inspired color palette for activity types
export const ActivityColors = {
  workshop: '#4CAF50',      // Vibrant green (growth, learning, nature)
  'dinner-party': '#FF6B35', // Vibrant coral/orange (warmth, food, community)
  meetup: '#2E7D32',         // Deep forest green (community, sustainability)
};

// Gamification color palette
export const GamificationColors = {
  // Achievement rarities
  common: '#95A5A6',        // Gray
  rare: '#3498DB',          // Blue
  epic: '#9B59B6',          // Purple
  legendary: '#F39C12',     // Gold
  
  // Level progression
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2',
  diamond: '#B9F2FF',
  
  // Stats and progress
  experience: '#2ECC71',    // Green
  streak: '#E74C3C',        // Red/Orange
  achievement: '#F39C12',   // Gold
  
  // Diet objectives
  'reduce-meat': '#81C784',
  'vegetarian': '#66BB6A',
  'vegan': '#4CAF50',
  'flexitarian': '#AED581',
  'pescatarian': '#4DD0E1',
  'plant-forward': '#7CB342',
};

// Profile section colors
export const ProfileColors = {
  economic: {
    'budget-conscious': '#FF9800',
    'moderate': '#FFC107',
    'flexible': '#4CAF50',
  },
  geographic: {
    'local-only': '#8BC34A',
    'regional': '#CDDC39',
    'no-preference': '#9E9E9E',
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
