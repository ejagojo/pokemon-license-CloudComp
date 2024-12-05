import React, { useState } from "react";
import homeButton from "../assets/buttons/home-button.png";
import aboutButton from "../assets/buttons/about-button.png";
import projectTitle from "../assets/project-title.png";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [licenseID, setLicenseID] = useState("");
  const [licensePdfUrl, setLicensePdfUrl] = useState(null); // Stores the retrieved license PDF URL
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch license data by licenseID
  const handleSearch = async () => {
    console.log("Initiating search for License ID:", licenseID); // Debug statement
    setError(null);
    setLicensePdfUrl(null); // Clear previous license data

    if (!licenseID.trim()) {
      console.warn("License ID input is empty."); // Debug statement
      setError("Please enter a License ID.");
      return;
    }

    try {
      console.log("Sending request to API with License ID:", licenseID); // Debug statement
      const response = await fetch(
        `https://ane5inhq3k.execute-api.us-east-1.amazonaws.com/dev/fetch-license?licenseID=${encodeURIComponent(
          licenseID
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API response received successfully:", data); // Debug statement
        if (data.licenseURL) {
          setLicensePdfUrl(data.licenseURL); // Use the returned S3 URL for the license PDF
          console.log("License PDF URL set successfully:", data.licenseURL); // Debug statement
        } else {
          console.error("No licenseURL returned from API:", data); // Debug statement
          setError("License data received but URL is missing. Please contact support.");
        }
      } else if (response.status === 404) {
        console.warn("License not found for License ID:", licenseID); // Debug statement
        setError("License not found. Please check the License ID and try again.");
      } else {
        console.error("Unexpected response from API:", response.status); // Debug statement
        setError("An unexpected error occurred. Please try again later.");
      }
    } catch (err) {
      console.error("Error occurred during API request:", err); // Debug statement
      setError("An error occurred while fetching the license details. Please check your connection.");
    }
  };

  // Navigation handler
  const handleNavigation = (path) => {
    console.log("Navigating to:", path); // Debug statement
    navigate(path);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <img src={projectTitle} alt="Project Title" className="navbar-title" />

      {/* Search License Section */}
      <div className="search-license-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter License ID..."
          value={licenseID}
          onChange={(e) => setLicenseID(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* License Details Display */}
      {licensePdfUrl && (
        <div className="license-details">
          <p>License PDF found for ID: <strong>{licenseID}</strong></p>
          <a
            href={licensePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="download-link"
          >
            Open License PDF
          </a>
        </div>
      )}

      {/* Navigation Links */}
      <div className="nav-links">
        <img
          src={homeButton}
          alt="Home"
          className="nav-button"
          onClick={() => handleNavigation("/home")}
        />
        <img
          src={aboutButton}
          alt="About"
          className="nav-button"
          onClick={() => handleNavigation("/about")}
        />
      </div>
    </div>
  );
};

export default Navbar;
