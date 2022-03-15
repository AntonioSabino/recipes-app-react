import React, { useContext, useEffect, useState } from 'react';
import { getNacionalities, filterByNacionality } from '../services/functions';
import AppContext from '../context/AppContext';

function SelectNacionality() {
  const { setDataMeals } = useContext(AppContext);
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    getNacionalities().then((data) => setNationalities(data));
  }, []);

  const handleNacionality = (value) => {
    filterByNacionality(value).then(
      (data) => setDataMeals(data),
    );
  };

  return (
    <select
      data-testid="explore-by-nationality-dropdown"
      onClick={ (e) => handleNacionality(e.target.value) }
      className="nations-select"
    >
      <option
        value="All"
        data-testid="All-option"
      >
        All
      </option>
      {
        nationalities.map(({ strArea }) => (
          <option data-testid={ `${strArea}-option` } key={ strArea }>{strArea}</option>
        ))
      }
    </select>
  );
}

export default SelectNacionality;
