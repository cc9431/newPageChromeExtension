import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import Time from './TimeComponent/time';
import './wrapper.css';

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      // color: localStorage.getItem("colorKey") || ""
      color1: '',
      color2: '',
      pickColorOne: true,
      colorClasses: ['color']
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color) {
    if (this.state.pickColorOne) this.setState({ color1: color.hex });
    else this.setState({ color2: color.hex });
    this.setState({ pickColorOne: !this.state.pickColorOne });
    // localStorage.setItem("color", color);
  }

  handleKeyPress(key) {
    if (key.code === 'KeyC' && key.ctrlKey) {
      const colLength = this.state.colorClasses.length;
      if (colLength === 1) this.setState({ colorClasses: ['color', 'show'] });
      else this.setState({ colorClasses: ['color'] });
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  render() {
    const c1 = this.state.color1 ? this.state.color1 : '';
    const c2 = this.state.color2 ? this.state.color2 : '';
    return (
      <div>
        <div className={this.state.colorClasses.join(' ')}>
          {/* <BlockPicker color={c} onChangeComplete={this.handleColorChange} /> */}
          <CirclePicker onChangeComplete={this.handleColorChange} />
        </div>
        <Time color1={c1} color2={c2} />
      </div>
    );
  }
}

export default Wrapper;
