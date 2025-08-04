import React from 'react';
import { MapPin, Wind, Droplets, Sun, Cloud, CloudRain } from 'lucide-react';
import { useWeather } from '../hooks/useWeather'; 
import { getOutfitRecommendation } from '../utils/outfitRecommendations'; 
import { getWeatherIcon } from '../utils/weatherIcons';

export const WeatherCard = ({ weather }) => {
const { darkMode } = useWeather();
  const outfit = getOutfitRecommendation(weather);

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'partly cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'windy': return <Wind className="w-8 h-8 text-gray-600" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <div className={`rounded-2xl p-6 shadow-xl transition-all duration-500 animate-fadeIn ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-white to-gray-50 text-gray-900'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-500" />
            {weather.city}
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Current weather conditions
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-blue-500">
            {weather.temperature}°F
          </div>
          <div className="flex items-center gap-2 mt-1">
            {getWeatherIcon(weather.condition)}
            <span className="capitalize text-sm">{weather.condition}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-3 rounded-xl ${
          darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Wind Speed</span>
          </div>
          <span className="text-lg font-bold">{weather.windSpeed} mph</span>
        </div>
        <div className={`p-3 rounded-xl ${
          darkMode ? 'bg-gray-700/50' : 'bg-blue-50'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <span className="text-lg font-bold">{weather.humidity}%</span>
        </div>
      </div>

      <div>
        <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${outfit.color}`}>
          {outfit.icon}
          Outfit Recommendations
        </h3>
        <div className="space-y-2">
          {outfit.recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-gray-700/30' : 'bg-gray-100'
              }`}
            >
              • {rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};