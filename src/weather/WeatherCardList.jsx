import React from 'react';
import WeatherCard from './WeatherCard';
import { Mars } from '../weathux';

export const WeatherCardList = () => (
  <main className="main">
    <Mars>
      {({ forecast }) =>
        forecast.cities.map(city => <WeatherCard city={city} key={city.key} />)
      }
    </Mars>
  </main>
);
