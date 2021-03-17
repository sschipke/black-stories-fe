import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMobileMenu, setCurrentMovie, toggleSearchBar } from '../../actions';
import SearchBar from '../../components/SearchBar/SearchBar';
import './MobileMenu.scss';

export const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu, setCurrentMovie, isSearchBarOpen, toggleSearchBar }) => {
  const openClass = isMobileMenuOpen ? 'open' : '';
  const searchBarClass = isSearchBarOpen ? ' search-bar-open' : '';
  let mobileMenuContent = (<>
      <Link className="mobile-link"
      onClick={() => toggleMobileMenu()}
      to="/">HOME</Link>
      <Link className="mobile-link"
      onClick={() => toggleMobileMenu()}
      to="/genres">GENRES</Link>
      <Link className="mobile-link"
      onClick={() => {
        setCurrentMovie(null);
        toggleMobileMenu(); 
        }
      }
      to="/previouslywatched">PREVIOUSLY WATCHED</Link>
      <Link className="mobile-link"
      onClick={() => toggleMobileMenu()}
      to="/code_of_conduct">CONDUCT RULES</Link>
      <a
      href="https://discord.gg/PvxjFYd"
      className="mobile-link"
      target="_blank"
      rel="noreferrer">DISCORD</a>
      <button 
      className="mobile-link"
      onClick={() => toggleSearchBar()}
        >SEARCH</button>
    </>)

      if(isSearchBarOpen) {
        mobileMenuContent = (
        <>
          <button 
          className="mobile-link"
          onClick={() => toggleSearchBar()}
          >BACK TO MENU</button>
          <SearchBar />
        </>)
      }

  return (
    <div className={"mobile-menu-div " + openClass + searchBarClass}>
      {mobileMenuContent}
    </div>
  )
}

export const mapStateToProps = (state) => ({
  isMobileMenuOpen: state.screen.mobile_menu_open,
  isSearchBarOpen: state.screen.search_bar_open
})

export const mapDispatchToProps = dispatch => (bindActionCreators({
  toggleMobileMenu, setCurrentMovie, toggleSearchBar
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
