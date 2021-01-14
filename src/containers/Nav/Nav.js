import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = ({subHeader}) => {
  return (
      <nav className="nav-text-container">
        <div className="nav-headers-container">
          <Link to="/" className="home-link"><h1>BLACK STORIES FILM CLUB</h1></Link>
          <div className="subheader-div">{subHeader && <h2>{subHeader}</h2>}</div>
        </div>
        <div className="links-container">
          <Link to="/genres">GENRES</Link>
          <a href="https://discord.gg/uAyxbp23" target="_blank" rel="noreferrer">DISCORD</a>
        </div>
      </nav>
  )
}

export default Nav;