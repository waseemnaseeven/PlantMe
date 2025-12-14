import { Colors, GamificationColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface CommunityHighlightsProps {
  activeMembers: number;
  recentAchievements: number;
  upcomingActivities: number;
}

export function CommunityHighlights({
  activeMembers,
  recentAchievements,
  upcomingActivities,
}: CommunityHighlightsProps) {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="account-group"
          size={24}
          color={Colors[colorScheme ?? 'light'].tint}
        />
        <ThemedText type="defaultSemiBold" style={styles.title}>
          Community Pulse
        </ThemedText>
      </View>

      <View style={styles.statsGrid}>
        {/* Active Members */}
        <View style={styles.statItem}>
          <View
            style={[
              styles.statIconContainer,
              { backgroundColor: GamificationColors.experience + '20' },
            ]}
          >
            <MaterialCommunityIcons
              name="account-multiple"
              size={20}
              color={GamificationColors.experience}
            />
          </View>
          <ThemedText type="defaultSemiBold" style={styles.statNumber}>
            {activeMembers}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Active Today</ThemedText>
        </View>

        {/* Recent Achievements */}
        <View style={styles.statItem}>
          <View
            style={[
              styles.statIconContainer,
              { backgroundColor: GamificationColors.achievement + '20' },
            ]}
          >
            <MaterialCommunityIcons
              name="trophy-variant"
              size={20}
              color={GamificationColors.achievement}
            />
          </View>
          <ThemedText type="defaultSemiBold" style={styles.statNumber}>
            {recentAchievements}
          </ThemedText>
          <ThemedText style={styles.statLabel}>New Achievements</ThemedText>
        </View>

        {/* Upcoming Activities */}
        <View style={styles.statItem}>
          <View
            style={[
              styles.statIconContainer,
              { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' },
            ]}
          >
            <MaterialCommunityIcons
              name="calendar-star"
              size={20}
              color={Colors[colorScheme ?? 'light'].tint}
            />
          </View>
          <ThemedText type="defaultSemiBold" style={styles.statNumber}>
            {upcomingActivities}
          </ThemedText>
          <ThemedText style={styles.statLabel}>This Week</ThemedText>
        </View>
      </View>

      {/* Motivational Message */}
      <View style={styles.messageContainer}>
        <MaterialCommunityIcons
          name="heart"
          size={16}
          color={GamificationColors.streak}
        />
        <ThemedText style={styles.message}>
          Join our growing community of plant-based enthusiasts!
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.6,
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#00000010',
  },
  message: {
    fontSize: 13,
    opacity: 0.7,
    fontStyle: 'italic',
  },
});
