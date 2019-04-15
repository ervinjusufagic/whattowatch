export function nextMovie(deckIndex) {
  return {
    type: "SWITCH_MOVIE",
    payload: {
      deckIndex: deckIndex + 1
    }
  };
}

export function fetchIds(randomIds) {
  return {
    type: "FETCH_IDS",
    payload: {
      randomIds: randomIds
    }
  };
}

export function toggleTrailer(isOpen) {
  return {
    type: "TOGGLE_TRAILER",
    payload: {
      trailerOpen: isOpen
    }
  };
}

export function fetchMovies(movies) {
  return {
    type: "FETCH_MOVIES",
    payload: {
      isLoading: false,
      movies: movies
    }
  };
}
