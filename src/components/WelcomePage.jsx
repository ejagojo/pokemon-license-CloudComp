import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/welcome.css';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        console.log("Get Started Button was clicked");
        navigate('/home'); // Redirects to /home on button click
    };

    return (
        <div className="welcome-main">
            <div className="welcome-comtent">
                <img src={require('../assets/Welcome-title.png')} alt="Welcome Title" className="welcome-title" />
                <button onClick={handleGetStarted} className="get-started-button">Get Started ➔</button>
            </div>
        </div>
    );
};

export default WelcomePage;
