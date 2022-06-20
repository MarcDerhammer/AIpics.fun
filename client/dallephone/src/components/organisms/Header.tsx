import React from 'react';
import NavSection from '../molecules/NavSection';

const Header = () => {
  return (
        <nav className="nav">
            <div>
                <h2 className="logo">ai&nbsp;pics</h2>
            </div>
            <NavSection />
        </nav>
  );
};

export default Header;
