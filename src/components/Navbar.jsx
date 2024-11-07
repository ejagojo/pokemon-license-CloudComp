import React from 'react';
import '../styles/navbar.css';
import projectTitle from '../assets/project-title.png';
import homeButton from '../assets/buttons/home-button.png';
import aboutButton from '../assets/buttons/about-button.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src={projectTitle} alt="Project Title" className="navbar-title" />
            <div className="nav-links">
                <img src={homeButton} alt="Home" className="nav-button" />
                <img src={aboutButton} alt="About" className="nav-button" />
            </div>
        </nav>
    );
}

export default Navbar;
