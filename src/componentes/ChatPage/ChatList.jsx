
import React from 'react';
import { useSelector } from 'react-redux';
import '../../estilos/chat.css';

export default function ChatList({ onChatSelect, isAssignedChatsList }) {
    const chatStore = useSelector((state) => state.chatStore);
    const chats = chatStore.chatList;

    const userStore = useSelector((state) => state.userStore);
    const assignedChats = userStore.user.assignedChats;

    const chatsToRender = isAssignedChatsList ? assignedChats : chats;

    const handleChatClick = (chat) => {
        onChatSelect(chat.id); // Llama a la función con el chat seleccionado
    };

    return (
        <div className="chat-list">
            <h3 className="chat-list-title">Chats</h3>
            <ul>
                {chatsToRender?.length > 0 ? (
                    chatsToRender.map((chat) => (
                        <li
                            key={chat.id}
                            className="chat-list-item"
                            onClick={() => handleChatClick(chat)}
                        >
                            <img
                                src={chat.avatar || "https://via.placeholder.com/40"}
                                alt="Avatar"
                                className="chat-avatar"
                            />
                            <div className="chat-info">
                                <p className="chat-name">{`${chat?.customer?.name} - ${chat?.customer?.phone}`}</p>
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
