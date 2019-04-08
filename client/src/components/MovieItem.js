import React, { Component } from "react";
import Image from "react-image-resizer";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const DETAILED_MOVIE_QUERY = gql`
  query DetailedMovieQuery($id: Int!) {
    detailedMovie(id: $id) {
      id
      imdb_id
      title
      overview
      runtime
      poster_path
      genres {
        id
        name
      }
    }
  }
`;

class MovieItem extends Component {
  constructor(props) {
    super();
    const { id } = props;

    this.state = {
      id: id.id,
      posterURI: "https://image.tmdb.org/t/p/original/",
      width: 0,
      height: 0
    };
  }

  render() {
    const { id, posterURI, height, width } = this.state;
    return (
      <Query query={DETAILED_MOVIE_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>loading</h4>;
          if (error) console.log(error);

          return (
            <div
              style={{ height: window.outerHeight, width: window.outerWidth }}
            >
              <Image
                src={posterURI + data.detailedMovie.poster_path}
                width={window.outerHeight - 20}
                height={window.outerHeight - 20}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MovieItem;
