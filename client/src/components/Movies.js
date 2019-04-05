import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MovieItem from "./MovieItem";

const RNDM_ID_QUERY = gql`
  {
    randomMovies(page: 30) {
      id
    }
  }
`;

class Movies extends Component {
  render() {
    return (
      <div>
        <h1>Movies</h1>
        <Query query={RNDM_ID_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>loading</h4>;
            if (error) console.log(error);

            return (
              <div>
                {data.randomMovies.map(movie => (
                  <MovieItem key={movie.id} movie={movie} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Movies;
