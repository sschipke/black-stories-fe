import unseenMovies from '../data/unseenMovies';
import { removeArticles } from '../util/helpers';
const watchtList = unseenMovies.sort((movieA, movieB) => {
      let titleA = removeArticles(movieA.title.toLowerCase()); 
      let titleB = removeArticles(movieB.title.toLowerCase());
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
});
let initialState = {
  watchList: watchtList,
  currentMovie: null,
  previouslySeen: [],
}

const data = (state = initialState, action) => {
  let new_state = { ...state };
  switch(action.type) {
    case "SET_CURRENT_MOVIE":
      new_state.currentMovie = action.currentMovie;
      return new_state;
    default:
      return state;
  }
};

export default data;