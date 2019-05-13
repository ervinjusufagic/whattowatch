import React, { Component } from "react";

import Fab from "@material-ui/core/Fab";
import { Movie, Close } from "@material-ui/icons";

import { connect } from "react-redux";
import { toggleTrailer } from "../actions/movieActions";

import { toggleModal } from "../actions/listActions";

import MovieDetailed from "./MovieDetailed";

class MovieModal extends Component {
  playTrailer() {
    this.props.toggleTrailer(!this.props.trailerOpen);
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
            aria-label="Trailer"
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
  toggleModal
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
