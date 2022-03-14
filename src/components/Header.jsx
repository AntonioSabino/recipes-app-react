import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { hasProfileIcon, hasSearchIcon, name } = props;
  const [showInput, setShowInput] = useState(false);

  const handleInput = () => {
    setShowInput(!showInput);
  };
  return (
    <>
      <header className="header">
        { hasProfileIcon
          && (
            <Link to="/profile">
              <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
            </Link>

          )}
        <h1 data-testid="page-title">{ name }</h1>
        { hasSearchIcon
          && (
            <button type="button" onClick={ handleInput }>
              <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
            </button>
          )}
      </header>
      {showInput
        && (
          <SearchBar />
        )}
    </>
  );
}

Header.propTypes = {
  name: PropTypes.string,
  hasProfileIcon: PropTypes.bool,
  hasSearchIcon: PropTypes.bool,
}.isRequired;

export default Header;
