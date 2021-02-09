import React,  { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentMovie } from  '../../actions';
import Nav from '../Nav/Nav';
import specialGenres from '../../data/specialGenres';
import './GenresList.scss';

export const GenresList = ({setCurrentMovie}) => {

  useEffect(() => {
    setCurrentMovie(null);
  });

  const genreLinks =  specialGenres.map(genre => <Link key={genre.id} to={'genre/'+genre.id + '-' + genre.name.replace(' ', '_').toLocaleLowerCase()}><span>{genre.name.toUpperCase()}</span></Link>)
  return <main className="genres-list-view">
    <Nav />
    <div className="genre-links-container">
      {genreLinks}
    </div>
  </main>
}

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setCurrentMovie  }, dispatch);

export default connect(null, mapDispatchToProps)(GenresList);