import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import { Movie, Add, Clear } from "@material-ui/icons";

import Player from "./Player";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import "../css/Deck.css";

const DETAILED_MOVIE_QUERY = gql`
  query DetailedMovieQuery($id: Int!) {
    detailedMovie(id: $id) {
      id
      imdb_id
      title
      overview
      runtime
      poster_path
      release_date
      genres {
        id
        name
      }
    }
  }
`;

const TRAILER_QUERY = gql`
  query TrailerQuery($id: Int!) {
    movieTrailer(id: $id) {
      key
      type
    }
  }
`;

const ACTORS_RATING_QUERY = gql`
  query TrailerQuery($imdb_id: String!) {
    actorsAndRating(imdb_id: $imdb_id) {
      rating
      votes
      metascore
      actors {
        actorName
      }
    }
  }
`;

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
  }
};

class Deck extends Component {
  constructor(props) {
    super();

    const { randomIds } = props;

    this.state = {
      randomIds: randomIds,
      open: false
    };

    this.playTrailer = this.playTrailer.bind(this);
  }

  playTrailer(trailerKey) {
    this.setState({
      open: !this.state.open,
      trailerKey: trailerKey
    });
  }

  player() {
    if (this.state.open) {
      return <Player trailerKey={this.state.trailerKey} />;
    }
  }

  render() {
    let id = this.state.randomIds[0].id;
    return (
      <Query query={TRAILER_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>loading</h4>;
          if (error) console.log(error);
          if (
            data.movieTrailer.type == "Trailer" ||
            data.movieTrailer.key != null
          ) {
            const trailerKey = data.movieTrailer.key;
            return (
              <Query query={DETAILED_MOVIE_QUERY} variables={{ id }}>
                {({ loading, error, data }) => {
                  if (loading) return <h4>loading</h4>;
                  if (error) console.log(error);
                  const movie = data.detailedMovie;
                  const imdb_id = data.detailedMovie.imdb_id;
                  console.log(movie);
                  return (
                    <Query query={ACTORS_RATING_QUERY} variables={{ imdb_id }}>
                      {({ loading, error, data }) => {
                        if (loading) return <h4>loading</h4>;
                        if (error) console.log(error);
                        const {
                          actors,
                          metascore,
                          rating,
                          votes
                        } = data.actorsAndRating;

                        console.log(actors);
                        return (
                          <div className="view">
                            <div className="mediaContainer">
                              <img
                                className="deckImg"
                                src={
                                  "https://image.tmdb.org/t/p/original" +
                                  movie.poster_path
                                }
                              />{" "}
                            </div>
                            {this.player()}
                            <div className="movieDesc ">
                              <div className="title ">
                                {movie.title}
                                <span className="year">
                                  {" " + "(" + movie.release_date + ")"}{" "}
                                </span>
                              </div>

                              <div className="genres ">
                                {movie.genres.map(genre => {
                                  return genre.name + ", ";
                                })}{" "}
                                | {movie.runtime}
                              </div>

                              <div className="starring ">
                                Starring:{" "}
                                {actors.map(actor => {
                                  return actor.actorName + ", ";
                                })}
                              </div>

                              <div className="overview ">{movie.overview}</div>
                            </div>

                            <div className="deckMenu">
                              <Fab aria-label="Delete" style={styles.remove}>
                                <Clear />
                              </Fab>
                              <Fab
                                aria-label="Add"
                                style={styles.trailer}
                                onClick={() => this.playTrailer(trailerKey)}
                              >
                                <Movie />
                              </Fab>
                              <Fab aria-label="Delete" style={styles.add}>
                                <Add />
                              </Fab>
                            </div>
                          </div>
                        );
                      }}
                    </Query>
                  );
                }}
              </Query>
            );
          }
        }}
      </Query>
    );
  }
}

export default Deck;
