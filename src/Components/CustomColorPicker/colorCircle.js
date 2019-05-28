import React from 'react';
import './customColorPicker.css';

export const ColorCircle = (props) => (
  <button
    onClick={(event) => props.handleColorChange(event.altKey, props.color)}
    style={{
      backgroundColor: props.color,
      visibility: props.show ? 'visible' : 'hidden',
      border: `2px solid ${props.selected ? '#555555' : 'transparent'}`
    }}
    className="circle"
  />
);

export default ColorCircle;
