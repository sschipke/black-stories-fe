let initialState = {
  watchlist: [],
  currentMovie: null,
  previouslySeen: [],
}

const data = (state = initialState, action) => {
  let new_state = state;
  switch(action.type) {
    case "SET_CURRENT_MOVIE":
      new_state.currentMovie = action.currentMovie;
      return new_state;
    default:
      return state;
  }
};

export default data;