import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GenresList from '../../containers/GenresList/GenresList';
import MovieList from '../../containers/MovieList/MovieList';
import MovieView from '../../containers/MovieView/MovieView';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Main from '../../containers/Main/Main';
import NotFound from '../../containers/NotFound/NotFound';
import genreMap from '../../data/genreMap'
import './App.scss';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { windowWidth: window.innerWidth };
  // }

  // handleResize = (e) => {
  //   this.setState({ windowWidth: window.innerWidth });
  // };

  // componentDidMount() {
  //   window.addEventListener("resize", this.handleResize);
  // }

  // componentWillUnmount() {
  //   window.addEventListener("resize", this.handleResize);
  // }

  render = () => {
    // const {windowWidth} = this.state;
    return (
      <div className="App">
        {/* <div>Width: {windowWidth}</div> */}
        <VideoPlayer />
      <Switch>
        <Route exact path='/' render={ () => <Main /> } />
        <Route path='/genres' render={() => <GenresList />} />
        <Route path='/previouslywatched' render={() => <MovieList type='Previously Watched' />} />
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
        <NotFound />
      </Switch>
      </div>
    );
  };
}

export default App;
