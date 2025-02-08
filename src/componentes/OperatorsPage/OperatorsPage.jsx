import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  useTheme,
  TextField,
} from "@mui/material";
import { useDispatch, } from "react-redux";
import { colorsList } from "../../theme";
import { FaLock, FaUser } from "react-icons/fa";
import { registerOperator } from "../../redux/features/operator/operatorThunks";

const OperatorsPage = () => {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");

  // Actualiza los datos de los inputs en userData
  const handleChangeMultiple = (e) => {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const operatorDto = { email: userData.email, password: userData.password };
      await dispatch(registerOperator(operatorDto)).unwrap();
    } catch (error) {
      setError(error.message);
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
          maxWidth: "90%",
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
            Registrar operador
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
              type="text"
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
              Registrar
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
};

export default OperatorsPage;
