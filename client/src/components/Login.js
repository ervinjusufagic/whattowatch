import React, { Component } from "react";

import { createApolloFetch } from "apollo-fetch";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import logo from "../resources/whattowatch.png";

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
        <div>
          <img alt="" className="logo" src={logo} />
        </div>

        <div className="form">
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
        </div>
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
