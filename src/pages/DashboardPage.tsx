import React from 'react';
import { Calendar, MapPin, DollarSign, Star, Trash2, Eye } from 'lucide-react';
import { User } from '../types/User';
import { translations } from '../utils/translations';

interface DashboardPageProps {
  user: User;
  language: 'en' | 'hi' | 'mr';
  setCurrentPage: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, language, setCurrentPage }) => {
  const t = translations[language];

  // Mock saved trips for demonstration
  const mockTrips = [
    {
      id: '1',
      destination: 'Goa, India',
      budget: 15000,
      duration: 4,
      interests: ['nature', 'food', 'relaxation'],
      isInternational: false,
      totalCost: 14500,
      createdAt: '2024-01-15',
      itinerary: []
    },
    {
      id: '2',
      destination: 'Dubai, UAE',
      budget: 800,
      duration: 5,
      interests: ['shopping', 'heritage', 'food'],
      isInternational: true,
      totalCost: 750,
      createdAt: '2024-01-10',
      itinerary: []
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.dashboard.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {t.dashboard.welcome}, {user.name}!
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6 flex items-center justify-between">
  <div>
    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
  </div>
  <button
    onClick={() => setCurrentPage('editProfile')}
    className="text-blue-600 hover:underline text-sm"
  >
    Edit Profile
  </button>
</div>



      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockTrips.length}
          </div>
          <p className="text-gray-600 dark:text-gray-400">{t.dashboard.totalTrips}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{mockTrips.reduce((sum, trip) => sum + (trip.isInternational ? trip.totalCost * 80 : trip.totalCost), 0).toLocaleString()}
          </div>
          <p className="text-gray-600 dark:text-gray-400">{t.dashboard.totalSpent}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
          <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockTrips.reduce((sum, trip) => sum + trip.duration, 0)}
          </div>
          <p className="text-gray-600 dark:text-gray-400">{t.dashboard.totalDays}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.isPremium ? 'PRO' : 'FREE'}
          </div>
          <p className="text-gray-600 dark:text-gray-400">{t.dashboard.planType}</p>
        </div>
      </div>

      {/* Saved Trips */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t.dashboard.savedTrips}
          </h2>
        </div>

        {mockTrips.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t.dashboard.noTrips}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t.dashboard.startPlanning}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {mockTrips.map((trip) => (
              <div key={trip.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {trip.destination}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        trip.isInternational 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      }`}>
                        {trip.isInternational ? t.dashboard.international : t.dashboard.domestic}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {trip.duration} {t.dashboard.days}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {trip.isInternational ? '$' : '₹'}{trip.totalCost.toLocaleString()}
                      </div>
                      <div className="text-xs">
                        {t.dashboard.created}: {new Date(trip.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {trip.interests.map((interest) => (
                        <span key={interest} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs">
                          {t.interests[interest as keyof typeof t.interests] || interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      

      {/* Premium Upgrade */}
      {!user.isPremium && (
        <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
          <div className="text-center">
            <Star className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              {t.dashboard.upgradeToPro}
            </h3>
            <p className="text-yellow-100 mb-4">
              {t.dashboard.proFeatures}
            </p>
            <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t.dashboard.upgradeNow}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;