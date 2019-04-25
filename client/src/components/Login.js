import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import logo from "../resources/cinema-svg.svg";

import { Redirect } from "react-router-dom";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import {
  handleEmail,
  handlePassword,
  authenticate
} from "../actions/loginActions";

import "../css/Login.css";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Login extends Component {
  handleSubmit() {
    let email = this.props.email;
    let password = this.props.password;

    fetch({
      query: `mutation signIn($email: String!, $password: String!) {
        signIn(email: $email password: $password)
      }
      `,
      variables: { email, password }
    }).then(res => {
      console.log(typeof res.data.signIn);
      if (typeof res.data.signIn === "string") {
        this.props.authenticate(res.data.signIn);
      }
    });
  }

  handleChange(event) {
    if (event.target.type === "email") {
      this.props.handleEmail(event.target.value);
    }
    if (event.target.type === "password") {
      this.props.handlePassword(event.target.value);
    }
  }

  render() {
    if (this.props.signIn || localStorage.getItem("signIn")) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <div className="login">
        <img src={logo} alt="" />
        <p className="appName">WhatToWatch?</p>

        <TextField
          type="email"
          value={this.props.email}
          onChange={event => this.handleChange(event)}
          id="standard-dense"
          label="Email"
          margin="dense"
        />
        <TextField
          type="password"
          id="standard-dense"
          value={this.props.password}
          onChange={event => this.handleChange(event)}
          label="Password"
          margin="dense"
        />
        <button onClick={() => this.handleSubmit()}>Login</button>
        <button onClick={() => this.props.history.push("/signup")}>
          SignUp
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  handleEmail,
  handlePassword,
  authenticate
};

const mapStateToProps = state => ({
  email: state.email,
  password: state.password,
  signIn: state.signIn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
