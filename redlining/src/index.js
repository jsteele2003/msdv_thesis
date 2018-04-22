
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from "../playground/demo";
import DeckRoot from "./deckRoot";

import store from "./store/index";
import { updateMap } from "./actions/action";

window.store = store;
console.log(window.store.getState())
const arr = [1, 2, 3];
const babelTest = () => console.log(...arr);
window.babelTest = babelTest()

ReactDOM.render(<DeckRoot />, document.body.appendChild(document.createElement('demo')));
