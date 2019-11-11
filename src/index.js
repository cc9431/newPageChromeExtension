import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './wrapper';
import path from 'path';

console.log(path.resolve(process.cwd(), '.env'));

require('dotenv').config({ path: './../.env' });

console.log(process.env);

ReactDOM.render(<Wrapper />, document.getElementById('root'));
