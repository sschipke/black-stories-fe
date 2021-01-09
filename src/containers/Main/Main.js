import React from 'react';
import { determineMainImage } from '../../util/helpers';
import Nav from '../Nav/Nav';
import './Main.scss';

const Main = () => {
  return <main className="landing-page">
      <Nav />
      <img className="main-image" src={determineMainImage()} alt="movie backdrop" />
  </main>
}

export default Main;