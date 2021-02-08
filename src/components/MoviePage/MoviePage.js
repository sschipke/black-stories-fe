import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openVideoPlayer, setCurrentMovie } from '../../actions';
import { displayGenres, displayRuntime } from '../../util/helpers';
import './MoviePage.scss';

const MoviePage = ({movie, setCurrentMovie, openVideoPlayer}) => {
  setTimeout(() => {
    setCurrentMovie(movie)
  }, 10);
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
            <p className="movie-overview">{movie.overview}</p>
        </div>
          <div className="movie-page-genres-div">
          <p className="movie-info genres">{displayGenres(movie.genres)}</p>
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