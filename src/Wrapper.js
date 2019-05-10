import React, { Component } from 'react';
// import { CirclePicker } from 'react-color';
import MenuButton from './MenuButton/menuButton';
import Time from './Time/time';
import Background from './Background/background';
import CustomColorPicker from './CustomColorPicker/customColorPicker';
import './wrapper.css';

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      hsl: { h: 0, s: 0, l: 0 },
      color: '',
      solid: true,
      colorHover: false,
      colorShow: false
    };
  }

  handleColorHoverEnter() {
    this.setState({ colorShow: true });
    // this.setState({ colorHover: true });
    // setTimeout(() => this.setState({ colorShow: this.state.colorHover }), 500);
  }

  handleColorHoverExit() {
    this.setState({ colorHover: false, colorShow: false });
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
        >
          <CustomColorPicker
            show={this.state.colorShow}
            handleColorChange={(e) => this.handleColorChange(e)}
          />
        </div>
        <MenuButton show={!this.state.colorShow} />
        <Time />
      </Background>
    );
  }
}

export default Wrapper;
