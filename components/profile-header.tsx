import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, GamificationColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserProfile } from '@/types/profile';
import { calculateLevel, calculateLevelProgress, pointsToNextLevel } from '@/utils/gamification';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const colorScheme = useColorScheme();
  const levelConfig = calculateLevel(profile.stats.totalPoints);
  const progress = calculateLevelProgress(profile.stats.totalPoints);
  const pointsNeeded = pointsToNextLevel(profile.stats.totalPoints);

  return (
    <ThemedView style={styles.container}>
      {/* Avatar and Basic Info */}
      <View style={styles.avatarSection}>
        <View style={[styles.avatarContainer, { borderColor: levelConfig.color }]}>
          {profile.avatarUrl ? (
            <ThemedText>Avatar</ThemedText>
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              size={80}
              color={Colors[colorScheme ?? 'light'].icon}
            />
          )}
        </View>
        
        <View style={styles.nameSection}>
          <ThemedText type="title" style={styles.name}>
            {profile.name}
          </ThemedText>
          {profile.bio && (
            <ThemedText style={styles.bio} numberOfLines={2}>
              {profile.bio}
            </ThemedText>
          )}
        </View>
      </View>

      {/* Level Badge */}
      <View style={[styles.levelBadge, { backgroundColor: levelConfig.color }]}>
        <MaterialCommunityIcons 
          name={levelConfig.icon as any} 
          size={24} 
          color="#fff" 
        />
        <View style={styles.levelInfo}>
          <ThemedText style={styles.levelTitle} lightColor="#fff" darkColor="#fff">
            Level {levelConfig.level}
          </ThemedText>
          <ThemedText style={styles.levelName} lightColor="#fff" darkColor="#fff">
            {levelConfig.title}
          </ThemedText>
        </View>
      </View>

      {/* Points and Progress */}
      <View style={styles.progressSection}>
        <View style={styles.pointsRow}>
          <View style={styles.pointsInfo}>
            <MaterialCommunityIcons
              name="star-circle"
              size={20}
              color={GamificationColors.experience}
            />
            <ThemedText style={styles.pointsText}>
              {profile.stats.totalPoints.toLocaleString()} points
            </ThemedText>
          </View>
          
          {pointsNeeded > 0 && (
            <ThemedText style={styles.pointsNeeded}>
              {pointsNeeded} to next level
            </ThemedText>
          )}
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressBarContainer, { 
          backgroundColor: Colors[colorScheme ?? 'light'].icon + '20' 
        }]}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progress}%`,
                backgroundColor: levelConfig.color,
              },
            ]}
          />
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons
            name="calendar-check"
            size={24}
            color={GamificationColors.achievement}
          />
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {profile.stats.activitiesAttended}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Activities</ThemedText>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <MaterialCommunityIcons
            name="fire"
            size={24}
            color={GamificationColors.streak}
          />
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {profile.stats.currentStreak}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Day Streak</ThemedText>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <MaterialCommunityIcons
            name="trophy"
            size={24}
            color={GamificationColors.achievement}
          />
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {profile.achievements.filter(a => a.unlockedAt).length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Achievements</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  nameSection: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 18,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  levelInfo: {
    marginLeft: 12,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  levelName: {
    fontSize: 14,
    opacity: 0.9,
  },
  progressSection: {
    marginBottom: 16,
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  pointsNeeded: {
    fontSize: 12,
    opacity: 0.6,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#00000010',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#00000010',
  },
});
