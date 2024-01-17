// components/Message.js
import React from 'react';

const Message = ({ text, isSent }) => {
  const messageStyle = {
    backgroundColor: isSent ? '#d9fdd3' : '#ffffff',
    padding: '10px',
    borderRadius: '8px',
    margin: '5px',
    alignSelf: isSent ? 'flex-end' : 'flex-start',
    maxWidth: '300px', // Ajusta el ancho máximo del contenedor del mensaje según tus necesidades
    marginLeft: '8%', // Centra el mensaje a la derecha si es del usuario
    marginRight: '8%', // Centra el mensaje a la izquierda si es del otro usuario
  };

  const contentStyle = {
    textAlign: "left",
    width: '100%',
    overflowWrap: 'break-word', // Permite que las palabras se rompan y se ajusten al contenedor
    whiteSpace: 'pre-wrap', // Maneja el espacio en blanco
    maxWidth: '100%', // Establece el ancho máximo del contenido
  };

  return (
    <div style={messageStyle} className='text-sm'>
      <div style={contentStyle}>{text}</div>
    </div>
  );
};

export default Message;
