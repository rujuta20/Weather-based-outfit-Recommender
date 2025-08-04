import { useWeather } from "../hooks/useWeather"; 
import { Clock, MapPin} from "lucide-react";
export const SearchHistory = () => {
  const { searchHistory, darkMode } = useWeather();

  if (searchHistory.length === 0) return null;

  return (
    <div className={`rounded-2xl p-4 shadow-lg transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-500" />
        Recent Searches
      </h3>
      <div className="space-y-2">
        {searchHistory.map((city, index) => (
          <div
            key={index}
            className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <MapPin className="w-3 h-3 inline mr-2 opacity-60" />
            {city}
          </div>
        ))}
      </div>
    </div>
  );
};
