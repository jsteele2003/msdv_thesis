import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Demo from "../playground/demo";
import DeckApp from "./deckApp";
import style from "./index.css";
import store from "./store/index";

window.store = store;
// store.subscribe(() => console.log(store.getState()));
// store.dispatch( updateMap({ zoom: 15}) )



// ReactDOM.render(<DeckRoot />, document.body.appendChild(document.createElement('demo')));

ReactDOM.render(
    <Provider store={store}>
        <DeckApp/>
    </Provider>,
    document.getElementById("app")
);
