import React from 'react';
import styled from 'styled-components';

const Setting = styled.div`
  width: max-content;
  color: whitesmoke;
  text-align: left;
  font-size: 18px;
  text-shadow: 1px 1px black;
  cursor: pointer;
  transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  :hover {
    padding-left: 10px;
  }
`;

const Label = styled.div`
  margin-bottom: 2px;
  justify-self: left;
  width: max-content;
  color: whitesmoke;
  text-align: left;
  font-size: 13px;
  text-shadow: 1px 1px black;
`;

const TimeSetting = (props) => {
  return (
    <div>
      <Label>Time Display</Label>
      <Setting
        onClick={() => props.toggleSeconds()}
        className="timeSetting"
      >{`${props.showSeconds ? 'hide' : 'show'} seconds`}</Setting>
    </div>
  );
};

export default TimeSetting;
