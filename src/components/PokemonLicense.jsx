import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { fetchTrainerData } from "../services/dataService";
import "../styles/pokemon-license.css";

const PokemonLicense = ({ uid, onClose }) => {
  const [trainerData, setTrainerData] = useState(null);
  const licenseRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTrainerData(uid);
      setTrainerData(data);
    };
    fetchData();
  }, [uid]);

  const handleDownload = async () => {
    if (licenseRef.current) {
      try {
        setIsDownloading(true);
        const canvas = await html2canvas(licenseRef.current, {
          useCORS: true,
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

  if (!trainerData) {
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
              <strong>Favorite Pokémon:</strong> {trainerData.favoritePokemon}
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
