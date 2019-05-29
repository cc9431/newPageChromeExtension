import React from 'react';
import ColorCircle from './colorCircle';
import Block from 'react-color/lib/Block';
import './customColorPicker.css';

class CustomColorPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      selectedColor: '',
      selectedColorPicker: '',
      x: 0,
      y: 0
    };
  }

  componentWillMount() {
    const { nColors } = this.props;
    const localColors = localStorage.getItem('colors') || '[]';
    const selectedColor = localStorage.getItem('color') || '#555555';
    const colors = JSON.parse(localColors);
    if (colors.length !== nColors) {
      while (colors.length < nColors) {
        colors.push(this.generateRandomColor());
      }
      while (colors.length > nColors) {
        colors.pop();
      }
      localStorage.setItem('colors', JSON.stringify(colors));
    }
    this.setState({ colors, selectedColor });
  }

  generateRandomColor = () =>
    '#' +
    Math.random()
      .toString(16)
      .slice(-6);

  handleColorPick = (hex) => {
    const { colors, selectedColorPicker } = this.state;
    colors[colors.indexOf(selectedColorPicker)] = hex;
    this.setState({ selectedColor: hex, colors });
    this.props.handleColorChange(hex);
  };

  handleColorChange = (hex) => {
    this.setState({ selectedColor: hex });
    this.props.handleColorChange(hex);
  };

  handleRightClick = (x, y, selectedColorPicker) => {
    this.setState({ x, y, selectedColorPicker });
    this.props.handleRightClick();
  };

  renderColor = (color) => (
    <ColorCircle
      key={color}
      color={color}
      show={this.props.colorShow || this.props.colorPick}
      selected={this.state.selectedColor === color}
      handleColorChange={(color) => this.handleColorChange(color)}
      handleRightClick={(x, y, color) => this.handleRightClick(x, y, color)}
    />
  );

  renderColors = () =>
    this.state.colors.map((color) => this.renderColor(color));

  render() {
    const { x, y, selectedColorPicker } = this.state;
    const colorShow = this.props.colorShow || this.props.colorPick;
    const colorPick = this.props.colorPick && selectedColorPicker !== '';
    return (
      <div>
        <div
          style={{
            transition: 'all 250ms ease',
            opacity: colorPick ? 1 : 0,
            position: 'absolute',
            top: `${y + 15}px`,
            left: `${x - 85}px`,
            zIndex: colorPick ? 10 : 0
          }}
        >
          <Block
            onChange={(color) => this.handleColorPick(color.hex)}
            color={selectedColorPicker}
          />
        </div>
        <div className={`customPicker${colorShow ? ' hover' : ''}`}>
          <div className={'swatch'}>{this.renderColors(colorShow)}</div>
          <span className={'selectedColor'}>{this.state.selectedColor}</span>
        </div>
      </div>
    );
  }
}

export default CustomColorPicker;
