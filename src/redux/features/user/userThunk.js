import { login, logout } from "./userSlice";
import { loginApi } from "../../../Services/userService";
import { GetRandomString } from "../../../Services/helper/helperService";
import {
  connectToHub,
  disconnectFromHub,
} from "../../../Services/signalRService";
import { clearMyChats } from "../chat/chatSlice";

export const loginThunk = (email, password) => async (dispatch) => {
  try {
    const response = await loginApi(email, password);

    // Actualiza el estado global y localStorage a través del slice
    dispatch(login(response));

    // Conectar al hub
    await connectToHub();
  } catch (error) {
    throw error; // Envia el error al componente
  }
};

export const logoutThunk = () => async (dispatch) => {
  try {
    // Limpiar el almacenamiento local
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("logged");
    localStorage.removeItem("id");

    // Actualizar el estado global
    dispatch(logout());
    dispatch(clearMyChats());

    // Desconectar del backend y detener SignalR
    await disconnectFromHub();

    console.log("Logout completado exitosamente.");
  } catch (error) {
    console.error("Error durante el logout:", error);
  }
};
