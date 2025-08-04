import { Cloud, CloudRain, Shirt, Sun, Wind } from "lucide-react";

export const getOutfitRecommendation = (weather) => {
  const { temperature, condition, windSpeed, humidity } = weather;
  
  let recommendations = [];
  let color = 'text-blue-600';
  let icon = <Shirt className="w-5 h-5" />;

  // Temperature-based recommendations
  if (temperature < 40) {
    recommendations.push('Heavy winter coat', 'Warm boots', 'Gloves and hat');
    color = 'text-purple-600';
  } else if (temperature < 60) {
    recommendations.push('Light jacket or sweater', 'Long pants', 'Closed-toe shoes');
    color = 'text-blue-600';
  } else if (temperature < 75) {
    recommendations.push('Light shirt or blouse', 'Jeans or light pants');
    color = 'text-green-600';
  } else if (temperature < 85) {
    recommendations.push('T-shirt or tank top', 'Shorts or light dress');
    color = 'text-yellow-600';
  } else {
    recommendations.push('Lightweight, breathable clothing', 'Shorts', 'Sandals');
    color = 'text-red-600';
  }

  // Weather condition-based recommendations
  if (condition.includes('rain')) {
    recommendations.push('Umbrella', 'Waterproof jacket', 'Non-slip shoes');
    icon = <CloudRain className="w-5 h-5" />;
  } else if (condition.includes('sunny')) {
    recommendations.push('Sunglasses', 'Hat or cap', 'Sunscreen');
    icon = <Sun className="w-5 h-5" />;
  } else if (condition.includes('cloudy')) {
    recommendations.push('Light layer for variable conditions');
    icon = <Cloud className="w-5 h-5" />;
  }

  // Wind-based recommendations
  if (windSpeed > 15) {
    recommendations.push('Windbreaker', 'Secure any loose accessories');
    icon = <Wind className="w-5 h-5" />;
  }

  // Humidity-based recommendations
  if (humidity > 80) {
    recommendations.push('Breathable fabrics', 'Moisture-wicking materials');
  }

  return { recommendations: recommendations.slice(0, 4), color, icon };
};