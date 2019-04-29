import React, { Component } from "react";

import Fab from "@material-ui/core/Fab";
import { Movie, Add, Clear, Star } from "@material-ui/icons";

import Player from "./Player";
import Spinner from "./Spinner";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import {
  nextMovie,
  toggleTrailer,
  addToList,
  fetchIds,
  fetchMovies,
  updateMovies
} from "../actions/movieActions";

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
    this.fetchMovieDetails = this.fetchMovieDetails.bind(this);
  }

  componentWillMount() {
    console.log("mount");
    if (this.props.movies.length < 1) {
      this.fetchIds();
    }
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

  randomPage() {
    return Math.floor(Math.random() * 1000) + 1;
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
    let movie = movies[index].movie;
    let id = localStorage.getItem("user");
    console.log(movie);

    fetch({
      query: `mutation addMovies($movie: InputMovie!, $index: Int!, $id: String!) {
        addToUnwatched(movie: $movie index: $index, id: $id)
      }
      `,
      variables: { movie, index, id }
    }).then(res => {
      console.log(res);
      this.props.addToList(
        //return movie in res.. see schema.js => addToUnwatched
        this.props.movies,
        this.props.deckIndex,
        this.props.unwatched
      );
    });
  }

  reject() {
    this.props.nextMovie(this.props.deckIndex);
    //never show again
  }

  renderDeck() {
    if (this.props.movies[this.props.deckIndex] === undefined) {
      this.props.updateMovies(this.props.deckKey);
    } else {
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
  }

  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment key={this.props.deckKey}>
          {this.renderDeck()}
        </React.Fragment>
      );
    }
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
  addToList,
  fetchMovies,
  fetchIds,
  updateMovies
};

const mapStateToProps = state => ({
  deckIndex: state.deckIndex,
  randomIds: state.randomIds,
  trailerOpen: state.trailerOpen,
  movies: state.movies,
  unwatched: state.unwatched,
  isLoading: state.isLoading,
  deckKey: state.deckKey
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
