import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Dashboard from './Screens/Dashboard'
const Routers = () => {
    
    return (
      <Router>
        <App>
            <Switch>
                <Route exact to={"/"} component={Dashboard} />
            </Switch>
        </App>
      </Router>
    );
  }

export default Routers;