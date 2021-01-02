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
    console.log({randomNum})
  return randomNum
}