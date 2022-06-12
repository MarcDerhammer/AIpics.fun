import React from 'react';
import './NavLinkStyles.css';

import { useNavigate } from 'react-router-dom';

type NavLinkProps = {
    to: string;
    text: string;
}

const NavLink = ({ text, to }: NavLinkProps) => {
  const navigate = useNavigate();
  return (
        <span className="navButton" onClick={() => {
          navigate(to);
        }}>{text}</span>
  );
};

export default NavLink;
