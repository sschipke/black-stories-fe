import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = ({subHeader}) => {
  return (
      <nav className="nav-text-container">
        <h1>BLACK STORIES FILM CLUB</h1>
        {subHeader && <h2>{subHeader}</h2>}
        <div className="links-container">
          <Link to="/genres">GENRES</Link>
          <a href="https://discord.gg/uAyxbp23" target="_blank" rel="noreferrer">DISCORD</a>
          <Link to="/">HOME</Link>
        </div>
      </nav>
  )
}

export default Nav;