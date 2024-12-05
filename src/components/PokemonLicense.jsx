import React, { useEffect, useState } from "react";
import "../styles/pokemon-license.css";

const PokemonLicense = ({ uid, onClose }) => {
  const [trainerData, setTrainerData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(""); // For notifications
  const [uploadSuccess, setUploadSuccess] = useState(false); // Determines success or failure style

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

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmitUpload = async () => {
    if (!uploadedFile || !trainerData?.licenseID) {
      console.warn("Uploaded file or trainer data is missing.");
      setUploadMessage("File or trainer data is missing.");
      setUploadSuccess(false);
      return;
    }

    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]); // Get only the base64 part
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    try {
      const base64File = await fileToBase64(uploadedFile);

      const payload = {
        licenseID: trainerData.licenseID,
        pdfData: base64File,
      };

      const response = await fetch(
        "https://ane5inhq3k.execute-api.us-east-1.amazonaws.com/dev/submitData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Failed to save uploaded license. Status: ${response.status}, Message: ${errorMessage}`
        );
      }

      const result = await response.json();
      console.log("Uploaded license successfully saved to database:", result);
      setUploadMessage("License uploaded successfully!");
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error saving uploaded license to database:", error.message || error);
      setUploadMessage("Failed to upload license. Please try again.");
      setUploadSuccess(false);
    }
  };

  const handlePrint = () => {
    window.print();
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
      {uploadMessage && (
        <div
          className={`upload-notification ${uploadSuccess ? "success" : "error"}`}
        >
          {uploadMessage}
        </div>
      )}

      <div id="license-card" className="license-horizontal">
        {/* Header */}
        <div className="license-header">
          <span className="trainer-name">{trainerData.name}</span>
          <span className="trainer-id">ID: {trainerData.licenseID}</span>
        </div>

        {/* Body */}
        <div className="license-body">
          <div className="trainer-image">
            <img
              src={trainerData.profileImage || "/assets/placeholder.png"}
              alt={`${trainerData.name}'s Profile`}
            />
          </div>
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
                      e.target.src = "/assets/placeholder.png";
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

      {/* Upload Section */}
      <div className="upload-section">
        <h3>Upload Your License To The Database</h3>
        <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileUpload} />
        <button onClick={handleSubmitUpload} disabled={!uploadedFile}>
          Submit License
        </button>
      </div>
    </div>
  );
};

export default PokemonLicense;
