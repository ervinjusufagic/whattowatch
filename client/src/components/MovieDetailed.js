import React, { Component } from "react";

import Player from "./Player";
import ActorCarouselItem from "./ActorCarouselItem";
import Chip from "@material-ui/core/Chip";
import Modal from "@material-ui/core/Modal";
import { toggleModal } from "../actions/listActions";

import { connect } from "react-redux";

import "../css/Deck.css";
import ActorProfile from "./ActorProfile";
class MovieDetailed extends Component {
  player() {
    if (this.props.trailerOpen) {
      return <Player videos={this.props.movie.videos.results} />;
    }
  }
  render() {
    const {
      poster_path,
      title,
      release_date,
      overview,
      vote_average,
      runtime,
      genres,
      credits
    } = this.props.movie;
    let year = release_date.split("-", 1);
    return (
      <div className="content">
        <div className="mediaContainer">
          <img
            alt=""
            className="deckImg"
            src={"https://image.tmdb.org/t/p/original" + poster_path}
          />{" "}
        </div>

        {this.player()}
        <div className="movieDesc">
          <div className="titleContainer">
            <span className="title">{title}</span>
            <span className="year">{" " + "(" + year + ")"} </span>
          </div>

          <div className="overview">
            <span className="overviewLabel">Overview</span>
            <div className="overviewText">{overview}</div>
          </div>

          <div className="genres ">
            <span className="genresLabel">Genres</span>
            <div className="chips">
              {genres.map(genre => {
                return (
                  <Chip key={genre.id} label={genre.name} variant="outlined" />
                );
              })}
            </div>
          </div>

          <div className="ratingAndRuntime">
            <div className="runtime">
              <span className="runtimeLabel">Runtime</span>
              {" " + runtime + " minutes"}
            </div>

            <div className="rating">
              <span className="ratinglabel">Rating</span>
              <span>{vote_average + "/10"}</span>
            </div>
          </div>

          <div className="starring">
            <span className="starringLabel">Starring</span>
            <div className="actorCarousel">
              {credits.cast.map(cast => {
                return (
                  <div
                    key={cast.id}
                    onClick={() =>
                      this.props.toggleModal(!this.props.modalOpen, cast.id)
                    }
                  >
                    <ActorCarouselItem cast={cast} />
                  </div>
                );
              })}

              <Modal
                style={{ backgroundColor: "#dedede", overflow: "scroll" }}
                open={this.props.modalOpen}
                onClose={this.handleClose}
              >
                <ActorProfile
                  movie={this.props.modalMovie}
                  actorId={this.props.actorId}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleModal
};

const mapStateToProps = state => ({
  trailerOpen: state.trailerOpen,
  modalOpen: state.modalOpen,
  actorId: state.modalMovie
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetailed);
