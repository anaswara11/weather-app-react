// src/components/WeatherDisplay.js
import React from 'react';

const WeatherDisplay = ({ weatherData, forecastData, weatherIcon, temperatureUnit, onToggle }) => {
  const convertTemperature = (temp) => {
    if (temperatureUnit === 'celsius') {
      return `${temp}°C`;
    } else {
      // Convert Celsius to Fahrenheit
      const fahrenheit = (temp * 9) / 5 + 32;
      return `${fahrenheit.toFixed(2)}°F`;
    }
  };

  return (
    <div className="cards-container">
      {weatherData && (
        <div className="card left">
          <h2>{weatherData.name}</h2>
          <p>Current Temperature: {convertTemperature(weatherData.main.temp)}</p>
          <p>Min Temperature: {convertTemperature(weatherData.main.temp_min)}</p>
          <p>Max Temperature: {convertTemperature(weatherData.main.temp_max)}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Wind Direction: {weatherData.wind.deg}°</p>
          <p>Description: {weatherData.weather[0].description}</p>
          {weatherIcon && <img className="weather-icon1" src={weatherIcon} alt="Weather Icon" />}
        </div>
      )}

      {forecastData && (
        <div className="card right">
          <h2>Weather Outlook</h2>
          {forecastData.list
            .filter((forecast) => new Date(forecast.dt_txt).getHours() === 12)
            .slice(0, 5)
            .map((forecast) => (
              <div key={forecast.dt} className="forecast-item">
                <div className="date">{new Date(forecast.dt * 1000).toLocaleDateString()}</div>
                <div className="temperature-description">
                  <p className="temperature">Avg Temperature: {convertTemperature(forecast.main.temp)}</p>
                  <p className="description">Description: {forecast.weather[0].description}</p>
                  <img
                    className="weather-icon"
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="toggle-container">
        <h3>Change Temperature Unit:</h3>
        <br />
        <button onClick={onToggle}>{temperatureUnit === 'celsius' ? 'Fahrenheit' : 'Celsius'}</button>
      </div>
    </div>
  );
};

export default WeatherDisplay;
