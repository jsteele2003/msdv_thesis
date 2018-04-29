import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Demo from "../playground/demo";
import DeckRoot from "./deckRoot";

import store from "./store/index";
import { updateMap } from "./actions/action";

window.store = store;
console.log(window.store.getState());
store.subscribe(() => console.log('Redux!!'));
store.dispatch( updateMap({ zoom: 15}) )
console.log(window.store.getState());


// ReactDOM.render(<DeckRoot />, document.body.appendChild(document.createElement('demo')));

ReactDOM.render(
    <Provider store={store}>
        <DeckRoot/>
    </Provider>,
    document.getElementById("app")
);
