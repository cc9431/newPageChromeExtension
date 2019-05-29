import moment from 'moment';
import React, { Component } from 'react';
import './time.css';

class Time extends Component {
  constructor() {
    super();
    this.state = {
      time: '',
      date: ''
    };
  }

  setDateTime() {
    this.setState({
      time: moment().format('hh mm ss'),
      date: moment().format('LL')
    });
  }

  startClock() {
    this.setDateTime();
    setInterval(() => {
      this.setDateTime();
    }, 1000);
  }

  componentWillMount() {
    document.title = moment().format('MMM, DD');
    this.setDateTime();
    setTimeout(() => this.startClock(), 1000 - moment().milliseconds());
  }

  componentDidMount() {}

  render() {
    return (
      <div onClick={() => this.props.handleTimeClick()} className="time">
        <div>
          <span>{this.state.time}</span>
        </div>
        <div>
          <p>{this.state.date}</p>
        </div>
      </div>
    );
  }
}

export default Time;
