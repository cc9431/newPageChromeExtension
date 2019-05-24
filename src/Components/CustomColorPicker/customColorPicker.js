import React from 'react';
import { CirclePicker } from 'react-color';
import './customColorPicker.css';

class CustomColorPicker extends React.Component {
  render() {
    return (
      <CirclePicker
        className={this.props.show ? 'color colorHover' : 'color'}
        onChangeComplete={(e) => this.props.handleColorChange(e)}
      />
    );
  }
}

export default CustomColorPicker;
