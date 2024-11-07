import React from 'react';
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import projectTitle from '../assets/project-title.png';
import homeButton from '../assets/buttons/home-button.png';
import aboutButton from '../assets/buttons/about-button.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <nav className="navbar">
            <img src={projectTitle} alt="Project Title" className="navbar-title" />
            <div className="nav-links">
                <img 
                    src={homeButton} 
                    alt="Home" 
                    className="nav-button"
                    onClick={() => handleNavigation('/home')} 
                />
                <img 
                    src={aboutButton} 
                    alt="About" 
                    className="nav-button"
                    onClick={() => handleNavigation('/about')}  
                />
            </div>
        </nav>
    );
}

export default Navbar;
