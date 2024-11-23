
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginApi } from '../../Services/services'; //Realiza la llamada a la API de login.
import { Link, useNavigate } from 'react-router-dom'; //Son lol componentes y hooks de react para manejar la navegación.
import '../../estilos/style.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Typography, Box, useTheme } from "@mui/material";
import { codigos } from "../../theme";
// import Dashboard from './Dashboard';

export default function Login() {


  //HOCKS useSate (maneja los estados)

  // useSate devuelve un array con dos elementos:
  // 1) valoresActuales = El valor actual del estado.
  // 2) setValoresActuales = Una función que te permite actualizar ese valor.
  // 3) useState es el valor inicial del estado
  const [valoresActuales, setValoresActuales] = useState({ usuario: 'machin', password: 'machin' });
  const [logueado, setLogueado] = useState(false);
  const [error, setErrorLogin] = useState('');
  const navigate = useNavigate();



  // Leer el estado de sesión desde localStorage cuando el componente se monta
  useEffect(() => {
    const logueado = localStorage.getItem('logueado');
    if (logueado) {
      setLogueado(true);
      navigate('/dashboard');  // Navegar al dashboard si ya está logueado
    }
  }, [navigate]);


  // Cada vez que el usuario cambia los valores en los campos del formulario, se llama a handleChangeMultiple
  // y dentro se llama a setValoresActuales(HOCK) para actualizar el estado.
  const handleChangeMultiple = (e) => {
    setValoresActuales((valoresActuales) => ({
      ...valoresActuales,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // reseteo el mensaje de error en cada llamada
    setErrorLogin('');

    let resultado = await loginApi(); //Realiza la llamada a la API de loginApi y espera al return
    console.log('Resultado ->', resultado);

    if (!resultado) {
      setErrorLogin('TODO CAMBIAR');
    } else {
      localStorage.setItem('token', resultado.accessToken);
      localStorage.setItem('refreshToken', resultado.refreshToken);
      localStorage.setItem('idUsuario', resultado.id); // Guardar el id del usuario en localStorage.
      localStorage.setItem('logueado', true); // Guardar el estado de logueado.

      setLogueado(true);
      navigate('/dashboard'); // Navegar al dashboard después del login.
    }
  };

  return (
    <div className='main'>
      <div className='wrapper'>
        <Form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form.Group className="input-box" >
            <input
              type="text"
              placeholder="Ingrese usuario"
              name="usuario"
              onChange={handleChangeMultiple}
              value={valoresActuales.usuario}
            /><FaUser className='icon' />
          </Form.Group>

          <Form.Group className="input-box" >
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChangeMultiple}
              value={valoresActuales.password}
            /><FaLock className='icon' />
          </Form.Group>


          <Button variant="primary" type="submit" className='loginBtn'
            disabled={valoresActuales.password == "" || valoresActuales.usuario == ""}>
            Iniciar Sesión
          </Button>

          {/* mostramos el error del HOCK (useState) */}
          {error && <div style={{ color: 'red' }}>{error}</div>}

        </Form>
      </div>
    </div>
  );
}
