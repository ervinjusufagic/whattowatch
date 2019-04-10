import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Deck from "./Deck";
import Spinner from "./Spinner";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";

import { updateIds, setTrailers, filterIds } from "../actions/movieActions";

const RNDM_ID_QUERY = `
  query RndmIdQuery($page: Int!) {
    randomMovies(page: $page) {
      id
    }
  }
`;

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Movies extends Component {
  constructor(props) {
    super();

    this.state = {
      isLoading: true
    };

    this.fetchTrailers = this.fetchTrailers.bind(this);
  }

  randomPage() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  componentWillMount() {
    this.fetchIds();
  }

  fetchIds() {
    let page = this.randomPage();
    fetch({
      query: `query RndmIdQuery($page: Int!) {
        randomMovies(page: $page) {
          id
        }
      }
    `,
      variables: { page }
    })
      .then(res => {
        this.props.updateIds(res.data.randomMovies);

        console.log(this.props);
      })
      .then(this.fetchTrailers);
  }

  async fetchTrailers() {
    const trailers = [];

    for (let i = 0; i < this.props.randomIds.length; i++) {
      const { id } = this.props.randomIds[i];
      console.log(id);
      fetch({
        query: `query TrailerQuery($id: Int!) {
          movieTrailer(id: $id) {
            key
            type
          }
        }
        `,
        variables: { id }
      }).then(res => {
        console.log(res.data);
        trailers.push(res.data);
      });
      this.props.setTrailers(trailers);
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          this.props.filterIds(this.props.randomIds, this.props.trailers)
        );
      }, 3000);
    });
  }

  // fetchDetailedMovies() {
  //   //here we get the real movies

  //   fetch({
  //     query: `
  //     query DetailedMovieQuery($id: Int!) {
  //       detailedMovie(id: $id) {
  //         id
  //         imdb_id
  //         title
  //         overview
  //         runtime
  //         poster_path
  //         release_date
  //         genres {
  //           id
  //           name
  //         }
  //       }
  //     }
  //   `,
  //     variables: { id }
  //   }).then(res => {
  //     trailers.push(res.data);
  //   });
  // }

  sucLoad(trailers) {
    this.props.setTrailers(trailers);
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    } else {
      return <Deck />;
    }
  }
}

const mapDispatchToProps = {
  filterIds,
  setTrailers,
  updateIds
};

const mapStateToProps = state => ({
  randomIds: state.randomIds,
  trailers: state.trailers,
  isLoading: state.isLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
