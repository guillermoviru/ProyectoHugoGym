import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './js/home.js';
import Register from './js/register.js';
import Login from './js/login.js';
import Main from './js/main.js';

function App() {
  return (
    <Router>
      <div>
        {/* ...otros componentes o contenido */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;