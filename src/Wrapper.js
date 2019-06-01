import React, { Component } from 'react';
import MenuButton from './Components/MenuButton/menuButton';
import Time from './Components/Time/time';
import TimeSetting from './Components/Time/timeSetting';
import Background from './Components/Background/background';
import Sidebar from './Components/Sidebar/sidebar';
import CustomColorPicker from './Components/CustomColorPicker/customColorPicker';
import './wrapper.css';

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      selectedColor: localStorage.getItem('selectedColor') || '#123456',
      menuHover: false,
      sidebarShow: false,
      showSeconds: JSON.parse(localStorage.getItem('showSeconds') || 'true'),
      colorPick: false,
      nColors: 10
    };
  }

  handleMenuEnter = () => {
    this.setState({ menuHover: true });
    setTimeout(() => this.setState({ sidebarShow: this.state.menuHover }), 500);
  };

  handleMenuExit = () => {
    this.setState({ menuHover: false });
  };

  handleSidebarHoverExit = () => {
    this.setState({ menuHover: false, sidebarShow: false });
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
  };

  handleSecondsToggle = () => {
    localStorage.setItem(
      'showSeconds',
      this.state.showSeconds ? 'false' : 'true'
    );
    this.setState({ showSeconds: !this.state.showSeconds });
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
    const { sidebarShow, colorPick, selectedColor, nColors } = this.state;

    return (
      <Background
        handleBackgroundClick={() => this.handleOutsideColorClick()}
        selectedColor={selectedColor}
      >
        <Sidebar exit={() => this.handleSidebarHoverExit()} show={sidebarShow}>
          <CustomColorPicker
            nColors={nColors}
            sidebarShow={sidebarShow}
            colorPick={colorPick}
            selectedColor={selectedColor}
            handleColorClick={() => this.handleOutsideColorClick()}
            handleRightClick={() => this.handleRightClick()}
            handleColorChange={(hex) => this.handleColorChange(hex)}
          />
          <TimeSetting
            toggleSeconds={() => this.handleSecondsToggle()}
            showSeconds={this.state.showSeconds}
          />
        </Sidebar>
        <MenuButton
          enter={() => this.handleMenuEnter()}
          exit={() => this.handleMenuExit()}
          show={!(sidebarShow || colorPick)}
        />
        <Time
          showSeconds={this.state.showSeconds}
          handleTimeClick={() => this.handleOutsideColorClick()}
        />
      </Background>
    );
  }
}

export default Wrapper;
