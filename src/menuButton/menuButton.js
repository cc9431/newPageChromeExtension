import React from 'react';
import './menuButton.css';

const MenuButton = (props) => (
  <img
    src={`${process.env.PUBLIC_URL}/menu.jpg`}
    className={props.show ? 'menuButton' : 'menuButton menuButtonHover'}
    alt="menu"
  />
);

export default MenuButton;
