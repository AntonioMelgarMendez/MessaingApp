// components/SelectedChat.js
import React, { useState } from 'react';
import NavbarChat from './NavbarChat';
import TextBox from "./TextBox";
import Footer from './Footer';

const SelectedChat = ({ chat, updateChatMessages }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (messageObject) => {
    // Lógica para enviar mensajes y actualizar el estado global
    updateChatMessages(chat.id, messageObject);
    // Limpiar el campo de nuevo mensaje después de enviar
    setNewMessage('');
  };

  return (
    <div>
      <NavbarChat chat={chat} />
      <TextBox background={chat} initialMessages={chat.messages} />
      <Footer onSendMessage={sendMessage} />
    </div>
  );
};

export default SelectedChat;
