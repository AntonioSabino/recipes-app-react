import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { fetchMeals, fetchDrinks } from '../services/functions';
import { MAX_RECOMMENDS } from '../services/consts';

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [recommendedDrinks, setRecommendedDrinks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [foodCategory, setFoodCategory] = useState('All');
  const [drinkCategory, setDrinkCategory] = useState('All');
  const [doneFilter, setDoneFilter] = useState('All');

  const context = {
    data,
    setData,
    inputValue,
    setInputValue,
    searchType,
    setSearchType,
    dataMeals,
    dataDrinks,
    recommendedMeals,
    recommendedDrinks,
    setDataDrinks,
    setDataMeals,
    isLoading,
    foodCategory,
    setFoodCategory,
    drinkCategory,
    setDrinkCategory,
    doneFilter,
    setDoneFilter,
  };

  useEffect(() => {
    fetchMeals('', 'Name').then((meals) => {
      setDataMeals(meals);
      setRecommendedMeals(meals.slice(0, MAX_RECOMMENDS));
    });
    fetchDrinks('', 'Name').then((drinks) => {
      setDataDrinks(drinks);
      setRecommendedDrinks(drinks.slice(0, MAX_RECOMMENDS));
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
