import React from 'react';
import ExploreButtons from './ExploreButtons';
import Footer from './Footer';
import Header from './Header';

function ExploreFoods() {
  return (
    <div>
      <Header hasProfileIcon name="Explore Foods" />
      <ExploreButtons />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
