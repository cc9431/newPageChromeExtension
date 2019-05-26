import React, { Component } from 'react';
import MenuButton from './Components/MenuButton/menuButton';
import Time from './Components/Time/time';
import Background from './Components/Background/background';
import CustomColorPicker from './Components/CustomColorPicker/customColorPicker_real';
import './wrapper.css';

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      color: '',
      colorHover: false,
      colorShow: false,
      nColors: 8
    };
  }

  handleColorHoverEnter() {
    this.setState({ colorHover: true });
    setTimeout(() => this.setState({ colorShow: this.state.colorHover }), 500);
  }

  handleColorHoverExit() {
    this.setState({ colorHover: false, colorShow: false });
  }

  handleColorChange(color) {
    this.setState({ color });
  }

  render() {
    return (
      <Background color={this.state.color}>
        <div
          onMouseEnter={() => this.handleColorHoverEnter()}
          onMouseLeave={() => this.handleColorHoverExit()}
        >
          <CustomColorPicker
            nColors={this.state.nColors}
            show={this.state.colorShow}
            handleColorChange={(hex) => this.handleColorChange(hex)}
          />
        </div>
        <MenuButton show={!this.state.colorShow} />
        <Time />
      </Background>
    );
  }
}

export default Wrapper;
