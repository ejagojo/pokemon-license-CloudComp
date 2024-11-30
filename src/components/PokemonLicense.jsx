// PokemonLicense.jsx
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import "../styles/pokemon-license.css";

const PokemonLicense = ({ testData }) => {
  const licenseRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (licenseRef.current) {
      try {
        setIsDownloading(true);
        const canvas = await html2canvas(licenseRef.current, {
          useCORS: true,
          scale: 2,
          scrollY: -window.scrollY,
        });
        canvas.toBlob((blob) => {
          saveAs(blob, `pokemon_license_${testData.name}.png`);
        });
      } catch (error) {
        console.error("Error generating image:", error);
        alert("An error occurred while generating the image.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="license-container" ref={licenseRef}>
      <div className="license-header">
        <h2>Pokémon Trainer License</h2>
      </div>
      <div className="license-content">
        <p><strong>Name:</strong> {testData.name}</p>
        <p><strong>Email:</strong> {testData.email}</p>
        <p><strong>Favorite Pokémon:</strong> {testData.favoritePokemon}</p>
        <p><strong>Trainer Type:</strong> {testData.trainerType}</p>
        <p><strong>Region:</strong> {testData.region}</p>
        <p><strong>Birthday:</strong> {testData.birthday}</p>
        <p><strong>License ID:</strong> {testData.licenseID}</p>
      </div>
      <button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? "Downloading..." : "Download License"}
      </button>
    </div>
  );
};

export default PokemonLicense;
