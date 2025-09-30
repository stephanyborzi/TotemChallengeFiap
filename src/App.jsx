import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Medicamentos from './pages/Medicamentos/Medicamentos.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      {/* CRITICAL FIX: All <Route> elements MUST be wrapped in <Routes> 
        in react-router-dom v6+.
      */}
      <Routes>
        <Route path="/" element={<Medicamentos/>} />
      </Routes>
    </Router>
  );
}

export default App;