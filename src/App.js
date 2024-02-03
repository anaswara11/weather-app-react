// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [temperatureUnit, setTemperatureUnit] = useState('celsius'); // Added state for temperature unit

  useEffect(() => {
    if (weatherData && weatherData.weather && weatherData.weather[0]) {
      const iconCode = weatherData.weather[0].icon;
      setWeatherIcon(`https://openweathermap.org/img/wn/${iconCode}.png`);
    }
  }, [weatherData]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=32528415bcfe312416f1a008ee2e48d2&units=metric`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=32528415bcfe312416f1a008ee2e48d2&units=metric`
        ),
      ]);

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
      setError(null);
      setIsCardVisible(false);
    } catch (error) {
      setWeatherData(null);
      setForecastData(null);
      setError('City not found. Please enter a valid city name.');
      setIsCardVisible(true);
    }
  };

  const handleToggle = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <div className="App">
      <div className="gradient-background">
        {isCardVisible && (
          <div className="card">
            <h1>Weather Forecast Dashboard</h1>
            <img src='/pic1.jpg' className='centered-image' />
            <h3>Find weather of your city!</h3>
            <div className="search-container">
              <input type="text" placeholder="Enter city" value={city} onChange={handleCityChange} />
              <button onClick={handleSearch}>Search</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
        {(weatherData || forecastData) && (
          <WeatherDisplay
            weatherData={weatherData}
            forecastData={forecastData}
            weatherIcon={weatherIcon}
            temperatureUnit={temperatureUnit} // Pass temperatureUnit to WeatherDisplay
            onToggle={handleToggle} // Pass onToggle function to WeatherDisplay
          />
        )}
      </div>
    </div>
  );
}

export default App;
