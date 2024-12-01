// File: /src/components/PokemonLicense.jsx

import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { fetchTrainerData } from "../services/dataService";
import "../styles/pokemon-license.css";

const PokemonLicense = ({ uid, onClose }) => {
  const [trainerData, setTrainerData] = useState(null);
  const [pokemonSprites, setPokemonSprites] = useState([]);
  const licenseRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTrainerData(uid);
      setTrainerData(data);

      // After setting trainerData, fetch Pokémon IDs and build sprites
      const pokemonNames = [data.pokemon1, data.pokemon2, data.pokemon3];

      const fetchPokemonSprites = async () => {
        const sprites = await Promise.all(
          pokemonNames.map(async (name) => {
            try {
              const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
              );
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const pokemonData = await response.json();
              const id = pokemonData.id.toString().padStart(3, "0");
              const spriteUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
              return {
                name: name,
                sprite: spriteUrl,
                link: `https://pokemondb.net/pokedex/${name.toLowerCase()}`,
              };
            } catch (error) {
              console.error(`Error fetching data for ${name}:`, error);
              return {
                name: name,
                sprite: "/assets/placeholder.png", // Fallback image
                link: `https://pokemondb.net/pokedex/${name.toLowerCase()}`,
              };
            }
          })
        );
        setPokemonSprites(sprites);
      };

      fetchPokemonSprites();
    };
    fetchData();
  }, [uid]);

  const handleDownload = async () => {
    if (licenseRef.current) {
      try {
        setIsDownloading(true);
        const canvas = await html2canvas(licenseRef.current, {
          useCORS: true, // Enable CORS
          scale: 2, // High-resolution output
        });
        canvas.toBlob((blob) => {
          saveAs(blob, `${trainerData.name}_Pokemon_License.png`);
        });
      } catch (error) {
        console.error("Error generating the license image:", error);
        alert("An error occurred while generating the license.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  if (!trainerData || pokemonSprites.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="license-modal">
      <div className="license-horizontal" ref={licenseRef}>
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

        {/* Pokémon Sprites */}
        <div className="pokemon-sprites">
          {pokemonSprites.map((pokemon, index) => (
            <div key={index} className="pokemon-container">
              <a
                href={pokemon.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="pokemon-sprite"
                  onError={(e) => {
                    e.target.src = "/assets/placeholder.png"; // Fallback image
                  }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="license-buttons">
        <button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? "Downloading..." : "Download License"}
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PokemonLicense;
