
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from "../playground/demo";
import DeckRoot from "./deckRoot";


console.log('Now the value for FOO is:', PRODUCTION);
const arr = [1, 2, 3];
const babelTest = () => console.log(...arr);
window.babelTest = babelTest()

ReactDOM.render(<DeckRoot />, document.body.appendChild(document.createElement('demo')));
