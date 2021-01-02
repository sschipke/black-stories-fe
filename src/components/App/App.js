import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route path='/' render={ () => <Main /> } />
        {/* add 404 page here */}
      </Switch>
      </div> 
    );
  };
}

export default App;
