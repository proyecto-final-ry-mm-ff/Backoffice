import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addChat } from "../../redux/features/chat/chatSlice"; // Acción de Reduxción para obtener chats
import { getFacebookPendingChats } from "../../Services/chatService";

const FacebookChatUpdater = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const chats = await getFacebookPendingChats(); // Llamada a la API
                chats.array.forEach(chat => {
                    dispatch(addChat(chat)); // Guardar en Redux
                });
            } catch (error) {
                console.error("Error al obtener chats:", error);
            }
        };

        // Ejecutar cada 300ms
        const interval = setInterval(fetchChats, 60000);

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [dispatch]);

    return null; // No renderiza nada, solo ejecuta la lógica
};

export default FacebookChatUpdater;
