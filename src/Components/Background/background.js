import React from 'react';
import './background.css';

const Background = (props) => {
  return (
    <div className="background">
      <div
        onClick={() => {
          console.log('background');
          return props.handleBackgroundClick()}
        }
        style={{ backgroundColor: props.selectedColor }}
        className="background"
      />
      {props.children}
    </div>
  );
};

export default Background;
