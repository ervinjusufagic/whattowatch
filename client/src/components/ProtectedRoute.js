import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (rest.signIn || localStorage.getItem("signIn")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  signIn: state.signIn
});

export default connect(mapStateToProps)(ProtectedRoute);
