import React, { useReducer } from 'react';
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
  const createGenreSelection = (genreId, isChecked) => (<div key={genreId} style={{'margin': '1%'}}>
        <input type="checkbox"
          name={genreMap[genreId]}
          value={genreId}
          id={genreId}
          checked={isChecked}
          onChange={handleGenreChange}
        />
        <label htmlFor={genreId} >{genreMap[genreId]}</label>
      </div>)

  const showGenreOptions = (genres) => {
    const genreOptions = Object.entries(genreMap);
    delete genreOptions[0];
    let organizedSelectors = [];
    genreOptions.sort((genre1, genre2) => genre1[1].localeCompare(genre2[1])).forEach(genre => {
      const genreId= genre[0];
      const isChecked = genres.includes(parseInt(genreId));
      organizedSelectors.push(createGenreSelection(genreId, isChecked));
    });
    return organizedSelectors;
  }
const checkBoxes = showGenreOptions(genres);

  return (<div style={{'flexWrap': 'wrap'}}>
    {checkBoxes}
    {error && <p style={{ 'color': 'red' }}>{error}</p>}
  </div>)
}

export default GenreSelector;

