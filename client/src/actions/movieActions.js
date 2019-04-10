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

export function filterIds(ids, trailers) {
  return {
    type: "FILTER_IDS",
    payload: {
      isLoading: false,
      randomIds: ids,
      trailers: trailers
    }
  };
}
