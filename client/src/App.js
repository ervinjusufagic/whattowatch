import React, { Component } from "react";
import "./App.css";
import Movies from "./components/Movies";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Whattowatch</h1>
        </div>
        <Movies />
      </ApolloProvider>
    );
  }
}

export default App;
