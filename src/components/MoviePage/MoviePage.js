import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openVideoPlayer, setCurrentMovie } from '../../actions';
import { displayRuntime } from '../../util/helpers';
import genreMap from '../../data/genreMap';
import './MoviePage.scss';

const MoviePage = ({movie, setCurrentMovie, openVideoPlayer}) => {
  useEffect(() => {
    setCurrentMovie(movie);
  })
  const displayGenres = (genres) => {
  if (genres && genres.length > 0) {
    return genres.map((genreId, i) => {
      if(i === genres.length -1) {
        return (<Link className="movie-page-genres" key={genreId} to={'/genre/'+ genreId + '-' + genreMap[genreId].replaceAll(' ', '_').toLowerCase()}>{genreMap[genreId]}</Link>)
      }
      return (<Link className="movie-page-genres" key={genreId} to={'/genre/'+ genreId + '-' + genreMap[genreId].replaceAll(' ', '_').toLowerCase()}>{genreMap[genreId] + ","}</Link>)
    })
  }
  return
}
  return <section className="movie-section" >
      <img 
      className="movie-view-backdrop"
      alt="Movie backrop"
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      />
      <h1 className="movie-page-title">{movie.title}</h1>
      <div className="movie-info-div">
        <div className="movie-interactions-div">
          <div className="movie-stats-div">
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
          {movie['triggers'] && <p><strong>Possible Triggers:</strong> {movie.triggers}</p>}
            <p className="movie-overview">{movie.overview}</p>
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
  bindActionCreators({ openVideoPlayer, setCurrentMovie  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage)