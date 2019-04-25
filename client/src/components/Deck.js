import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Fab from "@material-ui/core/Fab";
import { Movie, Add, Clear, Star } from "@material-ui/icons";

import Player from "./Player";

import { connect } from "react-redux";
import { createApolloFetch } from "apollo-fetch";
import { nextMovie, toggleTrailer, addToList } from "../actions/movieActions";

import "../css/Deck.css";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Deck extends Component {
  constructor(props) {
    super();

    this.playTrailer = this.playTrailer.bind(this);
    this.addToList = this.addToList.bind(this);
    this.reject = this.reject.bind(this);
  }

  playTrailer() {
    this.props.toggleTrailer(!this.props.trailerOpen);
  }

  player() {
    if (this.props.trailerOpen) {
      return (
        <Player
          videos={this.props.movies[this.props.deckIndex].movie.videos.results}
        />
      );
    }
  }

  addToList() {
    let movies = this.props.movies;
    let index = this.props.deckIndex;
    let id = localStorage.getItem("user");

    fetch({
      query: `mutation addMovies($movies: [MovieInputCon]!, $index: Int!, $id: String!) {
        addToUnwatched(movies: $movies index: $index, id: $id)
      }
      `,
      variables: { movies, index, id }
    }).then(res => {
      if (this.props.deckIndex === this.props.movies.length) {
        return <Redirect to={{ pathname: "/" }} />;
      } else {
        this.props.addToList(
          //return movie in res.. see schema.js => addToUnwatched
          this.props.movies,
          this.props.deckIndex,
          this.props.unwatched
        );
      }
    });
  }

  reject() {
    this.props.nextMovie(this.props.deckIndex);
    //never show again
  }

  renderDeck() {
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
    } = this.props.movies[this.props.deckIndex].movie;

    let year = release_date.split("-", 1);

    return (
      <div className="view">
        <div className="mediaContainer">
          <img
            alt=""
            className="deckImg"
            src={"https://image.tmdb.org/t/p/original" + poster_path}
          />{" "}
        </div>

        {this.player()}

        <div className="movieDesc">
          <div className="descHeader">
            <div className="title ">
              {title}
              <span className="year">{" " + "(" + year + ")"} </span>
            </div>

            <div className="ratingOuter">
              <Star style={styles.imdbStar} />
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
            style={styles.remove}
            onClick={() => this.reject()}
          >
            <Clear />
          </Fab>
          <Fab
            aria-label="Add"
            style={styles.trailer}
            onClick={() => this.playTrailer()}
          >
            <Movie />
          </Fab>
          <Fab
            aria-label="Delete"
            style={styles.add}
            onClick={() => this.addToList()}
          >
            <Add />
          </Fab>
        </div>
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.renderDeck()}</React.Fragment>;
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
  nextMovie,
  addToList
};

const mapStateToProps = state => ({
  deckIndex: state.deckIndex,
  randomIds: state.randomIds,
  trailerOpen: state.trailerOpen,
  movies: state.movies,
  unwatched: state.unwatched,
  update: state.update
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
