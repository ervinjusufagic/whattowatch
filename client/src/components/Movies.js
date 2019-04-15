import React, { Component } from "react";
import Deck from "./Deck";
import Spinner from "./Spinner";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";

import { fetchIds, fetchMovies } from "../actions/movieActions";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Movies extends Component {
  constructor(props) {
    super();
    this.fetchMovieDetails = this.fetchMovieDetails.bind(this);
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
        randomIds(page: $page) {
          id  
        }
      }
    `,
      variables: { page }
    })
      .then(res => {
        console.log(res.data.randomIds);
        this.props.fetchIds(res.data.randomIds);
      })
      .then(this.fetchMovieDetails);
  }

  fetchMovieDetails() {
    const movies = [];

    for (let i = 0; i < this.props.randomIds.length; i++) {
      const { id } = this.props.randomIds[i];
      fetch({
        query: `query MovieQuery($id: Int!) {
          movie(id: $id) {
            id
            imdb_id
            title
            overview
            poster_path
            release_date
            vote_average
            vote_count
            runtime
            genres{
              id
              name
            }
            videos{
              results{
                id
                key
                type
              }
            }
            credits{
              cast{
                id
                name
                character
                profile_path
              }
            }
          }
        }
        `,
        variables: { id }
      }).then(res => movies.push(res.data));
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.props.fetchMovies(movies));
      }, 3000);
    });
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
  fetchMovies,
  fetchIds
};

const mapStateToProps = state => ({
  randomIds: state.randomIds,
  isLoading: state.isLoading,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
