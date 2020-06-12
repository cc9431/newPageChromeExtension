import React from 'react';
import './weather.css';

const Weather = (props) => {
  const { weather } = props;
  const { description, temperature, sunrise, sunset } = weather;
  const text = description ? `${description}, ${temperature}˚` : '';
  return (
    <div>
      <p style={{ marginTop: 150, fontSize: 'calc(10px + 2vw)' }}>{text}</p>
      <p style={{ marginTop: 150, fontSize: 'calc(9px + 1vw)' }}>
        {sunrise.format('hh MM ss a')} => {sunset.format('hh MM ss a')}
      </p>
    </div>
  );
};

export default Weather;
