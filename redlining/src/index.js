import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Demo from "../playground/demo";
import DeckApp from "./deckApp";
import style from "./index.css";
import store from "./store/index";
import { updateMap } from "./actions/action";

window.store = store;
store.subscribe(() => console.log(store.getState()));
// store.dispatch( updateMap({ zoom: 15}) )
console.log(store.getState());



// ReactDOM.render(<DeckRoot />, document.body.appendChild(document.createElement('demo')));

ReactDOM.render(
    <Provider store={store}>
        <DeckApp/>
    </Provider>,
    document.getElementById("app")
);
