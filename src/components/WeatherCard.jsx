import React from 'react';
import FutureDay from './FutureDay';
import { getWeatherForcastForCity } from '../api/api';
import { getIcon } from '../utils/getIcon';

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      weather: null,
    };
    this.daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }
  componentDidMount() {
    getWeatherForcastForCity(this.props.city).then(weather => {
      this.setState({ isLoading: false, weather });
    });
  }
  render() {
    if (this.state.isLoading) return 'loading...';
    const { weather } = this.state;
    const today = new Date().getDay();
    const days = new Array(7).fill('');
    return (
      <div className="card cardTemplate weather-forecast">
        <div className="city-key" hidden>
          {weather.label}
        </div>
        <div className="card-last-updated" hidden>
          {weather.created}
        </div>
        <div className="location">{weather.label}</div>
        <div className="date">{weather.current.date}</div>
        <div className="description">{weather.current.text}</div>
        <div className="current">
          <div className="visual">
            <div className={`icon ${getIcon(weather.current.code)}`} />
            <div className="temperature">
              <span className="value">{Math.round(weather.current.temp)}</span>
              <span className="scale">°F</span>
            </div>
          </div>
          <div className="description">
            <div className="humidity">{Math.round(weather.humidity) + '%'}</div>
            <div className="wind">
              <span className="value">{Math.round(weather.wind.speed)}</span>
              <span className="scale">mph</span>
              <span className="direction"> {weather.wind.direction}</span>°
            </div>
            <div className="sunrise">{weather.sunrise}</div>
            <div className="sunset">{weather.sunset}</div>
          </div>
        </div>
        <div className="future">
          {days.map((omit, i) => {
            const daily = weather.channel.item.forecast[i];
            return (
              <FutureDay
                key={daily.date}
                day={this.daysOfWeek[(i + today) % 7]}
                icon={getIcon(daily.code)}
                highTemp={Math.round(daily.high)}
                lowTemp={Math.round(daily.low)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default WeatherCard;
