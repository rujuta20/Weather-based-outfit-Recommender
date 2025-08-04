import { mockWeatherData } from './mockData';

export const mockWeatherAPI = async (city) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = mockWeatherData[city.toLowerCase()];
      if (data) {
        resolve(data);
      } else {
        reject(new Error('City not found'));
      }
    }, Math.random() * 1000 + 500);
  });
};

// For future real API integration
// export const realWeatherAPI = async (city, apiKey) => {
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
//   );
  
//   if (!response.ok) {
//     throw new Error('Weather data not found');
//   }
  
//   return response.json();
// };