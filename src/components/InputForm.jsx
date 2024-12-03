import React, { useState } from "react";
import "../styles/inputform.css";
import PokemonLicense from "./PokemonLicense";

const InputForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [trainerType, setTrainerType] = useState("Elite Trainer");
  const [region, setRegion] = useState("Kanto");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [pokemon3, setPokemon3] = useState("");
  const [badgeCount, setBadgeCount] = useState(0);
  const [signatureMove, setSignatureMove] = useState("");
  const [showLicense, setShowLicense] = useState(false);

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
    setShowLicense(true);
  };

  return (
    <div className="input-form-container">
      <div className="text-highlight">
      <h3>Pokémon Trainer Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Birthday:
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </label>
          <label>
            Trainer Type:
            <select
              value={trainerType}
              onChange={(e) => setTrainerType(e.target.value)}
            >
              <option value="Elite Trainer">Elite Trainer</option>
              <option value="Gym Leader">Gym Leader</option>
              <option value="Breeder">Breeder</option>
              <option value="Researcher">Researcher</option>
            </select>
          </label>
          <label>
            Region:
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="Kanto">Kanto</option>
              <option value="Johto">Johto</option>
              <option value="Hoenn">Hoenn</option>
              <option value="Sinnoh">Sinnoh</option>
              <option value="Unova">Unova</option>
              <option value="Kalos">Kalos</option>
            </select>
          </label>
          <label>
            Profile Image:
            <input type="file" onChange={handleImageUpload} />
          </label>
        </div>
        {previewImage && (
          <img
            src={previewImage}
            alt="Profile Preview"
            className="profile-preview"
          />
        )}
        <h4>Pokémon Team</h4>
        <div className="form-grid">
          <label>
            Pokémon 1:
            <input
              type="text"
              value={pokemon1}
              onChange={(e) => setPokemon1(e.target.value)}
            />
          </label>
          <label>
            Pokémon 2:
            <input
              type="text"
              value={pokemon2}
              onChange={(e) => setPokemon2(e.target.value)}
            />
          </label>
          <label>
            Pokémon 3:
            <input
              type="text"
              value={pokemon3}
              onChange={(e) => setPokemon3(e.target.value)}
            />
          </label>
        </div>
        <label>
          Badge Count:
          <input
            type="number"
            value={badgeCount}
            onChange={(e) => setBadgeCount(e.target.value)}
            min="0"
            max="10"
          />
        </label>
        <label>
          Signature Move:
          <input
            type="text"
            value={signatureMove}
            onChange={(e) => setSignatureMove(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      </div>
      {showLicense && (
        <PokemonLicense uid="dummy-uid" onClose={() => setShowLicense(false)} />
      )}
    </div>
  );
};

export default InputForm;