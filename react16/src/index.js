import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { getComponent } from './utils'
import 'antd/dist/antd.css';

const generateClassName = createGenerateClassName({
  seed: 'App1',
});

const render = (component) => {
  console.log('render')
  ReactDOM.render(component ? 
    <StylesProvider generateClassName={generateClassName}>
      {component}
    </StylesProvider>
    : <App />,
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
}

export const unmount = () => {
  console.log('卸载')
}

export const setModalType = (componentName, props, callback) => {
  render(getComponent(componentName, props, callback))
}
reportWebVitals()