import React, { useEffect } from "react";
import "./App.css";

import store from "./store";
import { loadUser } from "../actions/authActions";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return <div className="App" />;
}

export default App;
