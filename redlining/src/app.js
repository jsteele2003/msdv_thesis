import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-viewport-slider";
import Map from "./map";

const App = () => {
    return (
        <Map />
    );
};
export default App;

ReactDOM.render(<App />, document.getElementById("app"));