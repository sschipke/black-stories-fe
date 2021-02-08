import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMobileMenu } from '../../actions';
import './MobileMenu.scss';

export const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const openClass = isMobileMenuOpen ? 'open' : '';
  return (
    <div className={"mobile-menu-div " + openClass}>
      <Link className="mobile-link" 
      onClick={() => toggleMobileMenu()}
      to="/">HOME</Link>
      <Link className="mobile-link" 
      onClick={() => toggleMobileMenu()}
      to="/genres">GENRES</Link>
          <a 
          href="https://discord.gg/PvxjFYd" 
          className="mobile-link"
          target="_blank" 
          rel="noreferrer">DISCORD</a>
    </div>
  )
}

export const mapStateToProps = (state) => ({
  isMobileMenuOpen: state.screen.mobile_menu_open
})

export const mapDispatchToProps = dispatch => (bindActionCreators({
  toggleMobileMenu
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);