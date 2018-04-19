
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from "../playground/demo";


console.log('Now the value for FOO is:', PRODUCTION);
const arr = [1, 2, 3];
const babelTest = () => console.log(...arr);
window.babelTest = babelTest()

ReactDOM.render(<Demo />, document.body.appendChild(document.createElement('demo')));
