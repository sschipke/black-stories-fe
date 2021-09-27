const movieDbApiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
const noirFilmsApiUrl = process.env.REACT_APP_FILM_NOIR_BASE_URL;

export const getCredits = async (unseenMovies, previouslyWatched) => {
  let movieList = [...unseenMovies, ...previouslyWatched]
    try {
      var creditsData = await movieList.map(movie => {
        const isTvShow = movie.genres.includes(1923) ? 'tv' : 'movie';
        let url = `https://api.themoviedb.org/3/${isTvShow}/${movie.id}/credits?api_key=${movieDbApiKey}&language=en-US`

        return fetch(url)
        .then(data => data.json());
      })
    } catch(e) {
      console.error('Error in getting credits:', e)
      return 'Unable to get credits'
    }
    finally{
      return Promise.all(creditsData)
    }
  }

  export const getCleanCredits = async(unseenMovies, previouslyWatched) => {
    try {
      let credits = await getCredits(unseenMovies, previouslyWatched);
      return credits.map(movieCredit => {
        let searchDirector = movieCredit.crew.find(crew => crew.job === "Director");
        return {
          id: movieCredit.id,
          cast: movieCredit.cast.splice(0, 8).map(member => ({
            id: member.id,
            name: member.name,
            profile_path: member.profile_path,
            character: member.character ? member.character : null
          })),
          director: searchDirector ? searchDirector.name : null
        }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  export const fetchMovies = async () => {
    let url = noirFilmsApiUrl + "movies";
    let res = await fetch(url);

    if (!res.ok) {
      const error = await res.json();
      switch (res.status) {  
        case 401:
          throw error
        case 422: 
          throw error
        default:
          throw Error("Something went wrong. Try again")
      }
    }
  return res.json();
  }

  export const updateMovie = async (movie, shouldAddNewMovie) => {
    const url = `${noirFilmsApiUrl}movies${shouldAddNewMovie ? '' : '/' + movie.id}`
    const method = shouldAddNewMovie ? 'POST' : 'PUT';
    const {password} = movie;
    delete movie.password;
    let options = {
    method: `${method}`,
    body: JSON.stringify({movie, password}),
    headers: {
      "Content-Type": "application/json"
    }
  };

  let res = await fetch(url, options);
    if (!res.ok) {
      const error = await res.json();
      switch (res.status) {  
        case 401:
          throw error
        case 422: 
          throw error
        case 409:
          throw error
        default:
          throw Error("Something went wrong. Try again")
      }
    }
  return res.json();
}


export const getMovie = async (id) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${movieDbApiKey}&language=en-US`)
    .then(res =>  {
      if (!res.ok) {
        const { status } = res;
        switch (status) {
          case 404:
          // eslint-disable-next-line
            throw `Movie with id: ${id} does not exist in the MovieDB.`
        
          default:
            // eslint-disable-next-line
            throw 'Woops something went wrong looking for that movie. Try again in a few seconds.'
        }
      }
      return res.json()
      })
    .then(movieDBMovie => convertMovieData(movieDBMovie));
  }

const convertMovieData= (movieDbMovie) => {
  const {
    id,
    title,
    overview,
    backdrop_path,
    poster_path,
    release_date,
    runtime,
  } = movieDbMovie;
  const genres = movieDbMovie.genres.map(genre => genre.id);
  const movie = {
    id,
    title,
    overview,
    backdrop_path,
    poster_path,
    release_date,
    runtime,
    genres,
    video_key: null,
    watch_data: `https://www.themoviedb.org/movie/${id}-${(title || '').toLowerCase().trim()}/watch?locale=US`,
    seen: false,
    chosen_by: null,
    date_watched: null,
    triggers: null
  }
  return movie;
}