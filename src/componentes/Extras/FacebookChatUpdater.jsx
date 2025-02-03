import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addChat } from "../redux/features/chat/chatSlice"; // Acción de Redux
import { getChats } from "../Services/chatService"; // Función para obtener chats

const FacebookChatUpdater = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const chats = await getChats(); // Llamada a la API
                chats.array.forEach(chat => {
                    dispatch(addChat(chat)); // Guardar en Redux
                });
            } catch (error) {
                console.error("Error al obtener chats:", error);
            }
        };

        // Ejecutar cada 300ms
        const interval = setInterval(fetchChats, 300);

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [dispatch]);

    return null; // No renderiza nada, solo ejecuta la lógica
};

export default FacebookChatUpdater;
