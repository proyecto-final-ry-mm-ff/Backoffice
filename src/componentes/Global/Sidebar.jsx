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
import { ColorModeContext, codigos } from "../../theme";

const Sidebar = () => {
    const theme = useTheme();
    const colors = codigos(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState();
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate('/login');
    };

    const Item = ({ title, to, icon }) => (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[200] }}
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
                    background: `${colors.primary[600]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 30px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: colors.blueAccent[100] + " !important",
                },
                "& .pro-menu-item.active": {
                    color: colors.blueAccent[500] + " !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* Botón para colapsar/expandir el menú */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[200],
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[200]}>
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
                        <Item title="Chats" to="/chatPage" icon={<ChatIcon />} />
                        <Item title="Diseñador de flujos" to="/flowDesigner" icon={<AccountTreeIcon />} />
                        <Item title="Configuración" to="/configuracion" icon={<SettingsIcon />} />
                    </Box>

                    {/* Íconos de cambiar tema y logout */}
                    <Box sx={{ flex: 0, display: 'flex', flexDirection: 'column' }}>
                        <MenuItem
                            onClick={colorMode.toggleColorMode}
                            style={{
                                color: colors.grey[200],
                            }}
                            icon={
                                theme.palette.mode === 'light' ? (
                                    <DarkModeOutlinedIcon fontSize="large" />
                                ) : (
                                    <LightModeOutlinedIcon fontSize="large" />
                                )
                            }
                        >
                            <Typography>
                                {isCollapsed ? "" : "Cambiar Tema"}
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={logOut}
                            style={{
                                color: colors.grey[200],
                            }}
                            icon={<LogoutOutlinedIcon fontSize="large" />}
                        >
                            <Typography>
                                {isCollapsed ? "" : "Cerrar Sesión"}
                            </Typography>
                        </MenuItem>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
