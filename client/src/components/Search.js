import React, { Component } from "react";
import SearchResult from "./SearchResult";
import PerfectScrollbar from "react-perfect-scrollbar";

import "../css/search.css";

class Search extends Component {
  render() {
    return (
      <div className="view">
        <div className="searchBarContainer">
          <input className="searchbar" />
        </div>

        <div className="results">
          <label className="label">Results</label>
          <div className="resultList">
            <div>
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />

              <SearchResult />
              <SearchResult />
              <SearchResult />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
