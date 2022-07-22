import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import blankPicture from '../../assets/icons/no_actor_image.svg';
import './ProfileCard.scss';
import "react-lazy-load-image-component/src/effects/blur.css";

const ProfileCard = ({ actor }) => {
  let imageSrc = actor.profile_path ? "https://image.tmdb.org/t/p/original/" + actor.profile_path : blankPicture;
  return (
    <Link className="movie-link"
        to={`/actor/${actor.id}-${encodeURI(actor.name.toLowerCase())}`}
      >
      <div className="profile-card-div">
        <LazyLoadImage className="profile-card-image" 
        src={imageSrc} 
        alt="head shot of actor" 
        style={{"fontSize": "1rem"}} 
        effect="blur"
        />
        <p className="profile-name"
        >{actor.name}</p>
        {actor.character && <p className="profile-character">{actor.character}</p>}
      </div>
    </Link>
  )
}

export default ProfileCard