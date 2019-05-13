import React, { Component } from "react";

import Player from "./Player";

import ActorProfile from "./ActorProfile";
import Chip from "@material-ui/core/Chip";

import { connect } from "react-redux";

import "../css/Deck.css";
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
                return <ActorProfile key={cast.id} cast={cast} />;
              })}
            </div>
          </div>
        </div>

        <div className="rating" />
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  trailerOpen: state.trailerOpen
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetailed);
