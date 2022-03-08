import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { fetchMeals, fetchDrinks } from '../services/functions';

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const context = {
    data,
    setData,
    inputValue,
    setInputValue,
    searchType,
    setSearchType,
    dataMeals,
    dataDrinks,
    setDataDrinks,
    setDataMeals,
    isLoading,
  };

  useEffect(() => {
    fetchMeals('', 'Name').then((meals) => setDataMeals(meals));
    fetchDrinks('', 'Name').then((drinks) => {
      setDataDrinks(drinks);
      setIsLoading(false);
    });
  }, []);

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
