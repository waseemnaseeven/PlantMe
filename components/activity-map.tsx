import { useColorScheme } from '@/hooks/use-color-scheme';
import { Activity } from '@/types/activity';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface ActivityMapProps {
  activities: Activity[];
}

// Paris coordinates as default
const PARIS_REGION = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export function ActivityMap({ activities }: ActivityMapProps) {
  const colorScheme = useColorScheme();
  const [region, setRegion] = useState(PARIS_REGION);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          Alert.alert(
            'Location Permission',
            'Location permission is needed to show your position on the map. Using Paris as default location.',
            [{ text: 'OK' }]
          );
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
        
        // Center map on user location
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert(
          'Location Error',
          'Could not get your location. Using Paris as default.',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  const getMarkerColor = (type: Activity['type']) => {
    switch (type) {
      case 'workshop':
        return '#4CAF50'; // Green for workshops
      case 'dinner-party':
        return '#FF6B35'; // Orange/Red for dinner parties
      default:
        return '#2196F3'; // Blue as fallback
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'workshop':
        return '🎓';
      case 'dinner-party':
        return '🍽️';
      default:
        return '📍';
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        initialRegion={region}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {activities.map((activity) => (
          <Marker
            key={activity.id}
            coordinate={activity.coordinate}
            pinColor={getMarkerColor(activity.type)}
            title={activity.title}
            description={activity.description}
          >
            <View style={styles.markerContainer}>
              <View
                style={[
                  styles.marker,
                  { backgroundColor: getMarkerColor(activity.type) },
                ]}
              >
                <ThemedText style={styles.markerIcon}>
                  {getActivityIcon(activity.type)}
                </ThemedText>
              </View>
            </View>
            <Callout>
              <ThemedView style={styles.callout}>
                <ThemedText type="defaultSemiBold" style={styles.calloutTitle}>
                  {activity.title}
                </ThemedText>
                <ThemedText style={styles.calloutType}>
                  {activity.type === 'workshop' ? '🎓 Workshop' : '🍽️ Dinner Party'}
                </ThemedText>
                <ThemedText style={styles.calloutDescription}>
                  {activity.description}
                </ThemedText>
                <ThemedText style={styles.calloutDate}>
                  📅 {new Date(activity.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </ThemedText>
                <ThemedText style={styles.calloutAddress}>
                  📍 {activity.address}
                </ThemedText>
              </ThemedView>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerIcon: {
    fontSize: 20,
  },
  callout: {
    width: 250,
    padding: 10,
    borderRadius: 8,
  },
  calloutTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  calloutType: {
    fontSize: 12,
    marginBottom: 5,
    opacity: 0.8,
  },
  calloutDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  calloutDate: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.7,
  },
  calloutAddress: {
    fontSize: 12,
    opacity: 0.7,
  },
});
