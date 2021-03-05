import React,  { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentMovie, setBackgroundClass, setNavSubHeader  } from  '../../actions';
import specialGenres from '../../data/specialGenres';
import './GenresList.scss';

export const GenresList = ({ setCurrentMovie, setBackgroundClass, setNavSubHeader }) => {

  useEffect(() => {
    setCurrentMovie(null);
    setBackgroundClass("genres-list-view");
    setNavSubHeader(null);
  });

  const genreLinks =  specialGenres.map(genre => <Link key={genre.id} to={'genre/'+genre.id + '-' + genre.name.replace(' ', '_').toLocaleLowerCase()}><span>{genre.name.toUpperCase()}</span></Link>)
  return (
    <div className="genre-links-container">
      {genreLinks}
    </div>
    )
}

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setCurrentMovie, setBackgroundClass, setNavSubHeader   }, dispatch);

export default connect(null, mapDispatchToProps)(GenresList);