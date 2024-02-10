import React, { useState, useEffect  } from 'react';
import Image from 'next/image';
import defaulticon from "../sources/profile.jpg";
const AddUser = ({ onAddUser,onChangeLeftComponent }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };
  useEffect(() => {
    // Cuando el componente se monta, establece isVisible a true después de un breve tiempo para iniciar la animación
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1); // Ajusta el tiempo según tus necesidades

    return () => clearTimeout(timeout);
  }, []);  // Se ejecuta solo cuando el componente se monta

  const BackToNormal = () => {
    // Agrega la clase de animación de salida al contenedor del perfil
    setIsFadingOut(true);
  
    // Espera a que termine la animación y luego cambia el componente de la izquierda
    const timeout = setTimeout(() => {
      setIsFadingOut(false);
      onChangeLeftComponent();
    }, 100); // Ajusta el tiempo según tus necesidades
  
    return () => {
      clearTimeout(timeout);
      onChangeLeftComponent(); // Agrega esta línea si la animación falla por alguna razón
    };
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleAddUser = () => {
    if (userId.trim() !== '' && userName.trim() !== '') {
      onAddUser({
        id: userId,
        name: userName,
      });

      setUserId('');
      setUserName('');
    } else {
      console.error('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className={`profile-editor ${isVisible ? 'visible' : ''} ${isFadingOut ? 'fadeOut' : ''} user-profile-template`} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
    <div className="flex flex-col items-center  h-full min-h-screen">
      
      <div className="navbar w-full">
            <div className="flex items-center justify-between px-4 py-2 bg-botongreen text-white">
              <div className="flex items-center mt-2">
                {/* Icono de regreso */}
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  className="text-white h-6 w-6 mr-2 mt-12 mb-2 cursor-pointer ml-2"
                  onClick={BackToNormal}
                >
                  <title >back</title>
                  <path
                    fill="currentColor"
                    d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
                  ></path>
                </svg>
                {/* Texto del Navbar */}
                <h1 className="text-white mt-12 mb-2 text-xl ml-5">Agregar Usuario</h1>
              </div>
            </div>
          </div>
      <div className="mb-4 mt-8">

         <Image
              src={defaulticon}
              alt="Descripción de la imagen" width={240} height={240} 
              className="rounded-full object-cover w-full h-full "
              
            />
      </div>
      <form className="flex flex-col items-center">
        <label className="mb-2">
          ID
          <input
            type="text"
            value={userId}
            onChange={handleUserIdChange}
            className="border border-white p-2 rounded-md"
          />
        </label>
        <label className="mb-2">
          Nombre
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            className="border border-white p-2 rounded-md"
          />
        </label>
        <button
          type="button"
          onClick={handleAddUser}
          className="bg-botongreen text-white px-4 py-2 rounded-md mt-4"
        >
          Guardar
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddUser;
