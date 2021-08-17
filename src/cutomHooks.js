import { useState }  from 'react';

export const useEditForm = (movie) => {
  if (movie && movie.seen && movie.date_watched) {
    let initialDate = movie.date_watched.split("/");
    let year = initialDate.splice(2,1);
    initialDate.unshift("20"+year);
    let finalDate = initialDate.join("-");
    movie.date_watched = finalDate;
  }
  const [inputs, setInputs] = useState({
    ...movie
  });
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