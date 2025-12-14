export type DietObjectiveType = 
  | 'reduce-meat'
  | 'vegetarian'
  | 'vegan'
  | 'flexitarian'
  | 'pescatarian'
  | 'plant-forward';

export type EconomicSituation = 
  | 'budget-conscious'
  | 'moderate'
  | 'flexible';

export type GeographicPreference = 
  | 'local-only'
  | 'regional'
  | 'no-preference';

export type AchievementCategory = 
  | 'participation'
  | 'social'
  | 'learning'
  | 'sustainability'
  | 'milestone';

export interface DietObjective {
  id: DietObjectiveType;
  title: string;
  description: string;
  icon: string; // MaterialCommunityIcons name
  color: string;
}

export interface Constraints {
  economic: EconomicSituation;
  geographic: GeographicPreference;
  preferSeasonal: boolean;
  preferLocal: boolean;
  dietaryRestrictions: string[]; // e.g., ['gluten-free', 'nut-free']
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // MaterialCommunityIcons name
  category: AchievementCategory;
  points: number;
  unlockedAt?: string; // ISO date string
  progress?: number; // 0-100 for progressive achievements
  maxProgress?: number; // For achievements with multiple levels
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserStats {
  activitiesAttended: number;
  workshopsCompleted: number;
  dinnerPartiesHosted: number;
  meetupsOrganized: number;
  currentStreak: number; // Days
  longestStreak: number; // Days
  totalPoints: number;
  level: number;
  friendsConnected: number;
  recipesShared: number;
  co2Saved: number; // kg of CO2 saved by plant-based choices
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedDate: string; // ISO date string
  bio?: string;
  
  // Diet preferences
  dietObjective: DietObjectiveType;
  constraints: Constraints;
  
  // Gamification
  stats: UserStats;
  achievements: Achievement[];
  
  // Preferences
  notificationsEnabled: boolean;
  shareProgressPublicly: boolean;
}

export interface LevelConfig {
  level: number;
  minPoints: number;
  maxPoints: number;
  title: string;
  icon: string;
  color: string;
}
