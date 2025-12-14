export type ActivityType = 'workshop' | 'dinner-party' | 'meetup';

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
  price: number; // Price in euros, 0 for free events
  imageUrl: string; // URL or local path to activity image
  capacity?: number; // Maximum number of attendees
  attendees?: number; // Current number of attendees
}
