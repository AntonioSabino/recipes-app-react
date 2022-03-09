import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Explore() {
  return (
    <div>
      <Header hasProfileIcon name="Explore" />
      <section className="explore-container">
        <Link data-testid="explore-foods" to="/explore/foods">
          <h5>Explore Foods</h5>
        </Link>
        <Link data-testid="explore-drinks" to="/explore/drinks">
          <h5>Explore Drinks</h5>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Explore;
