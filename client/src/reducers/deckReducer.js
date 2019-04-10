const initialState = {
  idIndex: 0
};

export default function deckReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT_ID":
      return {
        idIndex: action.payload.idIndex
      };

    default:
      return state;
  }
}
