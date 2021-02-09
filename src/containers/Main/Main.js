import React from 'react';
import { determineMainImage } from '../../util/helpers';
import Nav from '../Nav/Nav';
import './Main.scss';

const Main = () => {
  return <main className="landing-page">
      <Nav />
      <div className="main-image-div">
        <img className="main-image" src={determineMainImage()} loading="eager" alt="movie backdrop" />
      </div>
  </main>
}

export default Main;