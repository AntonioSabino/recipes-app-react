import React from 'react';
import { useHistory, Link } from 'react-router-dom';

function ProfileButtons() {
  const { push } = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    push('/');
  };

  return (
    <section className="profileBtns">
      <Link to="/done-recipes" data-testid="profile-done-btn">Done Recipes</Link>
      <Link to="/favorite-recipes" data-testid="profile-favorite-btn">
        Favorite Recipes
      </Link>
      <button
        type="button"
        onClick={ handleLogout }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
    </section>
  );
}

export default ProfileButtons;
