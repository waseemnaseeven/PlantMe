import { Achievement, LevelConfig, UserStats } from '@/types/profile';

/**
 * Level configuration defining progression system
 */
export const LEVEL_CONFIGS: LevelConfig[] = [
  { level: 1, minPoints: 0, maxPoints: 99, title: 'Seedling', icon: 'sprout', color: '#AED581' },
  { level: 2, minPoints: 100, maxPoints: 249, title: 'Sprout', icon: 'flower', color: '#9CCC65' },
  { level: 3, minPoints: 250, maxPoints: 499, title: 'Sapling', icon: 'tree', color: '#8BC34A' },
  { level: 4, minPoints: 500, maxPoints: 999, title: 'Young Tree', icon: 'pine-tree', color: '#7CB342' },
  { level: 5, minPoints: 1000, maxPoints: 1999, title: 'Growing Tree', icon: 'forest', color: '#689F38' },
  { level: 6, minPoints: 2000, maxPoints: 3499, title: 'Strong Tree', icon: 'tree-outline', color: '#558B2F' },
  { level: 7, minPoints: 3500, maxPoints: 5499, title: 'Mighty Oak', icon: 'pine-tree-box', color: '#4CAF50' },
  { level: 8, minPoints: 5500, maxPoints: 8499, title: 'Forest Guardian', icon: 'forest', color: '#43A047' },
  { level: 9, minPoints: 8500, maxPoints: 12499, title: 'Nature Sage', icon: 'leaf-circle', color: '#388E3C' },
  { level: 10, minPoints: 12500, maxPoints: Infinity, title: 'Plant Legend', icon: 'crown', color: '#2E7D32' },
];

/**
 * Calculate user level based on total points
 */
export function calculateLevel(points: number): LevelConfig {
  for (let i = LEVEL_CONFIGS.length - 1; i >= 0; i--) {
    if (points >= LEVEL_CONFIGS[i].minPoints) {
      return LEVEL_CONFIGS[i];
    }
  }
  return LEVEL_CONFIGS[0];
}

/**
 * Calculate progress to next level (0-100)
 */
export function calculateLevelProgress(points: number): number {
  const currentLevel = calculateLevel(points);
  
  if (currentLevel.maxPoints === Infinity) {
    return 100; // Max level reached
  }
  
  const pointsInLevel = points - currentLevel.minPoints;
  const pointsNeeded = currentLevel.maxPoints - currentLevel.minPoints + 1;
  
  return Math.min(100, Math.round((pointsInLevel / pointsNeeded) * 100));
}

/**
 * Calculate points needed for next level
 */
export function pointsToNextLevel(points: number): number {
  const currentLevel = calculateLevel(points);
  
  if (currentLevel.maxPoints === Infinity) {
    return 0; // Max level reached
  }
  
  return currentLevel.maxPoints - points + 1;
}

/**
 * Award points for completing an activity
 */
export function awardActivityPoints(activityType: string): number {
  const pointsMap: Record<string, number> = {
    'workshop': 50,
    'dinner-party': 75,
    'meetup': 40,
  };
  
  return pointsMap[activityType] || 25;
}

/**
 * Calculate streak bonus points
 */
export function calculateStreakBonus(streakDays: number): number {
  if (streakDays < 3) return 0;
  if (streakDays < 7) return 10;
  if (streakDays < 14) return 25;
  if (streakDays < 30) return 50;
  return 100;
}

/**
 * Check if user has earned a new achievement
 */
export function checkAchievementUnlock(
  achievement: Achievement,
  stats: UserStats
): boolean {
  // Achievement already unlocked
  if (achievement.unlockedAt) {
    return false;
  }

  // Check conditions based on achievement ID
  switch (achievement.id) {
    case 'first-activity':
      return stats.activitiesAttended >= 1;
    
    case 'social-butterfly':
      return stats.activitiesAttended >= 5;
    
    case 'community-champion':
      return stats.activitiesAttended >= 20;
    
    case 'workshop-enthusiast':
      return stats.workshopsCompleted >= 3;
    
    case 'dinner-host':
      return stats.dinnerPartiesHosted >= 1;
    
    case 'meetup-organizer':
      return stats.meetupsOrganized >= 1;
    
    case 'streak-starter':
      return stats.currentStreak >= 3;
    
    case 'week-warrior':
      return stats.currentStreak >= 7;
    
    case 'month-master':
      return stats.currentStreak >= 30;
    
    case 'friend-maker':
      return stats.friendsConnected >= 5;
    
    case 'recipe-sharer':
      return stats.recipesShared >= 10;
    
    case 'eco-warrior':
      return stats.co2Saved >= 100;
    
    case 'level-5':
      return stats.level >= 5;
    
    case 'level-10':
      return stats.level >= 10;
    
    default:
      return false;
  }
}

/**
 * Calculate CO2 saved based on activities (rough estimate)
 */
export function calculateCO2Saved(activitiesAttended: number): number {
  // Average CO2 saved per plant-based meal: ~2.5 kg
  // Assuming each activity involves at least one meal
  return Math.round(activitiesAttended * 2.5 * 10) / 10;
}

/**
 * Get achievement rarity color
 */
export function getAchievementRarityColor(rarity: Achievement['rarity']): string {
  const colors = {
    common: '#95A5A6',
    rare: '#3498DB',
    epic: '#9B59B6',
    legendary: '#F39C12',
  };
  return colors[rarity];
}

/**
 * Format large numbers with K/M suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
