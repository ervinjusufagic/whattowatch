const initialState = {
  idIndex: 0,
  randomIds: [],
  trailers: [],
  trailerOpen: false,
  isLoading: true
};

export default function deckReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT_ID":
      return {
        ...state,
        idIndex: action.payload.idIndex
      };

    case "UPDATE_IDS":
      return {
        ...state,
        randomIds: action.payload.randomIds
      };

    case "TOGGLE_TRAILER":
      return {
        ...state,
        trailerOpen: action.payload.trailerOpen
      };

    case "SET_TRAILER":
      return {
        ...state,
        trailers: action.payload.trailers
      };

    case "FILTER_IDS":
      console.log("HELLO");
      let trailers = [];
      let randomIds = [];
      for (let i = 0; i < action.payload.trailers.length; i++) {
        if (action.payload.trailers[i].movieTrailer === null) {
          console.log("null");
        } else {
          trailers.push(action.payload.trailers[i]);
          randomIds.push(action.payload.randomIds[i]);
        }
      }

      return {
        ...state,
        randomIds: randomIds,
        trailers: trailers,
        isLoading: action.payload.isLoading
      };

    default:
      return state;
  }
}
