import React, { useState } from "react";
import "../styles/generateuid.css";

const GenerateUID = () => {
    const [uid, setUID] = useState(null); // State to store generated UID

    // Function to simulate the Lambda trigger
    const handleGenerateUID = async () => {
        try {
            // Simulated form data (to be replaced by actual form inputs in the future)
            const formData = {
                name: "John Doe", // Placeholder name
                email: "johndoe@example.com", // Placeholder email
                favoritePokemon: "Pikachu", // Placeholder Pokémon
                trainerType: "Elite Trainer", // Placeholder trainer type
                region: "Pokemon Region",
                birthday: "07/08/2002",
                height: "5'15"
            };

            // Simulate API call to Lambda
            const response = await fetch("<API_GATEWAY_URL>/generate-uid", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setUID(data.uid); // Update the state with the generated UID
                console.log("Generated UID:", data.uid);
            } else {
                console.error("Error generating UID:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="generate-uid-container">
            <button onClick={handleGenerateUID} className="generate-uid-button">
                Generate UID
            </button>
            {uid && (
                <p className="uid-display">
                    Your generated UID: <strong>{uid}</strong>
                </p>
            )}
        </div>
    );
};

export default GenerateUID;
