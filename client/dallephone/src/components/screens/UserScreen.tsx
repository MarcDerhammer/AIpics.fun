import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../database/database';

const UserScreen = () => {
  const navigate = useNavigate();

  return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <span style={{
            cursor: 'pointer',
            fontWeight: 'bold'
          }} onClick={async () => {
            await logout();
            navigate('/');
          }}>Logout</span>
          <p>eventually this will show your imagas... but i am
            falling asleep </p>
        </div>
  );
};

export default UserScreen;
