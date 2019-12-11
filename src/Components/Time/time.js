import moment from 'moment';
import React, { Component } from 'react';
import Weather from '../../Components/Weather/weather';
import './time.css';

class Time extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      minutes: '',
      hours: '',
      seconds: '',
      date: ''
    };
  }

  setDateTime() {
    const [hours, minutes, seconds, ...date] = moment()
      .format('hh mm ss dddd, LL')
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

  componentDidMount() {
    setTimeout(() => this.setState({ show: true }), 50);
  }

  render() {
    const style = {};
    if (this.props.sidebarShow) style.filter = 'blur(4px)';
    return (
      <div
        style={style}
        onClick={(e) => {
          console.log('time');
          return this.props.handleTimeClick(e)}
        }
        className={this.state.show ? 'time show' : 'time'}
      >
        <div style={{ display: 'inline-flex' }}>
          <span>{this.state.hours}</span>
          <span>{this.state.minutes}</span>
          {this.props.showSeconds && <span>{this.state.seconds}</span>}
        </div>
        <div>
          <p style={{ width: '20em' }}>{this.state.date}</p>
        </div>
        <Weather weather={this.props.weather} />
      </div>
    );
  }
}

export default Time;
