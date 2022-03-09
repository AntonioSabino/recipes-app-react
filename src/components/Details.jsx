import React from 'react';

const Details = () => (
  <div>
    <img src="" alt="" data-testid="recipe-photo" />
    <h4 data-testid="recipe-title">Receita</h4>
    <button type="button" data-testid="share-btn">
      Compartilhar
    </button>
    <button type="button" data-testid="favorite-btn">
      Favoritar
    </button>
    <p data-testid="recipe-category">Categoria</p>
    <ul>
      <li
        data-testid="0-ingredient-name-and-measure"
      >
        Ingredientes
      </li>
    </ul>
    <p data-testid="instructions">Instruções</p>
    <source data-testid="video" src="" type="" />
    <ul>
      <li
        data-testid="0-recomendation-card"
      >
        Receitas Recomendadas
      </li>
    </ul>
    <button type="button" data-testid="start-recipe-btn">
      Iniciar Receita
    </button>
  </div>
);

export default Details;
