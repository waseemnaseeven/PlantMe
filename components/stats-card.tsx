import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
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
    },
    {
      icon: 'school',
      label: 'Workshops',
      value: stats.workshopsCompleted,
    },
    {
      icon: 'silverware-fork-knife',
      label: 'Dinners Hosted',
      value: stats.dinnerPartiesHosted,
    },
    {
      icon: 'account-group',
      label: 'Meetups',
      value: stats.meetupsOrganized,
    },
    {
      icon: 'fire',
      label: 'Current Streak',
      value: stats.currentStreak,
      suffix: 'd',
    },
    {
      icon: 'fire-circle',
      label: 'Longest Streak',
      value: stats.longestStreak,
      suffix: 'd',
    },
    {
      icon: 'account-heart',
      label: 'Friends',
      value: stats.friendsConnected,
    },
    {
      icon: 'chef-hat',
      label: 'Recipes Shared',
      value: stats.recipesShared,
    },
    {
      icon: 'leaf',
      label: 'CO₂ Saved',
      value: stats.co2Saved,
      suffix: 'kg',
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
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                borderColor: Colors[colorScheme ?? 'light'].icon + '20',
              },
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={28}
              color={Colors[colorScheme ?? 'light'].icon}
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
            backgroundColor: Colors[colorScheme ?? 'light'].tint + '10',
            borderColor: Colors[colorScheme ?? 'light'].tint + '30',
          },
        ]}
      >
        <MaterialCommunityIcons
          name="earth"
          size={32}
          color={Colors[colorScheme ?? 'light'].tint}
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    minWidth: '30%',
    maxWidth: '32%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 104,
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
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  impactText: {
    flex: 1,
    marginLeft: 16,
  },
  impactTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  impactDescription: {
    fontSize: 13,
    opacity: 0.8,
    lineHeight: 20,
  },
});
