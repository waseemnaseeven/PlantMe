import { Activity } from '@/types/activity';

// Mock activities data centered around Paris
export const mockActivities: Activity[] = [
  // Workshops
  {
    id: '1',
    title: 'Plant-Based Cooking Workshop',
    type: 'workshop',
    description: 'Learn to cook delicious plant-based meals with Chef Marie',
    coordinate: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    date: '2024-02-15',
    address: '15 Rue de Rivoli, 75001 Paris',
  },
  {
    id: '2',
    title: 'Sustainable Living Workshop',
    type: 'workshop',
    description: 'Discover how to reduce your environmental impact through plant-based choices',
    coordinate: {
      latitude: 48.8606,
      longitude: 2.3376,
    },
    date: '2024-02-18',
    address: '42 Avenue des Champs-Élysées, 75008 Paris',
  },
  {
    id: '3',
    title: 'Vegan Cheese Making',
    type: 'workshop',
    description: 'Master the art of creating artisanal plant-based cheeses',
    coordinate: {
      latitude: 48.8529,
      longitude: 2.3499,
    },
    date: '2024-02-20',
    address: '28 Rue Saint-Antoine, 75004 Paris',
  },
  {
    id: '4',
    title: 'Plant-Based Nutrition Seminar',
    type: 'workshop',
    description: 'Learn about the health benefits of plant-based eating',
    coordinate: {
      latitude: 48.8738,
      longitude: 2.2950,
    },
    date: '2024-02-22',
    address: '10 Avenue de Wagram, 75017 Paris',
  },
  // Dinner Parties
  {
    id: '5',
    title: 'Vegan Potluck Dinner',
    type: 'dinner-party',
    description: 'Bring your favorite plant-based dish and meet fellow food enthusiasts',
    coordinate: {
      latitude: 48.8584,
      longitude: 2.2945,
    },
    date: '2024-02-16',
    address: '5 Avenue Gustave Eiffel, 75007 Paris',
  },
  {
    id: '6',
    title: 'Plant-Based Wine Tasting',
    type: 'dinner-party',
    description: 'Enjoy organic wines paired with exquisite vegan appetizers',
    coordinate: {
      latitude: 48.8467,
      longitude: 2.3514,
    },
    date: '2024-02-17',
    address: '12 Rue Mouffetard, 75005 Paris',
  },
  {
    id: '7',
    title: 'Community Vegan Feast',
    type: 'dinner-party',
    description: 'A celebration of plant-based cuisine from around the world',
    coordinate: {
      latitude: 48.8534,
      longitude: 2.3488,
    },
    date: '2024-02-19',
    address: '8 Place de la Bastille, 75011 Paris',
  },
  {
    id: '8',
    title: 'Plant-Based Brunch Social',
    type: 'dinner-party',
    description: 'Start your Sunday with delicious vegan brunch and great company',
    coordinate: {
      latitude: 48.8606,
      longitude: 2.3376,
    },
    date: '2024-02-21',
    address: '25 Rue du Faubourg Saint-Honoré, 75008 Paris',
  },
  {
    id: '9',
    title: 'Gourmet Vegan Dinner',
    type: 'dinner-party',
    description: 'Experience fine dining with a 5-course plant-based menu',
    coordinate: {
      latitude: 48.8499,
      longitude: 2.3626,
    },
    date: '2024-02-23',
    address: '18 Rue de la Roquette, 75011 Paris',
  },
];
