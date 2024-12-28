import { login, logout } from './userSlice';
import { loginApi } from '../../../Services/userService';
import { GetRandomString } from '../../../Services/helperService';
import { connectToHub, disconnectFromHub } from '../../../Services/signalRService';
export const loginThunk = (email, password) => async (dispatch) => {
    try {
        const response = await loginApi(email, password);

        // Si el login es exitoso, actualiza el store
        dispatch(login(response));
        connectToHub();
        // Generar ID único si no existe
        const userId = localStorage.getItem('id') || GetRandomString(12);

        // Guardar datos en el localStorage
        localStorage.setItem('id', userId);
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('logged', true);

    } catch (error) {
        console.error("Error en loginThunk:", error);

        // Opcional: Desencadenar alguna acción de error o rollback si fuera necesario
        dispatch(logout());
        disconnectFromHub();
    }
};

export const logoutThunk = () => async (dispatch) => {
    try {
        // Limpiar el almacenamiento local
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('logged');
        localStorage.removeItem('id');

        dispatch(logout());
        disconnectFromHub();
    } catch (error) {
        console.error('Error durante el logout:', error);
    }
};