import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import logo from "../resources/cinema-svg.svg";
import { Redirect } from "react-router-dom";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";

import { handleEmail, handlePassword, signUp } from "../actions/loginActions";

import "../css/SignUp.css";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class SignUp extends Component {
  signUp() {
    let email = this.props.email;
    let password = this.props.password;
    fetch({
      query: `mutation signUp($email: String!, $password: String!) {
        createUser(email: $email password: $password)
      }
      `,
      variables: { email, password }
    }).then(res => {

      this.props.signUp(res.data.createUser);

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
    if (this.props.signUpBool) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <div className="signup">
        <img src={logo} alt="" />
        <p className="appName">Create a new account</p>
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

        <button onClick={() => this.signUp()}> Sign Up</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  handleEmail,
  handlePassword,
  signUp
};

const mapStateToProps = state => ({
  email: state.email,
  password: state.password,
  signUpBool: state.signUp
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
