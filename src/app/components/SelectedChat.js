import React, { useState, useEffect } from 'react';
import NavbarChat from './NavbarChat';
import TextBox from "./TextBox";
import Footer from './Footer';

const SelectedChat = ({ chat, updateChatMessages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState(chat.messages);

  useEffect(() => {
    // Actualizar los mensajes locales cuando se cambia el chat actual
    setLocalMessages(chat.messages);
  }, [chat.messages]);

  const sendMessage = (messageObject) => {
    // Lógica para enviar mensajes y actualizar el estado global
    updateChatMessages(chat.id, messageObject);

    // Agregar el nuevo mensaje localmente
    setLocalMessages((prevMessages) => [...prevMessages, messageObject]);

    // Limpiar el campo de nuevo mensaje después de enviar
    setNewMessage('');
  };

  return (
    <div>
      <NavbarChat chat={chat} />
      <TextBox key={chat.id} background={chat} messages={localMessages} />
      <Footer onSendMessage={sendMessage} />
    </div>
  );
};

export default SelectedChat;
