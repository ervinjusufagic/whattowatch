export function toggleModal(modalOpen, movie) {
  return {
    type: "TOGGLE_MODAL",
    payload: {
      modalOpen: modalOpen,
      movie: movie
    }
  };
}

export function addToWatched(watched, unwatched, movie) {
  return {
    type: "ADD_TO_WATCHED",
    payload: {
      watched: watched,
      unwatched: unwatched,
      movie: movie
    }
  };
}

export function deleteFromList(unwatched, movie) {
  return {
    type: "DELETE_FROM_LIST",
    payload: {
      unwatched: unwatched,
      movie: movie
    }
  };
}
