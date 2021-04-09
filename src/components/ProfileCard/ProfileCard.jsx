import React from 'react';
import { Link } from 'react-router-dom';
import blankPicture from '../../assets/icons/no_actor_image.svg';
import './ProfileCard.scss';

const ProfileCard = ({ actor }) => {
  let imageSrc = actor.profile_path ? "https://image.tmdb.org/t/p/original/" + actor.profile_path : blankPicture;
  return (
    <div className="profile-card-div">
      <img className="profile-card-image" 
      src={imageSrc} 
      loading="lazy"
      alt="head shot of actor" 
      style={{"fontSize": "1rem"}} />
      <Link className="profile-name"
        to={`/actor/${actor.id}-${actor.name.toLowerCase().replace(' ', '-')}`}
      >{actor.name}</Link>
      {actor.character && <p className="profile-character">{actor.character}</p>}
    </div>
  )
}

export default ProfileCard