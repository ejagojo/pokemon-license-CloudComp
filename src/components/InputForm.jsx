import React, { useState } from "react";
import "../styles/inputform.css";
import PokemonLicense from "./PokemonLicense";

const InputForm = () => {
  const [showLicense, setShowLicense] = useState(false);

  return (
    <div className="input-form-container">
      <h3>Pokémon Trainer Form</h3>
      <button onClick={() => setShowLicense(true)}>Generate License</button>
      {showLicense && (
        <div className="license-modal">
          <PokemonLicense uid="dummy-uid" onClose={() => setShowLicense(false)} />
          <button onClick={() => setShowLicense(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default InputForm;
