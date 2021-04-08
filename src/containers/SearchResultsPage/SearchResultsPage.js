import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import { setBackgroundClass, toggleSearchBar } from '../../actions';
import MovieCard from '../../components/MovieCard/MovieCard';
import './SearchResultsPage.scss';

export const SearchResultsPage = ({ previouslyWatched, watchList, setBackgroundClass, searchText}) => {

  useEffect(() => {
    setBackgroundClass("search-results-page");
  });

  const noResults = <div className="no-results-div">
    <h1>NO SEARCH RESULTS</h1>
    <h1> SORRY, BABY</h1>
    <img className="no-results-gif" src="https://4.bp.blogspot.com/-aRPiVblOJS8/WZ3fd7vph8I/AAAAAAAAocM/E_PRaQ-VuFYSksTXeZB0vUP8V6v9YW82gCLcBGAs/s1600/The%2BWiz.gif" alt="woman lounging on the couch in luxurious green clothing" style={{"font-size": "1.5rem;"}}/>
  </div>

const allMovies = [...previouslyWatched, ...watchList]

let searchResults = allMovies.filter(movie => movie.title.toLowerCase().includes(searchText) || movie.director.toLowerCase().includes(searchText));
  const searchResultsLength = searchResults.length

  switch (true) {
    case (searchResultsLength === 0):
      searchResults = noResults
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
  searchText: state.data.searchText,
});

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setBackgroundClass, toggleSearchBar }, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(SearchResultsPage);
