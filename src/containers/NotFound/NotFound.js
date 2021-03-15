import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBackgroundClass } from '../../actions/';
import genreMap from '../../data/genreMap';
import './NotFound.scss';

const NotFound = ({ location, setBackgroundClass }) => {
  const {pathname} = location
  if(pathname.includes("/genre/")) {
    const params = pathname.split('/')
    const genreId = params[2]
    const genreName = genreMap[genreId];
    if(!genreName) {
      return <Redirect to="/genres" />
    }
    return <Redirect to={`/genre/${genreId}-${genreName.toLowerCase().replace(' ', '_')}`} />
  }
  if(pathname.includes("/movie/")) {
    const params = pathname.split('/')
    const movieId = params[2]
    if(!movieId) {
      return <div> Woops! Looks like you are lost, click below to return to the available genres: <Link to="/">Genres</Link></div>
    }
    return <Redirect to={`/movie/${movieId}-`} />
  }

  setBackgroundClass("not-found-page")
  return (<div className="movies-container" >
    <div className="no-results-div">
      <h1>Error 404</h1>
      <h1>Nothing's here!!</h1>
      <h1>Better go back &lt;3 </h1>
      <img className="no-results-gif" src="https://1.bp.blogspot.com/-8GMZ1cdKY_k/WZ3YtA_r-WI/AAAAAAAAobE/ezYPZOXmzGM0yF2LTSG_VPznCAty__x6ACLcBGAs/s400/Lena%2BHorne%2B-%2BThe%2BWiz.gif" alt="woman lounging on the couch in luxurious green clothing" style={{"font-size": "1.5rem;"}}/>
    </div>    
  </div>)
}

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setBackgroundClass }, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(NotFound))
