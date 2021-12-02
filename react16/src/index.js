import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { getComponent } from './utils'
import 'antd/dist/antd.css';

const render = (component) => {
  console.log('render', component)
  ReactDOM.render(<App />,
    document.getElementById('root')
  );
}



// const render = (component) => {
//   console.log('render', component)
//   ReactDOM.render(<div>

//     {
//       false ? 
//       <div>{component}</div> : 
//       null
//     }
//   </div>,
//     document.getElementById('root')
//   );
// }

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