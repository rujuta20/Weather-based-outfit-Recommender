import { useWeather } from "./hooks/useWeather";
import { mockWeatherAPI } from "./services/weatherAPI";
import { ThemeToggle } from "./common/ThemeToggle";
import { SearchInput } from "./search/SearchInput";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { ErrorMessage } from "./common/ErrorMessage";
import { WeatherCard } from "./weather/WeatherCard";
import { SearchHistory } from "./search/SearchHistory";
import { Cloud } from "lucide-react";

export const WeatherApp = () => {
  const { 
    currentWeather, 
    setCurrentWeather, 
    addToHistory, 
    loading, 
    setLoading, 
    error, 
    setError,
    darkMode 
  } = useWeather();

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await mockWeatherAPI(city);
      setCurrentWeather(weatherData);
      addToHistory(weatherData.city);
    } catch (err) {
      setError(`Unable to find weather data for "${city}". Please try another city.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className={`text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Weather Outfit Guide
            </h1>
            <ThemeToggle />
          </div>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get weather updates and perfect outfit recommendations
          </p>
        </div>

        <div className="mb-8">
          <SearchInput onSearch={handleSearch} />
        </div>

        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {currentWeather && !loading && (
              <WeatherCard weather={currentWeather} />
            )}
          </div>
          <div>
            <SearchHistory />
          </div>
        </div>

        {!currentWeather && !loading && !error && (
          <div className={`text-center py-12 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Cloud className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Search for a city to get started!</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};