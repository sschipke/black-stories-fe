import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom'
import genreMap from '../../data/genreMap'
import './NotFound.scss';

const NotFound = ({ location }) => {
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
  return <div> Woops! Looks like you are lost, click below to return to the available genres: <Link to="/">Genres</Link></div>
}

export default withRouter(NotFound)
