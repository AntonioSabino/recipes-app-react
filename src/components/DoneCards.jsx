import React, { useState } from 'react';

function DoneCards() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  
  return (
    <section>
      {doneRecipes.map((recipe, index) => (
        <div key={ recipe }>
          <img data-testid={ index } />
        </div>
      ))}
    </section>
  );
}

export default DoneCards;
