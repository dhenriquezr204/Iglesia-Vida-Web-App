import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import {Login} from './login';
import {Register} from './register';
import {Loggedin} from './loggedin';
import {ProtectedRoute} from './protected.route';
import styles from './loggedin.css';


function App() {
  return (
    
    <div className = "App">
      <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/loggedin" component={Loggedin} />
      </Switch>
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter>
                  <App/>
                </BrowserRouter>, rootElement);
