import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    { /*
    <Route exact path="/foods" component={<Home />} />
    <Route exact path="/drinks" component={<Home />} />
    <Route exact path="/foods/{id-da-receita}" component={<Home />} />
    <Route exact path="/drinks/{id-da-receita}" component={<Home />} />
    <Route exact path="/foods/{id-da-receita}/in-progress" component={<Home />} />
    <Route exact path="/drinks/{id-da-receita}/in-progress" component={<Home />} />
    <Route exact path="/explore" component={<Home />} />
    <Route exact path="/explore/foods" component={<Home />} />
    <Route exact path="/explore/drinks" component={<Home />} />
    <Route exact path="/explore/foods/ingredients" component={<Home />} />
    <Route exact path="/explore/drinks/ingredients" component={<Home />} />
    <Route exact path="/explore/foods/nationalities" component={<Home />} />
    <Route exact path="/profile" component={<Home />} />
    <Route exact path="/done-recipes" component={<Home />} />
    <Route exact path="/favorite-recipes" component={<Home />} />
    */}
  </Switch>
);

export default Routes;
