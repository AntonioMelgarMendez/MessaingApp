// components/TextBox.js
import React, { useState, useEffect, useRef } from 'react';
import Message from "./message";

const TextBox = ({ background, initialMessages }) => {
  const { backgrounChar } = background;
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    setMessages(initialMessages);
    scrollToBottom();
  }, [initialMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addLocalMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const textBoxStyle = {
    backgroundImage: `url(${backgrounChar})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '430px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div
      ref={messagesContainerRef}
      style={textBoxStyle}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            alignSelf: message.isSent ? 'flex-end' : 'flex-start',
            width: '100%',
            display: 'flex',
            justifyContent: message.isSent ? 'flex-end' : 'flex-start',
          }}
        >
          <Message text={message.text} isSent={message.isSent} />
        </div>
      ))}
    </div>
  );
};

export default TextBox;
