import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

export const getWeatherIcon = (condition) => {
  const iconMap = {
    'sunny': Sun,
    'cloudy': Cloud,
    'partly cloudy': Cloud,
    'rainy': CloudRain,
    'windy': Wind
  };

  const IconComponent = iconMap[condition.toLowerCase()] || Sun;
  return IconComponent;
};