import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import '../css/main.css';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {
  Datepicker,
  CalendarPrev,
  CalendarNav,
  CalendarNext,
  SegmentedGroup,
  SegmentedItem,
  setOptions,
  localeEs,
} from '@mobiscroll/react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InputAdornment from '@mui/material/InputAdornment';
import Slider from '@mui/material/Slider';
function Main() {
  // Creación de Constantes
  const [Peso, setPeso] = useState(0);
  const [Edad, setEdad] = useState(0);
  const [Altura, setAltura] = useState(0.0);
  const [Genero, setGenero] = useState(2); // 1 por defecto para Femenino, 2 para Masculino
  const [Meta, setMeta] = useState(0); // 1 por defecto para PerderPeso, 2 para Definicion y 3 para ganarmusculo
  const [value, setValue] = React.useState('recents');
  const location = useLocation();
  const usuario = location.state?.usuario;
  const nombre = usuario.nombre;
  const [sliderValue, setSliderValue] = useState(0);
  const handleCompletarClick = () => {
    // Validar los datos antes de realizar otras acciones
    if (!validarDatos()) {
      // Si los datos no son válidos, puedes mostrar un mensaje al usuario o realizar otras acciones
      console.log('Datos no válidos. Por favor, verifica la entrada de datos.');
      return;
    }

    // Si los datos son válidos, puedes continuar con otras acciones
    console.log('Datos válidos. Continuando con otras acciones...');
    console.log('Genero actual:', Genero);
    console.log('Meta actual:', Meta);
    console.log('Edad actual:', Edad);
    console.log('Altura actual:', Altura);
    console.log('Peso actual:', Peso);
    console.log('Actividad actual:', sliderValue);
    // Otras acciones que desees realizar al hacer clic en Completar
  };

  // Función para validar los datos (puedes personalizarla según tus requisitos)
  const validarDatos = () => {
    // Aquí puedes agregar la lógica de validación para altura, edad y peso
    // Devuelve true si los datos son válidos y false si no lo son

    const alturaValida = validarAltura(Altura);
    const edadValida = validarEdad(Edad);
    const pesoValido = validarPeso(Peso);

    if (alturaValida !== true) {
      console.log('Altura no válida. Por favor, verifica la entrada de datos.');
      return false;
    }

    if (edadValida !== true) {
      console.log(`Edad no válida: ${edadValida}`);
      return false;
    }

    if (pesoValido !== true) {
      console.log(`Peso no válido: ${pesoValido}`);
      return false;
    }

    return true;
  };

  // Función para validar la altura
  const validarAltura = (Altura) => {
    // Convertir la altura a un número
    const alturaNumero = parseFloat(Altura);

    // Verificar si la altura es un número y está dentro del rango deseado
    if (!isNaN(alturaNumero) && alturaNumero >= 100 && alturaNumero <= 250) {
      // La altura es válida
      return true;
    } else {
      // La altura no es válida, puedes devolver un mensaje de error específico
      return 'La altura debe estar entre 100 y 250.';
    }
  };

  const validarEdad = (edad) => {
    // Convertir la edad a un número
    const edadNumero = parseInt(edad, 10);

    // Verificar si la edad es un número y está dentro del rango deseado
    if (!isNaN(edadNumero) && edadNumero >= 18 && edadNumero <= 99) {
      // La edad es válida
      return true;
    } else {
      // La edad no es válida, puedes devolver un mensaje de error específico
      return 'La edad debe estar entre 18 y 99.';
    }
  };

  const validarPeso = (peso) => {
    // Convertir el peso a un número
    const pesoNumero = parseFloat(peso);

    // Verificar si el peso es un número y está dentro del rango deseado
    if (!isNaN(pesoNumero) && pesoNumero >= 30 && pesoNumero <= 200) {
      // El peso es válido
      return true;
    } else {
      // El peso no es válido, puedes devolver un mensaje de error específico
      return 'El peso debe estar entre 30 y 200.';
    }
  };

  const handleAlturaChange = (event) => {
    // Aquí puedes manejar los cambios en el campo de texto
    const inputValue = event.target.value;
    setAltura(inputValue);
  };

  const handlePesoChange = (event) => {
    // Aquí puedes manejar los cambios en el campo de texto
    const inputValue = event.target.value;
    setPeso(inputValue);
  };

  const handleEdadChange = (event) => {
    // Aquí puedes manejar los cambios en el campo de texto
    const inputValue = event.target.value;
    setEdad(inputValue);
  };

  const handleGeneroChange = (event) => {
    const nuevoGenero = event.target.value === 'male' ? 2 : 1;
    setGenero((prevGenero) => {
      return nuevoGenero;
    });
  };

  const handleMetaChange = (event) => {
    const nuevaMeta = parseInt(event.target.value, 10); // Convierte a número
    setMeta(nuevaMeta);
  };

  const [calendarType, setCalendarType] = React.useState('week');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  setOptions({
    locale: localeEs,
    theme: 'ios',
    themeVariant: 'light',
  });

  const calendarHeaderSwitch = () => {
    return (
      <React.Fragment>
        <CalendarNav className="custom-view-nav" />
        <div className="custom-view">
          <SegmentedGroup value={calendarType} onChange={changeView}>
            <SegmentedItem value="week" icon="material-date-range" />
            <SegmentedItem value="month" icon="material-event-note" />
          </SegmentedGroup>
        </div>
        <div>
          <CalendarPrev />
          <CalendarNext />
        </div>
      </React.Fragment>
    );
  };

  const changeView = (event) => {
    setCalendarType(event.target.value);
  };

  return (
    <div>
      <header>
        <div>
          <h1 className="nombre">Hola {nombre}</h1>
        </div>
      </header>
      <body>
        <div>
          <Datepicker
            controls={['calendar']}
            display="inline"
            calendarType={calendarType}
            calendarSize={1}
            renderCalendarHeader={calendarHeaderSwitch}
            className="custom-datepicker"
          />
        </div>
        <div className="middle-container">
          {usuario.inscrito ? (
            <>
              <div>
                <label>Inscrito: </label>
                <label>True</label>
              </div>
            </>
          ) : (
            <>
              <div className="segundocontenedor">
                <div className="label-and-input">
                  <TextField
                    label="Introduce el Peso"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment className="kg" position="start">
                          kg
                        </InputAdornment>
                      ),
                      inputProps: {
                        inputMode: 'numeric',
                        pattern: '[0-9]*', // Asegura que solo se admitan números
                      },
                    }}
                    className="myCustomTextField"
                    type="number" // Puedes cambiar esto a "number" si solo quieres números, pero ten en cuenta que mostrará controles de incremento/decremento en algunos navegadores.
                    onChange={handlePesoChange}
                  />
                </div>
                <div className="label-and-input">
                  <TextField
                    label="Introduce la Edad "
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment className="kg" position="start">
                          Edad
                        </InputAdornment>
                      ),
                      inputProps: {
                        inputMode: 'numeric',
                        pattern: '[0-9]*', // Asegura que solo se admitan números
                      },
                    }}
                    className="myCustomTextField"
                    type="number" // Puedes cambiar esto a "number" si solo quieres números, pero ten en cuenta que mostrará controles de incremento/decremento en algunos navegadores.
                    onChange={handleEdadChange}
                  />
                </div>

                <div className="label-and-input">
                  <TextField
                    label="Introduce la Altura "
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment className="kg" position="start">
                          Cm
                        </InputAdornment>
                      ),
                      inputProps: {
                        inputMode: 'numeric',
                        pattern: '[0-9]*', // Asegura que solo se admitan números
                      },
                    }}
                    className="myCustomTextField"
                    type="number" // Puedes cambiar esto a "number" si solo quieres números, pero ten en cuenta que mostrará controles de incremento/decremento en algunos navegadores.
                    onChange={handleAlturaChange}
                  />
                </div>
                <div>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Genero</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={Genero === 1 ? 'female' : 'male'}
                      onChange={handleGeneroChange}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Femenino" />
                      <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Meta</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={Meta.toString()}
                      onChange={handleMetaChange}
                    >
                      <FormControlLabel value="1" control={<Radio className="radio-perderpeso" />} label="Perder Peso" />
                      <FormControlLabel value="2" control={<Radio className="radio-perderpeso" />} label="Definicion" />
                      <FormControlLabel value="3" control={<Radio className="radio-perderpeso" />} label="Volumen" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="label-and-input">
                  <FormLabel id="slider-label">Nivel de Actividad</FormLabel>
                  <Slider
                   className="myCustomSlider"
                    value={sliderValue}
                    onChange={(event, newValue) => setSliderValue(newValue)}
                    aria-labelledby="slider-label"
                    valueLabelDisplay="auto"
                    step={1} // Ajusta el valor del paso según tus necesidades
                    marks={[
                      { value: 1, label: 'Sedentario' },
                      { value: 2, label: 'Ligera' },
                      { value: 3, label: 'Moderada' },
                      { value: 4, label: 'Intensa' },
                      { value: 5, label: 'Muy Intensa' },
                    ]}
                    min={1}
                    max={5}
                  />
                </div>
                <div>
                  <button className="boton1" onClick={handleCompletarClick}>
                    Completar
                  </button>
                  <button className="boton2">Cancelar</button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="caja">
          <BottomNavigation sx={{ width: '100vw' }} value={value} onChange={handleChange}>
            <BottomNavigationAction label="Inicio" value="inicio" icon={<HomeIcon className="icono" />} />
            <BottomNavigationAction label="Perfil" value="perfil" icon={<PersonIcon className="icono" />} />
            <BottomNavigationAction label="Notific" value="notific" icon={<NotificationsIcon className="icono" />} />
            <BottomNavigationAction label="Ajustes" value="ajustes" icon={<SettingsIcon className="icono" />} />
          </BottomNavigation>
        </div>
      </body>
    </div>
  );
}

export default Main;