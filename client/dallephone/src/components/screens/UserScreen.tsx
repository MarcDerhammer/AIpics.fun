import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  logout, user, getProfileInfo
} from '../../database/database';
import ScrollingPhotos from '../organisms/ScrollingPhotos';
import UserInfo from '../organisms/UserInfo';
import profilePic from '../../icons/profile-pic.svg';

const UserScreen = () => {
  const [displayName, setDisplayName] = React.useState('anonymous');
  const [image, setImage] = React.useState('');

  useEffect(() => {
    (async () => {
      const profile = await getProfileInfo(user()?.id || '');
      if (!profile) {
        return;
      }
      setDisplayName(profile.name);
      setImage(profile.image);
    })();
  }, []);

  const navigate = useNavigate();
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px'
    }}>
      <span style={{
        cursor: 'pointer',
        fontWeight: 'bold'
      }} onClick={async () => {
        await logout();
        navigate('/');
      }}>Logout</span>
      <UserInfo image={image} username={displayName} />
      <span>select a profile picture by clicking the&nbsp;
        <img src={profilePic} /> icon on any of your images below</span>
      <h2>your photos:</h2>
      <ScrollingPhotos onProfilePicSelected={setImage}
        user={user()?.id} publicOnly={false} />
    </div>
  );
};

export default UserScreen;
