import React from 'react';
import '../css/register.css';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function Register() {
    //Creacion de Constantes
    const [Nombre, setNombre] = useState(''); 
    const [Apellidos, setApellidos] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Contraseña1, setContraseña1] = useState('');
    const [Contraseña2, setContraseña2] = useState('');
   //Metodo para Registrar el usuario junto con todas las verificaciones del usuario
    async function RegistrarSesion() {
      console.log('Variable 1:', Nombre);
      console.log('Variable 2:', Apellidos);
      console.log('Variable 3:', Correo);
      console.log('Variable 4:', Contraseña1);
      console.log('Variable 5:', Contraseña2);
      if (validarCorreo(Correo)) {
        //Verificar si el Correo existe o el usuario ysi coinciden las contraseñas
        if (Contraseña1 === Contraseña2) {
            try {
                const response = await axios.post('http://localhost:8080/Usuario/register', {
                  correo: Correo,
                });
                if (response.data === true) {
                    alert('El correo electronico ya esta registrado');
                    // Lógica para cuando el correo electronico ya esta registrado 
                } else {
                    alert('Registro Exitoso');
                    try {
                        const response = await axios.post('http://localhost:8080/Usuario', {
                          nombre: Nombre,
                          apellidos: Apellidos,
                          correo: Correo,
                          contrasena: Contraseña1,
                        });
                  
                        console.log('Registro exitoso');
                        console.log(response.data);
                        // Lógica para el registro exitoso, redireccionar, mostrar un mensaje, etc.
                      } catch (error) {
                        console.error('Error al registrar:', error);
                        // Lógica para manejar el error al registrar
                      }
                }
              } catch (error) {
                alert('Error al registrarse:', error);
              }
          } else {
            alert('Las dos contraseñas no coinciden');
            //ha puesto el correo electronico mal
          }
      } else {
        alert('Correo electronico incorrecto');
        //ha puesto el correo electronico mal
      }

    }
   // Metodo para validar el correo electronico
    function validarCorreo(Correo) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(Correo);
       }
    const responseGoogle = (response) => {
        console.log(response);
        // Aquí puedes manejar la respuesta del inicio de sesión de Google
      };
    return (
      <div className="register">
        <header className="register-header">
          <Link to="/">
            <ArrowBackIcon className='registroiconoflecha' />
          </Link>
          <h1 class='cabecera'>Registro</h1>
        </header>
        <body className="register-body">
          <div className='registrocontenedor'>
            <PersonIcon className='registroiconos' />
            <TextField value={Nombre} onChange={(e) => setNombre(e.target.value)} className='registrotextfield'
              variant="outlined"
              placeholder="Introduce tu nombre"
            />
            <CardMembershipIcon className='registroiconos' />
            <TextField value={Apellidos} onChange={(e) => setApellidos(e.target.value)} className='registrotextfield'
              variant="outlined"
              placeholder="Introduce tu apellido"
            />
            <EmailIcon className='registroiconos' />
            <TextField value={Correo} onChange={(e) => setCorreo(e.target.value)} className='registrotextfield'
              variant="outlined"
              placeholder="Introduce tu correo"
            />
            <LockIcon className='registroiconos' />
            <TextField value={Contraseña1} onChange={(e) => setContraseña1(e.target.value)} placeholder="Introduce la contraseña" type="password" id="password" name="password1" className='registrotextfield' />
  
            <LockIcon className='registroiconos' />
            <TextField value={Contraseña2} onChange={(e) => setContraseña2(e.target.value)} placeholder="Introduce la contraseña" type="password" id="password" name="password2" className='registrotextfield' />
  
          </div>
          <div className='registrocontenedorgoogle'>
          <button className="boton1" onClick={RegistrarSesion}>Registrar</button>
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
  
  export default Register;