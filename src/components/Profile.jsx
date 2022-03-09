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
      <h4 data-testid="profile-email">{ email }</h4>
      <ProfileButtons />
      <Footer />
    </div>
  );
}

export default Profile;
