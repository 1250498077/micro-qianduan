import logo from './logo.svg';
import './App.css';
import { getMain } from './main'
import Modal1 from './component/modal1'
import Modal2 from './component/modal2'

function App() {

  const toFather = () => {
    const app = getMain();
    app.childrenToFather();
  }

  return (
    <div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => toFather()}>子组件调用父组件函数</button>
      </header> */}
      {/* <Modal1 /> */}
    </div>
  );
}

export default App;
