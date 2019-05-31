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
      selectedColor: localStorage.getItem('selectedColor') || '#123456',
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

  handleColorChange = (selectedColor) => {
    this.setState({ selectedColor });
    localStorage.setItem('selectedColor', selectedColor);
  };

  handleOutsideColorClick = () => {
    this.setState({ colorPick: false });
    // console.log('background');
  };

  componentWillMount() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) this.setState({ colorPick: false });
    });
  }

  componentWillUnmount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) this.setState({ colorPick: false });
    });
    document.removeEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }
  render() {
    const { colorShow, colorPick, selectedColor, nColors } = this.state;
    return (
      <Background
        handleBackgroundClick={() => this.handleOutsideColorClick()}
        selectedColor={selectedColor}
      >
        <div
          onMouseEnter={() => this.handleColorHoverEnter()}
          onMouseLeave={() => this.handleColorHoverExit()}
        >
          <CustomColorPicker
            nColors={nColors}
            colorShow={colorShow}
            colorPick={colorPick}
            selectedColor={selectedColor}
            handleColorClick={() => this.handleOutsideColorClick()}
            handleRightClick={() => this.handleRightClick()}
            handleColorChange={(hex) => this.handleColorChange(hex)}
          />
        </div>
        <MenuButton show={!(colorShow || colorPick)} />
        <Time handleTimeClick={() => this.handleOutsideColorClick()} />
      </Background>
    );
  }
}

export default Wrapper;
