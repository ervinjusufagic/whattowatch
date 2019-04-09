import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Deck from "./Deck";
import Spinner from "./Spinner";

const RNDM_ID_QUERY = gql`
  query RndmIdQuery($page: Int!) {
    randomMovies(page: $page) {
      id
    }
  }
`;

class Movies extends Component {
  constructor(props) {
    super();

    this.state = {
      height: 0,
      width: 0
    };
  }

  randomPage() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  render() {
    let page = this.randomPage();
    return (
      <Query query={RNDM_ID_QUERY} variables={{ page }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) console.log(error);

          return <Deck randomIds={data.randomMovies} />;
        }}
      </Query>
    );
  }
}

export default Movies;
