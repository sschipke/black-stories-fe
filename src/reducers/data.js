import unseenMovies from "../data/unseenMovies";
import previousMovies from "../data/previousMovies";
import {
  alphebatizeMovies,
  mapCreditsToMovies,
  sortByDate,
} from "../util/helpers";
const watchList = unseenMovies.sort(alphebatizeMovies);

const previouslyWatched = previousMovies.sort((a, b) => {
  return Date.parse(b.date_watched) - Date.parse(a.date_watched);
});
let initialState = {
  watchList: watchList,
  currentMovie: null,
  previouslySeen: previouslyWatched,
  searchText: "",
  areMoviesLoaded: false,
  areCreditsLoaded: false,
  password: "",
  isAuthenticated: false,
  remainingAttempts: null,
};

const data = (state = initialState, action) => {
  let new_state = { ...state };
  const { watchList, previouslySeen } = state;

  switch (action.type) {
    case "LOAD_MOVIES":
      new_state.watchList = action.movies.watchList;
      new_state.previouslySeen = action.movies.previouslyWatched;
      new_state.areMoviesLoaded = true;
      return new_state;
    case "FAILED_TO_LOAD_MOVIES":
      new_state.areMoviesLoaded = null;
      return new_state;
    case "SET_CURRENT_MOVIE":
      new_state.currentMovie = action.currentMovie;
      return new_state;
    case "SET_SEARCH_TEXT":
      new_state.searchText = action.searchText;
      return new_state;
    case "LOAD_MOVIE_CREDITS":
      const credits = action.credits;
      new_state.watchList = mapCreditsToMovies(watchList, credits);
      new_state.previouslySeen = mapCreditsToMovies(previouslySeen, credits);
      new_state.areCreditsLoaded = true;
      return new_state;
    case "UPDATE_MOVIE":
      const { movie } = action;
      const { currentMovie } = state;
      let watchListIndex = watchList.findIndex((m) => m.id === movie.id);
      let previouslySeenIndex = previouslySeen.findIndex(
        (m) => m.id === movie.id
      );
      let indexToRemove;
      if (watchListIndex > -1) {
        new_state.watchList[watchListIndex] = movie;
        indexToRemove = watchListIndex;
      } else if (previouslySeenIndex > -1) {
        new_state.previouslySeen[previouslySeenIndex] = movie;
        indexToRemove = previouslySeenIndex;
      }
      if (movie.seen && !currentMovie.seen) {
        new_state.previouslySeen = sortByDate([movie, ...previouslySeen]);
        watchList.splice(indexToRemove, 1);
        new_state.watchList = watchList.sort(alphebatizeMovies);
      } else if (!movie.seen && currentMovie.seen) {
        new_state.watchList = [...watchList, movie].sort(alphebatizeMovies);
        previouslySeen.splice(indexToRemove, 1);
        new_state.previouslySeen = sortByDate(previouslySeen);
      }
      new_state.currentMovie = movie;
      return new_state;
    case "SET_PASSWORD":
      const { password } = action;
      new_state.password = password;
      new_state.isAuthenticated = true;
      return new_state;
    case "SET_REMAINING_ATTEMPTS":
      new_state.remainingAttempts = action.remainingAttempts;
      return new_state;
    default:
      return state;
  }
};

export default data;
