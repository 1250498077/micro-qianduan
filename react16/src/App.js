import logo from './logo.svg';
import './App.css';
import { getMain } from './main'


function App() {

  const toFather = () => {
    const app = getMain();
    console.log('appappappapp', app)
    app.childrenToFather();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => toFather()}>子组件调用父组件函数</button>
      </header>
    </div>
  );
}

export default App;
