import React from 'react';
import ColorCircle from './colorCircle';
// import Block from 'react-color/lib/Block';
import './customColorPicker.css';

class CustomColorPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      selectedColor: '',
      selectedColorPicker: ''
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

  handleColorChange = (alt, hex) => {
    if (alt) this.setState({ selectedColorPicker: hex });
    else {
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
    }
  };

  renderColors = () =>
    this.state.colors.map((color) => (
      // color === this.state.selectedColorPicker
      // <Block key={color} color={color} />
      <ColorCircle
        key={color}
        color={color}
        show={this.props.show}
        selected={this.state.selectedColor === color}
        handleColorChange={(alt, color) => this.handleColorChange(alt, color)}
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