import { GamificationColors } from '@/constants/theme';
import { Achievement, DietObjective, UserProfile } from '@/types/profile';

/**
 * Available diet objectives for users to select
 */
export const DIET_OBJECTIVES: DietObjective[] = [
  {
    id: 'reduce-meat',
    title: 'Reduce Meat',
    description: 'Gradually decrease meat consumption',
    icon: 'food-drumstick-off',
    color: GamificationColors['reduce-meat'],
  },
  {
    id: 'vegetarian',
    title: 'Vegetarian',
    description: 'No meat, but includes dairy and eggs',
    icon: 'leaf',
    color: GamificationColors['vegetarian'],
  },
  {
    id: 'vegan',
    title: 'Vegan',
    description: 'Fully plant-based, no animal products',
    icon: 'sprout',
    color: GamificationColors['vegan'],
  },
  {
    id: 'flexitarian',
    title: 'Flexitarian',
    description: 'Mostly plant-based with occasional meat',
    icon: 'food-variant',
    color: GamificationColors['flexitarian'],
  },
  {
    id: 'pescatarian',
    title: 'Pescatarian',
    description: 'Plant-based with fish and seafood',
    icon: 'fish',
    color: GamificationColors['pescatarian'],
  },
  {
    id: 'plant-forward',
    title: 'Plant-Forward',
    description: 'Prioritize plants in every meal',
    icon: 'flower',
    color: GamificationColors['plant-forward'],
  },
];

/**
 * All available achievements in the app
 */
export const ALL_ACHIEVEMENTS: Achievement[] = [
  // Participation achievements
  {
    id: 'first-activity',
    title: 'First Steps',
    description: 'Attend your first activity',
    icon: 'foot-print',
    category: 'participation',
    points: 50,
    rarity: 'common',
  },
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Attend 5 activities',
    icon: 'butterfly',
    category: 'participation',
    points: 100,
    rarity: 'common',
  },
  {
    id: 'community-champion',
    title: 'Community Champion',
    description: 'Attend 20 activities',
    icon: 'trophy',
    category: 'participation',
    points: 250,
    rarity: 'rare',
  },
  
  // Learning achievements
  {
    id: 'workshop-enthusiast',
    title: 'Workshop Enthusiast',
    description: 'Complete 3 workshops',
    icon: 'school',
    category: 'learning',
    points: 75,
    rarity: 'common',
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Complete 10 workshops',
    icon: 'book-open-variant',
    category: 'learning',
    points: 200,
    rarity: 'rare',
  },
  
  // Social achievements
  {
    id: 'dinner-host',
    title: 'Dinner Host',
    description: 'Host your first dinner party',
    icon: 'silverware-fork-knife',
    category: 'social',
    points: 100,
    rarity: 'common',
  },
  {
    id: 'meetup-organizer',
    title: 'Meetup Organizer',
    description: 'Organize a community meetup',
    icon: 'account-group',
    category: 'social',
    points: 150,
    rarity: 'rare',
  },
  {
    id: 'friend-maker',
    title: 'Friend Maker',
    description: 'Connect with 5 community members',
    icon: 'account-heart',
    category: 'social',
    points: 75,
    rarity: 'common',
  },
  {
    id: 'social-connector',
    title: 'Social Connector',
    description: 'Connect with 20 community members',
    icon: 'account-multiple-plus',
    category: 'social',
    points: 200,
    rarity: 'epic',
  },
  
  // Streak achievements
  {
    id: 'streak-starter',
    title: 'Streak Starter',
    description: 'Maintain a 3-day streak',
    icon: 'fire',
    category: 'participation',
    points: 50,
    rarity: 'common',
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: 'fire-circle',
    category: 'participation',
    points: 150,
    rarity: 'rare',
  },
  {
    id: 'month-master',
    title: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: 'fire-alert',
    category: 'participation',
    points: 500,
    rarity: 'epic',
  },
  
  // Sustainability achievements
  {
    id: 'eco-warrior',
    title: 'Eco Warrior',
    description: 'Save 100kg of CO2',
    icon: 'earth',
    category: 'sustainability',
    points: 200,
    rarity: 'rare',
  },
  {
    id: 'planet-protector',
    title: 'Planet Protector',
    description: 'Save 500kg of CO2',
    icon: 'shield-earth',
    category: 'sustainability',
    points: 500,
    rarity: 'epic',
  },
  {
    id: 'recipe-sharer',
    title: 'Recipe Sharer',
    description: 'Share 10 plant-based recipes',
    icon: 'chef-hat',
    category: 'social',
    points: 100,
    rarity: 'common',
  },
  
  // Milestone achievements
  {
    id: 'level-5',
    title: 'Growing Strong',
    description: 'Reach level 5',
    icon: 'numeric-5-circle',
    category: 'milestone',
    points: 0,
    rarity: 'rare',
  },
  {
    id: 'level-10',
    title: 'Plant Legend',
    description: 'Reach level 10',
    icon: 'numeric-10-circle',
    category: 'milestone',
    points: 0,
    rarity: 'legendary',
  },
  {
    id: 'early-adopter',
    title: 'Early Adopter',
    description: 'Join the community in its first month',
    icon: 'star-circle',
    category: 'milestone',
    points: 100,
    rarity: 'epic',
  },
];

/**
 * Mock user profile data
 */
export const mockUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Alex Green',
  email: 'alex.green@plantme.com',
  avatarUrl: undefined, // Will use default avatar
  joinedDate: '2024-01-15T00:00:00.000Z',
  bio: 'Passionate about sustainable living and plant-based cooking. Love connecting with like-minded people!',
  
  dietObjective: 'vegan',
  
  constraints: {
    economic: 'moderate',
    geographic: 'local-only',
    preferSeasonal: true,
    preferLocal: true,
    dietaryRestrictions: ['gluten-free'],
  },
  
  stats: {
    activitiesAttended: 12,
    workshopsCompleted: 5,
    dinnerPartiesHosted: 2,
    meetupsOrganized: 1,
    currentStreak: 5,
    longestStreak: 14,
    totalPoints: 850,
    level: 4,
    friendsConnected: 8,
    recipesShared: 15,
    co2Saved: 30.0,
  },
  
  achievements: [
    {
      ...ALL_ACHIEVEMENTS.find(a => a.id === 'first-activity')!,
      unlockedAt: '2024-01-20T00:00:00.000Z',
    },
    {
      ...ALL_ACHIEVEMENTS.find(a => a.id === 'social-butterfly')!,
      unlockedAt: '2024-02-10T00:00:00.000Z',
    },
    {
      ...ALL_ACHIEVEMENTS.find(a => a.id === 'workshop-enthusiast')!,
      unlockedAt: '2024-02-25T00:00:00.000Z',
    },
    {
      ...ALL_ACHIEVEMENTS.find(a => a.id === 'dinner-host')!,
      unlockedAt: '2024-03-05T00:00:00.000Z',
    },
    {
      ...ALL_ACHIEVEMENTS.find(a => a.id === 'streak-starter')!,
      unlockedAt: '2024-03-10T00:00:00.000Z',
    },
    {
      ...ALL_ACHIEVEMENTS.find(a => a.id === 'friend-maker')!,
      unlockedAt: '2024-03-15T00:00:00.000Z',
    },
    {
      ...ALL_ACHIEVEMENTS.find(a => a.id === 'recipe-sharer')!,
      unlockedAt: '2024-03-20T00:00:00.000Z',
    },
    {
      ...ALL_ACHIEVEMENTS.find(a => a.id === 'early-adopter')!,
      unlockedAt: '2024-01-15T00:00:00.000Z',
    },
  ],
  
  notificationsEnabled: true,
  shareProgressPublicly: true,
};

/**
 * Economic situation options with descriptions
 */
export const ECONOMIC_OPTIONS = [
  {
    value: 'budget-conscious' as const,
    label: 'Budget Conscious',
    description: 'Focus on affordable, cost-effective options',
    icon: 'piggy-bank',
  },
  {
    value: 'moderate' as const,
    label: 'Moderate',
    description: 'Balance between quality and cost',
    icon: 'scale-balance',
  },
  {
    value: 'flexible' as const,
    label: 'Flexible',
    description: 'Open to premium and specialty items',
    icon: 'cash-multiple',
  },
];

/**
 * Geographic preference options with descriptions
 */
export const GEOGRAPHIC_OPTIONS = [
  {
    value: 'local-only' as const,
    label: 'Local Only',
    description: 'Prefer locally sourced ingredients',
    icon: 'map-marker',
  },
  {
    value: 'regional' as const,
    label: 'Regional',
    description: 'Open to regional products',
    icon: 'map',
  },
  {
    value: 'no-preference' as const,
    label: 'No Preference',
    description: 'Open to all sources',
    icon: 'earth',
  },
];
