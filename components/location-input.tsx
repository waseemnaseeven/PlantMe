import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { geocodeAddress, getUserLocation, reverseGeocode } from '@/utils/distance';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { ThemedText } from './themed-text';

interface LocationInputProps {
  onLocationChange: (location: Location.LocationObject | null) => void;
}

export function LocationInput({ onLocationChange }: LocationInputProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [useGPS, setUseGPS] = useState(true);
  const [manualAddress, setManualAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetGPSLocation = async () => {
    setLoading(true);
    try {
      const location = await getUserLocation();
      
      if (!location) {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to use this feature.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      onLocationChange(location);

      // Get address from coordinates
      const address = await reverseGeocode(
        location.coords.latitude,
        location.coords.longitude
      );
      setCurrentAddress(address || 'Current Location');
    } catch (error) {
      console.error('Error getting GPS location:', error);
      Alert.alert(
        'Location Error',
        'Could not get your current location. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleManualAddressSubmit = async () => {
    if (!manualAddress.trim()) {
      Alert.alert('Invalid Address', 'Please enter a valid address.', [
        { text: 'OK' },
      ]);
      return;
    }

    setLoading(true);
    try {
      const coordinates = await geocodeAddress(manualAddress);
      
      if (!coordinates) {
        Alert.alert(
          'Address Not Found',
          'Could not find the address. Please try a different one.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      // Create a location object similar to GPS location
      const location: Location.LocationObject = {
        coords: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      };

      onLocationChange(location);
      setCurrentAddress(manualAddress);
    } catch (error) {
      console.error('Error geocoding address:', error);
      Alert.alert(
        'Geocoding Error',
        'Could not process the address. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setUseGPS(!useGPS);
    if (!useGPS) {
      // Switching to GPS mode
      handleGetGPSLocation();
    } else {
      // Switching to manual mode
      onLocationChange(null);
      setCurrentAddress(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Mode Toggle */}
      <View style={styles.toggleContainer}>
        <Pressable
          onPress={handleToggleMode}
          style={[
            styles.toggleButton,
            {
              backgroundColor: Colors[colorScheme ?? 'light'].inputBackground,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={useGPS ? 'crosshairs-gps' : 'map-marker-outline'}
            size={20}
            color={Colors[colorScheme ?? 'light'].tint}
          />
          <ThemedText style={styles.toggleText}>
            {useGPS ? 'Using GPS' : 'Manual Address'}
          </ThemedText>
        </Pressable>
      </View>

      {/* GPS Mode */}
      {useGPS ? (
        <View style={styles.gpsContainer}>
          <Pressable
            onPress={handleGetGPSLocation}
            disabled={loading}
            style={[
              styles.gpsButton,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  size={20}
                  color="#fff"
                />
                <ThemedText style={styles.gpsButtonText}>
                  Use My Location
                </ThemedText>
              </>
            )}
          </Pressable>
          {currentAddress && (
            <View style={styles.currentLocationContainer}>
              <MaterialCommunityIcons
                name="map-marker"
                size={16}
                color={Colors[colorScheme ?? 'light'].icon}
              />
              <ThemedText style={styles.currentLocationText} numberOfLines={1}>
                {currentAddress}
              </ThemedText>
            </View>
          )}
        </View>
      ) : (
        /* Manual Address Mode */
        <View style={styles.manualContainer}>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].inputBackground,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={20}
              color={Colors[colorScheme ?? 'light'].icon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: Colors[colorScheme ?? 'light'].text,
                },
              ]}
              value={manualAddress}
              onChangeText={setManualAddress}
              placeholder="Enter your address..."
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              returnKeyType="search"
              onSubmitEditing={handleManualAddressSubmit}
            />
          </View>
          <Pressable
            onPress={handleManualAddressSubmit}
            disabled={loading || !manualAddress.trim()}
            style={[
              styles.submitButton,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
                opacity: loading || !manualAddress.trim() ? 0.5 : 1,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <MaterialCommunityIcons name="check" size={24} color="#fff" />
            )}
          </Pressable>
          {currentAddress && (
            <View style={styles.currentLocationContainer}>
              <MaterialCommunityIcons
                name="map-marker-check"
                size={16}
                color="#4CAF50"
              />
              <ThemedText style={styles.currentLocationText} numberOfLines={1}>
                {currentAddress}
              </ThemedText>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toggleContainer: {
    marginBottom: 12,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    alignSelf: 'flex-start',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  gpsContainer: {
    gap: 12,
  },
  gpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  gpsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  manualContainer: {
    gap: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  submitButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  currentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  currentLocationText: {
    fontSize: 13,
    opacity: 0.7,
    flex: 1,
  },
});
