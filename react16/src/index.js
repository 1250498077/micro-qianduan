import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { setMain } from './main';
import reportWebVitals from './reportWebVitals';



const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}


if (!window.__MICRO_WEB__) {
  render()
}


export const before = () => {
  console.log('开始渲染')
}

export const mount = (mainObj) => {
  console.log('子组件的', mainObj)
  setMain(mainObj)
  // mainObj.childrenToFather()
  render()
}

export const unmount = () => {
  console.log('卸载')
}

reportWebVitals()