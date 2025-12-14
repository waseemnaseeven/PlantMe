import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, GamificationColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserStats } from '@/types/profile';
import { formatNumber } from '@/utils/gamification';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface StatsCardProps {
  stats: UserStats;
}

export function StatsCard({ stats }: StatsCardProps) {
  const colorScheme = useColorScheme();

  const statItems = [
    {
      icon: 'calendar-check',
      label: 'Activities',
      value: stats.activitiesAttended,
      color: GamificationColors.achievement,
    },
    {
      icon: 'school',
      label: 'Workshops',
      value: stats.workshopsCompleted,
      color: '#2196F3',
    },
    {
      icon: 'silverware-fork-knife',
      label: 'Dinners Hosted',
      value: stats.dinnerPartiesHosted,
      color: '#FF6B35',
    },
    {
      icon: 'account-group',
      label: 'Meetups',
      value: stats.meetupsOrganized,
      color: '#4CAF50',
    },
    {
      icon: 'fire',
      label: 'Current Streak',
      value: stats.currentStreak,
      suffix: 'd',
      color: GamificationColors.streak,
    },
    {
      icon: 'fire-circle',
      label: 'Longest Streak',
      value: stats.longestStreak,
      suffix: 'd',
      color: '#FF9800',
    },
    {
      icon: 'account-heart',
      label: 'Friends',
      value: stats.friendsConnected,
      color: '#E91E63',
    },
    {
      icon: 'chef-hat',
      label: 'Recipes Shared',
      value: stats.recipesShared,
      color: '#9C27B0',
    },
    {
      icon: 'leaf',
      label: 'CO₂ Saved',
      value: stats.co2Saved,
      suffix: 'kg',
      color: '#4CAF50',
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="chart-box"
          size={24}
          color={Colors[colorScheme ?? 'light'].tint}
        />
        <ThemedText type="subtitle" style={styles.title}>
          Your Impact
        </ThemedText>
      </View>

      <ThemedText style={styles.description}>
        Track your journey towards a more sustainable lifestyle
      </ThemedText>

      <View style={styles.statsGrid}>
        {statItems.map((item, index) => (
          <View
            key={index}
            style={[
              styles.statItem,
              {
                backgroundColor: item.color + '15',
                borderColor: item.color + '30',
              },
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={28}
              color={item.color}
            />
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {formatNumber(item.value)}
              {item.suffix && (
                <ThemedText style={styles.statSuffix}>{item.suffix}</ThemedText>
              )}
            </ThemedText>
            <ThemedText style={styles.statLabel} numberOfLines={1}>
              {item.label}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Environmental Impact Highlight */}
      <View
        style={[
          styles.impactCard,
          {
            backgroundColor: GamificationColors.experience + '20',
            borderColor: GamificationColors.experience,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="earth"
          size={32}
          color={GamificationColors.experience}
        />
        <View style={styles.impactText}>
          <ThemedText type="defaultSemiBold" style={styles.impactTitle}>
            Environmental Impact
          </ThemedText>
          <ThemedText style={styles.impactDescription}>
            By choosing plant-based options, you've saved approximately{' '}
            <ThemedText type="defaultSemiBold">{stats.co2Saved}kg of CO₂</ThemedText>
            {' '}— equivalent to driving{' '}
            <ThemedText type="defaultSemiBold">
              {Math.round(stats.co2Saved * 4.5)}km
            </ThemedText>
            {' '}less!
          </ThemedText>
        </View>
      </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statItem: {
    width: '30%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  statValue: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 4,
  },
  statSuffix: {
    fontSize: 14,
    opacity: 0.7,
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.7,
    textAlign: 'center',
  },
  impactCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'flex-start',
  },
  impactText: {
    flex: 1,
    marginLeft: 12,
  },
  impactTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  impactDescription: {
    fontSize: 13,
    opacity: 0.8,
    lineHeight: 18,
  },
});
