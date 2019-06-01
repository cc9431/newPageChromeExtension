import moment from 'moment';
import React, { Component } from 'react';
import './time.css';

class Time extends Component {
  constructor() {
    super();
    this.state = {
      minutes: '',
      hours: '',
      seconds: '',
      date: ''
    };
  }

  setDateTime() {
    const [hours, minutes, seconds, ...date] = moment()
      .format('hh mm ss LL')
      .split(' ');
    this.setState({
      hours,
      minutes,
      seconds,
      date: date.join(' ')
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
        <div style={{ display: 'inline-flex' }}>
          <span>{this.state.hours}</span>
          <span className="timeSpan">{this.state.minutes}</span>
          {this.props.showSeconds && (
            <span className="timeSpan">{this.state.seconds}</span>
          )}
        </div>
        <div>
          <p>{this.state.date}</p>
        </div>
      </div>
    );
  }
}

export default Time;
