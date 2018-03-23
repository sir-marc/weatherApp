import React from 'react';
import WeatherCard from './WeatherCard';
import { getSelectedCities } from '../api/localStorage';

export class WeatherCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cities: getSelectedCities() };
  }
  render() {
    return (
      <main className="main">
        {this.state.cities.map(city => (
          <WeatherCard city={city} key={city.key} />
        ))}
      </main>
    );
  }
}
