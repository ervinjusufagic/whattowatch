const initialState = {
  deckIndex: 0,
  randomIds: [],
  movies: [],
  trailerOpen: false,
  isLoading: true
};

export default function deckReducer(state = initialState, action) {
  switch (action.type) {
    case "SWITCH_MOVIE":
      return {
        ...state,
        deckIndex: action.payload.deckIndex
      };

    case "FETCH_IDS":
      return {
        ...state,
        randomIds: action.payload.randomIds
      };

    case "TOGGLE_TRAILER":
      return {
        ...state,
        trailerOpen: action.payload.trailerOpen
      };

    case "FETCH_MOVIES":
      let movies = [];
      for (let i = 0; i < action.payload.movies.length; i++) {
        if (action.payload.movies[i].movie.videos.results.length > 0) {
          movies.push(action.payload.movies[i]);
        }
      }

      return {
        ...state,
        movies: movies,
        isLoading: action.payload.isLoading
      };

    default:
      return state;
  }
}
