import { createSlice } from '@reduxjs/toolkit';
import { GetRandomString } from '../../../Services/helperService';



const userSlice = createSlice({
    name: 'users',
    initialState:
    {
        token: null,
        refreshToken: null,
        logged: false,
        assignedChats: [],
        // user: null,
         id: null,
        // status: 'idle',
        // error: null,
    },
    reducers: {
        login: (state, action) => {
            // state.token = action.payload.accessToken;
            // state.refreshToken = action.payload.refreshToken;
            // state.logged = true;
            // state.id = GetRandomString(12);
            return {...state, 
                token: action.payload.accessToken,
                 refreshToken:action.payload.refreshToken,
                 logged: true,
                 id:  GetRandomString(12)
            }
        },
        logout: (state) => {
            //  // state.token = null;
            //     state.refreshToken = null;
            //     state.logged = false;
            console.log('Se me deslogueó')
            return {...state, 
                token: null,
                 refreshToken:null,
                 logged: false,
                 id:  null
            }
            // state.user = null;
            // state.id = null;
        },
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;