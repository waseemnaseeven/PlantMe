import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { ECONOMIC_OPTIONS, GEOGRAPHIC_OPTIONS } from '@/data/profile';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Constraints } from '@/types/profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

interface ConstraintsSelectorProps {
  constraints: Constraints;
  onConstraintsChange: (constraints: Constraints) => void;
}

export function ConstraintsSelector({
  constraints,
  onConstraintsChange,
}: ConstraintsSelectorProps) {
  const colorScheme = useColorScheme();

  const updateConstraint = <K extends keyof Constraints>(
    key: K,
    value: Constraints[K]
  ) => {
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
        Tap to customize your food preferences and constraints
      </ThemedText>

      {/* Economic Situation */}
      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Economic Situation
        </ThemedText>
        <View style={styles.radioGroup}>
          {ECONOMIC_OPTIONS.map((option) => {
            const isSelected = constraints.economic === option.value;

            return (
              <Pressable
                key={option.value}
                onPress={() => updateConstraint('economic', option.value)}
                style={({ pressed }) => [
                  styles.radioOption,
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor: isSelected
                        ? Colors[colorScheme ?? 'light'].tint
                        : Colors[colorScheme ?? 'light'].icon + '40',
                    },
                  ]}
                >
                  {isSelected && (
                    <View
                      style={[
                        styles.radioCircleInner,
                        {
                          backgroundColor: Colors[colorScheme ?? 'light'].tint,
                        },
                      ]}
                    />
                  )}
                </View>
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={20}
                  color={isSelected ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].icon}
                  style={styles.radioIcon}
                />
                <View style={styles.radioTextContainer}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={[
                      styles.radioLabel,
                      isSelected && { color: Colors[colorScheme ?? 'light'].tint }
                    ]}
                  >
                    {option.label}
                  </ThemedText>
                  <ThemedText style={styles.radioDescription}>
                    {option.description}
                  </ThemedText>
                </View>
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
        <View style={styles.radioGroup}>
          {GEOGRAPHIC_OPTIONS.map((option) => {
            const isSelected = constraints.geographic === option.value;

            return (
              <Pressable
                key={option.value}
                onPress={() => updateConstraint('geographic', option.value)}
                style={({ pressed }) => [
                  styles.radioOption,
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor: isSelected
                        ? Colors[colorScheme ?? 'light'].tint
                        : Colors[colorScheme ?? 'light'].icon + '40',
                    },
                  ]}
                >
                  {isSelected && (
                    <View
                      style={[
                        styles.radioCircleInner,
                        {
                          backgroundColor: Colors[colorScheme ?? 'light'].tint,
                        },
                      ]}
                    />
                  )}
                </View>
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={20}
                  color={isSelected ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].icon}
                  style={styles.radioIcon}
                />
                <View style={styles.radioTextContainer}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={[
                      styles.radioLabel,
                      isSelected && { color: Colors[colorScheme ?? 'light'].tint }
                    ]}
                  >
                    {option.label}
                  </ThemedText>
                  <ThemedText style={styles.radioDescription}>
                    {option.description}
                  </ThemedText>
                </View>
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
    padding: 24,
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  radioIcon: {
    marginRight: 12,
  },
  radioTextContainer: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 15,
    marginBottom: 2,
  },
  radioDescription: {
    fontSize: 13,
    opacity: 0.6,
    lineHeight: 18,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    minHeight: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#00000010',
  },
  toggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 16,
  },
  toggleText: {
    marginLeft: 16,
    flex: 1,
  },
  toggleDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
