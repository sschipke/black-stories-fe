import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openVideoPlayer, setCurrentMovie } from '../../actions';
import './MoviePage.scss';

const MoviePage = ({movie, setCurrentMovie, openVideoPlayer}) => {
  console.log({movie})
  setCurrentMovie(movie)
  return <section className="movie-section" >
      <img 
      className="movie-view-backdrop"
      alt="Movie backrop"
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      />
      <h1>{movie.title.toUpperCase()}</h1>
      {movie.video_key && 
          <button 
          type="button"
          onClick={() => openVideoPlayer()}
          >
            VIEW TRAILER
          </button>}
      <div>
        {movie.overview}
      </div>
  </section>
}

export const mapStateToProps = state => ({
  currentMovie: state.data.currentMovie,
})

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ openVideoPlayer, setCurrentMovie  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage)