import React, { Component } from 'react';
import { Dialog } from './dialog/Dialog';
import { initLocalStorage, getSelectedCities } from './api/localStorage';
import { WeatherCardList } from './weather/WeatherCardList';
import { createClimate, Jupiter, Mars } from './weathux';
import { getWeatherForcastForCity } from './api/api';

const climate = createClimate({
  cities: getSelectedCities(),
});

const clearStorage = () => {
  initLocalStorage(true);
  // later may remove serviceWorker, clear cache and Co
  window.location.reload();
};

const refreshWeather = ({ cities, storm }) => {
  const weatherUpdatePromises = cities.map(city =>
    getWeatherForcastForCity(city),
  );
  Promise.all(weatherUpdatePromises).then(resp =>
    storm(() => {
      console.log(resp);
      return { cities: resp };
    })(),
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
    initLocalStorage();
  }
  render() {
    return (
      <Jupiter climate={climate} dev>
        <div className="App">
          <div height="800px" />
          <header className="header">
            <h1 className="header__title">Weather PWA</h1>
            <Mars>
              {({ forecast, storm }) => (
                <button
                  id="butRefresh"
                  className="headerButton"
                  aria-label="Refresh"
                  onClick={({ shiftKey }) =>
                    !shiftKey
                      ? refreshWeather({
                          cities: forecast.cities,
                          storm,
                        })
                      : clearStorage()
                  }
                />
              )}
            </Mars>
            <button
              id="butAdd"
              className="headerButton"
              aria-label="Add"
              onClick={() => this.setState({ showDialog: true })}
            />
          </header>
          <WeatherCardList />
          <Dialog
            showDialog={this.state.showDialog}
            closeDialog={() => this.setState({ showDialog: false })}
          />
        </div>
      </Jupiter>
    );
  }
}

export default App;
