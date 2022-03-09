import React from 'react';
import Footer from './Footer';
import Header from './Header';
import ProfileButtons from './ProfileButtons';

function Profile() {
  return (
    <div>
      <Header hasProfileIcon name="Profile" />
      <h4 data-testid="profile-email">Email</h4>
      <ProfileButtons />
      <Footer />
    </div>
  );
}

export default Profile;
