export type ActivityType = 'workshop' | 'dinner-party';

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  date: string;
  address: string;
}
