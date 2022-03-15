import React, { useEffect, useState } from 'react';
import { getSavedEmail } from '../services/functions';
import Footer from './Footer';
import Header from './Header';
import ProfileButtons from './ProfileButtons';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(getSavedEmail());
  }, []);

  return (
    <div>
      <Header hasProfileIcon name="Profile" />
      <div className="profile-container">
        <h4 data-testid="profile-email">{ email }</h4>
        <ProfileButtons />
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
