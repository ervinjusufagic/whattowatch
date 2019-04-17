import React, { Component } from "react";

import { createApolloFetch } from "apollo-fetch";

import SearchResult from "./SearchResult";
import Spinner from "./Spinner";

import { connect } from "react-redux";

import "../css/search.css";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Search extends Component {
  constructor(props) {
    super();

    this.searchResults = this.searchResults.bind(this);
  }

  search(query) {
    fetch({
      query: `query searchQuery($query: String!) {
          search(query: $query) {
            id
            title
            overview
            poster_path
          }
        }
      `,
      variables: { query }
    }).then(res => {
      console.log(res);
    });
  }

  updateValue(event) {
    this.setState(
      {
        value: event.target.value,
        isLoading: true
      },
      this.search(this.state.value)
    );
  }

  searchResults() {
    console.log(this.state.searchResults);
    if (this.state.searchResults.length < 4) {
      return <Spinner />;
    } else {
      return this.state.searchResults.map(result => {
        return (
          <div>
            <SearchResult result={result} />
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="view">
        <div className="searchBarContainer">
          <input className="searchbar" />
        </div>

        <div className="results">
          <label className="label">Results</label>
          <div className="resultList">
            <div />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
