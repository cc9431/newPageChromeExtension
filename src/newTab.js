import moment from 'moment';
import React, { Component } from 'react';
import './newTab.css';

class Tab extends Component {
  constructor() {
    super();
    this.state = {
      time: '',
      date: '',
      numColors: 2,
      colors: [],
      right_left: ''
    };
  }
  randomChoice(...items) {
    return items[Math.floor(Math.random() * items.length)];
  }
  generateRandomHslColor() {
    const hue = Math.random() * 360;
    const analog = hue + 60;
    const hue_string = `hsl(${hue}, 40%, 50%)`;
    const analog_string = `hsl(${analog}, 40%, 50%)`;
    return `${hue_string}, ${analog_string}`;
  }
  generateRandomHexColor() {
    return `#${Math.random()
      .toString(16)
      .substr(-6)}`;
  }
  generateColors() {
    const colors = [];
    // for (var i = 0; i < this.state.numColors; i++) {
    //   colors.push(this.generateRandomHslColor());
    // }
    colors.push(this.generateRandomHslColor());
    this.setState({ colors: colors });
  }
  generateDirection() {
    this.setState({
      right_left: this.randomChoice('right', 'left')
    });
  }
  setDateTime() {
    this.setState({
      time: moment().format('hh mm ss'),
      date: moment().format('LL')
    });
  }
  componentWillMount() {
    this.generateColors();
    this.generateDirection();
    this.setDateTime();
  }
  componentDidMount() {
    setInterval(() => {
      this.setDateTime();
    }, 1000);
  }

  render() {
    const style = {
      backgroundImage: `linear-gradient(to ${
        this.state.right_left
      } bottom, ${this.state.colors.join(', ')})`
    };
    return (
      <div style={style} className="newTab">
        <div />
        <div>
          <div>
            <span>{this.state.time}</span>
          </div>
          <div>
            <p>{this.state.date}</p>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

export default Tab;
