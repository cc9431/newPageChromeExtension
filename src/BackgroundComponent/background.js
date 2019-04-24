import React, { Component } from 'react';
import './background.css';

class Background extends Component {
  constructor() {
    super();
    this.state = {
      gradient: '',
      top_bottom: '',
      right_left: ''
    };
  }

  hexToHue(hex) {
    const [r, g, b] = this.hexToRgb(hex);
    return this.rgbToHue(r, g, b);
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return [r, g, b];
  }

  rgbToHue(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    if (max === min) return 0;
    const diff = max - min;
    let h;
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      default:
        h = (r - g) / diff + 4;
        break;
    }
    return Math.round(360 * (h / 6));
  }

  randomChoice(...items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  generateGradientColorsHSL(hue, solid = false) {
    const offset = solid ? 0 : 90;
    const gradient = `hsl(${hue}, 60%, 50%), hsl(${hue + offset}, 60%, 50%)`;
    this.setState({ gradient: gradient });
  }

  generateGradientDirection() {
    this.setState({
      right_left: this.randomChoice('right', 'left'),
      top_bottom: this.randomChoice('top', 'bottom')
    });
  }

  generateGradient() {
    this.generateGradientColorsHSL(Math.random() * 360);
    this.generateGradientDirection();
  }

  componentWillMount() {
    this.generateGradient();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color || nextProps.solid) {
      const hue = this.hexToHue(nextProps.color);
      const solid = nextProps.solid;
      this.generateGradientColorsHSL(hue, solid);
    }
  }

  render() {
    const style = {
      backgroundImage: `linear-gradient(to
          ${this.state.right_left}
          ${this.state.top_bottom},
          ${this.state.gradient})`
    };
    return (
      <div style={style} className="background">
        {this.props.children}
      </div>
    );
  }
}

export default Background;
