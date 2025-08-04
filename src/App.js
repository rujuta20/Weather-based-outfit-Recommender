import React from 'react';
import { WeatherProvider } from './context';
import { WeatherApp } from './components/WeatherApp';
import './App.css';

const App = () => {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
};

export default App;
