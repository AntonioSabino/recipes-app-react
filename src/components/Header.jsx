import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { hasProfileIcon, hasSearchIcon, name } = props;
  return (
    <header>
      { hasProfileIcon
        && (
          <Link to="/profile">
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </Link>

        )}
      <h1 data-testid="page-title">{ name }</h1>
      { hasSearchIcon
        && (
          <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
        )}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string,
  hasProfileIcon: PropTypes.bool,
  hasSearchIcon: PropTypes.bool,
}.isRequired;

export default Header;
