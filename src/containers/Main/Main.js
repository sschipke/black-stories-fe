import React from 'react';
import { Link } from 'react-router-dom';
import { determineMainImage } from '../../util/helpers';
import './Main.scss';

const Main = () => {
  return <main>
      <div className="main-text-container">
        <h1>BLACK STORIES FILM CLUB</h1>
        <div className="links-container">
          <Link to="/genres">GENRES</Link>
          <a href="https://discord.gg/UfaE2Fq2">DISCORD</a>
        </div>
      </div>
      <img src={determineMainImage()} alt="movie backdrop" />
  </main>
}

export default Main;