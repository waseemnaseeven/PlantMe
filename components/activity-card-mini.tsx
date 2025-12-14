import { ActivityColors, Colors, SemanticColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Activity } from '@/types/activity';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface ActivityCardMiniProps {
  activity: Activity;
  distance?: number;
  onPress?: () => void;
}

export function ActivityCardMini({
  activity,
  distance,
  onPress,
}: ActivityCardMiniProps) {
  const colorScheme = useColorScheme();
  const activityColor = ActivityColors[activity.type];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return { month, day };
  };

  const { month, day } = formatDate(activity.date);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <ThemedView style={styles.card}>
        {/* Image */}
        <Image
          source={{ uri: activity.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />

        {/* Date Badge */}
        <View style={styles.dateBadge}>
          <ThemedText style={styles.dateMonth}>{month}</ThemedText>
          <ThemedText style={styles.dateDay}>{day}</ThemedText>
        </View>

        {/* Type Badge */}
        <View
          style={[
            styles.typeBadge,
            { backgroundColor: activityColor },
          ]}
        >
          <ThemedText 
            style={[
              styles.typeText,
              { color: activity.type === 'meetup' ? '#001731' : '#42330D' }
            ]}
          >
            {activity.type.replace('-', ' ')}
          </ThemedText>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <ThemedText
            type="defaultSemiBold"
            style={styles.title}
            numberOfLines={2}
          >
            {activity.title}
          </ThemedText>

          {/* Meta Info */}
          <View style={styles.metaRow}>
            {distance !== undefined && (
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={14}
                  color={Colors[colorScheme ?? 'light'].icon}
                />
                <ThemedText style={styles.metaText}>
                  {distance.toFixed(1)}km
                </ThemedText>
              </View>
            )}

            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="account-group"
                size={14}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.metaText}>
                {activity.attendees}/{activity.capacity}
              </ThemedText>
            </View>

            {activity.price === 0 ? (
              <View style={styles.metaItem}>
                <ThemedText
                  style={[styles.metaText, { color: SemanticColors.success, fontWeight: '600' }]}
                >
                  Free
                </ThemedText>
              </View>
            ) : (
              <View style={styles.metaItem}>
                <ThemedText style={styles.metaText}>€{activity.price}</ThemedText>
              </View>
            )}
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 130,
    backgroundColor: '#f0f0f0',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    lineHeight: 20,
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
