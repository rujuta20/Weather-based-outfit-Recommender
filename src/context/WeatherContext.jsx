import React, { createContext, useState, useCallback } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const addToHistory = useCallback((city) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, 5);
    });
  }, []);

  const value = {
    currentWeather, setCurrentWeather,
    searchHistory, addToHistory,
    loading, setLoading,
    error, setError,
    darkMode, setDarkMode
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};