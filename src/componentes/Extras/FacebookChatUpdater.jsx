import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addChat } from "../../redux/features/chat/chatSlice"; // Acción de Reduxción para obtener chats
import { getFacebookPendingChats } from "../../Services/chatService";

const FacebookChatUpdater = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const chats = await getFacebookPendingChats(); // Llamada a la API
                chats.forEach(chat => {
                    dispatch(addChat(chat)); // Guardar en Redux
                });
            } catch (error) {
                console.error("Error al obtener chats:", error);
            }
        };

        // Ejecutar cada 30s
        const interval = setInterval(fetchChats, 30000);

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [dispatch]);

    return null; // No renderiza nada, solo ejecuta la lógica
};

export default FacebookChatUpdater;
