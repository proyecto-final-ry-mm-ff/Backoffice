import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    refreshToken: null,
    logged: false,
    id: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            state.token = accessToken;
            state.refreshToken = refreshToken;
            state.logged = true;
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.logged = false;
            state.id = null;
        },
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;