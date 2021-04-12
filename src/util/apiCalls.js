const movieDbApiKey = process.env.REACT_APP_MOVIEDB_API_KEY;
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

