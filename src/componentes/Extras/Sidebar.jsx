import React, { useContext, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext, colorsList } from "../../theme";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/features/user/userThunk";
import FacebookLogin from "./FacebookLogin";

const Sidebar = () => {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/login");
  };

  const Item = ({ title, to, icon }) => (
    <MenuItem
      active={selected === title}
      style={{ color: colors.primary }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",

        "& .pro-sidebar-inner": {
          background: `${colors.background[300]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "10px 30px 10px 25px !important",
          color: `${colors.textPrimary[500]}`,
        },
        "& .pro-inner-item:hover": {
          color: colors.accentBlue[300] + " !important",
        },
        "& .pro-menu-item.active": {
          color: colors.accentBlue[500] + " !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} sx={{ height: "100%" }}>
        <Menu>
          {/* Botón para colapsar/expandir el menú */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.accentBlue[300],
            }}
          >
            {!isCollapsed && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  ml: "15px",
                }}
              >
                <Typography variant="h3" color={colors.neutral}>
                  MENÚ
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Opciones del menú */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Item title="Chats" to="/chat-page" icon={<ChatIcon />} />
            <Item
              title="Diseñador de flujos"
              to="/flow-designer"
              icon={<AccountTreeIcon />}
            />
            <Item title="Clientes" to="/clients-page" icon={<PeopleIcon />} />
            <Item title="Registrar operador" to="/operators-page" icon={<PersonAddAlt1Icon />} />
            <Item title="Configuración" to="/config" icon={<SettingsIcon />} />
          </Box>
        </Menu>
        <Menu
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <MenuItem
            onClick={colorMode.toggleColorMode}
            icon={
              theme.palette.mode === "light" ? (
                <DarkModeOutlinedIcon fontSize="medium" />
              ) : (
                <LightModeOutlinedIcon fontSize="medium" />
              )
            }
          >
            <Typography>{isCollapsed ? "" : "Cambiar Tema"}</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            icon={<LogoutOutlinedIcon fontSize="medium" />}
            sx={{
              "&:hover": {
                backgroundColor: `${colors.accentRed[100]} !important`,
              },
            }}
          >
            <Typography>{isCollapsed ? "" : "Cerrar Sesión"}</Typography>
          </MenuItem>
          <FacebookLogin />
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
