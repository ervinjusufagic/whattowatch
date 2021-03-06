import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo from "../resources/cinema-svg.svg";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";

import {
  handleEmail,
  handlePassword,
  authenticate
} from "../actions/loginActions";
import "../css/Login.css";

const fetch = createApolloFetch({
  uri: "https://whattowatch-api.herokuapp.com/graphql"
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
      this.props.authenticate(res.data.signIn);
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
        <div className="logoContainer">
          <img className="logo" src={logo} alt="" />
        </div>
        <p className="loginAppName">WhatToWatch?</p>

        <div className="form">
          <TextField
            className="loginField"
            type="email"
            value={this.props.email}
            onChange={event => this.handleChange(event)}
            id="standard-dense"
            label="Email"
            margin="dense"
          />
          <TextField
            className="loginField"
            type="password"
            id="standard-dense"
            value={this.props.password}
            onChange={event => this.handleChange(event)}
            label="Password"
            margin="dense"
          />

          {this.props.error ? (
            <span style={{ color: "red", fontSize: "0.9rem" }}>
              You have entered an invalid email or password.
            </span>
          ) : (
            <span />
          )}
        </div>
        <div>
          <Button
            style={styles.login}
            variant="contained"
            onClick={() => this.handleSubmit()}
          >
            Login
          </Button>
          <Button
            style={styles.signUp}
            variant="contained"
            onClick={() => this.props.history.push("/signup")}
          >
            SignUp
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  login: {
    backgroundColor: "#E28413",
    color: "#F4F4F6"
  },
  signUp: {
    backgroundColor: "#F4F4F6",
    color: "#E28413"
  }
};

const mapDispatchToProps = {
  handleEmail,
  handlePassword,
  authenticate
};

const mapStateToProps = state => ({
  email: state.email,
  password: state.password,
  signIn: state.signIn,
  error: state.loginError
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
