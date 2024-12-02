import React from "react";
import '../styles/about.css';

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1>About This Project</h1>
            <p>
                Welcome to our Pokémon License Generator! This website leverages the Pokémon API 
                to create a fully customizable Pokémon license tailored to your preferences. 
                Users can fill out a form with the following details to design their unique license:
            </p>
            <ul>
                <li><strong>Name:</strong> Your name as it will appear on the license.</li>
                <li><strong>Age:</strong> Your age to personalize the experience.</li>
                <li><strong>Region:</strong> Choose your region from a dropdown menu using data fetched directly from the Pokémon API.</li>
                <li><strong>Pokémon:</strong> Select your favorite Pokémon from a list powered by the Pokémon API.</li>
                <li><strong>Avatar:</strong> Optionally upload a photo or choose from default avatars to add a personal touch.</li>
            </ul>
            <p>
                The final product is a visually appealing Pokémon license, bringing your Trainer identity to life.
                Explore the world of Pokémon like never before!
            </p>
        </div>
    );
}

export default AboutPage;
