import React, { Component } from "react";

import Fab from "@material-ui/core/Fab";
import { Movie, Check, Close, Delete } from "@material-ui/icons";

import Player from "./Player";

import { connect } from "react-redux";
import { createApolloFetch } from "apollo-fetch";
import { toggleTrailer } from "../actions/movieActions";
import {
  toggleModal,
  addToWatched,
  deleteFromList
} from "../actions/listActions";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class MovieModal extends Component {
  constructor(props) {
    super();

    this.playTrailer = this.playTrailer.bind(this);
    this.addToWatched = this.addToWatched.bind(this);
  }

  playTrailer() {
    this.props.toggleTrailer(!this.props.trailerOpen);
  }

  player() {
    if (this.props.trailerOpen) {
      return <Player videos={this.props.movie.videos.results} />;
    }
  }

  addToWatched() {
    let movie = this.props.movie;
    let movieId = this.props.movie.id;
    let id = localStorage.getItem("user");
    console.log(movieId);
    fetch({
      query: `mutation toWatched($movie: InputMovie!, $id: String!, $movieId: Int!) {
        addToWatched(movie: $movie, id: $id, movieId: $movieId)
      }
      `,
      variables: { movie, id, movieId }
    }).then(res => {
      console.log(res);
      this.props.addToWatched(
        this.props.watched,
        this.props.unwatched,
        this.props.movie
      );
    });
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
      console.log(res);
      this.props.deleteFromList(this.props.unwatched, this.props.movie);

    });
  }

  render() {
    const {
      poster_path,
      title,
      release_date,
      overview,
      vote_average,
      vote_count,
      runtime,
      genres,
      credits
    } = this.props.movie;
    let year = release_date.split("-", 1);
    return (
      <div className="view">
        <Close onClick={() => this.props.toggleModal(!this.props.modalOpen)} />
        <div className="mediaContainer">
          <img
            alt=""
            className="deckImg"
            src={"https://image.tmdb.org/t/p/original" + poster_path}
          />{" "}
          {this.player()}
        </div>
        <div className="movieDesc">
          <div className="descHeader">
            <div className="title ">
              {title}
              <span className="year">{" " + "(" + year + ")"} </span>
            </div>

            <div className="ratingOuter">
              79
              <div className="ratingInner">
                <span>{vote_average}/10</span>
                <span className="votes">{vote_count}</span>
              </div>
            </div>
          </div>

          <div className="genres ">
            {genres
              .map(genre => {
                return genre.name;
              })
              .join(", ")}{" "}
            | {runtime}
          </div>

          <div className="starring ">
            Starring:{" "}
            {credits.cast
              .map(cast => {
                return cast.name;
              })
              .join(", ")}
          </div>

          <div className="overview ">{overview}</div>
        </div>

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
