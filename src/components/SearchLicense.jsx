import React, { useState } from "react";
import "../styles/searchlicense.css";

const SearchLicense = () => {
  const [licenseID, setLicenseID] = useState("");
  const [licenseData, setLicenseData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError(""); // Clear previous errors
    setLicenseData(null); // Clear previous results

    if (!licenseID.trim()) {
      setError("Please enter a License ID.");
      return;
    }

    try {
      // Simulate API call using your Lambda function
      const response = await fetch("YOUR_LAMBDA_ENDPOINT_HERE", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseID }),
      });

      if (response.ok) {
        const data = await response.json();
        setLicenseData(data); // Set retrieved license data
      } else if (response.status === 404) {
        setError("License not found. Please check your ID and try again.");
      } else {
        setError("An error occurred while retrieving the license.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="search-license-container">
      <h2>Retrieve Your License</h2>
      <div className="search-input-group">
        <input
          type="text"
          className="search-input"
          placeholder="Enter License ID"
          value={licenseID}
          onChange={(e) => setLicenseID(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {licenseData && (
        <div className="license-details">
          <h3>License Details</h3>
          <p>
            <strong>Name:</strong> {licenseData.name}
          </p>
          <p>
            <strong>Email:</strong> {licenseData.email}
          </p>
          <p>
            <strong>Trainer Type:</strong> {licenseData.trainerType}
          </p>
          <p>
            <strong>Region:</strong> {licenseData.region}
          </p>
          <p>
            <strong>Pokemon Team:</strong> {licenseData.pokemonTeam.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchLicense;
