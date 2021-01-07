const DirectorIcon = ({src}) => { 
  if(!src) {
    return '';
  }
  return <img className="director-icon" src={src} alt="Icon denoting if there is a female or a black director for the movie" />
}

export default DirectorIcon