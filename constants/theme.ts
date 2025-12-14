/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
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
