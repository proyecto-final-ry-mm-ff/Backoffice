import { createSlice } from '@reduxjs/toolkit';
import { GetRandomString } from '../../../Services/helperService';
import { disconnectFromHub } from '../../../Services/signalRService';



const userSlice = createSlice({
    name: 'users',
    initialState:
    {
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        logged: localStorage.getItem('logged') === 'true' || false,
        assignedChats: [],
        id: localStorage.getItem('id') || null,
    },
    reducers: {
        login: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('logged', true);
            localStorage.setItem('id', state.id); // Genera un ID único si no existe
            return {
                ...state,
                token: accessToken,
                refreshToken,
                logged: true,
                id: state.id || GetRandomString(12)
            }
        },
        logout: (state) => {
            disconnectFromHub();
            console.log('Se deslogueó')
            localStorage.clear();
            return {
                ...state,
                token: null,
                refreshToken: null,
                logged: false,
                id: null
            }
        },
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;