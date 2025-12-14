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
import React, { useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [refreshing, setRefreshing] = useState(false);
  const [editMode, setEditMode] = useState(false);

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

  const toggleEditMode = () => {
    setEditMode(!editMode);
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
        {/* Header with Edit Button */}
        <View style={styles.topBar}>
          <ThemedText type="title" style={styles.screenTitle}>
            Profile
          </ThemedText>
          <Pressable
            onPress={toggleEditMode}
            style={({ pressed }) => [
              styles.editButton,
              {
                backgroundColor: editMode
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].background,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={editMode ? 'check' : 'pencil'}
              size={20}
              color={
                editMode
                  ? '#fff'
                  : Colors[colorScheme ?? 'light'].tint
              }
            />
            <ThemedText
              style={[
                styles.editButtonText,
                editMode && { color: '#fff' },
              ]}
            >
              {editMode ? 'Save' : 'Edit'}
            </ThemedText>
          </Pressable>
        </View>

        {/* Profile Header with Gamification */}
        <ProfileHeader profile={profile} />

        {/* Diet Objectives Section */}
        <DietObjectives
          selectedObjective={profile.dietObjective}
          onObjectiveChange={handleDietObjectiveChange}
          editable={editMode}
        />

        {/* Constraints & Preferences Section */}
        <ConstraintsSelector
          constraints={profile.constraints}
          onConstraintsChange={handleConstraintsChange}
          editable={editMode}
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00000020',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  infoCard: {
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 12,
    opacity: 0.8,
  },
  settingsCard: {
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
  settingsTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#00000010',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 14,
    marginLeft: 12,
  },
  bottomPadding: {
    height: 40,
  },
});
