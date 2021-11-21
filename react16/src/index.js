import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { setMain, getMain } from './main';
import reportWebVitals from './reportWebVitals';
import Modal1 from './component/modal1'
import Modal2 from './component/modal2'
import 'antd/dist/antd.css';
let modal = <div>......</div>;
const render = () => {
  ReactDOM.render(modal,
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
  render()
}

export const unmount = () => {
  console.log('卸载')
}

export const setModalType = (type, props, callback) => {
  if (type === 'Modal1') {
    modal = <Modal1 {...props} callback={callback}/>
  } else if (type === 'Modal2') {
    modal = <Modal2 {...props} callback={callback}/>
  }
  render()
}
reportWebVitals()