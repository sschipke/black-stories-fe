import genreMap from '../data/genreMap';
export const determineMainImage = () => {
    console.log('Here is the width: ', window.innerWidth);
  if(window.innerWidth > 720) {
    const num = generateRandomImageNumber(16);
    return `../images/main/desktop/${num}-DSK.jpg`
  } else {
    const num = generateRandomImageNumber(19)
    return `../images/main/mobile/${num}-DSK.jpg`
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

export const displayGenres = (genres) => {
  if (genres && genres.length > 0) {
    return genres.reduce((finalString, genre, index) => {
      if (!genreMap[genre]) {
        return finalString
      }
      if(index === genres.length -1) {
        finalString += genreMap[genre]
        return finalString
      }
      finalString += genreMap[genre] + ", "
        return finalString
    }, '')
  }
  return ''
}