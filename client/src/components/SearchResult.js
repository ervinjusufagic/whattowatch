import React, { Component } from "react";

import "../css/searchResult.css";

class SearchResult extends Component {
  render() {
    return (
      <div className="searchResult">
        <div className="imgContainer">
          <img
            className="img"
            src={
              "https://image.tmdb.org/t/p/original/pnXwifiIUsJwP9pAlxhfpQPWSPf.jpg"
            }
          />
        </div>
        <div className="decriptionContainer">
          <div className="title">title</div>
          <div className="desc">
            aefrgargaergaergaegraerghearhaerhearharhraehareheaaherheehefrgargaergaergaegraerghearhaerhearharhraehareheaaherheehefrgargaergaergaegraerghearhaerhearharhraehareheaaherheeh
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
