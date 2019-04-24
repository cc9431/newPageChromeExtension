import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import Time from './TimeComponent/time';
import Background from './BackgroundComponent/background';
import './wrapper.css';

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      color: '',
      solid: false,
      colorClasses: ['color']
    };
  }

  handleColorChange(color) {
    this.setState({
      solid: color.hex === this.state.color && !this.state.solid
    });
    this.setState({ color: color.hex });
  }

  handleKeyPress(key) {
    if (key.code === 'KeyC' && key.ctrlKey) {
      const colLength = this.state.colorClasses.length;
      if (colLength === 1) this.setState({ colorClasses: ['color', 'show'] });
      else this.setState({ colorClasses: ['color'] });
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', (k) => this.handleKeyPress(k));
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', (k) => this.handleKeyPress(k));
  }

  render() {
    return (
      <Background color={this.state.color} solid={this.state.solid}>
        <div className={this.state.colorClasses.join(' ')}>
          <CirclePicker onChangeComplete={(c) => this.handleColorChange(c)} />
        </div>
        <Time />
      </Background>
    );
  }
}

export default Wrapper;
