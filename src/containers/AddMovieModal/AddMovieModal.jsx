import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMovie } from '../../util/apiCalls';
import {setCurrentMovie } from '../../actions';
import loadingGif from '../../assets/gifs/loading_fist.gif';
import EditForm from '../../components/EditForm/EditForm';
import './AddMovieModal.scss';

export const AddMovieModal = ({ currentMovie, setCurrentMovie, watchList, previouslySeen }) => {
  let modalContent;
  const [addMovieState, setAddMovieState] = useState({movieId: "", complete: false, loading: false, errors: []});
  const allMovies = [...watchList, ...previouslySeen];

  if(!currentMovie && !addMovieState.loading) { 
    const handleSubmit = async (e) => { 
      e.preventDefault();
      const movieId = addMovieState.movieId;
      const duplicateMovie = allMovies.find(movie => movie.id === Number(movieId));
      if(!movieId) {
        setAddMovieState({errors: [`You must enter a movie id`], movieId: ""})
        return;
      }
      if (duplicateMovie) {
        setAddMovieState({errors: [`Movie with id ${movieId} already exisits.`], movieId: ""})
        return;
      }
      setAddMovieState({loading: true, errors: []});
      try {
        const movie = await getMovie(movieId);
          setCurrentMovie(movie);
      } catch (error) {
        console.error("Catch",{error})
        setAddMovieState({errors: [error], loading: false, movieId: ""});
      }
    }

    const handleEnter = (e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    }

    const { errors } = addMovieState;
    const haveErrors = errors.length  > 0;
    let errorMessages = '';
    if (haveErrors) {
      errorMessages = errors.map((error, i) =>(<span
        key={i}
        style={{color: 'red', display: 'inline-block'}}
        >{error}</span>))
    }

    modalContent = <div style={{height: '100%', width: '100%'}}>
      <form
      className="add-movie-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="movieId">MovieDB Movie ID</label>
          <input
          type="number"
          required
          min="46"
          name="movieId"
          onKeyPress={handleEnter}
          value={addMovieState.movieId}
          onChange={e => setAddMovieState({...addMovieState, [e.target.name]: e.target.value})}
        />
        { haveErrors && errorMessages }
  
      </form>
    </div>
  } else if (!currentMovie && addMovieState.loading) { 
      modalContent = <img src={loadingGif} alt="loading gif" />
  } else if(currentMovie) { 
    if(setAddMovieState.loading) { 
      setAddMovieState({loading: false});
    }
    modalContent = <EditForm type="NEW" />
  }
  
  return (
    <div className="modal-background"
    >
      <div className="modal-content add-movie-background">
        {modalContent}
      </div>
    </div>
  )

}

export const mapStateToProps = state => ({
  currentMovie: state.data.currentMovie,
  watchList: state.data.watchList,
  previouslySeen: state.data.previouslySeen
})

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setCurrentMovie }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(AddMovieModal);