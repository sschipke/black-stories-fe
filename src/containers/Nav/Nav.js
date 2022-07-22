import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  toggleMobileMenu,
  setCurrentMovie,
  toggleSearchBar,
  resetPaginationPage,
} from "../../actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Nav.scss";

const Nav = ({
  subHeader,
  isMobileMenuOpen,
  toggleMobileMenu,
  setCurrentMovie,
  toggleSearchBar,
  resetPaginationPage,
}) => {
  const openClass = isMobileMenuOpen ? " animate" : "";
  return (
    <nav className="nav-text-container">
      <div className="nav-headers-container">
        <Link to="/" className="home-link">
          <h1>BLACK STORIES FILM CLUB</h1>
        </Link>
        <div className="subheader-div">{subHeader && <h2>{subHeader}</h2>}</div>
        {subHeader === "Previously Watched" && (
          <h4 className="discussion-order">
            DISCUSSION ORDER: Aaron, Scott, Garrett, Nathaniel, Nicki
          </h4>
        )}
      </div>
      <div className="links-container">
        <SearchBar />
        <button onClick={() => toggleSearchBar()}>SEARCH</button>
        <Link to="/genres" onClick={() => resetPaginationPage()}>
          GENRES
        </Link>
        <Link
          to="/previouslywatched"
          onClick={() => {
            resetPaginationPage();
            setCurrentMovie(null);
          }}
        >
          PREVIOUSLY WATCHED
        </Link>
        <Link to="/code_of_conduct">CONDUCT RULES</Link>
        <a href="https://discord.gg/PvxjFYd" target="_blank" rel="noreferrer">
          DISCORD
        </a>
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
        <div className={"hamburger-menu" + openClass}></div>{" "}
      </div>
    </nav>
  );
};

export const mapStateToProps = (state) => ({
  isMobileMenuOpen: state.screen.mobile_menu_open,
  subHeader: state.screen.nav_subheader,
  isSearchBarOpen: state.screen.search_bar_open,
});

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleMobileMenu,
      setCurrentMovie,
      toggleSearchBar,
      resetPaginationPage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
