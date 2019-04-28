import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import Time from './Time/time';
import Background from './Background/background';
import './wrapper.css';
import { ColorButton } from './Button/colorButton';

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      hsl: { h: 0, s: 0, l: 0 },
      solid: false,
      colorClasses: ['color']
    };
  }

  showHideColor() {
    const colLength = this.state.colorClasses.length;
    if (colLength === 1) this.setState({ colorClasses: ['color', 'show'] });
    else this.setState({ colorClasses: ['color'] });
  }

  handleColorChange(color) {
    this.setState({
      solid: color.hsl.h === this.state.hsl.h && !this.state.solid
    });
    this.setState({ hsl: color.hsl });
  }

  handleKeyPress(key) {
    if (key.code === 'KeyC' && key.ctrlKey) this.showHideColor();
  }

  componentDidMount() {
    document.addEventListener('keypress', (k) => this.handleKeyPress(k));
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', (k) => this.handleKeyPress(k));
  }

  render() {
    return (
      <Background hsl={this.state.hsl} solid={this.state.solid}>
        <div className={this.state.colorClasses.join(' ')}>
          <CirclePicker onChangeComplete={(c) => this.handleColorChange(c)} />
        </div>
        <ColorButton onClick={() => this.showHideColor()} />
        <Time />
      </Background>
    );
  }
}

export default Wrapper;
