export function searchMovies(value) {
  return {
    type: "SEARCH_MOVIES",
    payload: {
      query: value
    }
  };
}

export function searchResults(results) {
  return {
    type: "SEARCH_RESULTS",
    payload: {
      searchResults: results
    }
  };
}
