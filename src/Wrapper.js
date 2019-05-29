import React, { Component } from 'react';
import MenuButton from './Components/MenuButton/menuButton';
import Time from './Components/Time/time';
import Background from './Components/Background/background';
import CustomColorPicker from './Components/CustomColorPicker/customColorPicker';
import './wrapper.css';

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      color: '',
      colorHover: false,
      colorShow: false,
      colorPick: false,
      nColors: 10
    };
  }

  handleColorHoverEnter = () => {
    this.setState({ colorHover: true });
    setTimeout(() => this.setState({ colorShow: this.state.colorHover }), 500);
  };

  handleColorHoverExit = () => {
    this.setState({ colorHover: false, colorShow: false });
  };

  handleRightClick = () => {
    this.setState({ colorPick: true });
  };

  handleColorChange = (color) => {
    this.setState({ color });
  };

  handleBackgroundClick = () => {
    this.setState({ colorPick: false });
    // console.log('background');
  };

  componentWillMount() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  render() {
    const { colorShow, colorPick } = this.state;
    return (
      <Background
        handleBackgroundClick={() => this.handleBackgroundClick()}
        color={this.state.color}
      >
        <div
          onMouseEnter={() => this.handleColorHoverEnter()}
          onMouseLeave={() => this.handleColorHoverExit()}
        >
          <CustomColorPicker
            nColors={this.state.nColors}
            colorShow={colorShow}
            colorPick={colorPick}
            handleRightClick={() => this.handleRightClick()}
            handleColorChange={(hex) => this.handleColorChange(hex)}
          />
        </div>
        <MenuButton show={!(colorShow || colorPick)} />
        <Time />
      </Background>
    );
  }
}

export default Wrapper;
