import React from 'react';
import './sidebar.css';

const Sidebar = (props) => {
  return (
    <div
      onClick={() => props.handleColorClick()}
      className={`sidebar${props.show ? ' hover' : ''}`}
    >
      {props.children}
    </div>
  );
};

export default Sidebar;
