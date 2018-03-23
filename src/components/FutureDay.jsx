import React from 'react';

export default ({ icon, tempHigh, tempLow, day }) => (
  <div className="oneday">
    <div className="date">{day}</div>
    <div className={`icon ${icon}`} />
    <div className="temp-high">
      <span className="value">{tempHigh}</span>°
    </div>
    <div className="temp-low">
      <span className="value">{tempLow}</span>°
    </div>
  </div>
);
