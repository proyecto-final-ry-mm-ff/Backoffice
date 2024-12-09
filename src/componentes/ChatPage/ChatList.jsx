
import React from 'react';
import { useSelector } from 'react-redux';
import '../../estilos/chat.css';

export default function ChatList({ onChatSelect, isAssignedChatsList=false }) {
    const chatStore = useSelector((state) => state.chatStore);
    const chats = chatStore.chatList;
    const assignedChats = chatStore.assignedChats;

    const chatsToRender = isAssignedChatsList ? assignedChats : chats.filter(c=>c.assigned === false);

//    if(isAssignedChatsList){
//         console.log('CHattis',{assignedChats})
//     }

    const handleChatClick = (chat) => {
        onChatSelect(chat); // Llama a la función con el chat seleccionado
    };

    return (
        <div className="chat-list">
            <h3 className="chat-list-title">Chats { isAssignedChatsList && ' asignados'}</h3>
            <ul>
                {chatsToRender && chatsToRender?.length > 0 ? (
                    chatsToRender.map((chat) => (
                        <li
                            key={chat.id}
                            className="chat-list-item"
                            onClick={() => handleChatClick(chat)}
                        >
                            <img
                                src={chat?.avatar || "https://via.placeholder.com/40"}
                                alt="Avatar"
                                className="chat-avatar"
                            />
                            <div className="chat-info">
                                <p className="chat-name">{`${chat?.customer?.name} - ${chat?.customer?.phone}`}</p>
                                <p className="chat-preview">{chat?.preview || "Mensaje previo..."}</p>
                            </div>
                            {chat?.unreadCount > 0 && (
                                <span className="chat-unread-count">{chat?.unreadCount}</span>
                            )}
                        </li>
                    ))
                ) : (
                    <p className="no-chats">No hay chats disponibles</p>
                )}
            </ul>
        </div>
    );
}
