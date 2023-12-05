import logo from './logo.svg';
import './App.css';
import AlumnChanging from "./views/AlumnChanging/AlumnChanging"
import Home from "./views/Home/Home"
//import { getSheetName } from "./utils/googlesheet";
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/alumnChanging">Vista Uno</Link>
            </li>
            <li>
              <Link to="/home">Vista Dos</Link>
            </li>
          </ul>
        </nav>

        <Route path="/alumnChanging" component={AlumnChanging} />
        <Route path="/home" component={Home} />

      </div>
    </Router>
  );
}

export default App;