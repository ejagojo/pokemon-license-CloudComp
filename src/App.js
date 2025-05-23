import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import WelcomePage from './components/WelcomePage';
import AboutPage from './components/About';
import PokemonLicense from './components/PokemonLicense';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<><Navbar /><HomePage /></>} />
          <Route path="/about" element={<><Navbar /><AboutPage /></>} />
          <Route
            path="/license"
            element={
              <>
                <Navbar />
                <PokemonLicense uid="dummy-uid" />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
