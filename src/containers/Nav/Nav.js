import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMobileMenu } from '../../actions';
import './Nav.scss';

const Nav = ({subHeader, isMobileMenuOpen, toggleMobileMenu}) => {
  const openClass = isMobileMenuOpen ? ' animate' : '';

  return (
      <nav className="nav-text-container">
        <div className="nav-headers-container">
          <Link to="/" className="home-link"><h1>BLACK STORIES FILM CLUB</h1></Link>
          <div className="subheader-div">{subHeader && <h2>{subHeader}</h2>}</div>
          {subHeader === "Previously Watched" && <h4 className="discussion-order">
            DISCUSSION ORDER: CHRISTOPHER, NICKI, COREY, SCOTT, GARRETT, NATHANIEL,GILLIAN
            </h4>}
        </div>
        <div className="links-container">
          <Link to="/genres">GENRES</Link>
          <Link to="/previouslywatched">PREVIOUSLY WATCHED</Link>
          <Link to="/code_of_conduct">CONDUCT RULES</Link>
          <a href="https://discord.gg/PvxjFYd" target="_blank" rel="noreferrer">DISCORD</a>
        </div>
        <div
          className="mobile-menu-wrapper"
          onClick={() => toggleMobileMenu()}
          role="button"
        >
            <div className={"hamburger-menu" + openClass}></div>
        </div>
        <div
          className="mobile-menu-wrapper"
          onClick={() => toggleMobileMenu()}
          role="button"
        >
            <div className={"hamburger-menu" + openClass}></div>	          </div>
      </nav>
  )
}

export const mapStateToProps = (state) => ({
  isMobileMenuOpen: state.screen.mobile_menu_open
})

export const mapDispatchToProps = dispatch => (bindActionCreators({
  toggleMobileMenu
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
