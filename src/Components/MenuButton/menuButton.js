import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  filter: invert(1);
  height: 50px;
  width: 50px;
  margin: 30px;
  transition: all 0.4s ease;
  opacity: ${(props) => (props.show ? 0.4 : 0)};
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0;
  }
`;

const MenuButton = (props) => (
  <Wrapper
    show={props.show}
    onClick={() => props.hideOrShow()}
    draggable="false"
    src={`${process.env.PUBLIC_URL}/bars.svg`}
    className={props.show ? 'menuButton' : 'menuButton menuButtonHover'}
    alt="menu"
  />
);

export default MenuButton;
