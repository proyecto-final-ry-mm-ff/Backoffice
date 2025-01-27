import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../../Services/userService";
import { useNavigate } from "react-router-dom"; //Son lol componentes y hooks de react para manejar la navegación.
import { FaUser, FaLock } from "react-icons/fa";
import { Typography, Box, useTheme, TextField, Button } from "@mui/material";
import { colorsList } from "../../theme";
import { loginThunk } from "../../redux/features/user/userThunk";

export default function Login() {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);

  // Estado local para manejar los datos del formulario y errores
  const [userData, setUserData] = useState({});
  const [error, setErrorLogin] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirige si ya existe una sesión iniciada
  useEffect(() => {
    const logged = localStorage.getItem("logged") === "true";
    if (logged) {
      navigate("/chat-page");
    }
  }, [navigate]);

  // Actualiza los datos de los inputs en userData
  const handleChangeMultiple = (e) => {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };

  // Hace la llamada al thunk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLogin(""); // Limpiar mensajes de error

    try {
      await dispatch(loginThunk(userData.email, userData.password));
      navigate("/chat-page"); // Redirige si el login es exitoso
    } catch (error) {
      setErrorLogin(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: colors.background[500],
      }}
    >
      {/* Contenedor del formulario */}
      <Box
        sx={{
          padding: 5,
          borderRadius: 1,
          width: "100%",
          maxWidth: 400,
          background: colors.background[300],
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Título */}
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              marginBottom: 5,
              color: colors.textPrimary[500],
              fontWeight: "bold",
            }}
          >
            Login
          </Typography>

          {/* Input de email */}
          <Box sx={{ position: "relative", marginBottom: 2 }}>
            <FaUser
              style={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
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
                sx: { paddingLeft: "30px" },
              }}
            />
          </Box>

          {/* Input de contraseña */}
          <Box sx={{ position: "relative", marginBottom: 2 }}>
            <FaLock
              style={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
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
                sx: { paddingLeft: "30px" },
              }}
            />
          </Box>

          {/* Botón de envío */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 4,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={!userData.email || !userData.password}
              sx={{
                color: colors.textPrimary[500],
                background: colors.background[100],
                padding: "10px 20px",
                textTransform: "uppercase",
                width: "100%",
                height: "55px",
                opacity: !userData.email || !userData.password ? 0.5 : 1,
                pointerEvents:
                  !userData.email || !userData.password ? "none" : "auto",
                "&:hover": {
                  backgroundColor: colors.buttonPrimaryHover[300],
                  cursor:
                    !userData.email || !userData.password
                      ? "default"
                      : "pointer",
                },
              }}
            >
              Iniciar sesión
            </Button>
          </Box>

          {/* Mensaje de error */}
          <Box>
            {error && (
              <Typography
                sx={{
                  marginTop: 2,
                  color: colors.accentRed[100],
                  textAlign: "center",
                  fontSize: "15px",
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
