import React, { useEffect } from "react";
import "./App.css";

import store from "./store";
import { loadUser } from "./actions/authActions";
import Navbar from "./components/Navbar";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
