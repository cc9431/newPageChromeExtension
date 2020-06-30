import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  user-select: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
  z-index: -10;
  transition: background-color 750ms ease;
`;

const Background = (props) => (
  <Wrapper
    onClick={() => props.handleBackgroundClick()}
    style={{ backgroundColor: props.selectedColor }}
    className="background"
  >
    {props.children}
  </Wrapper>
);

export default Background;
