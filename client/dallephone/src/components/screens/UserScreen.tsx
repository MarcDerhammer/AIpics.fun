import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, user } from '../../database/database';
import ScrollingPhotos from '../organisms/ScrollingPhotos';

const UserScreen = () => {
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
      <h2>your photos:</h2>
      <ScrollingPhotos user={user()?.id} publicOnly={false} />
    </div>
  );
};

export default UserScreen;
