import logo from './logo.svg';
import './App.css';
import Botonera from "./components/Botonera/Botonera"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Botonera></Botonera>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
