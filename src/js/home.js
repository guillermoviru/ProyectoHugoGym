import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../fotos/logo4.png';  // Ajusta la ruta para que sea relativa al archivo actual
import '../css/home.css';  // Ajusta la ruta para que sea relativa al archivo actual

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <img src={logo1} alt="Logo 1" style={{ width: '400px', height: '400px' }} />
        <Link to="/register">
          <button className="boton1">Sing Up</button>
        </Link>
        <Link to="/login">
          <button className="boton2">Iniciar sesión</button>
        </Link>
      </header>
    </div>
  );
}

export default Home;