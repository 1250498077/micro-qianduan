import logo from './logo.svg';
import './App.css';
import { getMain } from './main'
import React, { Suspense } from 'react';
// const Modal1 = React.lazy(() => import("./component/modal1"))
// const Modal2 = React.lazy(() => import("./component/modal2"))
import Card from "./component/Card"

function App() {
  return (
    <div>
      <Card />
    </div>
  );
}

export default App;
