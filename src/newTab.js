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
  generateRandomHslColors() {
    const colors = [];
    const hue = Math.random() * 360;
    const analogVal = 90;

    colors.push(`hsl(${hue}, 40%, 50%)`);
    for (var i = 0; i < this.state.numColors; i++) {
      const analogHue = hue + (i + 1) * analogVal;
      colors.push(`hsl(${analogHue}, 40%, 50%)`);
    }
    return colors;
  }

  generateDirection() {
    this.setState({
      right_left: this.randomChoice('right', 'left')
    });
  }

  generateGradient() {
    this.setState({ colors: this.generateRandomHslColors() });
    this.generateDirection();
  }

  setDateTime() {
    this.setState({
      time: moment().format('hh mm ss'),
      date: moment().format('LL')
    });
  }

  componentWillMount() {
    this.generateGradient();
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
