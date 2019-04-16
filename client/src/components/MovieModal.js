import React, { Component } from "react";

import Fab from "@material-ui/core/Fab";
import { Movie, Check } from "@material-ui/icons";
import { connect } from "react-redux";
import Player from "./Player";

import { nextMovie, toggleTrailer, addToList } from "../actions/movieActions";

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

class MovieModal extends Component {
  constructor(props) {
    super();

    this.playTrailer = this.playTrailer.bind(this);
  }

  playTrailer() {
    this.props.toggleTrailer(!this.props.trailerOpen);
  }

  player() {
    if (this.props.trailerOpen) {
      return (
        <Player
          trailerKey={
            this.props.movies[this.props.deckIndex].movie.videos.results[0].key
          }
        />
      );
    }
  }

  render() {
    return (
      <div className="view">
        <div className="mediaContainer">
          <img
            className="deckImg"
            src={
              "https://image.tmdb.org/t/p/original/zK55cwwdS3THvfSgUaZMQsExtq7.jpg"
            }
          />{" "}
          {this.player()}
        </div>
        <div className="movieDesc">
          <div className="descHeader">
            <div className="title ">
              adwefwaf
              <span className="year">{" " + "(" + "2003" + ")"} </span>
            </div>

            <div className="ratingOuter">
              79
              <div className="ratingInner">
                <span>4/10</span>
                <span className="votes">12314</span>
              </div>
            </div>
          </div>

          <div className="genres ">Comedy | 97</div>

          <div className="starring ">
            Starring: ComedyComedy ComedyComedy
            ComedyComedyComedyComedyComedyComedyComedyComedyComedy
          </div>

          <div className="overview ">
            "When Erik, a Stockholm urbanite, learns that his beauty-queen
            sister, Susie, is missing, he goes to their country roots to look
            for her. But after talking to the eccentric locals -- including a
            shy video store clerk and a corrupt police officer -- Erik finds a
            woman who is not at all like the girl he left behind. Award-winning
            director Ulf Malmros helms this black comedy infused with hipster
            flair."
          </div>
        </div>

        <div className="deckMenu">
          <Fab
            aria-label="Delete"
            style={styles.add}
            onClick={() => this.addToList()}
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

const mapDispatchToProps = {
  toggleTrailer,
  nextMovie,
  addToList
};

const mapStateToProps = state => ({
  deckIndex: state.deckIndex,
  randomIds: state.randomIds,
  trailerOpen: state.trailerOpen,
  movies: state.movies,
  unwatched: state.unwatched
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieModal);
