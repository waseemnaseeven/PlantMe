import { ActivityCardMini } from '@/components/activity-card-mini';
import { CommunityHighlights } from '@/components/community-highlights';
import { QuickStats } from '@/components/quick-stats';
import { RecipeCard } from '@/components/recipe-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { mockActivities } from '@/data/activities';
import { mockUserProfile } from '@/data/profile';
import { getRecipesByDietObjective } from '@/data/recipes';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const profile = mockUserProfile;

  // Get upcoming activities (next 3)
  const upcomingActivities = mockActivities
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Get recipes based on user's diet objective
  const recommendedRecipes = getRecipesByDietObjective(profile.dietObjective).slice(0, 6);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: 'transparent' }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors[colorScheme ?? 'light'].tint}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            style={({ pressed }) => [
              styles.avatarButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View
              style={[
                styles.avatar,
                { backgroundColor: Colors[colorScheme ?? 'light'].tint },
              ]}
            >
              <ThemedText style={styles.avatarText}>
                {profile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </ThemedText>
            </View>
          </Pressable>
          <View>
            <ThemedText type="title" style={styles.greeting}>
              {getGreeting()}, {profile.name.split(' ')[0]}!
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Let's make today plant-powered
            </ThemedText>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <QuickStats stats={profile.stats} />
        </View>

        {/* Upcoming Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Upcoming Activities
            </ThemedText>
            <Pressable
              onPress={() => router.push('/(tabs)/events')}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <ThemedText
                style={[
                  styles.seeAllText,
                  { color: Colors[colorScheme ?? 'light'].tint },
                ]}
              >
                See All
              </ThemedText>
            </Pressable>
          </View>

          {upcomingActivities.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.activitiesScroll}
            >
              {upcomingActivities.map((activity) => (
                <ActivityCardMini
                  key={activity.id}
                  activity={activity}
                  onPress={() => router.push(`/activity/${activity.id}`)}
                />
              ))}
            </ScrollView>
          ) : (
            <ThemedView style={styles.emptyState}>
              <MaterialCommunityIcons
                name="calendar-blank"
                size={48}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.emptyText}>
                No upcoming activities yet
              </ThemedText>
            </ThemedView>
          )}
        </View>

        {/* Recipe Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Recipes for You
              </ThemedText>
              <ThemedText style={styles.sectionSubtitle}>
                Based on your {profile.dietObjective} goal
              </ThemedText>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recipesScroll}
          >
            {recommendedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() => {
                  // TODO: Navigate to recipe detail page
                  console.log('Recipe pressed:', recipe.id);
                }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Community Highlights */}
        <View style={styles.section}>
          <CommunityHighlights
            activeMembers={127}
            recentAchievements={34}
            upcomingActivities={upcomingActivities.length}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitleCentered}>
            Quick Actions
          </ThemedText>
          <View style={styles.actionsGrid}>
            <Pressable
              onPress={() => router.push('/(tabs)/events')}
              style={({ pressed }) => [
                styles.actionButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <ThemedView style={styles.actionCard}>
                <View
                  style={[
                    styles.actionIconContainer,
                    { backgroundColor: '#4CAF50' + '20' },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="calendar-plus"
                    size={28}
                    color="#4CAF50"
                  />
                </View>
                <ThemedText type="defaultSemiBold" style={styles.actionTitle}>
                  Join Activity
                </ThemedText>
                <ThemedText style={styles.actionDescription}>
                  Find events near you
                </ThemedText>
              </ThemedView>
            </Pressable>

            <Pressable
              onPress={() => {
                // TODO: Navigate to recipe sharing
                console.log('Share recipe pressed');
              }}
              style={({ pressed }) => [
                styles.actionButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <ThemedView style={styles.actionCard}>
                <View
                  style={[
                    styles.actionIconContainer,
                    { backgroundColor: '#FF6B35' + '20' },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="chef-hat"
                    size={28}
                    color="#FF6B35"
                  />
                </View>
                <ThemedText type="defaultSemiBold" style={styles.actionTitle}>
                  Share Recipe
                </ThemedText>
                <ThemedText style={styles.actionDescription}>
                  Inspire the community
                </ThemedText>
              </ThemedView>
            </Pressable>

            <Pressable
              onPress={() => router.push('/(tabs)/events')}
              style={({ pressed }) => [
                styles.actionButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <ThemedView style={styles.actionCard}>
                <View
                  style={[
                    styles.actionIconContainer,
                    { backgroundColor: '#2E7D32' + '20' },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="map-marker-radius"
                    size={28}
                    color="#2E7D32"
                  />
                </View>
                <ThemedText type="defaultSemiBold" style={styles.actionTitle}>
                  Explore Events
                </ThemedText>
                <ThemedText style={styles.actionDescription}>
                  Map & list view
                </ThemedText>
              </ThemedView>
            </Pressable>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 24,
    gap: 12
  },
  greeting: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  avatarButton: {
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
  },
  sectionSubtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  sectionTitleCentered: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  recipesScroll: {
    paddingLeft: 16,
    paddingRight: 16,
    gap: 16,
  },
  activitiesScroll: {
    paddingLeft: 16,
    paddingRight: 16,
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionButton: {
    width: '31%',
    minWidth: 100,
  },
  actionCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 11,
    opacity: 0.6,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 24,
  },
});
