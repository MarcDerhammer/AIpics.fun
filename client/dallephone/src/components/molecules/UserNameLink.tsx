import React from 'react';
import NavLink from '../atoms/NavLink';

type UserNameProps = {
    user: any
}

const UserName = ({ user }: UserNameProps) => {
  return (
    <NavLink to={'/user/'}
      text={user.user_metadata?.name.toLowerCase()} />
  );
};

export default UserName;
