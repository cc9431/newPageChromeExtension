import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import Time from './Time/time';
import Background from './Background/background';
import './wrapper.css';
import CircleColorPicker from './customColorPicker/customColorPicker';

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      hsl: { h: 0, s: 0, l: 0 },
      color: '',
      solid: true,
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
      solid: color.hsl.h !== this.state.hsl.h || !this.state.solid
    });
    this.setState({ hsl: color.hsl, color: color.hex });
  }

  render() {
    return (
      <Background
        hsl={this.state.hsl}
        color={this.state.color}
        solid={this.state.solid}
      >
        <div className={this.state.colorClasses.join(' ')}>
          <CirclePicker onChangeComplete={(c) => this.handleColorChange(c)} />
        </div>
        <Time />
        <CircleColorPicker />
      </Background>
    );
  }
}

export default Wrapper;
