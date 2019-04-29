export function navbarFocus(value) {
  return {
    type: "NAV_FOCUS",
    payload: {
      navValue: value
    }
  };
}

export function initUnwatched(movies) {
  return {
    type: "INIT_UNWATCHED",
    payload: {
      unwatched: movies
    }
  };
}

export function initWatched(movies) {
  return {
    type: "INIT_WATCHED",
    payload: {
      watched: movies
    }
  };
}
