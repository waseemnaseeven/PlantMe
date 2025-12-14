import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, ProfileColors } from '@/constants/theme';
import { ECONOMIC_OPTIONS, GEOGRAPHIC_OPTIONS } from '@/data/profile';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Constraints } from '@/types/profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

interface ConstraintsSelectorProps {
  constraints: Constraints;
  onConstraintsChange: (constraints: Constraints) => void;
  editable?: boolean;
}

export function ConstraintsSelector({
  constraints,
  onConstraintsChange,
  editable = false,
}: ConstraintsSelectorProps) {
  const colorScheme = useColorScheme();

  const updateConstraint = <K extends keyof Constraints>(
    key: K,
    value: Constraints[K]
  ) => {
    if (!editable) return;
    onConstraintsChange({ ...constraints, [key]: value });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="tune-variant"
          size={24}
          color={Colors[colorScheme ?? 'light'].tint}
        />
        <ThemedText type="subtitle" style={styles.title}>
          Preferences & Constraints
        </ThemedText>
      </View>

      <ThemedText style={styles.description}>
        {editable
          ? 'Customize your food preferences and constraints'
          : 'Your current preferences and constraints'}
      </ThemedText>

      {/* Economic Situation */}
      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Economic Situation
        </ThemedText>
        <View style={styles.optionsRow}>
          {ECONOMIC_OPTIONS.map((option) => {
            const isSelected = constraints.economic === option.value;
            const color = ProfileColors.economic[option.value];

            return (
              <Pressable
                key={option.value}
                onPress={() => updateConstraint('economic', option.value)}
                disabled={!editable}
                style={({ pressed }) => [
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                  {
                    backgroundColor: isSelected
                      ? color + '20'
                      : Colors[colorScheme ?? 'light'].background,
                    borderColor: isSelected
                      ? color
                      : Colors[colorScheme ?? 'light'].icon + '30',
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={24}
                  color={isSelected ? color : Colors[colorScheme ?? 'light'].icon}
                />
                <ThemedText
                  type="defaultSemiBold"
                  style={[styles.optionLabel, isSelected && { color }]}
                >
                  {option.label}
                </ThemedText>
                <ThemedText style={styles.optionDescription} numberOfLines={2}>
                  {option.description}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Geographic Preference */}
      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Geographic Preference
        </ThemedText>
        <View style={styles.optionsRow}>
          {GEOGRAPHIC_OPTIONS.map((option) => {
            const isSelected = constraints.geographic === option.value;
            const color = ProfileColors.geographic[option.value];

            return (
              <Pressable
                key={option.value}
                onPress={() => updateConstraint('geographic', option.value)}
                disabled={!editable}
                style={({ pressed }) => [
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                  {
                    backgroundColor: isSelected
                      ? color + '20'
                      : Colors[colorScheme ?? 'light'].background,
                    borderColor: isSelected
                      ? color
                      : Colors[colorScheme ?? 'light'].icon + '30',
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={24}
                  color={isSelected ? color : Colors[colorScheme ?? 'light'].icon}
                />
                <ThemedText
                  type="defaultSemiBold"
                  style={[styles.optionLabel, isSelected && { color }]}
                >
                  {option.label}
                </ThemedText>
                <ThemedText style={styles.optionDescription} numberOfLines={2}>
                  {option.description}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Toggle Preferences */}
      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Additional Preferences
        </ThemedText>

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <MaterialCommunityIcons
              name="weather-sunny"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
            <View style={styles.toggleText}>
              <ThemedText type="defaultSemiBold">Prefer Seasonal</ThemedText>
              <ThemedText style={styles.toggleDescription}>
                Prioritize seasonal ingredients
              </ThemedText>
            </View>
          </View>
          <Switch
            value={constraints.preferSeasonal}
            onValueChange={(value) => updateConstraint('preferSeasonal', value)}
            disabled={!editable}
            trackColor={{
              false: Colors[colorScheme ?? 'light'].icon + '30',
              true: Colors[colorScheme ?? 'light'].tint + '80',
            }}
            thumbColor={
              constraints.preferSeasonal
                ? Colors[colorScheme ?? 'light'].tint
                : '#f4f3f4'
            }
          />
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
            <View style={styles.toggleText}>
              <ThemedText type="defaultSemiBold">Prefer Local</ThemedText>
              <ThemedText style={styles.toggleDescription}>
                Prioritize locally sourced food
              </ThemedText>
            </View>
          </View>
          <Switch
            value={constraints.preferLocal}
            onValueChange={(value) => updateConstraint('preferLocal', value)}
            disabled={!editable}
            trackColor={{
              false: Colors[colorScheme ?? 'light'].icon + '30',
              true: Colors[colorScheme ?? 'light'].tint + '80',
            }}
            thumbColor={
              constraints.preferLocal
                ? Colors[colorScheme ?? 'light'].tint
                : '#f4f3f4'
            }
          />
        </View>
      </View>

      {/* Dietary Restrictions */}
      {constraints.dietaryRestrictions.length > 0 && (
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Dietary Restrictions
          </ThemedText>
          <View style={styles.tagsContainer}>
            {constraints.dietaryRestrictions.map((restriction) => (
              <View
                key={restriction}
                style={[
                  styles.tag,
                  { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' },
                ]}
              >
                <ThemedText style={styles.tagText}>{restriction}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      )}
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    width: '30%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    minHeight: 120,
  },
  optionCardSelected: {
    borderWidth: 2,
  },
  optionLabel: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#00000010',
  },
  toggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleText: {
    marginLeft: 12,
    flex: 1,
  },
  toggleDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
