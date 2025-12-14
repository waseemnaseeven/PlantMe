import { ActivityColors, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Activity } from '@/types/activity';
import { formatDistance } from '@/utils/distance';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface ActivityCardProps {
  activity: Activity;
  distance?: number; // Distance in kilometers
  onPress?: () => void;
}

export function ActivityCard({ activity, distance, onPress }: ActivityCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getActivityIconName = (
    type: Activity['type']
  ): keyof typeof MaterialCommunityIcons.glyphMap => {
    switch (type) {
      case 'workshop':
        return 'book-open-variant';
      case 'dinner-party':
        return 'silverware-fork-knife';
      case 'meetup':
        return 'account-group';
      default:
        return 'calendar';
    }
  };

  const getActivityLabel = (type: Activity['type']) => {
    switch (type) {
      case 'workshop':
        return 'Workshop';
      case 'dinner-party':
        return 'Dinner Party';
      case 'meetup':
        return 'Meetup';
      default:
        return 'Event';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    if (price === 0) {
      return 'Free';
    }
    return `€${price}`;
  };

  const getAvailabilityColor = () => {
    if (!activity.capacity || !activity.attendees) return '#666';
    const ratio = activity.attendees / activity.capacity;
    if (ratio >= 0.9) return '#FF6B6B'; // Almost full - red
    if (ratio >= 0.7) return '#FFA500'; // Getting full - orange
    return '#4CAF50'; // Available - green
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? 'light'].cardBackground,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <ThemedView style={styles.card}>
        {/* Image */}
        <Image
          source={{ uri: activity.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />

        {/* Type Badge */}
        <View
          style={[
            styles.typeBadge,
            { backgroundColor: ActivityColors[activity.type] },
          ]}
        >
          <MaterialCommunityIcons
            name={getActivityIconName(activity.type)}
            size={14}
            color="#fff"
          />
          <ThemedText style={styles.typeBadgeText}>
            {getActivityLabel(activity.type)}
          </ThemedText>
        </View>

        {/* Price Badge */}
        <View
          style={[
            styles.priceBadge,
            {
              backgroundColor: activity.price === 0 ? '#4CAF50' : '#2196F3',
            },
          ]}
        >
          <ThemedText style={styles.priceBadgeText}>
            {formatPrice(activity.price)}
          </ThemedText>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
            {activity.title}
          </ThemedText>

          <ThemedText style={styles.description} numberOfLines={2}>
            {activity.description}
          </ThemedText>

          {/* Info Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.infoText}>
                {formatDate(activity.date)}
              </ThemedText>
            </View>

            {distance !== undefined && (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={16}
                  color={Colors[colorScheme ?? 'light'].icon}
                />
                <ThemedText style={styles.infoText}>
                  {formatDistance(distance)}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Capacity Info */}
          {activity.capacity && activity.attendees !== undefined && (
            <View style={styles.capacityRow}>
              <MaterialCommunityIcons
                name="account-group"
                size={16}
                color={getAvailabilityColor()}
              />
              <ThemedText style={[styles.capacityText, { color: getAvailabilityColor() }]}>
                {activity.attendees}/{activity.capacity} attendees
              </ThemedText>
            </View>
          )}

          {/* Address */}
          <View style={styles.addressRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={14}
              color={Colors[colorScheme ?? 'light'].icon}
            />
            <ThemedText style={styles.addressText} numberOfLines={1}>
              {activity.address}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.light.grey[200],
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  priceBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    opacity: 0.8,
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  capacityText: {
    fontSize: 13,
    fontWeight: '600',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressText: {
    fontSize: 12,
    opacity: 0.6,
    flex: 1,
  },
});
