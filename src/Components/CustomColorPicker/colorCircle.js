import React from 'react';
import './customColorPicker.css';

export const ColorCircle = (props) => (
  <button
    onContextMenu={(e) => props.handleRightClick(e.pageX, e.pageY, props.color)}
    onClick={() => props.handleColorChange(props.color)}
    style={{
      backgroundColor: props.color,
      border: `2px solid ${props.selected ? '#555555' : 'transparent'}`,
      transform: props.pick ? 'translate(0, -3px)' : ''
    }}
    className="circle"
  />
);

export default ColorCircle;
