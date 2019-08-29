import React, { useEffect } from "react";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import store from "./store";
import { loadUser } from "./actions/authActions";
import AppNavbar from "./components/AppNavbar";
import Landingpage from "./components/Landingpage";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <div>
      <AppNavbar />
      <Switch>
        <Route exact path="/" component={Landingpage} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
