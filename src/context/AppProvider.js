import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('');

  const context = {
    data,
    setData,
    inputValue,
    setInputValue,
    searchType,
    setSearchType,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default AppProvider;
