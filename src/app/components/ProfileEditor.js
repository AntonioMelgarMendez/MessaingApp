import React, { useState, useEffect } from 'react';
import "../styke/profileeditor.css";
import Image from 'next/image';
const UserProfileTemplate = ({ profileImage, setProfileImage,updateUserData, userData, onChangeLeftComponent,updateUserData1 }) => {
    const [userImage, setUserImage] = useState(profileImage);
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

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
    
      const handleUpdateProfile = () => {
        // Verifica si newName y newPassword están vacíos
        const updatedName = newName !== '' ? newName : userData.name;
        const updatedPassword = newPassword !== '' ? newPassword : userData.password;
      
        // Crea un nuevo objeto con los datos actualizados
        const updatedUserData = {
          name: updatedName,
          password: updatedPassword,
          backgroundImage: userImage,
        };
      
        console.log(updatedUserData);
      
        // Llama a la función para actualizar los datos del usuario
        updateUserData(userData, updatedUserData);
        updateUserData1(updatedUserData);
        BackToNormal(); // Otros campos que desees actualizar
      };
      
    const handleImageChange = (e) => {
      const file = e.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage = reader.result;
          setProfileImage(newImage); // Actualiza la imagen del perfil en el componente padre
          setUserImage(newImage); // Actualiza la imagen local en UserProfileTemplate
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <div className={`profile-editor ${isVisible ? 'visible' : ''} ${isFadingOut ? 'fadeOut' : ''} user-profile-template`} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="navbar">
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
                <h1 className="text-white mt-12 mb-2 text-xl ml-5">Perfil</h1>
              </div>
            </div>
          </div>
      <div className="user-profile-content">
        {/* Foto de perfil */}
        <div className="profile-picture-container">
          <div className="relative rounded-full overflow-hidden w-48 h-48 mx-auto mt-7">
            <Image
              src={userImage}
              alt="Descripción de la imagen" width={60} height={60} 
              onClick={() => document.getElementById('profileImageInput').click()}
            />
            {/* Icono de cámara para indicar que se puede cambiar la imagen */}
            <label
              htmlFor="profileImageInput"
              className="absolute bottom-0 right-0 bg-green-500 p-2 cursor-pointer rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </label>
            {/* Input de tipo file para seleccionar la imagen */}
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="mb-4 bg-white mt-4 p-2">
          <label htmlFor="newName" className="text-greenhard block ml-5 mb-2 text-sm">
            Tu nombre
          </label>
          <input
            type="text"
            id="newName"
            value={newName}
            placeholder={userData.name}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md ml-2 border-none"
          />
        </div>
        <div className="mb-4 bg-white mt-4 p-2">
          <label htmlFor="newPassword" className="text-greenhard block ml-5 mb-2 text-sm">
            Tu contraseña
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            placeholder={userData.password}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md ml-2 border-none"
          />
        </div>

        {/* Botón para actualizar el perfil */}
        <button
          type="button"
          className="bg-botongreen text-white px-4 py-2 rounded-md hover:bg-botongreen mb-2 w-full"
          onClick={handleUpdateProfile}
        >
          Actualizar Perfil
        </button>
     
      </div>
      
    </div>
  );
};

export default UserProfileTemplate;
