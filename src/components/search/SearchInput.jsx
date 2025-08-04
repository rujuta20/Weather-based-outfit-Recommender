import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import { citySuggestions } from '../services/mockData';

export const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { loading, darkMode } = useWeather();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        const filtered = citySuggestions.filter(city =>
          city.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const selectSuggestion = (city) => {
    setQuery(city);
    onSearch(city);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name..."
          disabled={loading}
          className={`w-full px-4 py-3 pl-12 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
            darkMode
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <button
          onClick={handleSubmit}
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-lg border z-10 ${
          darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
        }`}>
          {suggestions.map((city, index) => (
            <button
              key={index}
              onClick={() => selectSuggestion(city)}
              className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                index === 0 ? 'rounded-t-xl' : ''
              } ${
                index === suggestions.length - 1 ? 'rounded-b-xl' : ''
              } ${
                darkMode
                  ? 'hover:bg-gray-700 text-white'
                  : 'hover:bg-gray-50 text-gray-900'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2 opacity-60" />
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};