import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom'
import genreMap from '../../data/genreMap'
import './NotFound.scss';

const NotFound = ({match, history, location}) => {
  console.log({match}, {history}, {location})
  const {pathname} = location
  console.log(pathname)
  if(pathname.includes("/genre/")) {
    const params = pathname.split('/')
    console.log(params)
    const genreId = params[2]
    const genreName = genreMap[genreId];
    if(!genreName) {
      return <Redirect to="/genres" />
    }
    console.log({genreId}, {genreName})
    return <Redirect to={`./${genreId}-${genreName.toLowerCase().replace(' ', '_')}`} />
  }
  if(pathname.includes("/movie/")) {
    const params = pathname.split('/')
    console.log(params)
    const movieId = params[2]
    console.log({movieId})
    if(!movieId) {
      return <div> Woops! Looks like you are lost, click below to return to the available genres: <Link to="/">Genres</Link></div>
    }
    return <Redirect to={`./${movieId}-`} />
  }
  return <div> Woops! Looks like you are lost, click below to return to the available genres: <Link to="/">Genres</Link></div>
}

export default withRouter(NotFound)