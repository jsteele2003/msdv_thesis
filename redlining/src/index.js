// import App from "./app";
// import Map from "./map";
import Demo from "../playground/demo";
console.log('Now the value for FOO is:', process.env.FOO);
const arr = [1, 2, 3];
const babelTest = () => console.log(...arr);
window.babelTest = babelTest();
