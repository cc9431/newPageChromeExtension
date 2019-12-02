import React from 'react';
import './weather.css';

const Weather = (props) => {
  const { weather } = props;
  const { description, temperature } = weather;
  // const { description, temperature, sunrise, sunset } = weather;
  const text = description ? `${description}, ${temperature}˚` : '';
  return (
    <div>
      <p style={{ marginTop: 150, fontSize: 'calc(10px + 2vw)' }}>{text}</p>
    </div>
  );
};

export default Weather;
