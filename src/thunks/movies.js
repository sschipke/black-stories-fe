import {dispatch} from "redux";
import { getMovie } from "../util/apiCalls";

export const getMovieThunk = async (id) => { 
  try {
    let movie = await getMovie(id);
    dispatch({type: "SET_CURRENT_MOVIE", currentMovie: movie});
  } catch (error) {
    console.error("ERROR GETTING MOVIE: ", error)
    dispatch({type: "SET_ERRORS", errors: error});
  }
}