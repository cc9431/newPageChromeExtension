// import moment from 'moment';
import React from 'react';
import './colorButton.css';

export const ColorButton = (props) => {
  return <button className="colorButton" onClick={props.onClick} />;
};
