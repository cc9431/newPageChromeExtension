import React, { useState, useEffect } from 'react';
import ColorCircle from './colorCircle';
import Twitter from 'react-color/lib/Twitter';
import styled from 'styled-components';

const CustomPicker = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const Message = styled.div`
  position: absolute;
  left: 40vw;
  opacity: ${(props) => props.messageOpacity};
  font-size: 18px;
  text-align: center;
  width: 20vw;
  text-shadow: 1px 1px black;
  transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: white;
`;

const Swatch = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const ReactColor = styled.div`
  will-change: top, left;
  opacity: ${(props) => (props.colorPick ? 1 : 0)};
  top: ${(props) => props.y + 12}px;
  left: ${(props) => props.x - 28}px;
  visibility: ${(props) => (props.colorPick ? 'visible' : 'hidden')};
  position: absolute;
  z-index: 4;
  transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const Label = styled.div`
  margin-bottom: 2px;
  justify-self: left;
  width: max-content;
  color: whitesmoke;
  text-align: left;
  font-size: 13px;
  text-shadow: 1px 1px black;
`;

const SelectedColor = styled.div`
  text-align: left;
  font-size: 18px;
  text-shadow: 1px 1px black;
  width: max-content;
  color: white;
  cursor: pointer;
  transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  :hover {
    padding-left: 10px;
  }
`;

const CustomColorPicker = (props) => {
  const [messageOpacity, setMessageOpacity] = useState(0);
  const [colors, setColors] = useState([]);
  const [selectedColorPicker, setSelectedColor] = useState('');
  const [draggingColorIndex, setDraggingColorIndex] = useState(-1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const onlyUnique = (value, index, self) => self.indexOf(value) === index;

  const uniqueColors = (newColors, nColors) => {
    const uniqueColors = newColors.filter(onlyUnique);
    if (uniqueColors.length !== nColors) {
      while (uniqueColors.length < nColors) {
        uniqueColors.push(generateRandomColor());
      }
      while (uniqueColors.length > nColors) {
        uniqueColors.pop();
      }
    }
    localStorage.setItem('colors', JSON.stringify(uniqueColors));
    setColors(uniqueColors);
  };

  const generateRandomColor = () => '#' + Math.random().toString(16).slice(-6);

  const handleColorPick = (hex) => {
    colors[colors.indexOf(selectedColorPicker)] = hex;
    setColors(colors);
    setSelectedColor(hex);
    localStorage.setItem('colors', JSON.stringify(colors));
    props.handleColorChange(hex);
  };

  const handleRightClick = (x, y, clickedColor) => {
    if (props.colorPick && clickedColor === selectedColorPicker) {
      handleColorPick(generateRandomColor());
    } else {
      setX(x);
      setY(y);
      setSelectedColor(clickedColor);
      props.handleRightClick();
    }
  };

  const message = () => {
    setMessageOpacity(1);
    setTimeout(() => setMessageOpacity(0), 2000);
  };

  useEffect(() => {
    console.log('component mounted!');
    const { nColors } = props;
    const localColors = localStorage.getItem('colors') || '[]';
    const newColors = JSON.parse(localColors);
    uniqueColors(newColors, nColors);
  }, []);

  useEffect(() => {
    const { nColors } = props;
    uniqueColors(colors, nColors);
  }, [props.nColors]);

  const renderColor = (color, index) => (
    <ColorCircle
      key={color}
      color={color}
      index={index}
      isDragging={draggingColorIndex === index}
      selected={props.selectedColor === color}
      pick={selectedColorPicker === color && props.colorPick}
      handleDragColorStart={() => {
        props.handleColorClick();
        setDraggingColorIndex(index);
      }}
      handleDragColorEnd={() => setDraggingColorIndex(-1)}
      handleSwitchColors={() => {
        const newColors = { ...colors };
        const draggingColor = newColors[draggingColorIndex];
        newColors[index] = draggingColor;
        newColors[draggingColorIndex] = color;
        setColors(newColors);
        setDraggingColorIndex(index);
      }}
      handleColorChange={(color) => props.handleColorChange(color)}
      handleRightClick={(x, y, color) => handleRightClick(x, y, color)}
    />
  );

  const renderColors = () =>
    colors.map((color, index) => renderColor(color, index));

  const colorShow = props.sidebarShow || props.colorPick;
  const colorPick = props.colorPick && selectedColorPicker !== '';
  return (
    <div>
      <Message messageOpacity={messageOpacity}>
        Color Copied to Clipboard!
      </Message>
      <ReactColor colorPick={colorPick} x={x} y={y}>
        <Twitter
          onChange={(color) => handleColorPick(color.hex)}
          color={selectedColorPicker}
        />
      </ReactColor>
      <CustomPicker>
        <Swatch>{renderColors(colorShow)}</Swatch>
        <div>
          <Label>Current Color</Label>
          <SelectedColor
            onClick={() =>
              navigator.clipboard
                .writeText(props.selectedColor)
                .then(() => message())
            }
          >
            {props.selectedColor}
          </SelectedColor>
        </div>
      </CustomPicker>
    </div>
  );
};

export default CustomColorPicker;
