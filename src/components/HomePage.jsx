import React from "react";
import Intro from "./Intro";
import InputForm from "./InputForm";
import "../styles/home.css";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Intro Section */}
      <Intro />

      {/* Input Form Section */}
      <InputForm />
    </div>
  );
};

export default HomePage;
