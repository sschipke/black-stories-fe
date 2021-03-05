import React, { useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNavSubHeader, setBackgroundClass } from '../../actions';
import MovieCard from '../../components/MovieCard/MovieCard';
import './MovieList.scss';

export const MovieList = ({genreId, genreTitle, type, previouslyWatched, watchList, currentMovie, setBackgroundClass, setNavSubHeader}) => {
  const moviesContainerRef = createRef("movieContainer");
  let specificMovies = [];
  let className;
  if(genreId === 0) {
    className = 'genre-page';
    specificMovies = watchList.map(movie => <MovieCard movie={movie} selectedGenreId={genreId} key={movie.id}/>)
  }
  if(genreTitle && genreId) {
    className = 'genre-page';
    genreTitle = genreTitle.replace('_', ' ').toUpperCase();
    specificMovies = watchList.filter(movie => movie.genres.includes(genreId))
    .map(movie => <MovieCard movie={movie} selectedGenreId={genreId} key={movie.id}/>)
  } else if (type === 'Previously Watched'){
    className = 'previously-watched'
    specificMovies = previouslyWatched.map(movie => <MovieCard movie={movie} type='Previously Watched' key={movie.id}/>)
  }
  useEffect(() => {
    setNavSubHeader(genreTitle || type);
    setBackgroundClass(className);
    if (type === 'Previously Watched' && !currentMovie) {
      const currentMovieContainer = moviesContainerRef.current
      currentMovieContainer.scrollTop = 0;
      if (window.innerWidth < 950 && currentMovieContainer.parentNode.scrollTop !== 0) {
        currentMovieContainer.parentNode.scrollTop = 0;
      }
    }
  });

  return (
    <div className="movies-container" ref={moviesContainerRef}>
      {!specificMovies.length && <h1>No movies in this genre</h1>}
      {specificMovies.length > 0 && specificMovies}
    </div>
  )
};

export const mapStateToProps = state => ({
  watchList: state.data.watchList,
  previouslyWatched: state.data.previouslySeen,
  currentMovie: state.data.currentMovie
});

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setBackgroundClass, setNavSubHeader  }, dispatch);

export default connect(mapStateToProps,mapDispatchToProps) (MovieList);
