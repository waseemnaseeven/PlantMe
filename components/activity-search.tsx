import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface ActivitySearchProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function ActivitySearch({
  value,
  onChangeText,
  placeholder = 'Search activities...',
}: ActivitySearchProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChangeText = useCallback((text: string) => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      onChangeText(text);
    }, 300);
  }, [onChangeText]);

  const handleClear = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    onChangeText('');
  }, [onChangeText]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#2C2C2C' : '#F5F5F5',
        },
      ]}
    >
      <MaterialCommunityIcons
        name="magnify"
        size={24}
        color={Colors[colorScheme ?? 'light'].icon}
        style={styles.searchIcon}
      />
      <TextInput
        style={[
          styles.input,
          {
            color: Colors[colorScheme ?? 'light'].text,
          },
        ]}
        defaultValue={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
        returnKeyType="search"
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton}>
          <MaterialCommunityIcons
            name="close-circle"
            size={20}
            color={Colors[colorScheme ?? 'light'].icon}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});
