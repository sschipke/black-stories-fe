import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import PasswordForm from './PasswordForm';
import { useEditForm } from '../../cutomHooks';
import { updateMovieResponse } from '../../actions';
import GenreSelector, {useGenreSelectors} from '../../containers/GenreSelector/GenreSelector';
import { updateMovie } from '../../util/apiCalls';
import {convertToWatchDate} from '../../util/helpers';
import './EditForm.scss';

const EditForm = ({currentMovie, updateMovieResponse, type, password}) => {
  const { inputs, handleInputChange, getState } = useEditForm(currentMovie);

  const ErrorMessage = ({message}) => (<p style={{color: 'red'}}>{message}</p>);
  const initialErrors = {
    password: null,
    field: null,
    poster: null,
    backdrop: null,
    chosen_by: null,
    watched: null,
  }

    const [errors, setErrors] = useState(initialErrors);
    const [isAuthenticated, setAuthentication] = useState(false);
    const [success, setSuccess] = useState(false);

    const { genres, handleGenreChange } = useGenreSelectors(currentMovie? currentMovie.genres : null);
    let selectedGenres = genres;

  if (!currentMovie) {
    return <Redirect to={`/genres`} />
  }

  
    if (success) {
    return <Redirect to={`/movie/${currentMovie.id}-${currentMovie.title.replaceAll(' ', '-').toLowerCase()}`} />
  }

  if (!isAuthenticated) {
    return (<>
      <PasswordForm setAuth={setAuthentication} />
    </>)
  }

  const handleSubmit = (e) => {
    if(e) {
      e.preventDefault()
    }
    const movie = getState();
    if (!selectedGenres.length) {
      console.error("Must have at least one genre")
      return
    }
    if (movie['isCastLoaded']){
    delete movie.cast;
    delete movie.director;
    delete movie.isCastLoaded;
  }

  if(movie.date_watched) {
    movie.date_watched = convertToWatchDate(movie.date_watched);
  }

  movie.runtime = parseInt(movie.runtime);
    movie.genres = selectedGenres.length ? selectedGenres : movie.genres;
    for (const key in movie) {
        if(!movie[key] && key !== 'seen') {
          movie[key] = null;
        }
    }
    setErrors(initialErrors);
    const shouldAddNewMovie = type === 'NEW' ? true : false;
    updateMovie(movie, shouldAddNewMovie, password)
    .then(movie => { 
      updateMovieResponse(movie);
      setSuccess(true);
    })
    .catch(errors =>{ 
      console.error('Error updating movie',errors)
      setErrors(errors)
  })
  }

  return (
    <form
    className="edit-form"
    onSubmit={handleSubmit}
    style={{display: "flex", "flexDirection": "column", "overflowX": "hidden"}}
    >
      {errors.field && <ErrorMessage message={errors.field} />}
      <label className="header-style-font" htmlFor="id">Movie ID</label>
      <input
        type="number"
        required
        min="46"
        name="id"
        value={inputs.id}
        onChange={handleInputChange}
      />
      {errors.id && <ErrorMessage message={errors.id} />}

      <label className="header-style-font" htmlFor="title">Title</label>
      <input 
      type="text"
      required
      min="3"
      name="title"
      value={inputs.title}
      onChange={handleInputChange}
      />

      <label className="header-style-font" htmlFor="overview">Overview</label>
      <textarea
        type="textarea"
        required
        min="3"
        name="overview"
        value={inputs.overview}
        onChange={handleInputChange}
        style={{"minHeight": "10%"}}
      />

      <label className="header-style-font" htmlFor="release_date">Release Date</label>
      <input
        type="date"
        required
        name="release_date"
        value={inputs.release_date}
        onChange={handleInputChange}
        style={{"minHeight": "25px"}}
      />

      <label className="header-style-font" htmlFor="video_key">Youtube Video Key</label>
      <input
        type="text"
        max="11"
        min="11"
        pattern="([A-Za-z0-9_\-]{11})"
        name="video_key"
        title="Video keys are 11 characters long."
        value={inputs.video_key ? inputs.video_key : ''}
        onChange={handleInputChange}
      />

      <label className="header-style-font" htmlFor="watch_data">Watch Data</label>
      <input
        type="text"
        name="watch_data"
        value={inputs.watch_data ? inputs.watch_data : ''}
        onChange={handleInputChange}
      />

      <label className="header-style-font" htmlFor="runtime">Runtime</label>
      <input
        type="number"
        required
        max="240"
        min="1"
        name="runtime"
        value={inputs.runtime}
        onChange={handleInputChange}
      />
      <label className="header-style-font" htmlFor="poster_path">Poster Path</label>
      <input
        type="text"
        required
        min="12"
        name="poster_path"
        value={inputs.poster_path}
        onChange={handleInputChange}
      />
      {errors.poster && <ErrorMessage message={errors.poster} />}

      <label  className="header-style-font"htmlFor="backdrop_path">Backrop Path</label>
      <input
        type="text"
        required
        min="12"
        name="backdrop_path"
        value={inputs.backdrop_path}
        onChange={handleInputChange}
      />
      {errors.backdrop && <ErrorMessage message={errors.backdrop} />}

      <label className="header-style-font" htmlFor="seen">Has this movie been watched?</label>
      <div>
        <input
          checked={inputs.seen}
          type="checkbox"
          name="seen"
          onChange={handleInputChange}
          value="seen"
        />
        </div>

      <label className="header-style-font" htmlFor="date_watched">Discussion Date</label>
      <input
        type="date"
        name="date_watched"
        min="2020-06-12"
        value={inputs.date_watched || ''}
        onChange={handleInputChange}
        style={{ "minHeight": "25px" }}
      />
      {errors.watched && <ErrorMessage message={errors.watched} />}

      <label className="header-style-font" htmlFor="chosen_by">Chosen by:</label>
      <select name="chosen_by" 
      value={inputs.chosen_by || ''}
      onChange={handleInputChange}
      >
        <option value="">None</option>
        <option value="Christopher">Christopher</option>
        <option value="Nicki">Nicki</option>
        <option value="Corey">Corey</option>
        <option value="Scott">Scott</option>
        <option value="Garrett">Garrett</option>
        <option value="Nathaniel">Nathaniel</option>
        <option value="Gillian">Gillian</option>
        <option value="Gabriel">Gabriel</option>
        <option value="Aaron">Aaron</option>
      </select>
      {errors.chosen_by && <ErrorMessage message={errors.chosen_by} />}
      <label className="header-style-font">Genre Categories</label>
    <div style={{"display": "flex"}}>
      <GenreSelector genres={selectedGenres} handleGenreChange={handleGenreChange} 
      />
    </div>

      <button
      type="submit"
      className="header-style-font"
      >
        Submit
      </button>

    </form>
  )
}

export const mapStateToProps = state => ({
  currentMovie: state.data.currentMovie,
  password: state.data.password
});

export const mapDispatchToProps = (dispatch) => 
  bindActionCreators({ updateMovieResponse }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
