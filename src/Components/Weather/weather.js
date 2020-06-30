import React from 'react';
import styled from 'styled-components';

const Description = styled.p`
  margin-top: 150px;
  font-size: calc(10px + 2vw) !important;
`;

const SunTimes = styled.p`
  margin-top: 150px;
  font-size: calc(9px + 1vw) !important;
`;

const Weather = (props) => {
  const { weather } = props;
  const { description, temperature, sunrise, sunset } = weather;
  const text = description ? `${description}, ${temperature}˚` : '';
  return (
    <div>
      <Description>{text}</Description>
      <SunTimes>
        {sunrise.format('hh MM ss a')} => {sunset.format('hh MM ss a')}
      </SunTimes>
    </div>
  );
};

export default Weather;
