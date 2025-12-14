import { ActivityCard } from '@/components/activity-card';
import { ActivityFilters, FilterOptions } from '@/components/activity-filters';
import { ActivityMap } from '@/components/activity-map';
import { ActivitySearch } from '@/components/activity-search';
import { LocationInput } from '@/components/location-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { mockActivities } from '@/data/activities';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Activity } from '@/types/activity';
import { calculateDistance } from '@/utils/distance';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

interface ActivityWithDistance extends Activity {
  distance?: number;
}

type ViewMode = 'list' | 'map';

export default function EventsScreen() {
  const colorScheme = useColorScheme();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    types: ['workshop', 'dinner-party', 'meetup'],
    dateRange: 'all',
    maxDistance: null,
    sortBy: 'date',
  });

  // Calculate distances for all activities
  const activitiesWithDistance: ActivityWithDistance[] = useMemo(() => {
    if (!userLocation) {
      return mockActivities;
    }

    return mockActivities.map((activity) => ({
      ...activity,
      distance: calculateDistance(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        activity.coordinate.latitude,
        activity.coordinate.longitude
      ),
    }));
  }, [userLocation]);

  // Filter and sort activities
  const filteredActivities = useMemo(() => {
    let filtered = activitiesWithDistance;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query) ||
          activity.address.toLowerCase().includes(query)
      );
    }

    // Filter by type
    filtered = filtered.filter((activity) =>
      filters.types.includes(activity.type)
    );

    // Filter by date range
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    filtered = filtered.filter((activity) => {
      const activityDate = new Date(activity.date);
      
      switch (filters.dateRange) {
        case 'today':
          return activityDate.toDateString() === today.toDateString();
        case 'week':
          const weekFromNow = new Date(today);
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          return activityDate >= today && activityDate <= weekFromNow;
        case 'month':
          const monthFromNow = new Date(today);
          monthFromNow.setMonth(monthFromNow.getMonth() + 1);
          return activityDate >= today && activityDate <= monthFromNow;
        case 'all':
        default:
          return true;
      }
    });

    // Filter by distance
    if (filters.maxDistance !== null && userLocation) {
      filtered = filtered.filter(
        (activity) =>
          activity.distance !== undefined &&
          activity.distance <= filters.maxDistance!
      );
    }

    // Sort activities
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'distance':
          if (a.distance === undefined) return 1;
          if (b.distance === undefined) return -1;
          return a.distance - b.distance;
        case 'price':
          return a.price - b.price;
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return filtered;
  }, [activitiesWithDistance, searchQuery, filters, userLocation]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // In a real app, you would fetch new data here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'list' ? 'map' : 'list'));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="calendar-remove"
        size={64}
        color={Colors[colorScheme ?? 'light'].icon}
      />
      <ThemedText type="defaultSemiBold" style={styles.emptyTitle}>
        No Activities Found
      </ThemedText>
      <ThemedText style={styles.emptyDescription}>
        Try adjusting your filters or search query
      </ThemedText>
    </View>
  );

  const renderListHeader = () => (
    <View>
      {/* Location Input */}
      <LocationInput onLocationChange={setUserLocation} />

      {/* Search Bar */}
      <ActivitySearch
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search activities..."
      />

      {/* Filters */}
      <View style={styles.filtersRow}>
        <ActivityFilters
          filters={filters}
          onFiltersChange={setFilters}
          hasLocation={userLocation !== null}
        />
        
        {/* Results Count */}
        <ThemedText style={styles.resultsCount}>
          {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
        </ThemedText>
      </View>
    </View>
  );

  // Render Map View
  if (viewMode === 'map') {
    return (
      <ThemedView style={[styles.container, { backgroundColor: 'transparent' }]}>
        {/* Map Controls Overlay */}
        <View style={styles.mapControlsContainer}>
          {/* Location Input */}
          <View style={styles.mapLocationInput}>
            <LocationInput onLocationChange={setUserLocation} />
          </View>

          {/* Search Bar */}
          <View style={styles.mapSearchBar}>
            <ActivitySearch
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search activities..."
            />
          </View>

          {/* Filters and View Toggle Row */}
          <View style={styles.mapFiltersRow}>
            <View style={styles.filtersWrapper}>
              <ActivityFilters
                filters={filters}
                onFiltersChange={setFilters}
                hasLocation={userLocation !== null}
              />
              <ThemedText style={styles.resultsCount}>
                {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Map */}
        <ActivityMap activities={filteredActivities} />

        {/* Floating View Toggle Button */}
        <Pressable
          style={[
            styles.floatingButton,
            {
              backgroundColor: Colors.light.actionDark
            },
            Shadows.lg,
          ]}
          onPress={toggleViewMode}
        >
          <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#fff" />
        </Pressable>
      </ThemedView>
    );
  }

  // Render List View
  return (
    <ThemedView style={[styles.container, { backgroundColor: 'transparent' }]}>
      <FlatList
        data={filteredActivities}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            distance={item.distance}
            onPress={() => router.push(`/activity/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          filteredActivities.length === 0 && styles.emptyListContent,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors[colorScheme ?? 'light'].action}
          />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />

      {/* Floating View Toggle Button */}
      <Pressable
        style={[
          styles.floatingButton,
          {
            backgroundColor: Colors.light.actionDark
          },
          Shadows.lg,
        ]}
        onPress={toggleViewMode}
      >
        <MaterialCommunityIcons name="map" size={24} color="#fff" />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xxxl + Spacing.xl, // Extra padding for floating button (48 + 32)
  },
  emptyListContent: {
    flexGrow: 1,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  resultsCount: {
    fontSize: 13,
    opacity: 0.6,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.xxxl + Spacing.md,
  },
  emptyTitle: {
    fontSize: 20,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: Spacing.xxxl + Spacing.xxxl, // 48 + 48 = 96px from bottom (above nav bar)
    right: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapControlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: Spacing.sm + Spacing.xs, // 12px
  },
  mapLocationInput: {
    paddingHorizontal: 0,
  },
  mapSearchBar: {
    paddingHorizontal: 0,
  },
  mapFiltersRow: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  filtersWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});
