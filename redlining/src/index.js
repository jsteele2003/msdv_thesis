import App from "./app";

const arr = [1, 2, 3];
const babelTest = () => console.log(...arr);
window.babelTest = babelTest();
