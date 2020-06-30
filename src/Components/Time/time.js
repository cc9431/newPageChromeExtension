import moment from 'moment';
import React, { Component } from 'react';
import Weather from '../Weather/weather';
import styled from 'styled-components';

// TODO transition on open, use keyframes

const Wrapper = styled.div`
  will-change: filter;
  position: absolute;
  transition: opacity ease 1.5s, top ease 1s, filter ease 1s;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0%);
  opacity: 1;
  filter: blur(${(props) => (props.show ? '5px' : '0px')});
  span {
    width: 16vw;
    justify-self: center;
    text-align: center;
    font-size: calc(42px + 5vw);
    color: whitesmoke;
  }
  p {
    justify-self: center;
    font-size: calc(10px + 3vw);
    color: whitesmoke;
  }
`;

class Time extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      minutes: '',
      hours: '',
      seconds: '',
      date: '',
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
      date: date.join(' '),
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
    return (
      <Wrapper
        show={this.props.sidebarShow}
        onClick={(e) => this.props.handleTimeClick(e)}
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
      </Wrapper>
    );
  }
}

export default Time;
