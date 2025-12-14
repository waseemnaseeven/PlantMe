import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, GamificationColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DietObjectiveType } from '@/types/profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface DietObjectivesProps {
  selectedObjective: DietObjectiveType;
  onObjectiveChange: (objective: DietObjectiveType) => void;
}

// Slider levels from Flexitarian to Vegan
const DIET_LEVELS = [
  {
    value: 0,
    id: 'flexitarian' as DietObjectiveType,
    label: 'Flexitarian',
    description: 'Mostly plant-based with occasional meat',
    icon: 'food-variant',
    color: GamificationColors['flexitarian'],
  },
  {
    value: 1,
    id: 'pescatarian' as DietObjectiveType,
    label: 'Pescatarian',
    description: 'Plant-based with fish and seafood',
    icon: 'fish',
    color: GamificationColors['pescatarian'],
  },
  {
    value: 2,
    id: 'vegetarian' as DietObjectiveType,
    label: 'Vegetarian',
    description: 'No meat, includes dairy and eggs',
    icon: 'leaf',
    color: GamificationColors['vegetarian'],
  },
  {
    value: 3,
    id: 'vegan' as DietObjectiveType,
    label: 'Vegan',
    description: 'Fully plant-based, no animal products',
    icon: 'sprout',
    color: GamificationColors['vegan'],
  },
];

export function DietObjectives({
  selectedObjective,
  onObjectiveChange,
}: DietObjectivesProps) {
  const colorScheme = useColorScheme();

  // Find current level index
  const currentLevel = DIET_LEVELS.find(level => level.id === selectedObjective) || DIET_LEVELS[0];
  const currentValue = currentLevel.value;

  const handleSliderChange = (value: number) => {
    const roundedValue = Math.round(value);
    const selectedLevel = DIET_LEVELS[roundedValue];
    if (selectedLevel) {
      onObjectiveChange(selectedLevel.id);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="target"
          size={24}
          color={Colors[colorScheme ?? 'light'].tint}
        />
        <ThemedText type="subtitle" style={styles.title}>
          Diet Objective
        </ThemedText>
      </View>

      <ThemedText style={styles.description}>
        Slide to adjust your plant-based diet level
      </ThemedText>

      {/* Current Selection Display */}
      <View style={[styles.currentSelection, { backgroundColor: currentLevel.color + '20', borderColor: currentLevel.color }]}>
        <MaterialCommunityIcons
          name={currentLevel.icon as any}
          size={48}
          color={currentLevel.color}
        />
        <View style={styles.currentInfo}>
          <ThemedText type="defaultSemiBold" style={[styles.currentLabel, { color: currentLevel.color }]}>
            {currentLevel.label}
          </ThemedText>
          <ThemedText style={styles.currentDescription}>
            {currentLevel.description}
          </ThemedText>
        </View>
      </View>

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={3}
          step={1}
          value={currentValue}
          onValueChange={handleSliderChange}
          minimumTrackTintColor={currentLevel.color}
          maximumTrackTintColor={Colors[colorScheme ?? 'light'].icon + '30'}
          thumbTintColor={currentLevel.color}
        />
      </View>

      {/* Level Labels */}
      <View style={styles.labelsContainer}>
        {DIET_LEVELS.map((level) => (
          <View key={level.id} style={styles.labelItem}>
            <View
              style={[
                styles.labelDot,
                {
                  backgroundColor: currentValue >= level.value ? level.color : Colors[colorScheme ?? 'light'].icon + '30',
                },
              ]}
            />
            <ThemedText
              style={[
                styles.labelText,
                currentValue === level.value && styles.labelTextActive,
                currentValue === level.value && { color: level.color },
              ]}
            >
              {level.label}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressInfo}>
        <MaterialCommunityIcons
          name="information-outline"
          size={16}
          color={Colors[colorScheme ?? 'light'].icon}
        />
        <ThemedText style={styles.progressText}>
          Level {currentValue + 1} of 4 - {currentLevel.label}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  currentSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 20,
  },
  currentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  currentLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  currentDescription: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 18,
  },
  sliderContainer: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  labelItem: {
    alignItems: 'center',
    flex: 1,
  },
  labelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  labelText: {
    fontSize: 11,
    opacity: 0.6,
    textAlign: 'center',
  },
  labelTextActive: {
    fontWeight: '600',
    opacity: 1,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#00000010',
  },
  progressText: {
    fontSize: 13,
    opacity: 0.7,
    marginLeft: 6,
  },
});
