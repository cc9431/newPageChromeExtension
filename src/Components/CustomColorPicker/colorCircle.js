import React from 'react';
import './customColorPicker.css';

const ColorCircle = (props) => (
  <button
    draggable={true}
    onDragStart={() => props.handleDragColorStart()}
    onDragEnd={() => props.handleDragColorEnd()}
    onDragEnter={() => props.handleSwitchColors()}
    onContextMenu={(e) => props.handleRightClick(e.pageX, e.pageY, props.color)}
    onClick={() => props.handleColorChange(props.color)}
    style={{
      filter: props.isDragging ? 'opacity(25%)' : '',
      backgroundColor: props.color,
      border: `2px solid ${props.selected ? '#555555' : 'transparent'}`,
      transform: props.pick ? 'translate(0, -3px)' : '',
    }}
    className="circle"
  />
);

export default ColorCircle;
