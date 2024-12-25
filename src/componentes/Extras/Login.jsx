
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loginApi } from '../../redux/features/user/userService';
import { useNavigate } from 'react-router-dom'; //Son lol componentes y hooks de react para manejar la navegación.
import { FaUser, FaLock } from "react-icons/fa";
import { Typography, Box, useTheme, TextField, Button } from "@mui/material";
import { colorsList } from '../../theme';

export default function Login() {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);

  const [userData, setUserData] = useState({});
  const [error, setErrorLogin] = useState('');
  const navigate = useNavigate();


  // Verificamos que no no esté iniciada ya una sesión
  useEffect(() => {
    const logged = localStorage.getItem('logged') === 'true';
    if (logged) {
      navigate('/chat-page');
    }
  }, [navigate]);

  // Actualiza los datos de los inputs en userData
  const handleChangeMultiple = (e) => {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };

  // Hace la llamada a la API
  const handleSubmit = async (e) => {

    e.preventDefault();
    setErrorLogin('');

    const resultado = await loginApi(userData);
    if (!resultado) {
      setErrorLogin('TODO CAMBIAR');
    } else {
      navigate('/chat-page');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        background: colors.background[500],
      }}
    >
      {/* Contenedor */}
      <Box
        sx={{
          padding: 5,
          borderRadius: 1,
          //boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: 400,
          //background: `linear-gradient(165deg, ${colors.accentBlue[200]}, ${colors.accentBlue[600]})`,
          background: colors.background[300]
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Encabezado */}
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              marginBottom: 5,
              color: colors.textPrimary[500],
              fontWeight: 'bold',
            }}
          >
            Login
          </Typography>

          {/* Email Input */}
          <Box sx={{ position: 'relative', marginBottom: 2 }}>
            <FaUser
              style={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
                color: colors.textSecondary[500],
              }}
            />
            <TextField
              fullWidth
              name="email"
              placeholder="Ingrese email"
              value={userData.email || ""}
              onChange={handleChangeMultiple}
              InputProps={{
                sx: { paddingLeft: '30px' },
              }}
            />
          </Box>

          {/* Password Input */}
          <Box sx={{ position: 'relative', marginBottom: 2 }}>
            <FaLock
              style={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
                color: colors.textSecondary[500],
              }}
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              placeholder="Contraseña"
              value={userData.password || ""}
              onChange={handleChangeMultiple}
              InputProps={{
                sx: { paddingLeft: '30px' },
              }}
            />
          </Box>

          {/* Submit Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 4,
            }}
          >
            <Button
              variant="contained"
              type='submit'
              disabled={!userData.email || !userData.password} // Deshabilitado si email o password están vacíos
              sx={{
                color: colors.textPrimary[500],
                background: colors.background[100],
                padding: '10px 20px',
                textTransform: 'uppercase',
                width: '100%',
                height: '55px',
                opacity: (!userData.email || !userData.password) ? 0.5 : 1, // Reduce la opacidad cuando está deshabilitado
                pointerEvents: (!userData.email || !userData.password) ? 'none' : 'auto', // Evita interacción visual
                '&:hover': {
                  backgroundColor: colors.buttonPrimaryHover[300],  // Sin cambio si está deshabilitado
                  cursor: (!userData.email || !userData.password) ? 'default' : 'pointer', // Cambia el cursor
                },
              }}
            >
              Iniciar sesión
            </Button>

          </Box>

          {/* Error Message */}
          <Box>
            {error && (
              <Typography
                sx={{
                  marginTop: 2,
                  color: colors.accentRed[100],
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </form>
      </Box >
    </Box >
  );
}
