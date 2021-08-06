import React, { useReducer, useEffect } from 'react';
import genreMap from '../../data/genreMap';

export const useGenreSelectors = (movieGenres = []) => {
  const initialState = {genres: movieGenres};

  function reducer(state, action) {
    const { genres } = state;
    const { genreId } = action;
    switch(action.type) {
      case 'CHANGE_GENRES':
        if (!genres.includes(genreId)) {
          state.genres = [...genres, genreId];
          return {...state};
        } else {
          state.genres = genres.filter(genre => genre !== genreId);
          return {...state};
        }
      default:
        console.error("DEFAULT ERROR")
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { genres } = state;

  const getGenreState = () => {
    return state.genres
  }
  const handleGenreChange = (event) => {
      const genreId = parseInt(event.target.value);
      dispatch({ type: 'CHANGE_GENRES', genreId })
  }
  return {
    getGenreState,
    handleGenreChange,
    genres
  };
}


const GenreSelector = ({ genres, handleGenreChange}) => {
  let error = genres.length === 0 ? 'You must select at least one genre.' : '';

  const showGenreOptions = (genres) => {
    const genreOptions = Object.keys(genreMap);
    delete genreOptions[0];
    return genreOptions.map(genreId => {
      const isChecked = genres.includes(parseInt(genreId));
      return (<div key={genreId} style={{'margin': '1%'}}>
        <input type="checkbox"
          name={genreMap[genreId]}
          value={genreId}
          id={genreId}
          checked={isChecked}
          onChange={handleGenreChange}
        />
        <label htmlFor={genreId} >{genreMap[genreId]}</label>
      </div>)
    })
  }
  let checkBoxes = showGenreOptions(genres);

  useEffect(() => {
    checkBoxes = showGenreOptions(genres)
  }, [genres])


  return (<div style={{'flexWrap': 'wrap', 'marginTop': '10px'}}>
    {checkBoxes}
    {error && <p style={{ 'color': 'red' }}>{error}</p>}
  </div>)
}

export default GenreSelector;

