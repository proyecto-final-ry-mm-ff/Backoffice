
import React from 'react';
import { useSelector } from 'react-redux';
import '../../estilos/chat.css';

export default function ChatList({ onChatSelect }) {
    const chatStore = useSelector((state) => state.chatStore); 
    const chats = chatStore.chatList;

    const handleChatClick = (chatId) => {
        onChatSelect(chatId); // Llama a la función con el chat seleccionado
    };

    return (
        <div className="chat-list">
            <h3 className="chat-list-title">Chats</h3>
            <ul>
                {chats?.length > 0 ? (
                    chats.map((chat) => (
                        <li
                            key={chat.id}
                            className="chat-list-item"
                            onClick={() => handleChatClick(chat.id)}
                        >
                            <img
                                src={chat.avatar || "https://via.placeholder.com/40"}
                                alt="Avatar"
                                className="chat-avatar"
                            />
                            <div className="chat-info">
                                <p className="chat-name">{chat.name || `Chat ${chat.id}`}</p>
                                <p className="chat-preview">{chat.preview || "Mensaje previo..."}</p>
                            </div>
                            {chat.unreadCount > 0 && (
                                <span className="chat-unread-count">{chat.unreadCount}</span>
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
