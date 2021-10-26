import React, { useEffect }from 'react';
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setBackgroundClass} from '../../actions';
import MoviePage from '../../components/MoviePage/MoviePage';
import loadingGif from '../../assets/gifs/loading_fist.gif';
import './MovieView.scss';

const MovieView = ({movieId, unseenMovies, previousMovies, areMoviesLoaded, setBackgroundClass}) => {
  let currentMovie = unseenMovies.find(movie => movie.id === Number(movieId))
  if(!currentMovie) {
    currentMovie = previousMovies.find(movie => movie.id === Number(movieId))
  };

  useEffect(() => {
    setBackgroundClass("movie-view");
  }, [setBackgroundClass])

  if(!areMoviesLoaded && !currentMovie) {
    return ( <div className="modal-background">
      <div className="modal-content modal-loading-div">
        Loading...
        <img className="modal-loading-gif" src={loadingGif} alt="loading gif" />
      </div>
    </div>
    )
  }

  return (
    <div className="movie-container">
      {currentMovie && <MoviePage movie={currentMovie} />}
      {!currentMovie && <Redirect to="/genres" />}
    </div>
  );
};

export const mapStateToProps = state => ({
  unseenMovies: state.data.watchList,
  previousMovies: state.data.previouslySeen,
  areMoviesLoaded: state.data.areMoviesLoaded
})

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setBackgroundClass }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MovieView);
