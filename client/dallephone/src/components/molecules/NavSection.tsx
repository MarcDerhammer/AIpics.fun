import React from 'react';
import NavLink from '../atoms/NavLink';
import UserName from './UserNameLink';
import { userContext } from '../../userContext';

const NavSection = () => {
  return (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
            <NavLink to="/" text="generate" />|
            <NavLink to="/dallephone" text="dallephone" />|
            <userContext.Consumer>
                {user => user && user.id
                  ? <UserName user={user} />
                  : <NavLink to="/login" text="login" />}
                </userContext.Consumer>
        </div>
  );
};

export default NavSection;
