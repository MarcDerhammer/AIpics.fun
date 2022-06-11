import React from 'react';
import NavLink from '../atoms/NavLink';

const NavSection = () => {
    return (
        <div>
            <NavLink to="/" text="generate" />
            <NavLink to="/dallephone" text="dallephone" />
            <NavLink to="/login" text="sign in" />
        </div>
    );
};

export default NavSection;
