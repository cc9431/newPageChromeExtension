import React from 'react';
import './menuButton.css';

const MenuButton = (props) => (
  <div onMouseDown={() => props.hideOrShow()}>
    <img
      draggable="false"
      src={`${process.env.PUBLIC_URL}/bars.svg`}
      className={props.show ? 'menuButton' : 'menuButton menuButtonHover'}
      alt="menu"
    />
  </div>
);

export default MenuButton;
