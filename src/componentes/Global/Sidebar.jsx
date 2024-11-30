import { useState, useContext } from "react"; // Agrega useContext para acceder a ColorModeContext
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

// Iconos
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';

// Theme
import { ColorModeContext, codigos } from "../../theme"; // Asegúrate de que `codigos` esté exportado correctamente

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = codigos(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>
                {title}
            </Typography>
            <Link to={to} />
        </MenuItem>
    );
}

const Sidebar = () => {
    const theme = useTheme();
    const colors = codigos(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState();

    return (
        <Box sx={{
            height: '100%',
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important"
            },
            "& .pro-inner-item": {
                padding: "5px 30px 5px 20px !important"
            },
            "& .pro-inner-item:hover": {
                color: "#868dfb !important"
            },
            "& .pro-menu-item.active": {
                color: "#6870fa !important"
            },
        }}>
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml="15px"
                                >
                                    <Typography variant="h3" color={colors.grey[100]}>
                                        MENU
                                    </Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}
                    </MenuItem>

                    <Box>
                        <Item
                            title="Chats"
                            to="/chat-page"
                            icon={<ChatIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Diseñador de flujos"
                            to="/flow-designer"
                            icon={<AccountTreeIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Configuración"
                            to="/config"
                            icon={<SettingsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
}

export default Sidebar;