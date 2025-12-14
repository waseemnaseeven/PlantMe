import { DietObjectiveType } from './profile';

export type RecipeCategory = 
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack'
  | 'dessert'
  | 'beverage';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Ingredient {
  name: string;
  amount: string;
  notes?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: RecipeCategory;
  difficulty: DifficultyLevel;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  
  // Diet compatibility
  dietObjectives: DietObjectiveType[];
  
  // Tags for filtering
  tags: string[]; // e.g., ['gluten-free', 'high-protein', 'quick', 'budget-friendly']
  
  // Recipe details
  ingredients: Ingredient[];
  instructions: string[];
  
  // Optional
  nutrition?: NutritionInfo;
  tips?: string[];
  author?: string;
  rating?: number; // 0-5
  reviewCount?: number;
}

export interface RecipeFilter {
  category?: RecipeCategory;
  difficulty?: DifficultyLevel;
  maxPrepTime?: number;
  dietObjective?: DietObjectiveType;
  tags?: string[];
}
