import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, RegistroApi, fetchDepartamentos, fetchCiudades, fetchCategorias, fetchEventos, addEventoApi } from '../../Services/services';
import { act } from 'react';


//Crear una acción asíncrona para el login
export const login = createAsyncThunk('user/login', async (user) => {
    const response = await loginApi(user);
    return response;
});

/*
// Crear una acción asíncrona para el registro
export const registro = createAsyncThunk('user/registro', async (newUser) => {
    const response = await RegistroApi(newUser);
    return response;
});

// Crear una acción asíncrona para obtener los departamentos
export const getDepartamentos = createAsyncThunk('location/getDepartamentos', async () => {
    const response = await fetchDepartamentos();
    return response;
});

// Crear una acción asíncrona para obtener las ciudades según el departamento
export const getCiudades = createAsyncThunk('location/getCiudades', async (idDepartamento) => {
    const response = await fetchCiudades(idDepartamento);
    return response;
});

// Acción asíncrona para obtener categorías
export const getCategorias = createAsyncThunk('event/getCategorias', async () => {
    const response = await fetchCategorias();
    return response;
});


// Acción asíncrona para agregar un evento
export const addEvento = createAsyncThunk('event/addEvento', async (evento) => {
    const response = await addEventoApi(evento);
    return response;
});

// Acción asíncrona para cargar la lista de eventos
export const getEventos = createAsyncThunk('event/getEventos', async () => {
    const response = await fetchEventos();
    return response;
});

// Crear un slice para manejar el estado del usuario
*/const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, token: null, id: null, status: 'idle', error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.id = null;
        }
    },/*
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.usuario;
                state.token = action.payload.token;
                state.id = action.payload.id;
            })
            .addCase(registro.fulfilled, (state, action) => {
                state.user = action.payload.usuario;
                state.token = action.payload.token;
                state.id = action.payload.id;
            })
            .addCase(registro.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }*/
});
/*
// Crear un slice para manejar el estado de la ubicación (departamentos y ciudades)
const locationSlice = createSlice({
    name: 'location',
    initialState: { departamentos: [], ciudades: [], status: 'idle', error: null },
    extraReducers: (builder) => {
        builder
            .addCase(getDepartamentos.fulfilled, (state, action) => {
                state.departamentos = action.payload.departamentos; // Aquí se extrae el array de departamentos
            })
            .addCase(getCiudades.fulfilled, (state, action) => {
                state.ciudades = action.payload.ciudades; // Asume que la respuesta tiene una estructura parecida
            });
    }
});

// Crear un slice para manejar el estado de eventos
const eventSlice = createSlice({
    name: 'event',
    initialState: { categorias: [], eventos: [], status: 'idle', error: null },
    reducers: {

        borrarEvento: (state, action) => {
            const idEventoBorrar = action.payload
            state.eventos = state.eventos.filter(e => e.id != idEventoBorrar);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategorias.fulfilled, (state, action) => {
                state.categorias = action.payload;
            })
            .addCase(getEventos.fulfilled, (state, action) => {
                state.eventos = action.payload;
            })
            .addCase(addEvento.fulfilled, (state, action) => {
                const evento = action.meta.arg;

                const nuevoEvento = {
                    id: action.payload.idEvento,
                    idCategoria: evento.idCategoria,
                    idUsuario: evento.idUsuario,
                    detalle: evento.detalle,
                    fecha: evento.fecha,
                }

                const nuevaLista = [...state.eventos, nuevoEvento];
                state.eventos = nuevaLista;
            });
    }
});
*/
//export const eventReducer = eventSlice.reducer;
//export const { agregarEvento, borrarEvento } = eventSlice.actions;
export const userReducer = userSlice.reducer;
//export const locationReducer = locationSlice.reducer;
//export const { logout } = userSlice.actions; 
