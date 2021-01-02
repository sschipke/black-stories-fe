import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../../containers/Main/Main';
import './App.css';

class App extends Component {

  render = () => {
    return (
      <div className="App">
      <Switch>
        <Route path='/' render={ () => <Main /> } />
        {/* add 404 page here */}
      </Switch>
      </div> 
    );
  };
}

export default App;
