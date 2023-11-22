import React, { useState } from 'react';
import '../css/login.css';
import { Link  } from 'react-router-dom'; // Asegúrate de importar Link
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    //Creacion de Constantes
    const [Correo, setCorreo] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    
    async function IniciarSesion() {
        //Verificar si el Usuario Existe 
        if (validarCorreo(Correo)) {
            try {
                const response = await axios.post('http://localhost:8080/Usuario/login', {
                    correo: Correo,
                    contrasena: Contraseña,
                });
                // Lógica para el inicio de sesión exitoso
                if (response.data === true) {
                    console.log('Inicio de sesión exitoso');
                    const response = await fetch(`http://localhost:8080/Usuario/${Correo}`);
                    const usuario = await response.json();
                    console.log(usuario);
                    navigate('/main', { replace: true, state: { usuario } });

                }
                // Lógica para el inicio de sesión fallido
                else {
                    console.log('Credenciales incorrectas');

                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
            }
        }
        //Error en la verificación del correo electrónico  u  contraseña
        else {
            alert('Gmail o Contraseña INCORRECTOS');
            setCorreo('');
            setContraseña('');
        }
    }

    //Metodo para validar el Gmail 
    function validarCorreo(Correo) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(Correo);
    }
    //Metodo para el Inicio de Secion de Google
    const responseGoogle = (response) => {
        console.log(response);
        // Aquí puedes manejar la respuesta del inicio de sesión de Google
    };

    return (
        <div>
            <header className='login-header'>
                <Link to="/">
                    <ArrowBackIcon className='inicioiconoflecha' />
                </Link>
                <h1 className='cabecera'>Iniciar Sesion</h1>
            </header>
            <body className="inicio-body">
                <div className='iniciocontenedor'>
                    <EmailIcon className='inicioiconos' />
                    <TextField
                        value={Correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className='registrotextfield'
                        variant="outlined"
                        placeholder="Introduce tu correo"
                    />
                    <LockIcon className='inicioiconos' />
                    <TextField value={Contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Introduce la contraseña" type="password" id="password" name="password1" className='registrotextfield' />
                </div>
                <div className='iniciocontenedorgoogle'>
                    <button className="boton1" onClick={IniciarSesion}>Iniciar Sesion</button>
                    <GoogleLogin
                        className="mi-boton-google"
                        clientId="TU_CLIENT_ID" // Reemplaza con tu ID de cliente de OAuth
                        buttonText="Iniciar sesión con Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </body>
        </div>
    );
}

export default Login;