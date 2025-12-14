import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ActivityColors, Colors } from '@/constants/theme';
import { mockActivities } from '@/data/activities';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Activity } from '@/types/activity';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Find the activity by ID
  const activity = useMemo(() => {
    return mockActivities.find((a) => a.id === id);
  }, [id]);

  if (!activity) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={64}
            color={Colors[colorScheme ?? 'light'].icon}
          />
          <ThemedText type="title" style={styles.errorTitle}>
            Activity Not Found
          </ThemedText>
          <ThemedText style={styles.errorDescription}>
            The activity you're looking for doesn't exist or has been removed.
          </ThemedText>
          <Pressable
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.buttonText}>Go Back</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    );
  }

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
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

  const getAvailabilityText = () => {
    if (!activity.capacity || !activity.attendees) return '';
    const spotsLeft = activity.capacity - activity.attendees;
    if (spotsLeft === 0) return 'Fully Booked';
    if (spotsLeft === 1) return '1 spot left';
    if (spotsLeft <= 3) return `Only ${spotsLeft} spots left!`;
    return `${spotsLeft} spots available`;
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this activity: ${activity.title}\n${activity.description}\n\nDate: ${formatDate(activity.date)}\nLocation: ${activity.address}`,
        title: activity.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleOpenMaps = () => {
    const { latitude, longitude } = activity.coordinate;
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = activity.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const handleJoinActivity = () => {
    Alert.alert(
      'Join Activity',
      `Would you like to register for "${activity.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Register',
          onPress: () => {
            // TODO: Implement registration logic
            Alert.alert('Success', 'You have been registered for this activity!');
          },
        },
      ]
    );
  };

  const isFullyBooked =
    activity.capacity && activity.attendees && activity.attendees >= activity.capacity;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: activity.imageUrl }}
            style={styles.heroImage}
            contentFit="cover"
            transition={200}
          />

          {/* Back Button */}
          <Pressable
            style={[styles.backButton, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={Colors[colorScheme ?? 'light'].text}
            />
          </Pressable>

          {/* Share Button */}
          <Pressable
            style={[styles.shareButton, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}
            onPress={handleShare}
          >
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color={Colors[colorScheme ?? 'light'].text}
            />
          </Pressable>

          {/* Type Badge */}
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: ActivityColors[activity.type] },
            ]}
          >
            <MaterialCommunityIcons
              name={getActivityIconName(activity.type)}
              size={16}
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
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <ThemedText type="title" style={styles.title}>
            {activity.title}
          </ThemedText>

          {/* Availability Status */}
          {activity.capacity && activity.attendees !== undefined && (
            <View style={styles.availabilityContainer}>
              <View
                style={[
                  styles.availabilityDot,
                  { backgroundColor: getAvailabilityColor() },
                ]}
              />
              <ThemedText
                style={[styles.availabilityText, { color: getAvailabilityColor() }]}
              >
                {getAvailabilityText()}
              </ThemedText>
            </View>
          )}

          {/* Description */}
          <ThemedText style={styles.description}>{activity.description}</ThemedText>

          {/* Details Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Details
            </ThemedText>

            {/* Date */}
            <View style={styles.detailRow}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' },
                ]}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  size={24}
                  color={Colors[colorScheme ?? 'light'].tint}
                />
              </View>
              <View style={styles.detailContent}>
                <ThemedText type="defaultSemiBold">Date</ThemedText>
                <ThemedText style={styles.detailText}>
                  {formatDate(activity.date)}
                </ThemedText>
              </View>
            </View>

            {/* Capacity */}
            {activity.capacity && activity.attendees !== undefined && (
              <View style={styles.detailRow}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="account-group"
                    size={24}
                    color={Colors[colorScheme ?? 'light'].tint}
                  />
                </View>
                <View style={styles.detailContent}>
                  <ThemedText type="defaultSemiBold">Attendees</ThemedText>
                  <ThemedText style={styles.detailText}>
                    {activity.attendees} / {activity.capacity} people
                  </ThemedText>
                </View>
              </View>
            )}

            {/* Price */}
            <View style={styles.detailRow}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' },
                ]}
              >
                <MaterialCommunityIcons
                  name="cash"
                  size={24}
                  color={Colors[colorScheme ?? 'light'].tint}
                />
              </View>
              <View style={styles.detailContent}>
                <ThemedText type="defaultSemiBold">Price</ThemedText>
                <ThemedText style={styles.detailText}>
                  {formatPrice(activity.price)}
                  {activity.price === 0 ? ' - No registration fee' : ' per person'}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Location
            </ThemedText>

            <View style={styles.addressContainer}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color={Colors[colorScheme ?? 'light'].tint}
              />
              <ThemedText style={styles.addressText}>{activity.address}</ThemedText>
            </View>

            {/* Map Preview */}
            <Pressable style={styles.mapContainer} onPress={handleOpenMaps}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: activity.coordinate.latitude,
                  longitude: activity.coordinate.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
              >
                <Marker
                  coordinate={activity.coordinate}
                  pinColor={ActivityColors[activity.type]}
                />
              </MapView>
              <View style={styles.mapOverlay}>
                <MaterialCommunityIcons name="map-search" size={24} color="#fff" />
                <ThemedText style={styles.mapOverlayText}>
                  Tap to open in Maps
                </ThemedText>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View
        style={[
          styles.bottomContainer,
          {
            backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
            borderTopColor: isDark ? '#2A2A2A' : '#E0E0E0',
          },
        ]}
      >
          <Pressable
            style={[
              styles.joinButton,
              {
                backgroundColor: isFullyBooked
                  ? '#999'
                  : Colors[colorScheme ?? 'light'].tint,
              },
            ]}
            onPress={handleJoinActivity}
            disabled={!!isFullyBooked}
          >
          <MaterialCommunityIcons
            name={isFullyBooked ? 'close-circle' : 'check-circle'}
            size={24}
            color="#fff"
          />
          <ThemedText style={styles.joinButtonText}>
            {isFullyBooked ? 'Fully Booked' : 'Join Activity'}
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroContainer: {
    position: 'relative',
    height: 300,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shareButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  typeBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  priceBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceBadgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 8,
  },
  addressText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapOverlayText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  errorTitle: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
