import { GamificationColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserStats } from '@/types/profile';
import { calculateLevel } from '@/utils/gamification';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface QuickStatsProps {
  stats: UserStats;
}

export function QuickStats({ stats }: QuickStatsProps) {
  const colorScheme = useColorScheme();
  const levelInfo = calculateLevel(stats.totalPoints);
  const progressToNextLevel =
    ((stats.totalPoints - levelInfo.minPoints) /
      (levelInfo.maxPoints - levelInfo.minPoints)) *
    100;

  return (
    <View style={styles.container}>
      {/* Level Card */}
      <ThemedView style={styles.statCard}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="trophy"
            size={24}
            color={levelInfo.color}
          />
        </View>
        <View style={styles.statContent}>
          <ThemedText style={styles.statLabel}>Level</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {stats.level}
          </ThemedText>
          <ThemedText style={styles.statSubtext}>{levelInfo.title}</ThemedText>
        </View>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progressToNextLevel}%`,
                backgroundColor: levelInfo.color,
              },
            ]}
          />
        </View>
      </ThemedView>

      {/* Streak Card */}
      <ThemedView style={styles.statCard}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="fire"
            size={24}
            color={GamificationColors.streak}
          />
        </View>
        <View style={styles.statContent}>
          <ThemedText style={styles.statLabel}>Streak</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {stats.currentStreak}
          </ThemedText>
          <ThemedText style={styles.statSubtext}>days</ThemedText>
        </View>
      </ThemedView>

      {/* Points Card */}
      <ThemedView style={styles.statCard}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="star"
            size={24}
            color={GamificationColors.achievement}
          />
        </View>
        <View style={styles.statContent}>
          <ThemedText style={styles.statLabel}>Points</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {stats.totalPoints}
          </ThemedText>
          <ThemedText style={styles.statSubtext}>total</ThemedText>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    marginBottom: 8,
  },
  statContent: {
    gap: 2,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  statValue: {
    fontSize: 24,
    lineHeight: 28,
  },
  statSubtext: {
    fontSize: 11,
    opacity: 0.5,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#00000010',
  },
  progressBar: {
    height: '100%',
  },
});
