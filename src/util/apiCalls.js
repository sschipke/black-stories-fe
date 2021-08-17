const movieDbApiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
const noirFilmsApiUrl = process.env.REACT_APP_FILM_NOIR_BASE_URL;

export const getCredits = async (unseenMovies, previouslyWatched) => {
  let movieList = [...unseenMovies, ...previouslyWatched]
    try {
      var creditsData = await movieList.map(movie => {
        let url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${movieDbApiKey}&language=en-US`
        return fetch(url)
        .then(data => data.json());
      })
    } catch(e) {
      console.log('Error in getting credits:', e)
      return 'Unable to get credits'
    }
    finally{
      return Promise.all(creditsData)
    }
  }

  export const getCleanCredits = async(unseenMovies, previouslyWatched) => {
    try {
      let credits = await getCredits(unseenMovies, previouslyWatched);
      let cleanedCredits = credits.map(movieCredit => {
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
      return cleanedCredits;
    } catch (error) {
      throw new Error(error);
    }
  }

  export const fetchMovies = async () => {
    let url = noirFilmsApiUrl + "movies";
    try {
      return fetch(url)
      .then(res => res.json())
    } catch (error) {
      console.error("Error getting initial movies!");
    }
  }

  export const updateMovie = async (movie) => {
    const url = noirFilmsApiUrl + 'movies/' + movie.id;
    const {password} = movie;
    delete movie.password;
    let options = {
    method: "PUT",
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
        default:
          throw Error("Something went wrong. Try again")
      }
    }
  return res.json();
}

