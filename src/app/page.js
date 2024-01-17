// index.js
"use client";
import React, { useEffect, useState } from 'react';
import LoginSystem from './components/LoginSystem'; // Ajusta la ruta según tu estructura de archivos
import PrincipalServer from './components/PrincipalServer'; // Ajusta la ruta según tu estructura de archivos
import Cookies from 'js-cookie'; // Importa la biblioteca js-cookie
import Loading from './components/loading';
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      // Simula una operación asíncrona, ajusta según tu lógica real
      await new Promise(resolve => setTimeout(resolve, 1000));

      const storedProfileImage = Cookies.get('profileImage');
      setIsLoggedIn(!!storedProfileImage);
      setIsCheckingSession(false);
    };

    checkSession();
  }, []);

  return (
    <div>
      {isCheckingSession ? (
        // Puedes mostrar un componente de carga aquí si es necesario
        <Loading/>
      ) : isLoggedIn ? (
        <PrincipalServer />
      ) : (
        <LoginSystem />
      )}
    </div>
  );
};

export default Home;
