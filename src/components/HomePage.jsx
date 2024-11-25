import React from "react";
import '../styles/home.css';
import InputForm from "./InputForm";
import Intro from "./Intro";
import GenerateUID from "./GenerateUID";

const HomePage = () => {
    return (
        <div className="home-container">
                <Intro />
                <InputForm />
                <GenerateUID />
        </div>
    );
}

export default HomePage;
