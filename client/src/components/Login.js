import React, { Component } from "react";

import logo from "../resources/whattowatch.png";

import "../css/Login.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <img className="logo" src={logo} />
      </div>
    );
  }
}

export default Login;
