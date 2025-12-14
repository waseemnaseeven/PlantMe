import { AchievementsGrid } from '@/components/achievements-grid';
import { ConstraintsSelector } from '@/components/constraints-selector';
import { DietObjectives } from '@/components/diet-objectives';
import { ProfileHeader } from '@/components/profile-header';
import { StatsCard } from '@/components/stats-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { ALL_ACHIEVEMENTS, DIET_OBJECTIVES, GEOGRAPHIC_OPTIONS, mockUserProfile } from '@/data/profile';
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
  Switch,
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
      JSON.stringify(profile.constraints) !== JSON.stringify(originalProfile.constraints) ||
      profile.notificationsEnabled !== originalProfile.notificationsEnabled ||
      profile.shareProgressPublicly !== originalProfile.shareProgressPublicly;
    
    setHasChanges(profileChanged);

    // Animate FAB in/out
    Animated.spring(fabAnimation, {
      toValue: profileChanged ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [profile, originalProfile, fabAnimation]);

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

  const handleNotificationsToggle = (enabled: boolean) => {
    setProfile({
      ...profile,
      notificationsEnabled: enabled,
    });
  };

  const handleShareProgressToggle = (enabled: boolean) => {
    setProfile({
      ...profile,
      shareProgressPublicly: enabled,
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

  const dietObjectiveLabel =
    DIET_OBJECTIVES.find((objective) => objective.id === profile.dietObjective)
      ?.title ?? 'Custom goal';
  const dietObjectiveDescription =
    DIET_OBJECTIVES.find((objective) => objective.id === profile.dietObjective)
      ?.description ?? 'Personalized balance';
  const geographicLabel =
    GEOGRAPHIC_OPTIONS.find((option) => option.value === profile.constraints.geographic)
      ?.label ?? 'Open to all';
  const restrictionsLabel =
    profile.constraints.dietaryRestrictions.length > 0
      ? profile.constraints.dietaryRestrictions.join(' • ')
      : 'No restrictions set';

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
        <View style={styles.topBar}>
          <ThemedText type="title" style={styles.screenTitle}>
            Profile
          </ThemedText>
        </View>

        {/* Profile Header with Gamification */}
        <ProfileHeader profile={profile} />

        {/* Diet focus & impact */}
        <ThemedView style={styles.focusCard}>
          <View style={styles.focusHeader}>
            <MaterialCommunityIcons
              name="food-apple"
              size={24}
              color={Colors[colorScheme ?? 'light'].tint}
            />
            <ThemedText type="subtitle" style={styles.focusTitle}>
              Current Diet
            </ThemedText>
          </View>

          <View style={styles.focusRow}>
            <MaterialCommunityIcons
              name="target-variant"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
            <View style={styles.focusCopy}>
              <ThemedText type="defaultSemiBold">{dietObjectiveLabel}</ThemedText>
              <ThemedText style={styles.focusDescription}>{dietObjectiveDescription}</ThemedText>
            </View>
          </View>

          <View style={styles.focusRow}>
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
            <View style={styles.focusCopy}>
              <ThemedText type="defaultSemiBold">Approvisionnement</ThemedText>
              <ThemedText style={styles.focusDescription}>
                {geographicLabel}
                {profile.constraints.preferLocal ? ' • Local' : ''}
                {profile.constraints.preferSeasonal ? ' • Saisonnier' : ''}
              </ThemedText>
            </View>
          </View>

          <View style={[styles.focusRow, styles.focusImpactRow]}>
            <MaterialCommunityIcons
              name="leaf"
              size={22}
              color={Colors[colorScheme ?? 'light'].tint}
            />
            <View style={styles.focusCopy}>
              <ThemedText type="defaultSemiBold">Impact</ThemedText>
              <ThemedText style={styles.focusDescription}>
                CO₂ évité : {profile.stats.co2Saved}kg • {profile.stats.currentStreak} jours d&apos;élan
              </ThemedText>
              <ThemedText style={styles.focusSubNote}>
                ~{Math.round(profile.stats.co2Saved * 4.5)} km non parcourus en voiture
              </ThemedText>
            </View>
          </View>

          {profile.constraints.dietaryRestrictions.length > 0 && (
            <View style={styles.focusRow}>
              <MaterialCommunityIcons
                name="shield-check"
                size={20}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.focusDescription}>{restrictionsLabel}</ThemedText>
            </View>
          )}
        </ThemedView>

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
          maxDisplay={6}
          compact
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

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
            <ThemedText style={styles.infoText}>
              {geographicLabel} sourcing
              {profile.constraints.preferLocal ? ' • Local-first' : ''}
              {profile.constraints.preferSeasonal ? ' • Seasonal' : ''}
            </ThemedText>
          </View>
        </ThemedView>

        {/* Settings Shortcuts */}
        <ThemedView style={styles.settingsCard}>
          <ThemedText type="defaultSemiBold" style={styles.settingsTitle}>
            Quick Settings
          </ThemedText>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <View style={styles.settingCopy}>
                <ThemedText style={styles.settingText}>Notifications</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Reminders for activities and streaks
                </ThemedText>
              </View>
            </View>
            <Switch
              value={profile.notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{
                false: Colors[colorScheme ?? 'light'].icon + '30',
                true: Colors[colorScheme ?? 'light'].tint + '70',
              }}
              thumbColor={
                profile.notificationsEnabled
                  ? Colors[colorScheme ?? 'light'].tint
                  : '#f4f3f4'
              }
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons
                name="share-variant"
                size={20}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <View style={styles.settingCopy}>
                <ThemedText style={styles.settingText}>Share progress</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Show badges and streaks to your friends
                </ThemedText>
              </View>
            </View>
            <Switch
              value={profile.shareProgressPublicly}
              onValueChange={handleShareProgressToggle}
              trackColor={{
                false: Colors[colorScheme ?? 'light'].icon + '30',
                true: Colors[colorScheme ?? 'light'].tint + '70',
              }}
              thumbColor={
                profile.shareProgressPublicly
                  ? Colors[colorScheme ?? 'light'].tint
                  : '#f4f3f4'
              }
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.settingRow,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons
                name="shield-lock"
                size={20}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <View style={styles.settingCopy}>
                <ThemedText style={styles.settingText}>Privacy & data</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Export data or adjust permissions
                </ThemedText>
              </View>
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
  focusCard: {
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  focusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  focusTitle: {
    fontSize: 18,
  },
  focusRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  focusCopy: {
    flex: 1,
  },
  focusDescription: {
    fontSize: 13,
    opacity: 0.75,
    marginTop: 4,
    lineHeight: 18,
  },
  focusSubNote: {
    fontSize: 12,
    opacity: 0.65,
    marginTop: 4,
  },
  focusImpactRow: {
    paddingVertical: 4,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 96, // 96px from bottom (above nav bar)
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
  },
  settingCopy: {
    marginLeft: 16,
    flex: 1,
  },
  settingDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  bottomPadding: {
    height: 48,
  },
});
