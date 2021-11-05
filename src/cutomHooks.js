import { useState }  from 'react';
import { convertToInputDate } from './util/helpers';

export const useEditForm = (movie) => {
  const initialState = {
    ...movie,
    date_watched: convertToInputDate(movie.date_watched)
  }
  const [inputs, setInputs] = useState(initialState);
  const getState = (event) => {
    return inputs
  }
  const handleInputChange = (event) => {
    event.persist();
    if(event.target.name === 'seen') {
      inputs.seen = !inputs.seen
      return setInputs(inputs => ({ ...inputs }));
    }
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  }
  return {
    getState,
    handleInputChange,
    inputs
  };
}