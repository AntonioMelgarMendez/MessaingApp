import React, { useState, useRef, useEffect } from 'react';

const Message = ({ text, isSent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Cerrar el menú si se hace clic fuera de él
        setIsMenuVisible(false);
      }
    };

    // Agregar el event listener al montar el componente
    document.addEventListener('click', handleClickOutside);

    // Eliminar el event listener al desmontar el componente
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = (option) => {
    // Aquí puedes manejar la lógica para cada opción del menú
    console.log(`Menú clickeado: ${option}`);
    // Por ejemplo, puedes cerrar el menú después de hacer clic en una opción
    setIsMenuVisible(false);
  };

  const messageStyle = {
    backgroundColor: isSent ? '#d9fdd3' : '#ffffff',
    padding: '10px',
    borderRadius: '8px',
    margin: '5px',
    alignSelf: isSent ? 'flex-end' : 'flex-start',
    maxWidth: '300px',
    position: 'relative',
    marginLeft: '8%', // Centra el mensaje a la derecha si es del usuario
    marginRight: '8%', // Centra el mensaje a la izquierda si es del otro usuario
  };

  const contentStyle = {
    textAlign: 'left',
    width: '100%',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    maxWidth: '100%',
  };

  const menuStyle = {
    position: 'absolute',
    top: '-7px', // Ajustado para bajar los tres puntos
    right: '0px', // Ajustado para centrar un poco mejor
    cursor: 'pointer',
    padding: '5px', // Agregado para espacio alrededor de los tres puntos
    backgroundColor: 'transparent', // Fondo semitransparente
    borderRadius: '4px', // Bordes redondeados
  };

  const optionsStyle = {
    position: 'absolute',
    top: '30px', // Ajusta la posición del menú desplegable
    right: '0px',
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: '4px', // Bordes redondeados
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Sombra sutil
    padding: '8px',
    display: isMenuVisible ? 'block' : 'none',
  };

  return (
    <div
      style={messageStyle}
      className='text-sm hover:cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          style={menuStyle}
          onClick={() => setIsMenuVisible(!isMenuVisible)}
          ref={menuRef}
        >
          {/* SVG para el icono */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="#a2acb2" // Cambiar color aquí
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Opciones del menú desplegable */}
      {isMenuVisible && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-md text-gray-600 text-sm" style={{ zIndex: 1000, width: '200px', marginLeft: '-40px' ,marginTop: '20px'}}>
          {/* Aquí puedes agregar las opciones del menú */}
          <div className="py-2 px-4 hover:cursor-pointer  hover:bg-gray-100" onClick={() => handleMenuItemClick('Option 1')}>
            Info. del mensaje
          </div>
          <div className="py-2 px-4 hover:cursor-pointer hover:bg-gray-100" onClick={() => handleMenuItemClick('Option 2')}>
            Responder
          </div>
          <div className="py-2 px-4 hover:cursor-pointer  hover:bg-gray-100" onClick={() => handleMenuItemClick('Option 3')}>
            Reaccionar
          </div>
          <div className="py-2 px-4 hover:cursor-pointer  hover:bg-gray-100" onClick={() => handleMenuItemClick('Option 3')}>
            Reenviar
          </div>
          <div className="py-2 px-4 hover:cursor-pointer  hover:bg-gray-100" onClick={() => handleMenuItemClick('Option 3')}>
            Fijar
          </div>
          <div className="py-2 px-4 hover:cursor-pointer  hover:bg-gray-100" onClick={() => handleMenuItemClick('LogOut')}>
            Destacar
          </div>
          <div className="py-2 px-4 hover:cursor-pointer hover:bg-gray-100" onClick={() => handleMenuItemClick('Option 3')}>
            Eliminar
          </div>
        </div>
      )}

      <div style={contentStyle}>{text}</div>
    </div>
  );
};

export default Message;
