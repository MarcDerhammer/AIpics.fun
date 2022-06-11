import React from 'react';
import NavSection from '../molecules/NavSection';

const Header = () => {
    return (
        <nav className="nav">
            <div>
                <h2 className="logo">dalle.fun</h2>
            </div>
            <NavSection />
        </nav>
    );
};

export default Header;