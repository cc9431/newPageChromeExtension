import React from 'react';
import ReactDOM from 'react-dom';
import newTab from './newTab';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<newTab />, div);
  ReactDOM.unmountComponentAtNode(div);
});
