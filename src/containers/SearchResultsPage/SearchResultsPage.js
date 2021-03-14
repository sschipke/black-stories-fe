import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import { setBackgroundClass, toggleSearchBar } from '../../actions';
import MovieCard from '../../components/MovieCard/MovieCard';
import './SearchResultsPage.scss';

export const SearchResultsPage = ({ previouslyWatched, watchList, setBackgroundClass, searchText, toggleSearchBar}) => {

  useEffect(() => {
    setBackgroundClass("search-results-page");
  });

const allMovies = [...previouslyWatched, ...watchList]

let searchResults = allMovies.filter(movie => movie.title.toLowerCase().includes(searchText));
  const searchResultsLength = searchResults.length

  switch (true) {
    case (searchResultsLength === 0):
      searchResults = <p className="no-results">Sorry, couldn't find anything :sad-face:</p>
      break;
    case searchResultsLength === 1:
      const singleMovie = searchResults[0];
      return <Redirect to={`/movie/${singleMovie.id}-${singleMovie.title.replaceAll(' ', '-').toLowerCase()}`} />
    default: 
      searchResults = searchResults.map(movie => <MovieCard movie={movie} key={movie.id}/>);
      break;
  }


  return (
    <div className="movies-container" >
      {searchResults}
    </div>
  )
};

export const mapStateToProps = state => ({
  watchList: state.data.watchList,
  previouslyWatched: state.data.previouslySeen,
  searchText: state.data.searchText
});

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setBackgroundClass, toggleSearchBar }, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(SearchResultsPage);
