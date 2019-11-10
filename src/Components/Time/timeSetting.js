import React from 'react';

const TimeSetting = (props) => {
  return (
    <div>
      <div className="settingLabel">Time Display</div>
      <div onClick={() => props.toggleSeconds()} className="timeSetting">{`${
        props.showSeconds ? 'hide' : 'show'
      } seconds`}</div>
    </div>
  );
};

export default TimeSetting;
