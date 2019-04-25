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
