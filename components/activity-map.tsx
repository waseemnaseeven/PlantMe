import { ActivityColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Activity } from '@/types/activity';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
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
    return ActivityColors[type] || '#C4D7F2'; // Default to pastel blue
  };

  const getActivityIconName = (type: Activity['type']): keyof typeof MaterialCommunityIcons.glyphMap => {
    switch (type) {
      case 'workshop':
        return 'book-open-variant';
      case 'dinner-party':
        return 'silverware-fork-knife';
      case 'meetup':
        return 'account-group';
      default:
        return 'map-marker';
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

  return (
    <View style={styles.container}>
      <MapView
        // provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        initialRegion={region}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        showsPointsOfInterest={false}
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
                <MaterialCommunityIcons
                  name={getActivityIconName(activity.type)}
                  size={22}
                  color="#fff"
                />
              </View>
            </View>
            <Callout>
              <ThemedView style={styles.callout}>
                <ThemedText type="defaultSemiBold" style={styles.calloutTitle}>
                  {activity.title}
                </ThemedText>
                <View style={styles.calloutTypeContainer}>
                  <MaterialCommunityIcons
                    name={getActivityIconName(activity.type)}
                    size={14}
                    color={getMarkerColor(activity.type)}
                    style={styles.calloutIcon}
                  />
                  <ThemedText style={styles.calloutType}>
                    {getActivityLabel(activity.type)}
                  </ThemedText>
                </View>
                <ThemedText style={styles.calloutDescription}>
                  {activity.description}
                </ThemedText>
                <View style={styles.calloutInfoRow}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={12}
                    color="#666"
                    style={styles.calloutIcon}
                  />
                  <ThemedText style={styles.calloutDate}>
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </ThemedText>
                </View>
                <View style={styles.calloutInfoRow}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={12}
                    color="#666"
                    style={styles.calloutIcon}
                  />
                  <ThemedText style={styles.calloutAddress}>
                    {activity.address}
                  </ThemedText>
                </View>
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
  callout: {
    width: 250,
    padding: 10,
    borderRadius: 8,
  },
  calloutTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  calloutTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  calloutType: {
    fontSize: 12,
    fontWeight: '600',
  },
  calloutIcon: {
    marginRight: 6,
  },
  calloutDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  calloutInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  calloutDate: {
    fontSize: 12,
    opacity: 0.7,
    flex: 1,
  },
  calloutAddress: {
    fontSize: 12,
    opacity: 0.7,
    flex: 1,
  },
});
