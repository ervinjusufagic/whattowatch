const initialState = {
  deckIndex: 0,
  randomIds: [],
  movies: [],
  unwatched: [],
  watched: [],
  trailerOpen: false,
  isLoading: true,
  modalOpen: false,
  navValue: "",
  searchQuery: "",
  searchResults: [],
  email: "",
  password: "",
  user: "",
  signIn: false,
  signUp: false,
  loginError: false,
  signUpError: false,
  deckKey: 0,
  actorModalOpen: false,
  actorId: "",
  actor: {},
  loadingActor: false
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "INIT_UNWATCHED":
      return {
        ...state,
        unwatched: action.payload.unwatched
      };

    case "INIT_WATCHED":
      return {
        ...state,
        watched: action.payload.watched
      };

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

    case "UPDATE_MOVIES":
      return {
        ...state,
        deckIndex: 0,
        randomIds: [],
        movies: [],
        isLoading: true,
        deckKey: action.payload.deckKey
      };

    case "ADD_TO_LIST":
      let unwatched = action.payload.unwatched;
      let unwatchedMovies = action.payload.movies;
      let deckIndex = action.payload.deckIndex;

      unwatched.push(unwatchedMovies[deckIndex - 1]);

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

    case "TOGGLE_ACTOR_MODAL":
      return {
        ...state,
        actorModalOpen: action.payload.actorModalOpen,
        actorId: action.payload.actorId,
        loadingActor: true
      };

    case "HANDLE_ACTOR":
      return {
        ...state,
        loadingActor: false,
        actor: action.payload.actor
      };

    case "NAV_FOCUS":
      return {
        ...state,
        navValue: action.payload.navValue
      };

    case "SEARCH_MOVIES":
      return {
        ...state,
        searchQuery: action.payload.query
      };

    case "SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload.searchResults
      };

    case "HANDLE_EMAIL":
      return {
        ...state,
        email: action.payload.email,
        loginError: false,
        signUpError: false
      };

    case "HANDLE_PASSWORD":
      return {
        ...state,
        password: action.payload.password,
        loginError: false,
        signUpError: false
      };

    case "AUTH_CHECK":
      let user = "";
      let pass = false;
      let error = false;

      console.log(action.payload.user);
      if (action.payload.user !== null) {
        localStorage.setItem("signIn", true);
        localStorage.setItem("user", action.payload.user);
        user = action.payload.user;
        pass = true;
      } else {
        error = true;
      }
      return {
        ...state,
        user: user,
        signIn: pass,
        loginError: error
      };

    case "SIGN_UP":
      return {
        ...state,
        signUp: action.payload.signUp,
        signUpError: !action.payload.signUp
      };

    default:
      return state;
  }
}
