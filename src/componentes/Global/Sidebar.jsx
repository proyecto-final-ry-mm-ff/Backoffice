import React, { useContext, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext, colorsList } from "../../theme";

const Sidebar = () => {
    const theme = useTheme();
    const colors = colorsList(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState();
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate('/login');
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
                display: 'flex',

                flexDirection: 'column',
                "& .pro-sidebar-inner": {
                    background: `${colors.background[300]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "10px 30px 10px 25px !important",
                    color: `${colors.textPrimary[500]}`
                },
                "& .pro-inner-item:hover": {
                    color: colors.accentBlue[300] + " !important",
                },
                "& .pro-menu-item.active": {
                    color: colors.accentBlue[500] + " !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed} >
                <Menu iconShape="square" >
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
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", ml: "15px" }}>
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
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Item title="Chats" to="/chat-page" icon={<ChatIcon />} />
                        <Item title="Diseñador de flujos" to="/flow-designer" icon={<AccountTreeIcon />} />
                        <Item title="Configuración" to="/config" icon={<SettingsIcon />} />
                    </Box>

                    {/* Íconos de cambiar tema y logout */}
                    <Box
                        sx={{

                            marginTop: 'auto', // Empuja este contenido hacia abajo
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <MenuItem
                            onClick={colorMode.toggleColorMode}
                            icon={
                                theme.palette.mode === 'light' ? (
                                    <DarkModeOutlinedIcon fontSize="medium" />
                                ) : (
                                    <LightModeOutlinedIcon fontSize="medium" />
                                )
                            }
                        >
                            <Typography>
                                {isCollapsed ? "" : "Cambiar Tema"}
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={logOut}
                            icon={<LogoutOutlinedIcon fontSize="medium" />}
                            sx={{
                                '&:hover': {
                                    backgroundColor: `${colors.accentRed[100]} !important`
                                },
                            }}
                        >
                            <Typography>
                                {isCollapsed ? "" : "Cerrar Sesión"}
                            </Typography>
                        </MenuItem>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box >
    );
};

export default Sidebar;
