import unseenMovies from '../data/unseenMovies';
import previousMovies from '../data/previousMovies';
import { removeArticles, mapCreditsToMovies } from '../util/helpers';
const watchList = unseenMovies.sort((movieA, movieB) => {
      let titleA = removeArticles(movieA.title.toLowerCase()); 
      let titleB = removeArticles(movieB.title.toLowerCase());
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
});

const previouslyWatched = previousMovies.sort((a, b)=>{
      return Date.parse(b.date_watched) - Date.parse(a.date_watched)
    })
let initialState = {
  watchList: watchList,
  currentMovie: null,
  previouslySeen: previouslyWatched,
  searchText: "",
  areCreditsLoaded: false
}

const data = (state = initialState, action) => {
  let new_state = { ...state };
  switch(action.type) {
    case "SET_CURRENT_MOVIE":
      new_state.currentMovie = action.currentMovie;
      return new_state;
      case "SET_SEARCH_TEXT":
      new_state.searchText = action.searchText;
      return new_state;
    case "LOAD_MOVIE_CREDITS":
      const credits = action.credits
      const {watchList, previouslySeen} = state;
      new_state.watchList = mapCreditsToMovies(watchList, credits);
      new_state.previouslySeen = mapCreditsToMovies(previouslySeen, credits);
      new_state.areCreditsLoaded = true;
      return new_state
    default:
      return state;
  }
};

export default data;