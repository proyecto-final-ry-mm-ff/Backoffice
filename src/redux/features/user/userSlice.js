import { createSlice } from '@reduxjs/toolkit';
import { GetRandomString } from '../../../Services/helperService';
import { disconnectFromHub } from '../../../Services/signalRService';


const initialState = {
    token: null,
    refreshToken: null,
    logged: false,
    assignedChats: [],
    id: null,
};
/* token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        logged: localStorage.getItem('logged') === 'true' || false,
        assignedChats: [],
        id: localStorage.getItem('id') || null, */
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            state.token = accessToken;
            state.refreshToken = refreshToken;
            state.logged = true;
            /*localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('logged', true);
            localStorage.setItem('id', state.id); // Genera un ID único si no existe
            return {
                ...state,
                token: accessToken,
                refreshToken,
                logged: true,
                id: state.id || GetRandomString(12)
            }*/
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.logged = false;
            state.id = null;
            /*disconnectFromHub();
            console.log('Se deslogueó')
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('logged');
            localStorage.removeItem('id');
            return {
                ...state,
                token: null,
                refreshToken: null,
                logged: false,
                id: null
            }*/
        },
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;