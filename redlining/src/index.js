import App from "./app";
import Map from "./map";

const arr = [1, 2, 3];
const babelTest = () => console.log(...arr);
window.babelTest = babelTest();
