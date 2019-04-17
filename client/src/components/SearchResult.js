import React, { Component } from "react";

import "../css/searchResult.css";

class SearchResult extends Component {
  render() {
    return (
      <div className="searchResult">
        <div className="imgContainer">
          <img
            className="img"
            src={`https://image.tmdb.org/t/p/original/${
              this.props.movie.poster_path
            }`}
          />
        </div>
        <div className="decriptionContainer">
          <div className="title">{this.props.movie.title}</div>
          <div className="desc">{this.props.movie.overview}</div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
