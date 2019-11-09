import React from 'react';
import './weather.css';

const Weather = (props) => {
  const { weather } = props;
  const { description, temperature } = weather;
  // const { description, temperature, sunrise, sunset } = weather;
  const text = description ? `${description}, ${temperature}˚` : '';
  return (
    <div>
      <p style={{ marginTop: '5em', fontSize: 25 }}>{text}</p>
    </div>
  );
};

export default Weather;
