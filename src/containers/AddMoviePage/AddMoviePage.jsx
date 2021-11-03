import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBackgroundClass, setPassword, setCurrentMovie, setRemainingAttempts } from '../../actions';
import { authenticatePassword, getMovie } from '../../util/apiCalls';
import EditForm from '../../components/EditForm/EditForm';
import './AddMoviePage.scss';


const AddMoviePage = ({ isAuthenticated, password, setBackgroundClass, watchList, previouslySeen, setCurrentMovie, setPassword, remainingAttempts, setRemainingAttempts }) => {
    const initialState = { 
      passwordInput: "",
      passwordError: null,
      isPasswordComplete: false,
      remainingAttempts: 5,
      movieIdInput: "",
      movieIdError: null,
      isIdValid: false,
      succes: false
    }

    function reducer(state, action) {
    const new_state = { ...state }
    const { error, value } = action;
    switch(action.type) {
      case "UPDATE_PASSWORD":
        new_state.passwordInput = value || "";
        return new_state;
      case "PASSWORD_ERROR":
        new_state.passwordInput = "";
        new_state.passwordError = error['attempts'];
        setRemainingAttempts(error["remaining"])
        return new_state;
      case "SET_PASSWORD":
        new_state.isPasswordComplete = true;
        new_state.passwordError = null;
        return new_state;
      case "UPDATE_MOVIE_ID":
        new_state.movieIdInput = value || "";
        return new_state;
      case "MOVIE_ID_ERROR":
        new_state.movieIdError = error || "";
        new_state.movieIdInput = "";
        return new_state;
      case "MOVIE_ID_COMPLETE":
        new_state.movieIdInput = "";
        new_state.movieIdError = null;
        new_state.isIdValid = true;
        return new_state;
        default:
          return state;
        }
    }
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    setBackgroundClass("movie-view");
    if (isAuthenticated && password && !password) {
      dispatch({ type: "SET_PASSWORD"})
    };
  }, [isAuthenticated, password, state, setBackgroundClass]);

  if (remainingAttempts === 0) {
    return (
      <div className="password-form">
        <h2 style={{fontSize: "2.5rem", marginBottom: "25px"}}>Locked out!</h2>
        <img 
          className="password-img"
          src="https://media.giphy.com/media/2wW4T7W638MD20McEt/giphy.gif"
          alt="Yellow cabs drive off, leaving Dorothy behind."
          loading="eager"
          />
      </div>
    );
  }

  if (state.isPasswordComplete && state.isIdValid ) {
    return <EditForm type="NEW" />
  }

  const handlePasswordSubmit = async (password) => {
    authenticatePassword(password)
    .then(res => {
      setPassword(password);
      dispatch({ type: "SET_PASSWORD"});
    })
    .catch(error => {
      dispatch({ type: "PASSWORD_ERROR", error });
      setRemainingAttempts(error['remaining']);
    });
  }

  const handleMovieIdSubmit = async (movieId) => {
    const allMovies = [...watchList, ...previouslySeen];
    const duplicateMovie = allMovies.find(movie => movie.id === Number(movieId));
      if (duplicateMovie) {
        dispatch({ type: "MOVIE_ID_ERROR", error: `Movie with ID: ${movieId} already exists.` });
        return;
      }
      try {
        const movie = await getMovie(movieId);
          setCurrentMovie(movie);
          dispatch({type: "MOVIE_ID_COMPLETE"})
      } catch (error) {
        console.error("Error fetching movie info: ",{error});
        dispatch({ type: "MOVIE_ID_ERROR", error });
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { passwordInput, movieIdInput } = state;
    handleMovieIdSubmit(movieIdInput)
    .then(() => handlePasswordSubmit(passwordInput))
  }


  return (
    <div className="add-movie-page">
      <h2>Oh, you got a new one?</h2>
      <form
        onSubmit={handleSubmit}
      >
          <div className="add-movie-page-inputs">
          {!isAuthenticated && <div>
            <label htmlFor="password" className="header-style-font">Password</label>
            <input 
              type="password"
              name="password"
              minLength="6"
              onChange={(e) => dispatch({type: "UPDATE_PASSWORD", value: e.target.value})}
              value={state.passwordInput || ""}
              required
            />
            {state.passwordError && <h5>{state.passwordError}</h5>}
          </div>}
          {!state.isIdValid && <div>
            <label htmlFor="movie-id" className="header-style-font">Movie ID</label>
            <input 
              type="number"
              name="movie-id"
              min="46"
              autoComplete="number"
              onChange={(e) => dispatch({ type: "UPDATE_MOVIE_ID", value: e.target.value})}
              value={state.movieIdInput || ""}
              required
            />
            {state.movieIdError && <h5>{state.movieIdError}</h5>}
          </div>}
        </div>
        <button
          type="submit"
          className="header-style-font"
          style={{marginTop: "30px"}}
        >Let's Go</button>
      </form>
      <img 
        src="https://media.giphy.com/media/8PpulijFQgEkH4rLHK/giphy.gif"
        alt="Glinda from The Wiz wishing you luck"
      />
    </div>
  )



}

export const mapStateToProps = state => ({
  currentMovie: state.data.currentMovie,
  password: state.data.password,
  isAuthenticated: state.data.isAuthenticated,
  remainingAttempts: state.data.remainingAttempts,
  watchList: state.data.watchList,
  previouslySeen: state.data.previouslySeen
});

export const mapDispatchToProps = (dispatch) => 
  bindActionCreators({ setBackgroundClass, setPassword, setCurrentMovie, setRemainingAttempts }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AddMoviePage)