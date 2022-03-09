import React from 'react';

function ProfileButtons() {
  return (
    <section className="profileBtns">
      <div data-testid="profile-done-btn">Done Recipes</div>
      <div data-testid="profile-favorite-btn">Favorite Recipes</div>
      <div data-testid="profile-logout-btn">Logout</div>
    </section>
  );
}

export default ProfileButtons;
