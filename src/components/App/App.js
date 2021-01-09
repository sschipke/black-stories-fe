import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GenresList from '../../containers/GenresList/GenresList';
import GenrePage from '../../containers/GenrePage/GenrePage';
import MovieView from '../../containers/MovieView/MovieView';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Main from '../../containers/Main/Main';
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
        <Route 
          path='/genre/:genre_id-:genre_title' 
          render={({match}) => {
          let genreId = match.params.genre_id;
          let genreTitle = match.params.genre_title;
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
        {/* add 404 page here */}
      </Switch>
      </div> 
    );
  };
}

export default App;
