import { GetBearerToken } from "./helper/helperService";
import { store } from "../redux/store";
import { assignChat, addMessageToChat } from "../redux/features/chat/chatSlice";

const urlChat = "http://localhost:5015/chat";

// Obtener un chat en particular (sirve para conseguir todos los mensajes previos)
export const getChat = async (chatId) => {
  const token = GetBearerToken();
  const response = await fetch(`${urlChat}/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Error al obtener chats");
  return await response.json();
};

export const updateChat = async (chat) => {
  const token = GetBearerToken();
  const chatUpdateDto = {
    chatId: chat.id,
    customerId: chat.customerId,
    status: chat.status,
    messages: [],
  };
  const response = await fetch(`${urlChat}/${chat.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify(chatUpdateDto),
  });

  await response.json();
  if (response.ok) {
    return true;
  }

  return false;
};

export const saveMessageToChat = async (chatId, message) => {
  const token = GetBearerToken();
  try {
    const response = await fetch(`${urlChat}/${chatId}/message`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("No se pudo guardar el mensaje en la base de datos.");
    }

    console.log("Mensaje guardado en la base de datos.");
  } catch (err) {
    console.error("Error al guardar el mensaje:", err);
  }
};
