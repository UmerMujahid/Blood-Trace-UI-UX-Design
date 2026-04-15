import React from 'react';
import logo from '../assets/Images/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <img src={logo} alt="Logo" />
            <Link to="/">Home</Link>
        </nav>
    );
};

export default Navbar;