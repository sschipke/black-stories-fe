import React, {useState, useEffect, createRef} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import { setSearchText, toggleSearchBar, toggleMobileMenu } from '../../actions';
import './SearchBar.scss';

export const SearchBar = ({ setSearchText, toggleSearchBar, isOpen, toggleMobileMenu, isMobileMenuOpen }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchComplete, setSearchComplete] = useState(false);
  const focusRef = createRef('search-input-ref');
  useEffect(() => {
    let searchInputElement = focusRef.current;
    if(searchInputElement) {
      searchInputElement.focus();
    }
    return () => {
      setSearchComplete(false);
    }
  })

  if(isSearchComplete) {
    toggleSearchBar();
    if(isMobileMenuOpen) {
      toggleMobileMenu();
    }
    return <Redirect to="/search" />
  }
  
  let hideClass = !isOpen ? " hide" : " show";

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSearchInput = searchInput.trim().toLowerCase();
    if (!cleanSearchInput) {
      return
    }
    setSearchText(cleanSearchInput);
    setSearchInput("");
    setSearchComplete(true);
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <form 
    className={"search-form" + hideClass}
    onSubmit={e => handleSubmit(e)}
    >
      <label
      id="input-label"
      htmlFor="search-input"
      hidden
      >
        Enter text to search movies by title or director
      </label>
      <input 
        className="searchInput"
        aria-labelledby="input-label"
        id="search-input"
        type="text"
        value={searchInput}
        onChange={handleChange}
        onKeyPress={handleEnter}
        ref={focusRef}
      />
      <label
      id="search-button-label"
      htmlFor="enter-search-button"
      hidden
      >
        Search by title or director
      </label>
      <button 
        className="search-button"
        aria-labelledby="search-button-label"
        id="enter-search-button"
        type="submit"
        tabIndex="-1"
        name="search"
      >
        <svg 
        aria-hidden="true"
        className="search-icon-svg"
        id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="22.04" height="22.04019" viewBox="0 0 22.04 22.04019">
          <path className="cls-3" d="M2.50042,22.04019A2.5,2.5,0,0,1,.73284,17.77261l6.874-6.874A2.49973,2.49973,0,1,1,11.142,14.43374l-6.874,6.874A2.49107,2.49107,0,0,1,2.50042,22.04019Z"/><path className="cls-3" d="M14.68108,14.716a7.3519,7.3519,0,1,1,5.20459-2.15283A7.33693,7.33693,0,0,1,14.68108,14.716Zm0-9.7168A2.35395,2.35395,0,1,0,16.351,5.6896,2.35486,2.35486,0,0,0,14.68108,4.99917Z"/>
        </svg>
      </button>
    </form>

  )

}

export const mapStateToProps = state => ({
  searchInput: state.data.searchText,
  isOpen: state.screen.search_bar_open,
  isMobileMenuOpen: state.screen.mobile_menu_open
});

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setSearchText, toggleSearchBar, toggleMobileMenu }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);