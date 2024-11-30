// InputForm.jsx
import React, { useState } from "react";
import "../styles/inputform.css";
import PokemonLicense from "./PokemonLicense";

const dummyData = {
  name: "Ash Ketchum",
  email: "ash@pokemon.com",
  favoritePokemon: "Pikachu",
  trainerType: "Elite Trainer",
  region: "Kanto",
  birthday: "10/01/1997",
  licenseID: "PKM-123-XYZ",
};

const InputForm = () => {
  const [showLicense, setShowLicense] = useState(false);

  return (
    <div className="input-form-container">
      <h3>Pokémon Trainer Form</h3>
      <button onClick={() => setShowLicense(true)}>Generate License</button>
      {showLicense && (
        <div className="license-modal">
          <PokemonLicense testData={dummyData} />
          <button onClick={() => setShowLicense(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default InputForm;
