import React, { Component } from "react";
import { createApolloFetch } from "apollo-fetch";

import Fab from "@material-ui/core/Fab";
import { Movie, Delete, Check, Close } from "@material-ui/icons";

import { connect } from "react-redux";
import { toggleTrailer } from "../actions/movieActions";

import {
  toggleModal,
  addToWatched,
  deleteFromList
} from "../actions/listActions";

import MovieDetailed from "./MovieDetailed";

const fetch = createApolloFetch({
  uri: "https://whattowatch-api.herokuapp.com/graphql"
});

class MovieModal extends Component {
  constructor(props) {
    super();
    this.addToWatched = this.addToWatched.bind(this);
  }

  addToWatched() {
    let movie = this.props.movie;
    let movieId = this.props.movie.id;
    let id = localStorage.getItem("user");
    fetch({
      query: `mutation toWatched($movie: InputMovie!, $id: String!, $movieId: Int!) {
        addToWatched(movie: $movie, id: $id, movieId: $movieId)
      }
      `,
      variables: { movie, id, movieId }
    }).then(res => {
      this.props.addToWatched(
        this.props.watched,
        this.props.unwatched,
        this.props.movie
      );
    });
  }
  playTrailer() {
    this.props.toggleTrailer(!this.props.trailerOpen);
  }

  deleteFromList() {
    let movieId = this.props.movie.id;
    let id = localStorage.getItem("user");
    fetch({
      query: `mutation deleteFromList( $id: String!, $movieId: Int!) {
        deleteFromUnwatched( id: $id, movieId: $movieId)
      }
      `,
      variables: { id, movieId }
    }).then(res => {
      this.props.deleteFromList(this.props.unwatched, this.props.movie);
    });
  }

  render() {
    return (
      <div>
        <Close
          style={{ fontSize: "3rem", position: "absolute", top: 0, right: 0 }}
          onClick={() => this.props.toggleModal(!this.props.modalOpen)}
        />
        <MovieDetailed movie={this.props.movie} />
        <div className="deckMenu">
          <Fab
            aria-label="watched"
            style={styles.remove}
            onClick={() => this.deleteFromList()}
          >
            <Delete />
          </Fab>

          <Fab
            aria-label="watched"
            style={styles.add}
            onClick={() => this.addToWatched()}
          >
            <Check />
          </Fab>
          <Fab
            aria-label="Add"
            style={styles.trailer}
            onClick={() => this.playTrailer()}
          >
            <Movie />
          </Fab>
        </div>
      </div>
    );
  }
}

const styles = {
  trailer: {
    background: "#2C1E5A",
    borderRadius: 50,
    border: 0,
    color: "#DEDEDE"
  },
  remove: {
    background: "#E80000",
    color: "#DEDEDE",
    width: "7rem",
    borderRadius: 50
  },
  add: {
    background: "#00B70E",
    color: "#DEDEDE",

    width: "7rem",
    borderRadius: 50
  },
  imdbStar: {
    color: "#dab323",
    fontSize: "30px"
  }
};

const mapDispatchToProps = {
  toggleTrailer,
  toggleModal,
  addToWatched,
  deleteFromList
};

const mapStateToProps = state => ({
  trailerOpen: state.trailerOpen,
  modalOpen: state.modalOpen,
  watched: state.watched,
  unwatched: state.unwatched
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieModal);
