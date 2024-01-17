"use client";
import { signInWithGitHub } from '../firebase';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SearchBar from './searchbar';
import ChatList from './ChatList';
import DefaultRight from "./defaultRight";
import SelectedChat from "./SelectedChat";
import Cookies from 'js-cookie'; // Importa la biblioteca js-cookie
import ProfileEditor from "./ProfileEditor";


export default function PrincipalServer({userData,updateUserData,userExists,handleLogOut}) {
  const [chatsData, setChatsData] = useState([
  
      {
        id: 1,
        name: 'Maximiliano Hernández',
        photo: '/sources/profile1.jpg',
        date: "Now",
        backgrounChar: "/sources/background.jpg",
        isSeen: true,
        messages: [
          { text: 'Hola, ¿cómo estás?', isSent: false },
          { text: 'Respuesta de Maximiliano', isSent: true },
          { text: 'Respuesta de Maximiliano', isSent: true },
        ],
        lastMessage: '',
      },
      {
        id: 2,
        name: 'Cristiano Ronaldo',
        photo: '/sources/profile2.jpg',
        lastMessage: '',
        date: "Monday",
        backgrounChar: "/sources/background1.jpg",
        isSeen: true,
        messages: [
          { text: 'Hola, ¿cómo estás?', isSent: false },
          { text: 'Respuesta de CR7', isSent: true },
        ],
      },
      {
        id: 3,
        name: 'Cristiano Ronaldo',
        photo: '/sources/profile2.jpg',
        lastMessage: '',
        date: "Monday",
        backgrounChar: "/sources/background1.jpg",
        isSeen: true,
        messages: [
          { text: 'Hola, ¿cómo estás?', isSent: false },
          { text: 'Respuesta de CR7', isSent: true },
        ],
      },
      {
        id: 4,
        name: 'Cristiano Ronaldo',
        photo: '/sources/profile2.jpg',
        lastMessage: '',
        date: "Monday",
        backgrounChar: "/sources/background1.jpg",
        isSeen: true,
        messages: [
          { text: 'Hola, ¿cómo estás?', isSent: false },
          { text: 'Respuesta de CR7', isSent: true },
        ],
      },
      {
        id: 5,
        name: 'Cristiano Ronaldo',
        photo: '/sources/profile2.jpg',
        lastMessage: '',
        date: "Monday",
        backgrounChar: "/sources/background1.jpg",
        isSeen: true,
        messages: [
          { text: 'Hola, ¿cómo estás?', isSent: false },
          { text: 'Respuesta de CR7', isSent: true },
        ],
      },
      {
        id: 6,
        name: 'Cristiano Ronaldo',
        photo: '/sources/profile2.jpg',
        lastMessage: '',
        date: "Monday",
        backgrounChar: "/sources/background1.jpg",
        isSeen: true,
        messages: [
          { text: 'Hola, ¿cómo estás?', isSent: false },
          { text: 'Respuesta de CR7', isSent: true },
        ],
      },
      {
        id: 7,
        name: 'Cristiano Ronaldo',
        photo: '/sources/profile2.jpg',
        lastMessage: '',
        date: "Monday",
        backgrounChar: "/sources/background1.jpg",
        isSeen: true,
        messages: [
          { text: 'Hola, ¿cómo estás?', isSent: false },
          { text: 'Respuesta de CR7', isSent: true },
        ],
      },

  ]);
  const [userData1, setUserData1] = useState(userData);
  const [selectedChat, setSelectedChat] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showNewComponent, setShowNewComponent] = useState(false);
  // Utiliza useEffect para cargar las credenciales desde las cookies al cargar la página
  useEffect(() => {
    const storedProfileImage = Cookies.get('profileImage');
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);
  chatsData.forEach(chat => {
    if (chat.messages.length > 0) {
      chat.lastMessage = chat.messages[chat.messages.length - 1].text;
    }
  });
  
  const updateUserData1 = (newUserData) => {
    setUserData1((prevUserData) => ({
      ...prevUserData,
      ...newUserData,
    }));
  };
  const handleChatClick = (chatId) => {
    const selectedChatData = chatsData.find((chat) => chat.id === chatId);
    setSelectedChat(selectedChatData);
  };
  const handleChangeLeftComponent = () => {
    setShowNewComponent(!showNewComponent);
    console.log("Nombre", userData1.name);
    console.log("CONTRASEÑA", userData1.password);
    console.log("BACKGROUND", userData1.backgroundImage);
    console.log(userExists);
  };

  const updateChatMessages = (chatId, newMessage) => {
    setChatsData((prevChatsData) => {
      return prevChatsData.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: newMessage.text,
          };
        } 
        return chat;
        
      });
    });
  };
  const handleSignInWithGitHub = async () => {
    try {
      const user = await signInWithGitHub();
      // Actualiza la imagen de perfil en el estado
      setProfileImage(user.photoURL);
      // Almacena la imagen de perfil en las cookies
      Cookies.set('profileImage', user.photoURL);
    } catch (error) {
      console.error('Error al manejar inicio de sesión con GitHub:', error.message);
    }
  };

  return (
    <div className="flex">
          <div className="w-2/5">
          {showNewComponent ? (
            <ProfileEditor profileImage={userData1.backgroundImage}   setProfileImage={setProfileImage} updateUserData={updateUserData} userData={userData1} onChangeLeftComponent={handleChangeLeftComponent} updateUserData1 = {updateUserData1}/>
          ) : (
             <div>
              <Navbar
                
                onChangeLeftComponent={handleChangeLeftComponent} 
                setProfileImage={setProfileImage}
                userData={userData1} 
                handleLogOut={handleLogOut}// Pasa el userData actualizado
              />
              <div className='bg-white'>
              <SearchBar />
              </div>
              <ChatList chats={chatsData}  onChatClick={handleChatClick} />
             </div>
          )}
        </div>
      <div className="w-3/5 bg-whitesmoke">
        <div>
          {selectedChat ? (
            <SelectedChat
              chat={selectedChat}
              updateChatMessages={updateChatMessages}
            />
          ) : (
            <DefaultRight className="p-2">
              
            </DefaultRight>
          )}
        </div>
      </div>
    </div>
  );
}
