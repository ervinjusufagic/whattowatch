import React, { Component } from "react";
import Deck from "./Deck";
import Spinner from "./Spinner";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";

import { updateIds, setTrailers, filterIds } from "../actions/movieActions";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Movies extends Component {
  constructor(props) {
    super();
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
      })
      .then(this.fetchTrailers);
  }

  async fetchTrailers() {
    const trailers = [];

    for (let i = 0; i < this.props.randomIds.length; i++) {
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
