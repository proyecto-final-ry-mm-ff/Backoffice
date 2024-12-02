import { Box, IconButton, Typography, useTheme } from "@mui/material";
import InputBase from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { codigos } from "../../theme";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useContext } from "react";


import { logout } from '../../redux/features/userSlice'
import { store } from "../../redux/store";

const Topbar = () => {

    const theme = useTheme(); //Da accseso al theme utlizado
    const colors = codigos(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();

    const logOut = () => {
        store.dispatch(logout());
        navigate('/login'); // Navegar a /login
    };

    return (
        <Box display="flex" justifyContent="space-between" p={1}
            backgroundColor={colors.primary[800]}>
            <Box>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'light' ? (
                        <DarkModeOutlinedIcon fontSize="large" />
                    ) : (<LightModeOutlinedIcon fontSize="large" />)}

                </IconButton>
            </Box>
            <Box
                display="flex"
            >
                <IconButton onClick={logOut}>
                    <LogoutOutlinedIcon fontSize="large" />
                </IconButton>


            </Box>
        </Box>);
}

export default Topbar;