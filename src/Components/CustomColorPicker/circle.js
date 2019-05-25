import React from 'react';
import './customColorPicker.css';

export const Circle = (props) => {
  return (
    <button
      onClick={() => props.handleColorChange(props.hex)}
      style={{
        backgroundColor: props.hex,
        border: `2px solid ${props.selected ? '#555555' : 'transparent'}`
      }}
      className="circle"
    />
  );
};

export default Circle;
