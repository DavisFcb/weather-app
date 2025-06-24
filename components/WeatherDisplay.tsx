import React from 'react';

interface WeatherData {
  weather: {
    icon: string;
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

const WeatherDisplay = ({ data }: { data: WeatherData }) => {
  const weatherIcon = data.weather[0].icon;
  const weatherDescription = data.weather[0].description;
  const temperature = Math.round(data.main.temp);
  const cityName = data.name;
  const country = data.sys.country;

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          {cityName}, {country}
        </h2>
        <div className="flex items-center justify-center my-4">
          <img
            src={getWeatherIcon(weatherIcon)}
            alt={weatherDescription}
            className="w-20 h-20"
          />
          <span className="text-4xl font-bold ml-2">{temperature}°C</span>
        </div>
        <p className="text-gray-700 capitalize">{weatherDescription}</p>
        
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg">
            <p>Feels Like</p>
            <p className="font-semibold">{Math.round(data.main.feels_like)}°C</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p>Humidity</p>
            <p className="font-semibold">{data.main.humidity}%</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p>Wind Speed</p>
            <p className="font-semibold">{data.wind.speed} m/s</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p>Pressure</p>
            <p className="font-semibold">{data.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;