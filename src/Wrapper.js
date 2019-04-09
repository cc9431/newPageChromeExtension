import React, { Component } from "react";
import { BlockPicker } from "react-color";
import Tab from "./newTab";

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      // color: localStorage.getItem("colorKey") || ""
      color: ""
    };

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({ color: color.hex });
    // localStorage.setItem("color", color);
  }

  render() {
    const c = this.state.color ? this.state.color : "";
    return (
      <div>
        <div style={{ position: "absolute" }}>
          <BlockPicker color={c} onChangeComplete={this.handleColorChange} />
        </div>
        <Tab color={c} />
      </div>
    );
    // return <Tab />;
  }
}

export default Wrapper;
