import React, { Component } from "react";

import SearchResult from "./SearchResult";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import { searchMovies, searchResults } from "../actions/searchActions";

import "../css/search.css";
import MyListItem from "./MyListItem";

const fetch = createApolloFetch({
  uri: "https://whattowatch-api.herokuapp.com/graphql"
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
        return <MyListItem key={movie.id} movie={movie} />;
      });
    }
  }

  render() {
    return (
      <div className="searchView">
        <div className="searchBarContainer">
          <input
            className="searchbar"
            value={this.props.searchQuery}
            onChange={event => this.handleChange(event)}
          />
        </div>

        <div className="results">
          <label className="label">Results</label>

          {this.renderResults(this.props.searchResults)}
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
