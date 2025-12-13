import { ActivityMap } from '@/components/activity-map';
import { mockActivities } from '@/data/activities';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AroundMeScreen() {
  return (
    <View style={styles.container}>
      <ActivityMap activities={mockActivities} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
