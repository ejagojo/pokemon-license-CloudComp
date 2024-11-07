import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<><Navbar /><HomePage /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
