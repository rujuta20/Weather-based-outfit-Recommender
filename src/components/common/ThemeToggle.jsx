import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

export const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useWeather();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full transition-all duration-300 ${
        darkMode 
          ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
          : 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
      }`}
      aria-label="Toggle theme"
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};