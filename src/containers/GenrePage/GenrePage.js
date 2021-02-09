import React from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import MovieCard from '../../components/MovieCard/MovieCard';
import './GenrePage.scss';

export const GenrePage = ({genreId, genreTitle, watchList}) => {
  let genreMovies = [];
  if(genreTitle && genreId) {
    genreTitle = genreTitle.replace('_', ' ').toUpperCase();
    genreMovies = watchList.filter(movie => movie.genres.includes(genreId))
    .map(movie => <MovieCard movie={movie} selectedGenreId={genreId} key={movie.id}/>)
  }
  return <main className="genre-page">
    <Nav subHeader={genreTitle} />
    <div className="movies-container">
      {!genreMovies.length && <h1>No movies in this genre</h1>}
      {genreMovies.length > 0 && genreMovies}
    </div>
  </main>
};

export const mapStateToProps = (state) => ({
  watchList: state.data.watchList,
});
export default connect(mapStateToProps)(GenrePage);