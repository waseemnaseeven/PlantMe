import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Achievement } from '@/types/profile';
import { getAchievementRarityColor } from '@/utils/gamification';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

interface AchievementsGridProps {
  achievements: Achievement[];
  maxDisplay?: number;
}

export function AchievementsGrid({ achievements, maxDisplay }: AchievementsGridProps) {
  const colorScheme = useColorScheme();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  const displayAchievements = maxDisplay
    ? [...unlockedAchievements.slice(0, maxDisplay), ...lockedAchievements.slice(0, Math.max(0, maxDisplay - unlockedAchievements.length))]
    : achievements;

  const renderAchievement = (achievement: Achievement) => {
    const isUnlocked = !!achievement.unlockedAt;
    const rarityColor = getAchievementRarityColor(achievement.rarity);

    return (
      <Pressable
        key={achievement.id}
        onPress={() => setSelectedAchievement(achievement)}
        style={({ pressed }) => [
          styles.achievementCard,
          {
            backgroundColor: isUnlocked
              ? Colors[colorScheme ?? 'light'].tint + '10'
              : Colors[colorScheme ?? 'light'].background,
            borderColor: isUnlocked
              ? Colors[colorScheme ?? 'light'].tint + '30'
              : Colors[colorScheme ?? 'light'].icon + '20',
            opacity: pressed ? 0.7 : isUnlocked ? 1 : 0.5,
          },
        ]}
      >
        <View style={styles.achievementIconContainer}>
          <MaterialCommunityIcons
            name={isUnlocked ? (achievement.icon as any) : 'lock'}
            size={32}
            color={isUnlocked ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].icon}
          />
          {isUnlocked && (
            <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
              <ThemedText style={styles.rarityText} lightColor="#fff" darkColor="#fff">
                {achievement.rarity[0].toUpperCase()}
              </ThemedText>
            </View>
          )}
        </View>

        <ThemedText
          type="defaultSemiBold"
          style={styles.achievementTitle}
          numberOfLines={2}
        >
          {isUnlocked ? achievement.title : '???'}
        </ThemedText>

        {isUnlocked && achievement.points > 0 && (
          <View style={styles.pointsBadge}>
            <MaterialCommunityIcons name="star" size={12} color={Colors[colorScheme ?? 'light'].tint} />
            <ThemedText style={[styles.pointsText, { color: Colors[colorScheme ?? 'light'].tint }]}>
              +{achievement.points}
            </ThemedText>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="trophy-variant"
            size={24}
            color={Colors[colorScheme ?? 'light'].tint}
          />
          <ThemedText type="subtitle" style={styles.title}>
            Achievements
          </ThemedText>
        </View>
        <View style={styles.statsChip}>
          <ThemedText type="defaultSemiBold" style={styles.statsText}>
            {unlockedAchievements.length}/{achievements.length}
          </ThemedText>
        </View>
      </View>

      <View style={styles.grid}>
        {displayAchievements.map(renderAchievement)}
      </View>

      {maxDisplay && achievements.length > maxDisplay && (
        <ThemedText style={styles.moreText}>
          +{achievements.length - maxDisplay} more achievements
        </ThemedText>
      )}

      {/* Achievement Detail Modal */}
      <Modal
        visible={selectedAchievement !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedAchievement(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedAchievement(null)}
        >
          <Pressable
            style={[
              styles.modalContent,
              { backgroundColor: Colors[colorScheme ?? 'light'].background },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {selectedAchievement && (
              <>
                <View
                  style={[
                    styles.modalHeader,
                    {
                      backgroundColor: getAchievementRarityColor(
                        selectedAchievement.rarity
                      ),
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={
                      selectedAchievement.unlockedAt
                        ? (selectedAchievement.icon as any)
                        : 'lock'
                    }
                    size={64}
                    color="#fff"
                  />
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.modalTitleRow}>
                    <ThemedText type="title" style={styles.modalTitle}>
                      {selectedAchievement.unlockedAt
                        ? selectedAchievement.title
                        : 'Locked Achievement'}
                    </ThemedText>
                    <View
                      style={[
                        styles.rarityChip,
                        {
                          backgroundColor: getAchievementRarityColor(
                            selectedAchievement.rarity
                          ),
                        },
                      ]}
                    >
                      <ThemedText
                        style={styles.rarityChipText}
                        lightColor="#fff"
                        darkColor="#fff"
                      >
                        {selectedAchievement.rarity}
                      </ThemedText>
                    </View>
                  </View>

                  <ThemedText style={styles.modalDescription}>
                    {selectedAchievement.unlockedAt
                      ? selectedAchievement.description
                      : 'Complete the required actions to unlock this achievement'}
                  </ThemedText>

                  {selectedAchievement.points > 0 && (
                    <View style={styles.modalPoints}>
                      <MaterialCommunityIcons
                        name="star-circle"
                        size={20}
                        color={getAchievementRarityColor(selectedAchievement.rarity)}
                      />
                      <ThemedText type="defaultSemiBold" style={styles.modalPointsText}>
                        +{selectedAchievement.points} points
                      </ThemedText>
                    </View>
                  )}

                  {selectedAchievement.unlockedAt && (
                    <View style={styles.modalUnlocked}>
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={16}
                        color={Colors[colorScheme ?? 'light'].tint}
                      />
                      <ThemedText style={styles.modalUnlockedText}>
                        Unlocked on{' '}
                        {new Date(selectedAchievement.unlockedAt).toLocaleDateString()}
                      </ThemedText>
                    </View>
                  )}

                  <Pressable
                    style={[
                      styles.closeButton,
                      { backgroundColor: Colors[colorScheme ?? 'light'].tint },
                    ]}
                    onPress={() => setSelectedAchievement(null)}
                  >
                    <ThemedText
                      style={styles.closeButtonText}
                      lightColor="#fff"
                      darkColor="#fff"
                    >
                      Close
                    </ThemedText>
                  </Pressable>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
  },
  statsChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#00000010',
  },
  statsText: {
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achievementCard: {
    flex: 1,
    minWidth: '30%',
    maxWidth: '32%',
    aspectRatio: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  rarityBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rarityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  achievementTitle: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pointsText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  moreText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: 24,
  },
  modalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalTitle: {
    flex: 1,
    fontSize: 24,
    marginRight: 16,
  },
  rarityChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  rarityChipText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  modalDescription: {
    fontSize: 16,
    opacity: 0.8,
    lineHeight: 24,
    marginBottom: 16,
  },
  modalPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalPointsText: {
    fontSize: 16,
    marginLeft: 8,
  },
  modalUnlocked: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalUnlockedText: {
    fontSize: 14,
    opacity: 0.7,
    marginLeft: 8,
  },
  closeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
