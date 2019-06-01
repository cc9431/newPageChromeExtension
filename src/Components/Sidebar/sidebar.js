import React from 'react';
import './sidebar.css';

const Sidebar = (props) => {
  return (
    <div
      onMouseLeave={() => props.exit()}
      className={`sidebar${props.show ? ' hover' : ''}`}
    >
      {props.children}
    </div>
  );
};

export default Sidebar;
