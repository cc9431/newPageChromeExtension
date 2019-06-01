import React from 'react';

const TimeSetting = (props) => {
  return (
    <div onClick={() => props.toggleSeconds()} className="timeSetting">{`${
      props.showSeconds ? 'do not ' : ''
    }show seconds`}</div>
  );
};

export default TimeSetting;
