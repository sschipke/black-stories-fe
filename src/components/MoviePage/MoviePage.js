import React, { useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openVideoPlayer, setCurrentMovie, setBackgroundClass, setNavSubHeader } from '../../actions';
import { displayRuntime } from '../../util/helpers';
import ProfileCard from '../ProfileCard/ProfileCard';
import genreMap from '../../data/genreMap';
import './MoviePage.scss';

const MoviePage = ({movie, setCurrentMovie, openVideoPlayer, setBackgroundClass, setNavSubHeader}) => {

  const moviePageRef = createRef('movie-page');

  const displayGenres = (genres) => {
  if (genres && genres.length > 0) {
    return genres.map((genreId, i) => {
      if(i === genres.length -1) {
        return (<Link 
          onClick={() => setCurrentMovie(null)}
          className="movie-page-genres" key={genreId} to={'/genre/'+ genreId + '-' + genreMap[genreId].replaceAll(' ', '_').toLowerCase()}>{genreMap[genreId]}</Link>)
      }
      return (<Link 
        onClick={() => setCurrentMovie(null)}
        className="movie-page-genres" key={genreId} to={'/genre/'+ genreId + '-' + genreMap[genreId].replaceAll(' ', '_').toLowerCase()}>{genreMap[genreId] + ","}</Link>)
    })
  }
  return
}

let castInfo = movie['isCastLoaded'] && movie.cast.length ? movie.cast.map(actor => <ProfileCard actor={actor} key={actor.name} />) : null;

const castClass = castInfo && castInfo.length > 3 ? " full-cast" : "";

  useEffect(() => {
      setCurrentMovie(movie);
      setNavSubHeader(null);
      setBackgroundClass("movie-view");
      const currentMoviePage = moviePageRef.current
      let appContainer = currentMoviePage.parentNode.parentNode
      if (window.innerWidth < 950 && appContainer.scrollTop !== 0) {
        appContainer.scrollTop = 0
      }
    });
  
  return <section className="movie-section" ref={moviePageRef} >
    <Link to="/edit" className="edit-link">
        <img
        className="movie-view-backdrop"
        alt="Movie backrop"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        />
    </Link>
      <h1 className="movie-page-title">{movie.title}</h1>
      <div className="movie-info-div">
        <div className={"movie-interactions-div" + castClass }>
          <div className="movie-stats-div">
            {movie['isCastLoaded'] && movie.director && <div style={{width: "100%"}} >
              <p className="movie-info director">DIRECTED BY <Link className="movie-info"
                to={`/director/${movie.director.toLowerCase().replace(' ', '-')}`}
              >{movie.director}</Link></p>
            </div>}
            <div>
              <p className="movie-info">{movie.release_date.slice(0,4)}</p> 
              <p className="movie-info">{displayRuntime(movie.runtime)}</p>
          {movie.video_key && 
            <button 
            className="trailer-button movie-info"
            type="button"
            onClick={() => openVideoPlayer()}
            >
              TRAILER
            </button>}
            { movie.watch_data && 
            <a className="movie-info" 
            href={movie.watch_data}
            target="_blank" 
            rel="noreferrer"
            >
              WATCH
            </a>
          }
          </div>
          {movie['seen'] && <div className="watched-div"><p className="movie-info">WATCHED {movie.date_watched}<span className="chosen-by-span"> CHOSEN BY {movie.chosen_by}</span> </p></div>}
          </div>
          {movie['triggers'] && <p><strong>Possible Triggers:</strong> {movie.triggers}</p>}
            <p className="movie-overview">{movie.overview}</p>
            {movie['isCastLoaded'] && castInfo && <div className="cast-container">
              <p className="movie-info">STARRING</p>
              <div className="profile-card-container" > 
                {castInfo}
              </div>
              </div>}
        </div>
          <div className="movie-page-genres-div">
          {displayGenres(movie.genres)}
          </div>
      </div>
  </section>
}

export const mapStateToProps = state => ({
  currentMovie: state.data.currentMovie,
})

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ openVideoPlayer, setCurrentMovie, setBackgroundClass, setNavSubHeader  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage)