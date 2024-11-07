import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import WelcomePage from './components/WelcomePage';
import { useState, useEffect } from 'react';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  // Set up a timer to transition from WelcomePage to HomePage
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000); // 3000ms = 3 seconds
    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  return (
    <Router>
      <div className="App">
        {!showWelcome && <Navbar />}
        <Routes>
          {showWelcome ? (
            <Route path="/" element={<WelcomePage />} />
          ) : (
            <Route path="/" element={<HomePage />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
