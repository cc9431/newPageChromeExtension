import moment from "moment";
import React, { Component } from "react";
import "./newTab.css";

class Tab extends Component {
  constructor() {
    super();
    this.state = {
      time: "",
      date: "",
      gradientColors: "",
      top_bottom: "",
      right_left: ""
    };
  }

  randomChoice(...items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  generateGradientColorsHSL() {
    const hue = Math.random() * 360;
    const gradientColors = `hsl(${hue}, 40%, 50%), hsl(${hue + 90}, 40%, 50%)`;
    console.log(gradientColors);
    this.setState({ gradientColors });
  }

  generateGradientDirection() {
    this.setState({
      right_left: this.randomChoice("right", "left"),
      top_bottom: this.randomChoice("top", "bottom")
    });
  }

  generateGradient() {
    this.generateGradientColorsHSL();
    this.generateGradientDirection();
  }

  setDateTime() {
    this.setState({
      time: moment().format("hh mm ss"),
      date: moment().format("LL")
    });
  }

  componentWillMount() {
    this.generateGradient();
    this.setDateTime();
  }

  componentDidMount() {
    setInterval(() => {
      this.setDateTime();
    }, 1000);
  }

  render() {
    let style;
    if (this.props.color) {
      style = {
        backgroundColor: this.props.color
      };
    } else {
      style = {
        backgroundImage: `linear-gradient(to
          ${this.state.right_left}
          ${this.state.top_bottom},
          ${this.state.gradientColors})`
      };
    }
    return (
      <div style={style} className="newTab">
        <div />
        <div>
          <div>
            <span>{this.state.time}</span>
          </div>
          <div>
            <p>{this.state.date}</p>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

export default Tab;
