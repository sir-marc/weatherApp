import React, { Component } from 'react';
import { Dialog } from './dialog/Dialog';
import { initLocalStorage, getSelectedCities } from './api/localStorage';
import { WeatherCardList } from './weather/WeatherCardList';
import { createClimate, Jupiter, Mars } from './weathux';
import { stormForecast } from './weather/stormForecast';

const climate = createClimate({
  cities: getSelectedCities(),
});

const clearStorage = swReg => {
  initLocalStorage(true);
  // later may remove serviceWorker, clear cache and Co
  swReg.unregister();
  window.location.reload();
};

const refreshWeather = ({ cities, storm }) => {
  cities.forEach(city => stormForecast(city, storm));
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
    initLocalStorage();
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./serviceworker.js').then(reg => {
        this.swReg = reg;
      });
    }
  }

  render() {
    return (
      <Jupiter climate={climate}>
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
                      : clearStorage(this.swReg)
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
