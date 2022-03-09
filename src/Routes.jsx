import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Drinks from './components/Drinks';
import Explore from './components/Explore';
import Foods from './components/Foods';
import Login from './components/Login';
import ExploreFoods from './components/ExploreFoods';
import ExploreDrinks from './components/ExploreDrinks';
import Ingredients from './components/Ingredients';
import DrinksIngredients from './components/DrinksIngredients';
import Nationalities from './components/Nationalities';
import Profile from './components/Profile';
import Done from './components/Done';
import Favorite from './components/Favorite';
import DrinkDetails from './components/DrinkDetails';
import FoodDetails from './components/FoodDetails';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ Foods } />
    <Route exact path="/drinks" component={ Drinks } />
    <Route exact path="/explore" component={ Explore } />
    <Route exact path="/explore/foods" component={ ExploreFoods } />
    <Route exact path="/explore/drinks" component={ ExploreDrinks } />
    <Route exact path="/explore/foods/ingredients" component={ Ingredients } />
    <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
    <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
    <Route exact path="/profile" component={ Profile } />
    <Route exact path="/done-recipes" component={ Done } />
    <Route exact path="/favorite-recipes" component={ Favorite } />
    <Route exact path="/foods/:id" component={ FoodDetails } />
    <Route exact path="/drinks/:id" component={ DrinkDetails } />
    {/*
    <Route exact path="/foods/{id-da-receita}/in-progress" component={<Home />} />
    <Route exact path="/drinks/{id-da-receita}/in-progress" component={<Home />} />
    */}
  </Switch>
);

export default Routes;
