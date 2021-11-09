import genreMap from '../data/genreMap';

export const determineMainImage = () => {
  if(window.innerWidth > 950) {
    const num = generateRandomImageNumber(19);
    return `../images/main/desktop/${num}-DSK.jpg`
  } else {
    const num = generateRandomImageNumber(16);
    return `../images/main/mobile/${num}-MOB.jpg`
  }
}

function generateRandomImageNumber(max) {
   var randomNum = Math.round(Math.random() * max -1);
    if(randomNum < 1 || randomNum > max) {
      return generateRandomImageNumber(max);
    }
  return randomNum
}

export const displayTwoGenres=(genres, excludeGenreId) => {
  let genreElements = [];
  if(!genres) {
    return []
  }
  for (let i = 0; genreElements.length <= 1 && i < genres.length; i++) {
    let currentGenre = genres[i]
    if(currentGenre === 100 || currentGenre === 6251 || currentGenre === excludeGenreId) {
      continue
    }
    if(currentGenre && genreMap[currentGenre]) {
    genreElements.push(genreMap[genres[i]]);
    }
  }
  return genreElements
}

export const displayRuntime = (time) => {
  if(time === undefined || !parseInt(time)) {
    return ''
  }
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}H ${minutes}M`;
}

export const removeArticles = (title) => {
  let words = title.split(" ");
  if (words.length <= 1) return title
  if (words[0] === 'a' || words[0] === 'an' || words[0] === 'the') {
    return words.splice(1).join(" ")
  }
  return title;
}

export const mapCreditsToMovies = (movies, credits) => {
    return movies.map(movie => {
      let matchingCredit = credits.find(credit => credit.id === movie.id);
      return {
        ...movie,
        cast: matchingCredit.cast,
        director: matchingCredit.director,
        isCastLoaded: true
      }
    })
  }

  export const convertToWatchDate = (dateInput) => {
    let initialDate = dateInput.split("-");
    const year = initialDate.splice(0, 1)[0].slice(2)
    initialDate.push(year);
    let finalDate = initialDate.join("/");
    return finalDate;
  }

  export const convertToInputDate = (date) => {
    let finalDate = "";
    if (!date) {
      return finalDate;
    }
    let initialDate = date.split("/");
    let year = initialDate.splice(2,1);
    // Will fix if this app lasts for more than 100 years ;)
    initialDate.unshift("20"+year);
    finalDate = initialDate.join("-");
    return finalDate;
  }

