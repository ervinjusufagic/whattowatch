const initialState = {
  deckIndex: 0,
  randomIds: [],
  movies: [],
  unwatched: [],
  watched: [],
  trailerOpen: false,
  isLoading: true,
  modalOpen: false,
  navValue: ""
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SWITCH_MOVIE":
      return {
        ...state,
        deckIndex: action.payload.deckIndex,
        trailerOpen: false
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

    case "ADD_TO_LIST":
      let unwatched = action.payload.unwatched;
      let unwatchedMovies = action.payload.movies;
      let deckIndex = action.payload.deckIndex;
      unwatched.push(unwatchedMovies[deckIndex - 1].movie);

      return {
        ...state,
        unwatched: action.payload.unwatched,
        deckIndex: deckIndex,
        trailerOpen: false
      };

    case "ADD_TO_WATCHED":
      let watched = action.payload.watched;
      let oldUnwatched = action.payload.unwatched;
      let movieToBeAdded = action.payload.movie;

      for (let i = 0; i < oldUnwatched.length; i++) {
        if (oldUnwatched[i].id === movieToBeAdded.id) {
          oldUnwatched.splice(i, 1);
        }
      }

      let newUnwatched = oldUnwatched;

      watched.push(action.payload.movie);

      return {
        ...state,
        watched: action.payload.watched,
        unwatched: newUnwatched,
        modalOpen: false
      };

    case "DELETE_FROM_LIST":
      let movieToBeDeleted = action.payload.movie;
      let unwatchedList = action.payload.unwatched;

      for (let i = 0; i < unwatchedList.length; i++) {
        if (unwatchedList[i].id === movieToBeDeleted.id) {
          unwatchedList.splice(i, 1);
        }
      }
      return {
        ...state,
        modalOpen: false,
        unwatched: unwatchedList
      };

    case "TOGGLE_MODAL":
      return {
        ...state,
        modalOpen: action.payload.modalOpen,
        modalMovie: action.payload.movie
      };

    case "NAV_FOCUS":
      return {
        ...state,
        navValue: action.payload.navValue
      };

    default:
      return state;
  }
}
