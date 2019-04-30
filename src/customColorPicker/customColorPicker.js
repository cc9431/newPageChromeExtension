import React from 'react';
import { CustomPicker } from 'react-color';
var { Saturation } = require('react-color/lib/components/common');

class CircleColorPicker extends React.Component {
  handleChange() {
    return;
  }
  render() {
    return <div>{/* <span>this is a color picker</span> */}</div>;
  }
}

export default CustomPicker(CircleColorPicker);
