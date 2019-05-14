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

export function addToList(movies, deckIndex, unwatched) {
  return {
    type: "ADD_TO_LIST",
    payload: {
      movies: movies,
      deckIndex: deckIndex + 1,
      unwatched: unwatched
    }
  };
}

export function updateMovies(deckKey) {
  return {
    type: "UPDATE_MOVIES",
    payload: {
      deckKey: deckKey + 1
    }
  };
}

export function toggleActorModal(actorModalOpen, actorId) {
  return {
    type: "TOGGLE_ACTOR_MODAL",
    payload: {
      actorModalOpen: actorModalOpen,
      actorId: actorId
    }
  };
}

export function handleActor(actor) {
  return {
    type: "HANDLE_ACTOR",
    payload: {
      actor: actor
    }
  };
}
