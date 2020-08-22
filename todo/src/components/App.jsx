import React from "react";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import Todo from "./Todos";
import Home from "./Home";
import Signin from './signin';

function App() {
  return (
    <Router >
    <div >
    <Switch >
    <Route path = "/" exact> <Home /></Route>
    <Route path = "/signin" exact> <Signin /></Route>
    <Route path={"/user/:userId"}><Todo /></Route>
    </Switch>
     </div>
     </ Router>
  );
}

export default App;
