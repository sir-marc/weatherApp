import React, { Component } from 'react';
import { Dialog } from './dialog/Dialog';
import { initLocalStorage, getSelectedCities } from './api/localStorage';
import { WeatherCardList } from './components/WeatherCardList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
    initLocalStorage();
  }
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="header__title">Weather PWA</h1>
          <button
            id="butRefresh"
            className="headerButton"
            aria-label="Refresh"
          />
          <button id="butAdd" className="headerButton" aria-label="Add" />
        </header>
        <WeatherCardList />
        <Dialog showDialog={this.state.showDialog} />
      </div>
    );
  }
}

export default App;
