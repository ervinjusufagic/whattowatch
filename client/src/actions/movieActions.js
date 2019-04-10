export function incrementId(idIndex) {
  return {
    type: "INCREMENT_ID",
    payload: {
      idIndex: idIndex + 1
    }
  };
}

export function updateIds(randomIds) {
  return {
    type: "UPDATE_IDS",
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

export function setTrailers(trailers) {
  return {
    type: "SET_TRAILER",
    payload: {
      trailers: trailers,
      isLoading: false
    }
  };
}
