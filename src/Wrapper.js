import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import MenuButton from './menuButton/menuButton';
import Time from './Time/time';
import Background from './Background/background';
// import CircleColorPicker from './customColorPicker/customColorPicker';
import './wrapper.css';

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      hsl: { h: 0, s: 0, l: 0 },
      color: '',
      solid: true,
      colorHover: false
    };
  }

  handleColorHoverEnter() {
    this.setState({ colorHover: true });
  }

  handleColorHoverExit() {
    this.setState({ colorHover: false });
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
        <div
          onMouseEnter={() => this.handleColorHoverEnter()}
          onMouseLeave={() => this.handleColorHoverExit()}
          className="color"
        >
          <CirclePicker onChangeComplete={(c) => this.handleColorChange(c)} />
        </div>
        <MenuButton show={!this.state.colorHover} />
        <Time />
        {/* <CircleColorPicker /> */}
      </Background>
    );
  }
}

export default Wrapper;
