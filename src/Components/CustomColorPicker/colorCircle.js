import React from 'react';
import styled from 'styled-components';

const Circle = styled.button`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  margin: 5px;
  outline: none;
  transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 5px 7px 2px 0px rgba(0, 0, 0, 0.2);
  :hover {
    transform: translate(0, -3px);
    box-shadow: 6px 11px 4px 0px rgba(0, 0, 0, 0.2);
  }
`;

const ColorCircle = (props) => (
  <Circle
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
  />
);

export default ColorCircle;
