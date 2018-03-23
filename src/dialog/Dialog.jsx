import React from 'react';
import { addSelectedCity } from '../api/localStorage';
import { Mars } from '../weathux';
import { getWeatherForcastForCity } from '../api/api';

const addCity = storm => {
  const select = document.getElementById('selectCityToAdd');
  const selected = select.options[select.selectedIndex];
  const key = selected.value;
  const label = selected.textContent;
  // store to local storage
  addSelectedCity({ key, label });
  getWeatherForcastForCity({ key, label }).then(resp =>
    storm(({ cities }) => {
      return { cities: [...cities.filter(c => c.key !== resp.key), resp] };
    })(),
  );
};

const Dialog = ({ showDialog, closeDialog }) =>
  showDialog ? (
    <Mars>
      {({ forecast, storm }) => (
        <div className="dialog-container dialog-container--visible">
          <div className="dialog">
            <div className="dialog-title">Add new city</div>
            <div className="dialog-body">
              <select id="selectCityToAdd">
                {/* Values map to Yahoo Weather API Where On Earth Identifiers (WOEIDs).
               https://developer.yahoo.com/weather/documentation.html#req */}
                <option value="2357536">Austin, TX</option>
                <option value="2367105">Boston, MA</option>
                <option value="2379574">Chicago, IL</option>
                <option value="2459115">New York, NY</option>
                <option value="2475687">Portland, OR</option>
                <option value="2487956">San Francisco, CA</option>
                <option value="2490383">Seattle, WA</option>
              </select>
            </div>
            <div className="dialog-buttons">
              <button
                id="butAddCity"
                className="button"
                onClick={() => addCity(storm)}
              >
                Add
              </button>
              <button
                id="butAddCancel"
                className="button"
                onClick={closeDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Mars>
  ) : null;

export { Dialog };
