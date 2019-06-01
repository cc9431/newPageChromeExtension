import React from 'react';

const TimeSetting = (props) => {
  return (
    <div onClick={() => props.toggleSeconds()} className="timeSetting">{`${
      props.showSeconds ? 'hide' : 'show'
    } seconds`}</div>
  );
};

export default TimeSetting;
