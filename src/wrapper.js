import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
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
      nColors: 10,
      weather: {
        temperature: '0',
        description: '',
        sunrise: moment(),
        sunset: moment()
      }
    };
  }

  handleMenuClick = () => {
    this.setState({ sidebarShow: !this.state.sidebarShow });
  };

  handleMenuEnter = () => {
    this.setState({ menuHover: true });
    setTimeout(() => this.setState({ sidebarShow: this.state.menuHover }), 500);
  };

  handleMenuExit = () => {
    this.setState({ menuHover: false });
  };

  handleSidebarHoverExit = () => {
    this.setState({ colorPick: false, menuHover: false, sidebarShow: false });
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

  posSuccess = (pos) => {
    const { coords } = pos;
    const { latitude, longitude } = coords;
    console.log({ latitude, longitude });
    const headers = { 'Access-Control-Allow-Origin': '*' };
    const mainUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    const appid = '200d258baeb23b1e06697947c860ca81';
    const units = 'imperial';
    axios
      .get(
        `${mainUrl}lat=${latitude}&lon=${longitude}&units=${units}&appid=${appid}`,
        headers
      )
      .then(({ data }) => {
        const { weather, main, sys } = data;
        const description = weather.length ? weather[0].description : '';
        const sunrise = sys.sunrise ? moment.unix(sys.sunrise) : moment();
        const sunset = sys.sunset ? moment.unix(sys.sunset) : moment();
        console.log('description', description);
        console.log(
          `current: ${main.temp}, high: ${main.temp_max}, low: ${main.temp_min}`
        );
        console.log(
          `sunrise: ${sunrise.format('h:mm a')}, sunset: ${sunset.format(
            'h:mm a'
          )}`
        );
        this.setState({
          weather: {
            description,
            temperature: main.temp,
            sunrise,
            sunset
          }
        });
      })
      .catch();
  };

  posError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.posSuccess, this.posError);
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
    const {
      sidebarShow,
      colorPick,
      selectedColor,
      nColors,
      weather
    } = this.state;
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
          hideOrShow={() => this.handleMenuClick()}
          show={!(sidebarShow || colorPick)}
        />
        <Time
          weather={this.state.weather}
          showSeconds={this.state.showSeconds}
          handleTimeClick={() => this.handleOutsideColorClick()}
        />
      </Background>
    );
  }
}

export default Wrapper;
