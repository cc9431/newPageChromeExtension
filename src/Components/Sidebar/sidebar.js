import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 10px;
  will-change: transform;
  top: 10px;
  z-index: 2;
  position: absolute;
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: translateX(${(props) => (props.show ? '10px' : '-60px')});
  transition: all 500ms cubic-bezier(0.5, -0.5, 0.3, 1.4);
  :hover {
    box-shadow: 0px 0px 0px 5px #0004;
  }
`;

const Sidebar = (props) => (
  <Wrapper
    show={props.show}
    onClick={(e) => {
      e.stopPropagation();
      props.handleColorClick();
    }}
    className={`sidebar${props.show ? ' hover' : ''}`}
  >
    {props.children}
  </Wrapper>
);

export default Sidebar;
