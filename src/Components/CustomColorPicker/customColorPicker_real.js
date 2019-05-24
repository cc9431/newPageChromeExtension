import React from 'react';
import { CustomPicker } from 'react-color';
import './customColorPicker.css';

class CustomColorPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      color: '#000000'
    };
  }

  render() {
    return <div />;
  }
}

export default CustomPicker(CustomColorPicker);
