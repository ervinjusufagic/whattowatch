import React, { Component } from "react";

import Fab from "@material-ui/core/Fab";
import { Movie, Check, Close } from "@material-ui/icons";

import Player from "./Player";

import { connect } from "react-redux";
import { toggleTrailer } from "../actions/movieActions";
import { toggleModal, addToWatched } from "../actions/listActions";

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
    this.props.addToWatched(
      this.props.watched,
      this.props.unwatched,
      this.props.movie
    );
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
            aria-label="Delete"
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
  addToWatched
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
