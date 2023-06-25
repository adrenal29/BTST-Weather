import React, { useState, useEffect } from 'react';

const apiKey = '29bda86e63528382485ad67a306ab579';

function WeatherApp() {
  const [location, setLocation] = useState('Lucknow');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = (searchLocation) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Wrong city choice. Please try again.');
        setLoading(false);
        console.error('There was a problem fetching the weather data:', error);
      });
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fetchWeather(location);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeather(location);
  };

  const weatherCode = weatherData?.weather[0].id;
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;
  let iconUrl;

  if (weatherCode >= 200 && weatherCode < 300) {
    iconUrl = isDay ? './imgs/day/113.png' : './imgs/night/113.png';
  } else if (weatherCode >= 300 && weatherCode < 400) {
    iconUrl = isDay ? './imgs/day/116.png' : './imgs/night/116.png';
  } else if (weatherCode >= 500 && weatherCode < 600) {
    iconUrl = isDay ? './imgs/day/263.png' : './imgs/night/263.png';
  } else if (weatherCode >= 600 && weatherCode < 700) {
    iconUrl = isDay ? './imgs/day/122.png' : './imgs/night/122.png';
  } else if (weatherCode >= 700 && weatherCode < 800) {
    iconUrl = isDay ? './imgs/day/119.png' : './imgs/night/119.png';
  } else if (weatherCode >= 800 && weatherCode < 900) {
    iconUrl = isDay ? './imgs/day/326.png' : './imgs/night/326.png';
  } else {
    iconUrl = './imgs/day/na.png';
  }

  const backgroundImageUrl = isDay ? './imgs/cloudy.jpg' : './imgs/night.jpg';

  return (
    <div className="weather-app" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="container">
        <h3 className="brand">Weather App</h3>
        <div>
          <h1 className="temp">{weatherData ? Math.round(weatherData.main.temp - 273.15) : ''}&#176;</h1>
          <div className="city">
            <h1 className="name">{weatherData ? weatherData.name : ''}</h1>
          </div>
          <div className="weather">
            <img src={iconUrl} className="icon" alt="icon" width="50" height="50" />
            <span className="condition">{weatherData ? weatherData.weather[0].description : ''}</span>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="notification-bar"></div>
        <form onSubmit={handleFormSubmit}>
          <input type="text" className="search" placeholder="Search Location..." name="location" value={location} onChange={(event) => setLocation(event.target.value)} onKeyDown={handleKeyDown} />
        </form>
        {weatherData && (
          <div>
            <h4>Weather Details</h4>
            <ul className="details">
              <li>Feels like: {Math.round(weatherData.main.feels_like - 273.15)}&#176;</li>
              <li>Humidity: {weatherData.main.humidity}%</li>
              <li>Pressure: {weatherData.main.pressure} hPa</li>
              <li>Wind: {weatherData.wind.speed} m/s</li>
            </ul>
            <ul>
                <li>Max-Temperature:{parseInt(weatherData.main.temp_max)-273}</li>
                <li>Min-Temperature:{parseInt(weatherData.main.temp_min)-273}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;