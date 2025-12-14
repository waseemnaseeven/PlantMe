import { Colors, GamificationColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Recipe } from '@/types/recipe';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface RecipeCardProps {
  recipe: Recipe;
  onPress?: () => void;
}

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const colorScheme = useColorScheme();
  const totalTime = recipe.prepTime + recipe.cookTime;

  const getDifficultyColor = () => {
    switch (recipe.difficulty) {
      case 'easy':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'hard':
        return '#F44336';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <ThemedView style={styles.card}>
        {/* Image */}
        <Image
          source={{ uri: recipe.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />

        {/* Difficulty Badge */}
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor() },
          ]}
        >
          <ThemedText style={styles.difficultyText}>
            {recipe.difficulty}
          </ThemedText>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <ThemedText
            type="defaultSemiBold"
            style={styles.title}
            numberOfLines={2}
          >
            {recipe.title}
          </ThemedText>

          {/* Meta Info */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={14}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.metaText}>{totalTime}m</ThemedText>
            </View>

            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="account-outline"
                size={14}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.metaText}>
                {recipe.servings}
              </ThemedText>
            </View>

            {recipe.rating && (
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="star"
                  size={14}
                  color="#FFD700"
                />
                <ThemedText style={styles.metaText}>
                  {recipe.rating.toFixed(1)}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Diet Tags */}
          <View style={styles.tagsRow}>
            {recipe.dietObjectives.slice(0, 2).map((diet) => (
              <View
                key={diet}
                style={[
                  styles.tag,
                  {
                    backgroundColor:
                      GamificationColors[diet] + '20',
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.tagText,
                    { color: GamificationColors[diet] },
                  ]}
                >
                  {diet}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.7,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
