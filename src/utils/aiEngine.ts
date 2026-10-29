import { Trip, DayPlan, Activity } from '../types/User';

interface TripData {
  destination: string;
  budget: string;
  duration: string;
  interests: string[];
  isInternational: boolean;
}

export const generateItinerary = (tripData: TripData): Trip => {
  const destination = tripData.destination;
  const duration = parseInt(tripData.duration);
  const budget = parseInt(tripData.budget);
  const isInternational = tripData.isInternational;

  // Sample destinations and activities database
  const destinationData: { [key: string]: any } = {
    'goa': {
    activities: [
      { name: 'Baga Beach Relaxation', location: 'Baga, Goa', baseCost: 500, type: 'relaxation' },
      { name: 'Calangute Water Sports', location: 'Calangute, Goa', baseCost: 1500, type: 'adventure' },
      { name: 'Old Goa Churches Tour', location: 'Old Goa', baseCost: 300, type: 'heritage' },
      { name: 'Spice Plantation Visit', location: 'Ponda', baseCost: 800, type: 'nature' },
      { name: 'Goan Cuisine Tasting', location: 'Panaji', baseCost: 1200, type: 'food' },
      { name: 'Anjuna Flea Market', location: 'Anjuna', baseCost: 600, type: 'shopping' },
      { name: 'Dudhsagar Waterfalls Trek', location: 'Sonaulim', baseCost: 900, type: 'adventure' },
      { name: 'Fort Aguada Sunset', location: 'Candolim', baseCost: 200, type: 'heritage' },
      { name: 'Candolim Beach Walk', location: 'Candolim', baseCost: 200, type: 'relaxation' },
      { name: 'Chapora Fort Views', location: 'Chapora', baseCost: 200, type: 'heritage' },
      { name: 'Palolem Kayaking', location: 'Palolem', baseCost: 1000, type: 'adventure' },
      { name: 'Colva Beach Evening', location: 'Colva', baseCost: 200, type: 'relaxation' },
      { name: 'Miramar Beach Cycling', location: 'Panaji', baseCost: 500, type: 'adventure' },
      { name: 'Reis Magos Fort', location: 'Verem', baseCost: 250, type: 'heritage' },
      { name: 'Salim Ali Bird Sanctuary', location: 'Chorao Island', baseCost: 400, type: 'nature' },
      { name: 'Goa State Museum', location: 'Panaji', baseCost: 100, type: 'heritage' },
      { name: 'Arpora Night Market', location: 'Arpora', baseCost: 700, type: 'shopping' },
      { name: 'Mandovi River Cruise', location: 'Panaji', baseCost: 800, type: 'relaxation' },
      { name: 'Butterfly Beach Excursion', location: 'South Goa', baseCost: 900, type: 'nature' },
      { name: 'Dona Paula Viewpoint', location: 'Dona Paula', baseCost: 150, type: 'relaxation' }
    ],
  },
  'dubai': {
    activities: [
      { name: 'Burj Khalifa At The Top', location: 'Downtown Dubai', baseCost: 200, type: 'heritage' },
      { name: 'Desert Safari with Dune Bashing', location: 'Dubai Desert', baseCost: 250, type: 'adventure' },
      { name: 'Dubai Mall Exploration', location: 'Downtown', baseCost: 0, type: 'shopping' },
      { name: 'Dubai Fountain Show', location: 'Burj Lake', baseCost: 0, type: 'heritage' },
      { name: 'Dubai Marina Walk', location: 'Marina', baseCost: 0, type: 'relaxation' },
      { name: 'Traditional Emirati Meal', location: 'Al Fahidi', baseCost: 150, type: 'food' },
      { name: 'Gold & Spice Souk', location: 'Deira', baseCost: 0, type: 'shopping' },
      { name: 'Museum of the Future', location: 'Sheikh Zayed Rd', baseCost: 170, type: 'heritage' },
      { name: 'Palm Jumeirah Monorail', location: 'Palm Jumeirah', baseCost: 50, type: 'relaxation' },
      { name: 'Ain Dubai Photo Stop', location: 'Bluewaters', baseCost: 0, type: 'relaxation' },
      { name: 'Al Seef Heritage Walk', location: 'Dubai Creek', baseCost: 0, type: 'heritage' },
      { name: 'La Mer Beach', location: 'Jumeirah', baseCost: 0, type: 'relaxation' },
      { name: 'Ski Dubai Experience', location: 'Mall of the Emirates', baseCost: 220, type: 'adventure' },
      { name: 'Global Village (Seasonal)', location: 'Dubailand', baseCost: 25, type: 'shopping' },
      { name: 'Dubai Frame', location: 'Zabeel Park', baseCost: 60, type: 'heritage' },
      { name: 'Miracle Garden (Seasonal)', location: 'Al Barsha South', baseCost: 70, type: 'nature' },
      { name: 'Kite Beach Activities', location: 'Jumeirah', baseCost: 40, type: 'adventure' },
      { name: 'JBR The Walk & Beach', location: 'JBR', baseCost: 0, type: 'relaxation' },
      { name: 'Abra Ride on the Creek', location: 'Dubai Creek', baseCost: 2, type: 'heritage' },
      { name: 'Blue Mosque (Al Farooq)', location: 'Umm Suqeim', baseCost: 0, type: 'heritage' }
    ],
  },
  'paris': {
    activities: [
      { name: 'Eiffel Tower Summit', location: 'Champ de Mars', baseCost: 2000, type: 'heritage' },
      { name: 'Louvre Museum', location: 'Rue de Rivoli', baseCost: 1500, type: 'heritage' },
      { name: 'Seine River Cruise', location: 'Seine', baseCost: 1200, type: 'relaxation' },
      { name: 'Montmartre & Sacré-Cœur', location: '18th Arr.', baseCost: 500, type: 'heritage' },
      { name: 'French Pastry Tasting', location: 'Le Marais', baseCost: 2000, type: 'food' },
      { name: 'Champs-Élysées & Arc de Triomphe', location: '8th Arr.', baseCost: 800, type: 'shopping' },
      { name: "Musée d'Orsay", location: 'Left Bank', baseCost: 1400, type: 'heritage' },
      { name: 'Luxembourg Gardens Stroll', location: '6th Arr.', baseCost: 0, type: 'relaxation' },
      { name: 'Latin Quarter Food Crawl', location: '5th Arr.', baseCost: 1800, type: 'food' },
      { name: 'Notre-Dame & Île de la Cité', location: '4th Arr.', baseCost: 300, type: 'heritage' },
      { name: 'Palais Garnier Tour', location: '9th Arr.', baseCost: 1200, type: 'heritage' },
      { name: 'Tuileries Garden', location: '1st Arr.', baseCost: 0, type: 'relaxation' },
      { name: 'Le Marais Boutiques', location: 'Le Marais', baseCost: 0, type: 'shopping' },
      { name: 'Canal Saint-Martin Walk', location: '10th Arr.', baseCost: 0, type: 'relaxation' },
      { name: 'Versailles Day Trip', location: 'Versailles', baseCost: 2500, type: 'heritage' },
      { name: 'Père Lachaise Cemetery', location: '20th Arr.', baseCost: 0, type: 'heritage' },
      { name: 'Picnic on Champ de Mars', location: '7th Arr.', baseCost: 400, type: 'relaxation' },
      { name: 'Fromagerie Tasting', location: 'Various', baseCost: 1200, type: 'food' },
      { name: 'Rue Cler Market', location: '7th Arr.', baseCost: 0, type: 'shopping' },
      { name: 'Galeries Lafayette Rooftop', location: '9th Arr.', baseCost: 0, type: 'shopping' }
    ],
  },
  'bangkok': {
    activities: [
      { name: 'Grand Palace & Wat Phra Kaew', location: 'Na Phra Lan Rd', baseCost: 1500, type: 'heritage' },
      { name: 'Wat Arun Sunset', location: 'Thonburi', baseCost: 200, type: 'heritage' },
      { name: 'Chatuchak Weekend Market', location: 'Chatuchak', baseCost: 0, type: 'shopping' },
      { name: 'Street Food Tour Yaowarat', location: 'Chinatown', baseCost: 800, type: 'food' },
      { name: 'Lumphini Park Paddle Boats', location: 'Pathum Wan', baseCost: 150, type: 'relaxation' },
      { name: 'Asiatique Riverfront', location: 'Chao Phraya', baseCost: 0, type: 'shopping' },
      { name: 'Jim Thompson House', location: 'Rama I Rd', baseCost: 500, type: 'heritage' },
      { name: 'Khlong Canal Tour', location: 'Thonburi', baseCost: 600, type: 'relaxation' },
      { name: 'Muay Thai Match (Local Stadium)', location: 'Various', baseCost: 1200, type: 'adventure' },
      { name: 'Floating Market Day Trip', location: 'Damnoen Saduak', baseCost: 1000, type: 'shopping' },
      { name: 'Bang Krachao Cycling', location: 'Green Lung', baseCost: 300, type: 'adventure' },
      { name: 'ICONSIAM Malls', location: 'Khlong San', baseCost: 0, type: 'shopping' },
      { name: 'Spa & Thai Massage', location: 'Various', baseCost: 900, type: 'relaxation' },
      { name: 'Erawan Shrine', location: 'Pathum Wan', baseCost: 0, type: 'heritage' },
      { name: 'Rooftop View (Mahanakhon)', location: 'Silom', baseCost: 1800, type: 'relaxation' }
    ],
  },
  'singapore': {
    activities: [
      { name: 'Marina Bay Sands SkyPark', location: 'Marina Bay', baseCost: 2400, type: 'relaxation' },
      { name: 'Gardens by the Bay', location: 'Marina Bay', baseCost: 1500, type: 'nature' },
      { name: 'Sentosa Beach Day', location: 'Sentosa', baseCost: 800, type: 'relaxation' },
      { name: 'Universal Studios', location: 'Sentosa', baseCost: 3800, type: 'adventure' },
      { name: 'Chinatown Heritage Centre', location: 'Chinatown', baseCost: 600, type: 'heritage' },
      { name: 'Little India Food Walk', location: 'Serangoon', baseCost: 1000, type: 'food' },
      { name: 'Orchard Road Shopping', location: 'Orchard', baseCost: 0, type: 'shopping' },
      { name: 'Botanic Gardens', location: 'Tanglin', baseCost: 0, type: 'nature' },
      { name: 'Clarke Quay River Walk', location: 'Clarke Quay', baseCost: 0, type: 'relaxation' },
      { name: 'Hawker Centre Feast', location: 'Maxwell/Amoy', baseCost: 700, type: 'food' },
      { name: 'Southern Ridges Hike', location: 'Telok Blangah', baseCost: 0, type: 'nature' },
      { name: 'Merlion Park Photos', location: 'Marina Bay', baseCost: 0, type: 'heritage' }
    ],
  },
  'tokyo': {
    activities: [
      { name: 'Senso-ji Temple & Nakamise', location: 'Asakusa', baseCost: 0, type: 'heritage' },
      { name: 'Shibuya Crossing & Scramble View', location: 'Shibuya', baseCost: 0, type: 'relaxation' },
      { name: 'Tsukiji Outer Market Food', location: 'Tsukiji', baseCost: 1500, type: 'food' },
      { name: 'Ueno Park & Museums', location: 'Ueno', baseCost: 800, type: 'heritage' },
      { name: 'TeamLab Planets', location: 'Toyosu', baseCost: 3000, type: 'adventure' },
      { name: 'Meiji Jingu & Yoyogi', location: 'Harajuku', baseCost: 0, type: 'heritage' },
      { name: 'Akihabara Shopping', location: 'Akihabara', baseCost: 0, type: 'shopping' },
      { name: 'Odaiba Seaside Walk', location: 'Odaiba', baseCost: 0, type: 'relaxation' },
      { name: 'Ramen Tasting Crawl', location: 'Various', baseCost: 2000, type: 'food' },
      { name: 'Skytree Observation', location: 'Oshiage', baseCost: 2100, type: 'relaxation' },
      { name: 'Nikko/Kamakura Day Trip', location: 'Outskirts', baseCost: 3500, type: 'heritage' }
    ],
  },
  'bali': {
    activities: [
      { name: 'Uluwatu Temple & Kecak', location: 'Uluwatu', baseCost: 700, type: 'heritage' },
      { name: 'Tegallalang Rice Terraces', location: 'Ubud', baseCost: 300, type: 'nature' },
      { name: 'Nusa Penida Snorkeling', location: 'Penida', baseCost: 2500, type: 'adventure' },
      { name: 'Mount Batur Sunrise Hike', location: 'Kintamani', baseCost: 1800, type: 'adventure' },
      { name: 'Ubud Monkey Forest', location: 'Ubud', baseCost: 500, type: 'nature' },
      { name: 'Seminyak Beach Day', location: 'Seminyak', baseCost: 0, type: 'relaxation' },
      { name: 'Balinese Cooking Class', location: 'Ubud', baseCost: 1200, type: 'food' },
      { name: 'Tanah Lot Sunset', location: 'Beraban', baseCost: 500, type: 'heritage' },
      { name: 'Canggu Cafés & Biking', location: 'Canggu', baseCost: 300, type: 'relaxation' },
      { name: 'Tukad Cepung Waterfall', location: 'Bangli', baseCost: 300, type: 'nature' }
    ],
  },
  'london': {
    activities: [
      { name: 'Tower of London & Crown Jewels', location: 'Tower Hill', baseCost: 3000, type: 'heritage' },
      { name: 'British Museum Highlights', location: 'Bloomsbury', baseCost: 0, type: 'heritage' },
      { name: 'Thames River Walk & Southbank', location: 'Southbank', baseCost: 0, type: 'relaxation' },
      { name: 'Borough Market Food Crawl', location: 'Southwark', baseCost: 1500, type: 'food' },
      { name: 'West End Show (Leicester Sq.)', location: 'West End', baseCost: 4000, type: 'relaxation' },
      { name: 'Camden Market', location: 'Camden', baseCost: 0, type: 'shopping' },
      { name: 'Hyde Park Cycling', location: 'Hyde Park', baseCost: 600, type: 'adventure' },
      { name: 'Greenwich & Prime Meridian', location: 'Greenwich', baseCost: 1200, type: 'heritage' },
      { name: 'Kensington Museums', location: 'South Ken', baseCost: 0, type: 'heritage' },
      { name: 'Portobello Road Market', location: 'Notting Hill', baseCost: 0, type: 'shopping' }
    ],
  },
  'newyork': {
    activities: [
      { name: 'Statue of Liberty & Ellis Island', location: 'NY Harbor', baseCost: 3000, type: 'heritage' },
      { name: 'Central Park Loop', location: 'Manhattan', baseCost: 0, type: 'relaxation' },
      { name: 'Metropolitan Museum of Art', location: '5th Ave', baseCost: 2500, type: 'heritage' },
      { name: 'Brooklyn Bridge Walk', location: 'Lower Manhattan', baseCost: 0, type: 'relaxation' },
      { name: 'Times Square & Broadway', location: 'Midtown', baseCost: 0, type: 'shopping' },
      { name: 'High Line & Chelsea Market', location: 'Chelsea', baseCost: 1000, type: 'relaxation' },
      { name: '9/11 Memorial & Museum', location: 'FiDi', baseCost: 2000, type: 'heritage' },
      { name: 'DUMBO Photo Spots', location: 'Brooklyn', baseCost: 0, type: 'relaxation' },
      { name: 'Pizza & Bagel Tasting', location: 'Various', baseCost: 2000, type: 'food' },
      { name: 'MoMA Modern Art', location: 'Midtown', baseCost: 2500, type: 'heritage' }
    ],
  },
  'rome': {
    activities: [
      { name: 'Colosseum & Roman Forum', location: 'Centro Storico', baseCost: 2500, type: 'heritage' },
      { name: 'Vatican Museums & St. Peter’s', location: 'Vatican City', baseCost: 3000, type: 'heritage' },
      { name: 'Trevi Fountain & Gelato', location: 'Trevi', baseCost: 700, type: 'food' },
      { name: 'Trastevere Evening Walk', location: 'Trastevere', baseCost: 0, type: 'relaxation' },
      { name: 'Pantheon Visit', location: 'Piazza della Rotonda', baseCost: 0, type: 'heritage' },
      { name: 'Campo de’ Fiori Market', location: 'Centro', baseCost: 0, type: 'shopping' },
      { name: 'Borghese Gallery & Park', location: 'Villa Borghese', baseCost: 2000, type: 'heritage' },
      { name: 'Appian Way Cycling', location: 'Via Appia Antica', baseCost: 1200, type: 'adventure' },
      { name: 'Testaccio Food Tour', location: 'Testaccio', baseCost: 1600, type: 'food' },
      { name: 'Tiber River Sunset', location: 'Lungotevere', baseCost: 0, type: 'relaxation' }
    ],
  },
  'jaipur': {
    activities: [
      { name: 'Amber Fort & Stepwell', location: 'Amer', baseCost: 600, type: 'heritage' },
      { name: 'City Palace & Museum', location: 'Pink City', baseCost: 700, type: 'heritage' },
      { name: 'Hawa Mahal Photos', location: 'Badi Choupad', baseCost: 200, type: 'heritage' },
      { name: 'Johari Bazaar Shopping', location: 'Old City', baseCost: 0, type: 'shopping' },
      { name: 'Rajasthani Thali Dinner', location: 'MI Road', baseCost: 500, type: 'food' },
      { name: 'Nahargarh Sunset Point', location: 'Aravalli Hills', baseCost: 200, type: 'relaxation' },
      { name: 'Elefantastic Interaction', location: 'Hathroi', baseCost: 1200, type: 'adventure' },
      { name: 'Jantar Mantar Observatory', location: 'Tripolia Bazar', baseCost: 200, type: 'heritage' },
      { name: 'Albert Hall Museum', location: 'Ram Niwas Garden', baseCost: 300, type: 'heritage' },
      { name: 'Chokhi Dhani Village', location: 'Tonk Road', baseCost: 900, type: 'food' }
    ],
  }
};

// Default activities for unknown destinations
const defaultActivities = [
  { name: 'City Highlights Walking Tour', location: '', baseCost: 30, type: 'heritage' },
  { name: 'Local Market Exploration', location: '', baseCost: 20, type: 'shopping' },
  { name: 'Traditional Cuisine Tasting', location: '', baseCost: 40, type: 'food' },
  { name: 'Urban Park / Nature Walk', location: '', baseCost: 15, type: 'nature' },
  { name: 'Cultural Show / Museum', location: '', baseCost: 25, type: 'heritage' },
  { name: 'Adventure Experience (Local)', location: '', baseCost: 50, type: 'adventure' },
  { name: 'Sunset Viewpoint / Riverside', location: '', baseCost: 10, type: 'relaxation' },
  { name: 'Food Street Crawl', location: '', baseCost: 30, type: 'food' },
  { name: 'Souvenir Street / Bazaar', location: '', baseCost: 10, type: 'shopping' },
  { name: 'Historic Quarter Walk', location: '', baseCost: 15, type: 'heritage' },
];


  const destKey = destination.toLowerCase().includes('goa') ? 'goa' :
                  destination.toLowerCase().includes('dubai') ? 'dubai' :
                  destination.toLowerCase().includes('paris') ? 'paris' :
                  destination.toLowerCase().includes('bangkok') ? 'bangkok' :
                  destination.toLowerCase().includes('singapore') ? 'singapore' :
                  destination.toLowerCase().includes('tokyo') ? 'tokyo' :
                  destination.toLowerCase().includes('bali') ? 'bali' :
                  destination.toLowerCase().includes('london') ? 'london' :
                  destination.toLowerCase().includes('newyork') ? 'newyork' :
                  destination.toLowerCase().includes('rome') ? 'rome' :
                  destination.toLowerCase().includes('jaipur') ? 'jaipur' : 'default';

  const availableActivities = destKey === 'default' ? defaultActivities : destinationData[destKey].activities;

  // Filter by interest
  const relevantActivities = availableActivities.filter((a: any) =>
    tripData.interests.includes(a.type)
  );
  const activitiesToUse = relevantActivities.length > 0 ? relevantActivities : availableActivities;

  // Max days possible with unique activities
  const maxPossibleDays = Math.ceil(activitiesToUse.length / 3);
  const finalDuration = Math.min(duration, maxPossibleDays);

  const itinerary: DayPlan[] = [];
  const budgetPerDay = budget / finalDuration;
  let usedActivities: any[] = [];

  for (let day = 1; day <= finalDuration; day++) {
    const dayActivities: Activity[] = [];
    let dayBudget = budgetPerDay;
    const activitiesPerDay = Math.min(3, Math.max(2, Math.floor(budgetPerDay / 500)));

    // Filter remaining unused activities
    const remainingActivities = activitiesToUse.filter(a => !usedActivities.includes(a.name));
    const shuffled = [...remainingActivities].sort(() => Math.random() - 0.5);

    for (let i = 0; i < activitiesPerDay && i < shuffled.length; i++) {
      const activity = shuffled[i];
      usedActivities.push(activity.name);

      const activityCost = Math.min(activity.baseCost, dayBudget * 0.6);
      dayActivities.push({
        id: `${day}-${i}`,
        name: activity.name,
        location: activity.location,
        cost: Math.round(activityCost),
        time: i === 0 ? '09:00 AM' : i === 1 ? '02:00 PM' : '06:00 PM',
        description: `Experience ${activity.name} in ${activity.location}. Perfect ${activity.type} activity.`,
        imageUrl: getImageForActivity(activity.type, destination),
        weather: {
          temperature: Math.floor(Math.random() * 15) + 20,
          condition: ['Sunny', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 3)],
          icon: '☀️'
        }
      });

      dayBudget -= activityCost;
    }

    itinerary.push({
      day,
      activities: dayActivities,
      totalCost: dayActivities.reduce((sum, a) => sum + a.cost, 0)
    });
  }

  const totalCost = itinerary.reduce((sum, d) => sum + d.totalCost, 0);

  // If user requested more days than possible
  if (duration > maxPossibleDays) {
    itinerary.push({
      day: finalDuration + 1,
      activities: [],
      totalCost: 0
    });
    itinerary[finalDuration].activities.push({
      id: 'limit-msg',
      name: 'Itinerary Limit Reached',
      location: destination,
      cost: 0,
      time: '',
      description: `Only ${maxPossibleDays} days of unique activities are available for ${destination}. Extra days cannot be planned.`,
      imageUrl: '',
      weather: { temperature: 0, condition: 'N/A', icon: '' }
    });
  }

  return {
    id: Date.now().toString(),
    destination,
    budget,
    duration,
    interests: tripData.interests,
    isInternational,
    itinerary,
    totalCost: Math.round(totalCost),
    createdAt: new Date().toISOString()
  };
};

const getImageForActivity = (type: string, destination: string): string => {
  const imageMap: { [key: string]: string[] } = {
    heritage: [
      'https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg',
      'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg',
      'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg'
    ],
    nature: [
      'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg',
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg'
    ],
    food: [
      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg'
    ],
    adventure: [
      'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg',
      'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg',
      'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg'
    ],
    shopping: [
      'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg',
      'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg',
      'https://images.pexels.com/photos/1884581/pexels-photo-1881581.jpeg'
    ],
    relaxation: [
      'https://images.pexels.com/photos/238631/pexels-photo-238631.jpeg',
      'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg',
      'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg'
    ]
  };
  const images = imageMap[type] || imageMap.heritage;
  return images[Math.floor(Math.random() * images.length)];
};
