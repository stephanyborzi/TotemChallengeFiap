import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Medicamentos from './pages/Medicamentos/Medicamentos.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Medicamentos/>} />
      </Routes>
    </Router>
  );
}

export default App;