import React from 'react';
import Circle from './circle';
import './customColorPicker.css';

class CustomColorPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      selectedColor: ''
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

  handleColorChange = (hex) => {
    const { selectedColor, colors } = this.state;
    if (selectedColor !== hex) {
      this.setState({ selectedColor: hex });
      this.props.handleColorChange(hex);
    } else {
      const newHex = this.generateRandomColor();
      colors[colors.indexOf(hex)] = newHex;
      localStorage.setItem('colors', JSON.stringify(colors));
      this.setState({ colors });
    }
  };

  renderColors = () =>
    this.state.colors.map((hex) => (
      <Circle
        key={hex}
        hex={hex}
        show={this.props.show}
        selected={this.state.selectedColor === hex}
        handleColorChange={(hex) => this.handleColorChange(hex)}
      />
    ));

  render() {
    return (
      <div className={`swatch${this.props.show ? ' swatchHover' : ''}`}>
        {this.renderColors()}
      </div>
    );
  }
}

export default CustomColorPicker;
