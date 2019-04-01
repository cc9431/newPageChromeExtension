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
  generateColor() {
    return `#${Math.random()
      .toString(16)
      .substr(-6)}`;
  }
  generateColors() {
    const colors = [];
    for (var i = 0; i < this.state.numColors; i++) {
      colors.push(this.generateColor());
    }
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
