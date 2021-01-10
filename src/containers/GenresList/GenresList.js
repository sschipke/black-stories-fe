import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import specialGenres from '../../data/specialGenres';
import './GenresList.scss';

export const GenresList = () => {
  const genreLinks =  specialGenres.map(genre => <Link key={genre.id} to={'genre/'+genre.id + '-' + genre.name.replace(' ', '_').toLocaleLowerCase()}><span>{genre.name.toUpperCase()}</span></Link>)
  return <main className="genres-list-view">
    <Nav />
    <div className="genre-links-container">
      {genreLinks}
    </div>
  </main>
}

export default GenresList;