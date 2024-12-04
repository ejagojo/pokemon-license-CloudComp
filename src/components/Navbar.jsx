import React, { useState } from "react";
import homeButton from "../assets/buttons/home-button.png";
import aboutButton from "../assets/buttons/about-button.png";
import projectTitle from "../assets/project-title.png";
import "../styles/navbar.css";

const Navbar = () => {
  const [licenseID, setLicenseID] = useState("");
  const [licenseImage, setLicenseImage] = useState(null); // Stores the retrieved license image
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the modal visibility

  const handleSearch = async () => {
    setError(null);
    setLicenseImage(null); // Clear previous license data
    setIsModalOpen(false); // Close the modal if it's open

    if (!licenseID.trim()) {
      setError("Please enter a License ID.");
      return;
    }

    try {
      const response = await fetch("THIS IS WHERE WE WILL DO THE END POINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ licenseID }),
      });

      if (response.ok) {
        const data = await response.json();
        setLicenseImage(data.licenseImage); // Assuming the API returns the image URL
        setIsModalOpen(true); // Open the modal with the retrieved license
      } else {
        setError("License not found. Please check the License ID and try again.");
      }
    } catch (err) {
      setError("An error occurred while fetching the license details.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
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

      {/* Modal */}
      {isModalOpen && licenseImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={licenseImage} alt="Trainer License" className="modal-license-image" />
            <button className="close-modal-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="nav-links">
        <img src={homeButton} alt="Home" className="nav-button" />
        <img src={aboutButton} alt="About" className="nav-button" />
      </div>
    </div>
  );
};

export default Navbar;
