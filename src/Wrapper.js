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
      showColorPicker: false
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
    console.log(key);
    if (key.code === 'KeyC' && key.ctrlKey)
      this.setState({ showColorPicker: !this.state.showColorPicker });
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentDidUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  render() {
    const c1 = this.state.color1 ? this.state.color1 : '';
    const c2 = this.state.color2 ? this.state.color2 : '';
    return (
      <div>
        {this.state.showColorPicker && (
          <div className="color">
            {/* <BlockPicker color={c} onChangeComplete={this.handleColorChange} /> */}
            <CirclePicker onChangeComplete={this.handleColorChange} />
          </div>
        )}
        <Time color1={c1} color2={c2} />
      </div>
    );
    // return <Tab />;
  }
}

export default Wrapper;
