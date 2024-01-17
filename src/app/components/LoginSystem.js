import React, { useState, useEffect } from 'react';
import { signInWithGitHub, signInWithGoogle } from '../firebase';
import PrincipalServer from './PrincipalServer';

import "../styke/login.css";
const LoginSystem = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [userExists, setUserExists] = useState([
    {
      name: 'juan',
      password: 'mayeli',
      backgroundImage: '/sources/background1.jpg',
    },
    {
      name: 'pedro',
      password: 'mayeli',
      backgroundImage: '/sources/background1.jpg',
    },
  ]);
  useEffect(() => {
    const sessionLogin = sessionStorage.getItem('sessionLogin');
    if (sessionLogin) {
      setIsLoggedIn(true);
    }
  }, []);
  
  
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      setIsLoggedIn(true);
      sessionStorage.setItem('sessionLogin', 'true');
    } catch (error) {
      console.error('Error al manejar inicio de sesión con Google:', error.message);
    }
  };

  const handleSignInWithGitHub = async () => {
    try {
      await signInWithGitHub();
      setIsLoggedIn(true);
      sessionStorage.setItem('sessionLogin', 'true');
    } catch (error) {
      console.error('Error al manejar inicio de sesión con GitHub:', error.message);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    setName('');  // Limpiar el nombre
    setPassword('');  // Limpiar la contraseña
    setConfirmPassword('');  // Limpiar la confirmación de contraseña
    setProfileImage(null);  // Limpiar la imagen de perfil
    setError(null);  // Limpiar el mensaje de error
    setIsSignUp(true);
  };
  
  const handleGoBack = () => {
    setName('');  // Limpiar el nombre
    setPassword('');  // Limpiar la contraseña
    setConfirmPassword('');  // Limpiar la confirmación de contraseña
    setProfileImage(null);  // Limpiar la imagen de perfil
    setError(null);  // Limpiar el mensaje de error
    setIsSignUp(false);
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
  
      // Actualiza el estado userData con la nueva URL de la imagen
      setUserData((prevUserData) => ({ ...prevUserData, backgroundImage: imageUrl }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const areFieldsFilled = () => {
    return name && password && confirmPassword;
  };

  const handleLogIn = () => {

    if (!name || !password || (isSignUp && !confirmPassword)) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    else if (isSignUp) {
      // ... (lógica anterior)
      if (password !== confirmPassword ) {
        setError('Las contraseñas no coinciden.');
        return;
      }
      else {
      const existingUser = userExists.find((user) => user.name === name);

      if (!existingUser) {
        const newUser = {
          name,
          password,
          backgroundImage: profileImage, 
          // Otros datos del usuario que desees incluir
        };
       
        // Actualiza el estado userData con la nueva imagen
        setUserData(newUser);

        userExists.push(newUser);
        if(newUser.backgroundImage !== null){
          newUser.backgroundImage= URL.createObjectURL(profileImage);
        }
        else {
          newUser.backgroundImage =defaultProfileImage;
        }
        setIsSignUp(false);
        setIsLoggedIn(true);
        sessionStorage.setItem('sessionLogin', 'true');

      } else {
        setError('El usuario ya existe.');
      }
     }
    } 
    else {
      // Lógica de inicio de sesión
      const existingUser = userExists.find((user) => user.name === name);
    

    
      if (existingUser) {
        const enteredPassword = password.toLowerCase();
        const userPassword = existingUser.password.toLowerCase();
    
       
    
        if (enteredPassword === userPassword) {
          // Establecer el usuario encontrado como userData
          setUserData(existingUser);
    
          setIsLoggedIn(true);
          sessionStorage.setItem('sessionLogin', 'true');
         
        } else {
          setError('Contraseña incorrecta.');
        }
      } else {
        setError('Nombre de usuario no encontrado.');
      }
    }
  };
  const updateUserDataArray = (userNameToUpdate, editedUserData) => {
    setUserExists((prevUserExists) => {
      return prevUserExists.map((user) => {
        if (user.name.toLowerCase() === userNameToUpdate.name.toLowerCase()) {
          // Actualiza todos los datos del usuario, incluyendo nombre y contraseña
          return {
            ...user,
            ...editedUserData,
            backgroundImage: editedUserData.backgroundImage

            // Otros campos que desees actualizar
          };
        }

        console.log(userExists);
        return user;
      });
    });
  };
  const handleLogOut = () => {
  
    sessionStorage.removeItem('sessionLogin');
    setIsLoggedIn(false);
    <LoginSystem/>;
 
  };
  const defaultProfileImage = '/sources/profile.jpg';

  if (isLoggedIn) {
    return <PrincipalServer userData={userData} updateUserData={updateUserDataArray} userExists={userExists} handleLogOut={handleLogOut} />;
  }

  if (isSignUp) {
    return (
      <div className={`flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat shadow-lg ${isLoggedIn ? 'fadeIn' : ''}`} style={{ backgroundImage: 'url("/sources/backgroundDefault.jpg")' }}>
        <div className="bg-gray-200 rounded-md p-8">
          <h1 className="text-3xl font-semibold mb-6 text-center">Register</h1>
          <div className="mb-4">
              <div className="relative rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
              <img
                src={profileImage ? URL.createObjectURL(profileImage) : defaultProfileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {/* Icono de cámara para indicar que se puede cambiar la imagen */}
              <label
                htmlFor="profileImage"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </label>
              {/* Input de tipo file para seleccionar la imagen */}
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => handleNameChange(e)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          {/* Nuevo campo para la foto de perfil */}

          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600   mb-2 w-full"
          onClick={handleLogIn}
          >
            Next
          </button>
          {error && <p className="text-red-500 text-center text-sm overflow-hidden max-w-full">{error}</p>}
          <button
            type="button"
            className="text-blue-500 cursor-pointer underline justify-center text-center"
            onClick={handleGoBack}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat shadow-lg" style={{ backgroundImage: 'url("/sources/backgroundDefault.jpg")' }}>
      <div className="bg-gray-200 rounded-md p-8">
        <div className="mb-6">
          {/* Título centrado */}
          <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        </div>
        
        <div className="mb-4">
          {/* Espacio para el nombre de usuario */}
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => handleNameChange(e)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          {/* Espacio para la contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600  mb-2 w-full"
         onClick={handleLogIn }
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center text-sm overflow-hidden max-w-full">{error}</p>}
        <p className='text-gray-600  text-center mt-2'>Or</p>
        <div className="flex flex-col mb-4">
          {/* Botones de inicio de sesión con redes sociales */}
         
          <button
            type="button"
            className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 w-full"
            onClick={handleSignInWithGitHub}
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Github
          </button>
          <button
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-full"
            onClick={handleSignInWithGoogle}
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
        {/* Botón de inicio de sesión */}

        {/* Mensaje "Don't have an account?" */}
        <p className="mt-4 text-center text-gray-600">Don't have an account?</p>
        {/* Enlace "Sign Up" */}
        <p className="text-blue-500 cursor-pointer text-center underline " onClick={handleSignUp}>
          Sign Up
        </p>
      </div>
    </div>
  );
};

export default LoginSystem;
