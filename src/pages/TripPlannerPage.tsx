import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Heart, Mountain, Camera, ShoppingBag, Utensils, Sparkles, Download, Cloud, Thermometer } from 'lucide-react';
import { User, Trip, DayPlan, Activity } from '../types/User';
import { translations } from '../utils/translations';
import { generateItinerary } from '../utils/aiEngine';
import { validateBudget } from "../utils/minBudget";

interface TripPlannerPageProps {
  user: User;
  language: 'en' | 'hi' | 'mr';
}

const TripPlannerPage: React.FC<TripPlannerPageProps> = ({ user, language }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState<Trip | null>(null);
  const [tripData, setTripData] = useState({
    destination: '',
    budget: '',
    duration: '',
    interests: [] as string[],
    isInternational: false
  });

  const t = translations[language];

  const interests = [
    { id: 'nature', name: t.interests.nature, icon: Mountain },
    { id: 'heritage', name: t.interests.heritage, icon: Camera },
    { id: 'food', name: t.interests.food, icon: Utensils },
    { id: 'adventure', name: t.interests.adventure, icon: Heart },
    { id: 'shopping', name: t.interests.shopping, icon: ShoppingBag },
    { id: 'relaxation', name: t.interests.relaxation, icon: Cloud }
  ];

  const handleInterestToggle = (interest: string) => {
    setTripData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

    const handleGenerateTrip = async () => {
    if (!tripData.destination || !tripData.budget || !tripData.duration || tripData.interests.length === 0) {
      alert(t.validation.fillAllFields);
      return;
    }

    // 🔹 Budget Validation (Step 2)
    const errorMsg = validateBudget(tripData.destination, Number(tripData.budget));
    if (errorMsg) {
      alert(errorMsg); // ❌ Budget कमी असल्यास लगेच error दाखव
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const trip = generateItinerary(tripData);
    setGeneratedTrip(trip);
    setIsGenerating(false);
    setStep(3);
  };


  const saveTripToProfile = () => {
    if (generatedTrip) {
      // In a real app, this would save to the database
      alert(t.success.tripSaved);
    }
  };

  const downloadItinerary = () => {
    if (generatedTrip) {
      // In a real app, this would generate and download a PDF
      alert(t.success.downloadStarted);
    }
  };

  if (step === 1) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.planner.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t.planner.subtitle}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                {t.form.destination}
              </label>
              <input
                type="text"
                value={tripData.destination}
                onChange={(e) => setTripData({...tripData, destination: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={t.form.destinationPlaceholder}
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="h-4 w-4 inline mr-2" />
                {t.form.budget}
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={tripData.budget}
                  onChange={(e) => setTripData({...tripData, budget: e.target.value})}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="25000"
                />
                <select
                  onChange={(e) => setTripData({...tripData, isInternational: e.target.value === 'international'})}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="domestic">{t.form.domestic} (₹)</option>
                  <option value="international">{t.form.international} ($)</option>
                </select>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                {t.form.duration}
              </label>
              <input
                type="number"
                value={tripData.duration}
                onChange={(e) => setTripData({...tripData, duration: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="5"
                min="1"
                max="30"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {t.form.next}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.interests.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t.interests.subtitle}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {interests.map((interest) => {
              const IconComponent = interest.icon;
              const isSelected = tripData.interests.includes(interest.id);
              
              return (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <IconComponent className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">{interest.name}</p>
                </button>
              );
            })}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              {t.form.back}
            </button>
            <button
              onClick={handleGenerateTrip}
              disabled={tripData.interests.length === 0 || isGenerating}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  {t.form.generating}
                </span>
              ) : (
                t.form.generateTrip
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3 && generatedTrip) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.itinerary.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {generatedTrip.destination} • {generatedTrip.duration} {t.itinerary.days}
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={saveTripToProfile}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {t.itinerary.saveTrip}
            </button>
            <button
              onClick={downloadItinerary}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              {t.itinerary.downloadPdf}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {generatedTrip.itinerary.map((dayPlan, dayIndex) => (
            <div key={dayIndex} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.itinerary.day} {dayPlan.day}
                </h2>
                <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {tripData.isInternational ? '$' : '₹'}{dayPlan.totalCost}
                </div>
              </div>

              <div className="grid gap-4">
                {dayPlan.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className="flex bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <img
                      src={activity.imageUrl}
                      alt={activity.name}
                      className="w-24 h-24 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {activity.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {activity.location}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 mt-2">
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {tripData.isInternational ? '$' : '₹'}{activity.cost}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.time}
                          </div>
                          {activity.weather && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                              <Thermometer className="h-3 w-3 mr-1" />
                              {activity.weather.temperature}°C
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center">
          <div className="text-3xl font-bold mb-2">
            {t.itinerary.totalCost}: {tripData.isInternational ? '$' : '₹'}{generatedTrip.totalCost}
          </div>
          <p className="text-blue-100">
            {t.itinerary.budgetNote}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default TripPlannerPage;