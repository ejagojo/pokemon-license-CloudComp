import React, { useState } from "react";
import "../styles/inputform.css";
import PokemonLicense from "./PokemonLicense";

const InputForm = () => {
  // State for personal information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [trainerType, setTrainerType] = useState("Elite Trainer");
  const [region, setRegion] = useState("Kanto");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // State for Pokémon team
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [pokemon3, setPokemon3] = useState("");

  // State for additional information
  const [badgeCount, setBadgeCount] = useState(0);
  const [signatureMove, setSignatureMove] = useState("");

  // State for showing the license
  const [showLicense, setShowLicense] = useState(false);

  // Handle image preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    // Prevent page reload
    e.preventDefault();
    const licenseData = {
      name,
      email,
      birthday,
      trainerType,
      region,
      profileImage,
      pokemonTeam: [pokemon1, pokemon2, pokemon3],
      badgeCount,
      signatureMove,
    };
    console.log("License Data:", licenseData);
    // Show the license modal
    setShowLicense(true);
  };

  return (
    <div className="input-form-container">
      <h3>Pokémon Trainer Form</h3>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <h4>Personal Information</h4>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <select
          value={trainerType}
          onChange={(e) => setTrainerType(e.target.value)}
        >
          <option value="Elite Trainer">Elite Trainer</option>
          <option value="Gym Leader">Gym Leader</option>
          <option value="Breeder">Breeder</option>
          <option value="Ranger">Ranger</option>
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="Kanto">Kanto</option>
          <option value="Johto">Johto</option>
          <option value="Hoenn">Hoenn</option>
          <option value="Sinnoh">Sinnoh</option>
          <option value="Unova">Unova</option>
          <option value="Kalos">Kalos</option>
          <option value="Alola">Alola</option>
          <option value="Galar">Galar</option>
          <option value="Paldea">Paldea</option>
        </select>
        <input type="file" onChange={handleImageUpload} accept="image/*" />
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Profile Preview" />
          </div>
        )}

        {/* Pokémon Team */}
        <h4>Pokémon Team</h4>
        <input
          type="text"
          placeholder="Enter Pokémon 1"
          value={pokemon1}
          onChange={(e) => setPokemon1(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Pokémon 2"
          value={pokemon2}
          onChange={(e) => setPokemon2(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Pokémon 3"
          value={pokemon3}
          onChange={(e) => setPokemon3(e.target.value)}
          required
        />

        {/* Additional Information */}
        <h4>Additional Information</h4>
        <input
          type="number"
          placeholder="Enter Badge Count"
          value={badgeCount}
          onChange={(e) => setBadgeCount(e.target.value)}
          min="0"
          required
        />
        <input
          type="text"
          placeholder="Enter your Signature Move"
          value={signatureMove}
          onChange={(e) => setSignatureMove(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button type="submit">Generate License</button>
      </form>

      {/* License Modal */}
      {showLicense && (
        <div className="license-modal">
          <PokemonLicense
            uid="dummy-uid"
            onClose={() => setShowLicense(false)}
          />
          <button onClick={() => setShowLicense(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default InputForm;
