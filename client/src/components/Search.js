import React, { Component } from "react";

import { createApolloFetch } from "apollo-fetch";

import SearchResult from "./SearchResult";

import { connect } from "react-redux";
import { searchMovies, searchResults } from "../actions/searchActions";

import "../css/search.css";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Search extends Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderResults = this.renderResults.bind(this);
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
      this.props.searchResults(res.data.search);
    });
  }

  handleChange(event) {
    this.props.searchMovies(event.target.value);
    this.search(event.target.value);
  }

  renderResults() {
    if (this.props.results !== null) {
      return this.props.results.map(movie => {
        return <SearchResult key={movie.id} movie={movie} />;
      });
    }
  }

  render() {
    return (
      <div className="view">
        <div className="searchBarContainer">
          <input
            className="searchbar"
            value={this.props.searchQuery}
            onChange={event => this.handleChange(event)}
          />
        </div>

        <div className="results">
          <label className="label">Results</label>
          <div className="resultList">
            {this.renderResults(this.props.searchResults)}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  searchMovies,
  searchResults
};

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
  results: state.searchResults
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
