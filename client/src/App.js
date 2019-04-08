import React, { Component } from "react";

import Movies from "./components/Movies";
import Deck from "./components/Deck";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Movies />
      </ApolloProvider>
    );
  }
}

export default App;
