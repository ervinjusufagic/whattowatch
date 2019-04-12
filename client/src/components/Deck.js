import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import { Movie, Add, Clear, Star } from "@material-ui/icons";
import Spinner from "./Spinner";
import Player from "./Player";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { connect } from "react-redux";
import { incrementId, toggleTrailer } from "../actions/movieActions";

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
  },
  imdbStar: {
    color: "#dab323",
    fontSize: "30px"
  }
};

class Deck extends Component {
  constructor(props) {
    super();

    this.playTrailer = this.playTrailer.bind(this);
    this.add = this.add.bind(this);
  }

  playTrailer() {
    this.props.toggleTrailer(!this.props.trailerOpen);
  }

  player() {
    if (this.props.trailerOpen) {
      return <Player trailerKey={this.props.trailers[0].movieTrailer.key} />;
    }
  }

  add = () => {
    this.props.dispatch(incrementId(this.props.id));
  };

  renderDeck(index) {
    const id = this.props.randomIds[index].id;

    return (
      <Query query={DETAILED_MOVIE_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) console.log(error);
          const {
            genres,
            imdb_id,
            overview,
            poster_path,
            release_date,
            runtime,
            title
          } = data.detailedMovie;
          console.log(poster_path);

          let year = release_date.split("-");

          return (
            <Query query={ACTORS_RATING_QUERY} variables={{ imdb_id }}>
              {({ loading, error, data }) => {
                if (loading) return <Spinner />;
                if (error) console.log(error);
                const {
                  actors,
                  metascore,
                  rating,
                  votes
                } = data.actorsAndRating;
                return (
                  <div className="view">
                    <div className="mediaContainer">
                      <img
                        className="deckImg"
                        src={
                          "https://image.tmdb.org/t/p/original" + poster_path
                        }
                      />{" "}
                    </div>
                    {this.player()}
                    <div className="movieDesc">
                      <div className="descHeader">
                        <div className="title ">
                          {title}
                          <span className="year">
                            {" " + "(" + year[0] + ")"}{" "}
                          </span>
                        </div>

                        <div className="ratingOuter">
                          <Star style={styles.imdbStar} />
                          <div className="ratingInner">
                            <span>{rating}/10</span>
                            <span className="votes">{votes}</span>
                          </div>
                        </div>
                      </div>

                      <div className="genres ">
                        {genres.map(genre => {
                          return genre.name + ", ";
                        })}{" "}
                        | {runtime}
                      </div>

                      <div className="starring ">
                        Starring:{" "}
                        {actors.map(actor => {
                          return actor.actorName + ", ";
                        })}
                      </div>

                      <div className="overview ">{overview}</div>
                    </div>

                    <div className="deckMenu">
                      <Fab aria-label="Delete" style={styles.remove}>
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
                        onClick={() => this.add()}
                      >
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

  render() {
    return (
      <React.Fragment>{this.renderDeck(this.props.idIndex)}</React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  toggleTrailer
};

const mapStateToProps = state => ({
  idIndex: state.idIndex,
  randomIds: state.randomIds,
  trailerOpen: state.trailerOpen,
  trailers: state.trailers
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
