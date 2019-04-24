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

  componentWillMount() {
    this.setDateTime();
    document.title = moment().format('MMM, DD');
  }

  componentDidMount() {
    setTimeout(
      () =>
        setInterval(() => {
          this.setDateTime();
        }, 1000),
      1000 - moment().milliseconds()
    );
  }

  render() {
    return (
      <div className="time">
        <div />
        <div>
          <div>
            <span>{this.state.time}</span>
          </div>
          <div>
            <p>{this.state.date}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Time;
