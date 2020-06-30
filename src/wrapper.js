import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import MenuButton from './Components/MenuButton/menuButton';
import Time from './Components/Time/time';
import TimeSetting from './Components/Time/timeSetting';
import Background from './Components/Background/background';
import Sidebar from './Components/Sidebar/sidebar';
import CustomColorPicker from './Components/CustomColorPicker/customColorPicker';
import GlobalStyle from './globalStyle';
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
        zip: localStorage.getItem('zip') || '11201',
        temperature: '0',
        description: '',
        sunrise: moment(),
        sunset: moment(),
      },
    };
  }

  handleMenuClick = () => {
    this.setState({ sidebarShow: !this.state.sidebarShow });
  };

  handleMenuEnter = () => {
    this.setState({ menuHover: true });
    setTimeout(() => this.setState({ sidebarShow: this.state.menuHover }), 500);
  };

  handleSidebarExit = () => {
    if (this.state.colorPick || this.state.menuHover || this.state.sidebarShow)
      this.setState({ colorPick: false, menuHover: false, sidebarShow: false });
  };

  handleRightClick = () => {
    if (!this.state.colorPick) this.setState({ colorPick: true });
  };

  handleColorChange = (selectedColor) => {
    this.setState({ selectedColor });
    localStorage.setItem('selectedColor', selectedColor);
  };

  handleOutsideColorClick = () => {
    if (this.state.colorPick) this.setState({ colorPick: false });
  };

  handleSecondsToggle = () => {
    localStorage.setItem(
      'showSeconds',
      this.state.showSeconds ? 'false' : 'true'
    );
    this.setState({ showSeconds: !this.state.showSeconds });
  };

  getWeather = (pos) => {
    const { weather } = this.state;
    const { zip } = weather;
    if (!zip) return;
    const headers = { 'Access-Control-Allow-Origin': '*' };
    const mainUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    const appid = '200d258baeb23b1e06697947c860ca81';
    const units = 'imperial';
    axios
      .get(`${mainUrl}zip=${zip},us&units=${units}&appid=${appid}`, headers)
      .then(({ data }) => {
        const { main, sys } = data;
        const description = data.weather.length
          ? data.weather[0].description
          : '';
        const sunrise = sys.sunrise ? moment.unix(sys.sunrise) : moment();
        const sunset = sys.sunset ? moment.unix(sys.sunset) : moment();
        weather.description = description;
        weather.temperature = main.temp;
        weather.sunrise = sunrise;
        weather.sunset = sunset;
        console.log(sys.sunrise);
        console.log(sys.sunset);
        this.setState({ weather });
      })
      .catch();
  };

  updateZip = (e) => {
    const { weather } = this.state;
    const zip = e.target.value.trim();
    weather.zip = zip;
    this.setState({ weather });
  };

  saveZip = () => {
    const { zip } = this.state.weather;
    localStorage.setItem('zip', zip);
    this.getWeather();
  };

  componentWillMount() {
    this.getWeather();
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
      weather,
      showSeconds,
    } = this.state;
    return (
      <Background
        handleBackgroundClick={() => this.handleSidebarExit()}
        selectedColor={selectedColor}
      >
        <Sidebar
          handleColorClick={() => this.handleOutsideColorClick()}
          show={sidebarShow}
        >
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
            showSeconds={showSeconds}
          />
          <div>
            <div className="settingLabel">Weather Zip Code</div>
            <div style={{ width: 210, display: 'inline-flex' }}>
              <input
                className="zipCode"
                type="text"
                value={weather.zip || ''}
                onChange={(e) => this.updateZip(e)}
              />
              <button className="zipCodeSave" onClick={() => this.saveZip()}>
                Save
              </button>
            </div>
          </div>
        </Sidebar>
        <MenuButton
          enter={() => this.handleMenuEnter()}
          hideOrShow={() => this.handleMenuClick()}
          show={!(sidebarShow || colorPick)}
        />
        <Time
          sidebarShow={sidebarShow}
          weather={weather}
          showSeconds={showSeconds}
          handleTimeClick={() => this.handleSidebarExit()}
        />
        <GlobalStyle />
      </Background>
    );
  }
}

export default Wrapper;
