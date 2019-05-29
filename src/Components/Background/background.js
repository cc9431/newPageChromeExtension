import React from 'react';
import './background.css';

// TODO change top div to just be a div, add another div that is the actual background inside of top div
const Background = (props) => {
  return (
    <div className="background">
      <div
        onClick={() => props.handleBackgroundClick()}
        style={{ backgroundColor: props.selectedColor }}
        className="background"
      />
      {props.children}
    </div>
  );
};

export default Background;
