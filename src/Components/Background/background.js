import React, { PureComponent } from 'react';
import './background.css';

class Background extends PureComponent {
  constructor() {
    super();
    this.state = {
      gradient: '',
      color: localStorage.getItem('color') || '#555555',
      top_bottom: '',
      right_left: ''
    };
  }

  randomChoice(...items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  generateGradientColorsHSL(hsl) {
    const { h, s, l } = hsl;
    const gradient = `hsl(${h}, ${s}%, ${l}%), hsl(${h + 90}, ${s}%, ${l}%)`;
    this.setState({ gradient: gradient });
  }

  generateGradientDirection() {
    this.setState({
      right_left: this.randomChoice('right', 'left'),
      top_bottom: this.randomChoice('top', 'bottom')
    });
  }

  generateGradient() {
    const hsl = {
      h: Math.random() * 360,
      s: 50,
      l: 60
    };
    this.generateGradientColorsHSL(hsl);
    this.generateGradientDirection();
  }

  componentWillMount() {
    this.generateGradient();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color !== this.props.color) {
      this.setState({ color: nextProps.color });
      localStorage.setItem('color', nextProps.color);
    }
  }

  render() {
    return (
      <div
        // TODO
        onClick={() => this.props.handleBackgroundClick()}
        style={{ backgroundColor: this.state.color }}
        className="background"
      >
        {this.props.children}
      </div>
    );
  }
}

export default Background;
