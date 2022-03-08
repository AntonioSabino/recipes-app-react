import React from 'react';
import PropTypes from 'prop-types';

function Categories({ categories }) {
  return (
    <section>
      { categories.map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      )) }
    </section>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    strCategory: PropTypes.string,
  })),
}.isRequired;

export default Categories;
