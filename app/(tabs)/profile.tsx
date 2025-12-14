import { AchievementsGrid } from '@/components/achievements-grid';
import { ConstraintsSelector } from '@/components/constraints-selector';
import { DietObjectives } from '@/components/diet-objectives';
import { ProfileHeader } from '@/components/profile-header';
import { StatsCard } from '@/components/stats-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { ALL_ACHIEVEMENTS, mockUserProfile } from '@/data/profile';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Constraints, DietObjectiveType, UserProfile } from '@/types/profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [originalProfile, setOriginalProfile] = useState<UserProfile>(mockUserProfile);
  const [refreshing, setRefreshing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [fabAnimation] = useState(new Animated.Value(0));

  // Check if profile has changes
  useEffect(() => {
    const profileChanged = 
      profile.dietObjective !== originalProfile.dietObjective ||
      JSON.stringify(profile.constraints) !== JSON.stringify(originalProfile.constraints);
    
    setHasChanges(profileChanged);

    // Animate FAB in/out
    Animated.spring(fabAnimation, {
      toValue: profileChanged ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [profile, originalProfile]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // In a real app, you would fetch updated profile data here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleDietObjectiveChange = (objective: DietObjectiveType) => {
    setProfile({
      ...profile,
      dietObjective: objective,
    });
  };

  const handleConstraintsChange = (constraints: Constraints) => {
    setProfile({
      ...profile,
      constraints,
    });
  };

  const handleSave = () => {
    // In a real app, you would save to backend here
    setOriginalProfile(profile);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setHasChanges(false);
  };

  // Combine user's unlocked achievements with all available achievements
  const allAchievementsWithStatus = ALL_ACHIEVEMENTS.map((achievement) => {
    const userAchievement = profile.achievements.find(
      (a) => a.id === achievement.id
    );
    return userAchievement || achievement;
  });

  return (
    <ThemedView style={styles.container}>
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
        <View style={styles.topBar}>
          <ThemedText type="title" style={styles.screenTitle}>
            Profile
          </ThemedText>
        </View>

        {/* Profile Header with Gamification */}
        <ProfileHeader profile={profile} />

        {/* Diet Objectives Section */}
        <DietObjectives
          selectedObjective={profile.dietObjective}
          onObjectiveChange={handleDietObjectiveChange}
        />

        {/* Constraints & Preferences Section */}
        <ConstraintsSelector
          constraints={profile.constraints}
          onConstraintsChange={handleConstraintsChange}
        />

        {/* Achievements Section */}
        <AchievementsGrid
          achievements={allAchievementsWithStatus}
          maxDisplay={9}
        />

        {/* Stats Section */}
        <StatsCard stats={profile.stats} />

        {/* Additional Info Section */}
        <ThemedView style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
            <ThemedText style={styles.infoText}>
              Member since {new Date(profile.joinedDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </ThemedText>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="email"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
            <ThemedText style={styles.infoText}>{profile.email}</ThemedText>
          </View>
        </ThemedView>

        {/* Settings Shortcuts */}
        <ThemedView style={styles.settingsCard}>
          <ThemedText type="defaultSemiBold" style={styles.settingsTitle}>
            Quick Settings
          </ThemedText>

          <Pressable
            style={({ pressed }) => [
              styles.settingRow,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.settingText}>Notifications</ThemedText>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.settingRow,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons
                name="share-variant"
                size={20}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.settingText}>Share Progress</ThemedText>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.settingRow,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons
                name="cog"
                size={20}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.settingText}>Settings</ThemedText>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
          </Pressable>
        </ThemedView>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      {hasChanges && (
        <Animated.View
          style={[
            styles.fabContainer,
            {
              transform: [
                {
                  translateY: fabAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
                {
                  scale: fabAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
              opacity: fabAnimation,
            },
          ]}
        >
          <Pressable
            onPress={handleCancel}
            style={({ pressed }) => [
              styles.fabButton,
              styles.fabCancel,
              {
                backgroundColor: '#ff4444',
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <MaterialCommunityIcons name="close" size={24} color="#fff" />
          </Pressable>
          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [
              styles.fabButton,
              styles.fabSave,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <MaterialCommunityIcons name="check" size={24} color="#fff" />
          </Pressable>
        </Animated.View>
      )}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 32,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    flexDirection: 'row',
    gap: 16,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabCancel: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  fabSave: {
    // Main save button keeps default size
  },
  infoCard: {
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 16,
    opacity: 0.8,
  },
  settingsCard: {
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
  settingsTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#00000010',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 14,
    marginLeft: 16,
  },
  bottomPadding: {
    height: 48,
  },
});
