import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Nav from '../../containers/Nav/Nav';
import GenresList from '../../containers/GenresList/GenresList';
import MovieList from '../../containers/MovieList/MovieList';
import MovieView from '../../containers/MovieView/MovieView';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Main from '../../containers/Main/Main';
import NotFound from '../../containers/NotFound/NotFound';
import MobileMenu from '../../containers/MobileMenu/MobileMenu';
import CodeOfConductPage from '../../containers/CodeOfConductPage/CodeOfConductPage';
import SearchResultsPage from '../../containers/SearchResultsPage/SearchResultsPage';
import genreMap from '../../data/genreMap';
import './App.scss';

const App = ({ backgroundClass }) => {
    return (
      <main className={"App " + backgroundClass}>
        <MobileMenu />
        <VideoPlayer />
        <Nav />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/genres' component={GenresList} />
        <Route exact path='/code_of_conduct' component={CodeOfConductPage} />
        <Route path='/previouslywatched'         
          render={()=><MovieList type='Previously Watched'/>}
          />
        <Route
          path='/genre/:genre_id-:genre_title'
          render={({match}) => {
          let genreId = match.params.genre_id;
          let genreTitle = genreMap[genreId];
          return (<MovieList genreId={Number(genreId)} genreTitle={genreTitle} />)
          }}
        />
        <Route
          path='/movie/:movieId-:movie_title'
          render={({match}) => {
          let id = match.params.movieId;
          return (<MovieView movieId={id} />)
          }}
        />
        <Route exact path='/search' component={SearchResultsPage} />
        <NotFound />
      </Switch>
      </main>
    );
}

export const mapStateToProps = (state) => ({
  backgroundClass: state.screen.background_class,
})

export default connect(mapStateToProps)(App);
