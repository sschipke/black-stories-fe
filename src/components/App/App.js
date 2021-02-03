import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GenresList from '../../containers/GenresList/GenresList';
import GenrePage from '../../containers/GenrePage/GenrePage';
import MovieView from '../../containers/MovieView/MovieView';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Main from '../../containers/Main/Main';
import NotFound from '../../containers/NotFound/NotFound';
import MobileMenu from '../../containers/MobileMenu/MobileMenu';
import genreMap from '../../data/genreMap';
import './App.scss';

class App extends Component {

  render = () => {
    return (
      <div className="App">
        <MobileMenu />
        <VideoPlayer />
      <Switch>
        <Route exact path='/' render={ () => <Main /> } />
        <Route path='/genres' render={() => <GenresList />} />
        <Route 
          path='/genre/:genre_id-:genre_title' 
          render={({match}) => {
          let genreId = match.params.genre_id;
          let genreTitle = genreMap[genreId];
          return (<GenrePage genreId={Number(genreId)} genreTitle={genreTitle} />)
          }}
        />
        <Route 
          path='/movie/:movieId-:movie_title' 
          render={({match}) => {
          let id = match.params.movieId;
          return (<MovieView movieId={id} />)
          }}
        />
        <NotFound />
      </Switch>
      </div> 
    );
  };
}

export default App;
