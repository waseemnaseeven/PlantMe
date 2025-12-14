import { ActivityColors, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ActivityType } from '@/types/activity';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export interface FilterOptions {
  types: ActivityType[];
  dateRange: 'all' | 'today' | 'week' | 'month';
  maxDistance: number | null; // in kilometers, null means no limit
  sortBy: 'date' | 'distance' | 'price';
}

interface ActivityFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  hasLocation: boolean;
}

export function ActivityFilters({
  filters,
  onFiltersChange,
  hasLocation,
}: ActivityFiltersProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [modalVisible, setModalVisible] = useState(false);

  const activityTypes: { value: ActivityType; label: string }[] = [
    { value: 'workshop', label: 'Workshops' },
    { value: 'dinner-party', label: 'Dinner Parties' },
    { value: 'meetup', label: 'Meetups' },
  ];

  const dateRanges: { value: FilterOptions['dateRange']; label: string }[] = [
    { value: 'all', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ];

  const distanceOptions: { value: number | null; label: string }[] = [
    { value: null, label: 'Any Distance' },
    { value: 1, label: 'Within 1 km' },
    { value: 5, label: 'Within 5 km' },
    { value: 10, label: 'Within 10 km' },
    { value: 20, label: 'Within 20 km' },
  ];

  const sortOptions: { value: FilterOptions['sortBy']; label: string; icon: string }[] = [
    { value: 'date', label: 'Date', icon: 'calendar' },
    { value: 'distance', label: 'Distance', icon: 'map-marker-distance' },
    { value: 'price', label: 'Price', icon: 'currency-eur' },
  ];

  const toggleType = (type: ActivityType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.types.length < 3) count++;
    if (filters.dateRange !== 'all') count++;
    if (filters.maxDistance !== null) count++;
    if (filters.sortBy !== 'date') count++;
    return count;
  };

  const clearFilters = () => {
    onFiltersChange({
      types: ['workshop', 'dinner-party', 'meetup'],
      dateRange: 'all',
      maxDistance: null,
      sortBy: 'date',
    });
  };

  const activeCount = getActiveFiltersCount();

  return (
    <>
      {/* Filter Button */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={[
          styles.filterButton,
          {
            backgroundColor: isDark ? '#2C2C2C' : '#F5F5F5',
          },
        ]}
      >
        <MaterialCommunityIcons
          name="filter-variant"
          size={20}
          color={Colors[colorScheme ?? 'light'].tint}
        />
        <ThemedText style={styles.filterButtonText}>Filters</ThemedText>
        {activeCount > 0 && (
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>{activeCount}</ThemedText>
          </View>
        )}
      </Pressable>

      {/* Filter Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <ThemedText type="title">Filters</ThemedText>
            <Pressable onPress={() => setModalVisible(false)}>
              <MaterialCommunityIcons
                name="close"
                size={28}
                color={Colors[colorScheme ?? 'light'].text}
              />
            </Pressable>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Activity Types */}
            <View style={styles.section}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Activity Type
              </ThemedText>
              <View style={styles.chipContainer}>
                {activityTypes.map((type) => {
                  const isSelected = filters.types.includes(type.value);
                  return (
                    <Pressable
                      key={type.value}
                      onPress={() => toggleType(type.value)}
                      style={[
                        styles.chip,
                        {
                          backgroundColor: isSelected
                            ? ActivityColors[type.value]
                            : isDark
                            ? '#2C2C2C'
                            : '#F5F5F5',
                        },
                      ]}
                    >
                      <ThemedText
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {type.label}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Date Range */}
            <View style={styles.section}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Date Range
              </ThemedText>
              <View style={styles.chipContainer}>
                {dateRanges.map((range) => {
                  const isSelected = filters.dateRange === range.value;
                  return (
                    <Pressable
                      key={range.value}
                      onPress={() =>
                        onFiltersChange({ ...filters, dateRange: range.value })
                      }
                      style={[
                        styles.chip,
                        {
                          backgroundColor: isSelected
                            ? Colors[colorScheme ?? 'light'].tint
                            : isDark
                            ? '#2C2C2C'
                            : '#F5F5F5',
                        },
                      ]}
                    >
                      <ThemedText
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {range.label}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Distance */}
            {hasLocation && (
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Distance
                </ThemedText>
                <View style={styles.chipContainer}>
                  {distanceOptions.map((option) => {
                    const isSelected = filters.maxDistance === option.value;
                    return (
                      <Pressable
                        key={option.label}
                        onPress={() =>
                          onFiltersChange({ ...filters, maxDistance: option.value })
                        }
                        style={[
                          styles.chip,
                          {
                            backgroundColor: isSelected
                              ? Colors[colorScheme ?? 'light'].tint
                              : isDark
                              ? '#2C2C2C'
                              : '#F5F5F5',
                          },
                        ]}
                      >
                        <ThemedText
                          style={[
                            styles.chipText,
                            isSelected && styles.chipTextSelected,
                          ]}
                        >
                          {option.label}
                        </ThemedText>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Sort By */}
            <View style={styles.section}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Sort By
              </ThemedText>
              <View style={styles.chipContainer}>
                {sortOptions.map((option) => {
                  const isSelected = filters.sortBy === option.value;
                  // Disable distance sort if no location
                  const isDisabled = option.value === 'distance' && !hasLocation;
                  return (
                    <Pressable
                      key={option.value}
                      onPress={() =>
                        !isDisabled &&
                        onFiltersChange({ ...filters, sortBy: option.value })
                      }
                      disabled={isDisabled}
                      style={[
                        styles.chip,
                        {
                          backgroundColor: isSelected
                            ? Colors[colorScheme ?? 'light'].tint
                            : isDark
                            ? '#2C2C2C'
                            : '#F5F5F5',
                          opacity: isDisabled ? 0.5 : 1,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={option.icon as any}
                        size={16}
                        color={
                          isSelected
                            ? '#fff'
                            : Colors[colorScheme ?? 'light'].text
                        }
                      />
                      <ThemedText
                        style={[
                          styles.chipText,
                          isSelected && styles.chipTextSelected,
                        ]}
                      >
                        {option.label}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <Pressable
              onPress={clearFilters}
              style={[
                styles.footerButton,
                {
                  backgroundColor: isDark ? '#2C2C2C' : '#F5F5F5',
                },
              ]}
            >
              <ThemedText style={styles.footerButtonText}>Clear All</ThemedText>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={[
                styles.footerButton,
                styles.applyButton,
                {
                  backgroundColor: Colors[colorScheme ?? 'light'].tint,
                },
              ]}
            >
              <ThemedText style={[styles.footerButtonText, styles.applyButtonText]}>
                Apply Filters
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: 16,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1.5,
  },
  applyButtonText: {
    color: '#fff',
  },
});
