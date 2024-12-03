import React, { useEffect, useState } from "react";
import "../styles/pokemon-license.css";

const PokemonLicense = ({ uid, onClose }) => {
  const [trainerData, setTrainerData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const savedData = localStorage.getItem("trainerData");
      if (savedData) {
        setTrainerData(JSON.parse(savedData));
      }
    };
    fetchData();
  }, []);


  const handlePrint = () => {
    window.print(); // Opens print dialog
  };

  if (!trainerData) {
    return <p>Loading...</p>;
  }

  const pokemonSprites = [
    {
      name: trainerData.pokemon1,
      sprite: `https://img.pokemondb.net/sprites/scarlet-violet/normal/${trainerData.pokemon1.toLowerCase()}.png`,
      link: `https://pokemondb.net/pokedex/${trainerData.pokemon1.toLowerCase()}`,
    },
    {
      name: trainerData.pokemon2,
      sprite: `https://img.pokemondb.net/sprites/scarlet-violet/normal/${trainerData.pokemon2.toLowerCase()}.png`,
      link: `https://pokemondb.net/pokedex/${trainerData.pokemon2.toLowerCase()}`,
    },
    {
      name: trainerData.pokemon3,
      sprite: `https://img.pokemondb.net/sprites/scarlet-violet/normal/${trainerData.pokemon3.toLowerCase()}.png`,
      link: `https://pokemondb.net/pokedex/${trainerData.pokemon3.toLowerCase()}`,
    },
  ];

  return (
    <div className="license-modal">
      <div className="license-horizontal">
        {/* Header */}
        <div className="license-header">
          <span className="trainer-name">{trainerData.name}</span>
          <span className="trainer-id">ID: {trainerData.licenseID}</span>
        </div>

        {/* Body */}
        <div className="license-body">
          {/* Trainer Image */}
          <div className="trainer-image">
            <img
              src={trainerData.profileImage}
              alt={`${trainerData.name}'s Profile`}
            />
          </div>

          {/* Trainer Info */}
          <div className="trainer-info">
            <p>
              <strong>Email:</strong> {trainerData.email}
            </p>
            <p>
              <strong>Region:</strong> {trainerData.region}
            </p>
            <p>
              <strong>Trainer Type:</strong> {trainerData.trainerType}
            </p>
            <p>
              <strong>Signature Move:</strong> {trainerData.signatureMove}
            </p>
            <p>
              <strong>Badges:</strong> {trainerData.badgeCount}
            </p>
          </div>
        </div>

        {/* Pokémon Sprites Section */}
        <div className="pokemon-sprites-section">
          {/* <h3 className="pokemon-title">Top 3 Pokémon</h3> */}
          <div className="pokemon-sprites">
            {pokemonSprites.map((pokemon, index) => (
              <div key={index} className="pokemon-container">
                <a href={pokemon.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="pokemon-sprite"
                    onError={(e) => {
                      e.target.src = "/assets/placeholder.png"; // Fallback image
                    }}
                  />
                </a>
                <p className="pokemon-name">{pokemon.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="license-buttons">
        <button onClick={handlePrint}>Print License</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PokemonLicense;
