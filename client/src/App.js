import React, { Component } from "react";

import Movies from "./components/Movies";
import Dashboard from "./components/Dashboard";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
