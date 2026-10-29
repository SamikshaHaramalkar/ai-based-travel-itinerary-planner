export interface User {
  _id: string;
  name: string;
  email: string;
  isPremium: boolean;
  role: 'admin' | 'user'; 
  trips: Trip[];
}

export interface Trip {
  id: string;
  destination: string;
  budget: number;
  duration: number;
  interests: string[];
  isInternational: boolean;
  itinerary: DayPlan[];
  totalCost: number;
  createdAt: string;
}

export interface DayPlan {
  day: number;
  activities: Activity[];
  totalCost: number;
}

export interface Activity {
  id: string;
  name: string;
  location: string;
  cost: number;
  time: string;
  description: string;
  imageUrl: string;
  weather?: WeatherInfo;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  icon: string;
}