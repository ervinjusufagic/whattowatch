import React, { Component } from "react";

import Dashboard from "./components/Dashboard";

import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  }
}

export default App;
