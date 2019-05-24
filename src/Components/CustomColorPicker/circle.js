import React from 'react';
import './customColorPicker.css';

export const Circle = ({ hex }) => {
  return <div style={{ backgroundColor: hex }} className="circle" />;
};

export default Circle;
