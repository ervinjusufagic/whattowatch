import React, { Component } from "react";
import Deck from "./Deck";
import Spinner from "./Spinner";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";

import { fetchIds, setTrailers, filterIds } from "../actions/movieActions";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Movies extends Component {
  constructor(props) {
    super();
    this.fetchTrailers = this.fetchTrailers.bind(this);
    this.actorsAndRating = this.actorsAndRating.bind(this);
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
        this.props.fetchIds(res.data.randomMovies);
      })
      .then(this.fetchTrailers);
  }

  async fetchTrailers() {
    const trailers = [];
    const movieDetails = [];

    for (let i = 0; i < this.props.randomIds.length - 1; i++) {
      const { id } = this.props.randomIds[i];
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
        trailers.push(res.data);
      });

      fetch({
        query: `query DetailedMovieQuery($id: Int!) {
        detailedMovie(id: $id) {
          id
          imdb_id
          title
          overview
          runtime
          poster_path
          release_date
          genres {
            id
            name
          }
        }
      }
    `,
        variables: { id }
      }).then(res => {
        console.log(res.data);
        movieDetails.push(res.data);
      });
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.actorsAndRating(trailers, movieDetails));
      }, 5000);
    });
  }

  actorsAndRating(trailers, movieDetails) {
    console.log(movieDetails);
    const actorsAndRating = [];

    movieDetails.forEach(detailedMovie => {
      let imdb_id = detailedMovie.detailedMovie.imdb_id;

      fetch({
        query: `query actorsAndRatingQuery($imdb_id: String!) {
        actorsAndRating(imdb_id: $imdb_id) {
          rating
          votes
          metascore
          actors {
            actorName
          }
        }
      }
    `,
        variables: { imdb_id }
      }).then(res => actorsAndRating.push(res.data));
    });

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.sendData(trailers, movieDetails, actorsAndRating));
      }, 5000);
    });
  }

  sendData(trailers, movieDetails, actorsAndRating) {
    console.log(trailers);
    console.log(movieDetails);
    console.log(actorsAndRating);
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    } else {
      return <Deck />;
    }
  }
}
//resolve(this.props.filterIds(this.props.randomIds, trailers));
const mapDispatchToProps = {
  filterIds,
  setTrailers,
  fetchIds
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
