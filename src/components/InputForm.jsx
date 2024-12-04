import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import react-select
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
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [pokemon3, setPokemon3] = useState(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [signatureMove, setSignatureMove] = useState("");
  const [showLicense, setShowLicense] = useState(false);
  const [pokemonOptions, setPokemonOptions] = useState([]);

  // Fetch Pokémon data from the API
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();

        const options = data.results.map((pokemon) => ({
          value: pokemon.name,
          label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        }));

        setPokemonOptions(options);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchPokemon();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique license ID
    const licenseID = `PKM-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    // Prepare the license data to save locally
    const licenseData = {
      licenseID,
      name,
      email,
      birthday,
      trainerType,
      region,
      profileImage: profileImage ? previewImage : null,
      pokemonTeam: [pokemon1?.value, pokemon2?.value, pokemon3?.value],
      badgeCount,
      signatureMove,
    };

    // Save license data to localStorage for display purposes
    localStorage.setItem("trainerData", JSON.stringify(licenseData));
    console.log("License Data Saved to LocalStorage:", licenseData);

    // Set license as ready for generation
    setShowLicense(true); // This will trigger the PokemonLicense component
  };


  // Custom styles for the react-select component
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Dropdown background
      borderColor: "#3b4cca", // Border color
      borderWidth: "2px",
      borderRadius: "8px",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
      ":hover": {
        borderColor: "#ffde00", // Border color on hover
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 1)", // Dropdown menu background
    }),
    singleValue: (base) => ({
      ...base,
      color: "#3b4cca", // Text color for the selected option
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#ffde00" : "rgba(255, 255, 255, 1)", // Highlight on hover
      color: state.isFocused ? "#3b4cca" : "#000", // Text color
    }),
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
              <Select
                options={pokemonOptions}
                value={pokemon1}
                onChange={setPokemon1}
                placeholder="Select Pokémon"
                isSearchable
                styles={customStyles}
              />
            </label>
            <label>
              Pokémon 2:
              <Select
                options={pokemonOptions}
                value={pokemon2}
                onChange={setPokemon2}
                placeholder="Select Pokémon"
                isSearchable
                styles={customStyles}
              />
            </label>
            <label>
              Pokémon 3:
              <Select
                options={pokemonOptions}
                value={pokemon3}
                onChange={setPokemon3}
                placeholder="Select Pokémon"
                isSearchable
                styles={customStyles}
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
        <PokemonLicense onClose={() => setShowLicense(false)} />
      )}
    </div>
  );
};

export default InputForm;
