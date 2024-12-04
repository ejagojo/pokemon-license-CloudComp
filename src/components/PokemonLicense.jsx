import React, { useEffect, useState } from "react";
import "../styles/pokemon-license.css";

const PokemonLicense = ({ uid, onClose }) => {
  const [trainerData, setTrainerData] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);

  // Fetch data from localStorage to display the license
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("trainerData");
      if (savedData) {
        setTrainerData(JSON.parse(savedData));
      } else {
        console.warn("No trainer data found in localStorage.");
      }
    } catch (err) {
      console.error("Error parsing localStorage data:", err);
    }
  }, []);

  // Generate a license image for the license to be stored
  useEffect(() => {
    if (trainerData) {
      import("html-to-image")
        .then((htmlToImage) => {
          const licenseElement = document.getElementById("license-card");
          if (licenseElement) {
            htmlToImage
              .toPng(licenseElement)
              .then((dataUrl) => {
                setLicenseImage(dataUrl); // Set the generated license image as base64
              })
              .catch((err) => {
                console.error("Error generating license image:", err);
              });
          } else {
            console.warn("License element not found.");
          }
        })
        .catch((err) => {
          console.error("Error importing html-to-image library:", err);
        });
    }
  }, [trainerData]);

  // Save the license data to the database when the license image is generated
  useEffect(() => {
    const saveToDatabase = async () => {
      if (licenseImage && trainerData?.licenseID) {
        try {
          const response = await fetch(
            "https://ane5inhq3k.execute-api.us-east-1.amazonaws.com/dev/submit",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                licenseID: trainerData.licenseID, // License ID
                licenseImage, // Base64 of the generated license image
              }),
            }
          );

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(
              `Failed to save license to database. Status: ${response.status}, Message: ${errorMessage}`
            );
          }

          console.log("License successfully saved to database:", await response.json());
        } catch (error) {
          console.error("Error saving license to database:", error.message || error);
        }
      } else if (!licenseImage) {
        console.warn("License image not generated yet.");
      } else {
        console.warn("Trainer data or license ID is missing.");
      }
    };

    if (licenseImage) {
      saveToDatabase(); // Trigger save to database when license image is ready
    }
  }, [licenseImage, trainerData]);

  const handlePrint = () => {
    window.print(); // Opens print dialog
  };

  if (!trainerData) {
    return <p>Loading...</p>;
  }

  const pokemonSprites = trainerData.pokemonTeam.map((pokemon) => ({
    name: pokemon,
    sprite: `https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon?.toLowerCase()}.png`,
    link: `https://pokemondb.net/pokedex/${pokemon?.toLowerCase()}`,
  }));

  return (
    <div className="license-modal">
      <div id="license-card" className="license-horizontal">
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
              src={trainerData.profileImage || "/assets/placeholder.png"} // Fallback image
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
