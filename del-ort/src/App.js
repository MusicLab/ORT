import logo from './logo.svg';
import './App.css';
import AlumnChanging from "./views/AlumnChanging/AlumnChanging"
import Home from "./views/Home/Home"
//import { getSheetName } from "./utils/googlesheet";
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



function App() {
  //getSheetName()
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/componenteA">AlumnChanging</Link>
            </li>
            <li>
              <Link to="/componenteB">Home</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/src/views/AlumnChanging/AlumnChanging.js">
            <AlumnChanging />
          </Route>
          <Route path="/src/views/Home/Home.js">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
