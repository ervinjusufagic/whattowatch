import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo from "../resources/cinema-svg.svg";
import { Redirect } from "react-router-dom";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";

import { handleEmail, handlePassword, signUp } from "../actions/loginActions";

import "../css/SignUp.css";

const fetch = createApolloFetch({
  uri: "https://whattowatch-api.herokuapp.com/graphql"
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
      console.log(this.props.signupError);
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
        <div className="logoContainer">
          <img className="logo" src={logo} alt="" />
        </div>
        <p className="appName">Create a new account</p>

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
          {this.props.signupError ? (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              Please enter a valid email and a password with minimum of 7
              characters.
            </span>
          ) : (
            <span />
          )}
        </div>

        <Button
          style={styles.signUp}
          variant="contained"
          onClick={() => this.signUp()}
        >
          SignUp
        </Button>
      </div>
    );
  }
}

const styles = {
  signUp: {
    backgroundColor: "#2c1e5a",
    color: "#dedede"
  }
};

const mapDispatchToProps = {
  handleEmail,
  handlePassword,
  signUp
};

const mapStateToProps = state => ({
  email: state.email,
  password: state.password,
  signUpBool: state.signUp,
  signupError: state.signUpError
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
