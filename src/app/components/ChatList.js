// components/ChatList.js
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const ChatList = ({ chats, onChatClick }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  // Función para manejar el clic en un elemento
  const handleChatClick = (chatId) => {
    setSelectedChat(chatId);
    // Llamamos a la función proporcionada por prop con el ID del chat
    onChatClick && onChatClick(chatId);
  };
  return (
    <div className="h-[445px] overflow-y-auto scrollbar-hide z-1">
      {chats.map((chat) => (
            <div
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className={`flex items-center p-2 bg-white cursor-pointer ${
              selectedChat === chat.id ? 'bg-whitesmoke border-gray-200' : 'hover:bg-how'
            }`}
          >
          <Image
            width={70}
            height={70}
            src={chat.photo}
            alt={`Avatar de ${chat.name}`}
            className="w-14 h-14 object-cover mr-4 rounded-full" 
          />
          <div className="flex flex-col w-full">
 
          <div className="flex items-center ">
            <p className="text-gray-800 ">{chat.name}</p>
            <p className="text-gray-500  sm:mr-8 ml-auto text-xs ">{chat.date}</p>
          </div>
     
            <div className="flex items-center border-b border-how justify-start hover:border-gray-200  ">
              {chat.isSeen ? (
                <svg
         
                  className="w-5 h-5 text-blue-500  mb-2.5"
                >
                  <path fill="currentColor" d="M17.394,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-0.427-0.388c-0.171-0.167-0.431-0.15-0.578,0.038L7.792,13.13 c-0.147,0.188-0.128,0.478,0.043,0.645l1.575,1.51c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C17.616,5.456,17.582,5.182,17.394,5.035z M12.502,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-2.614-2.556c-0.171-0.167-0.447-0.164-0.614,0.007l-0.505,0.516 c-0.167,0.171-0.164,0.447,0.007,0.614l3.887,3.8c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C12.724,5.456,12.69,5.182,12.502,5.035z"></path>
                </svg>
              ) : (
                <svg

                className="w-5 h-5 text-gray-400  mb-2.5"
              >
                <path fill="currentColor" d="M17.394,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-0.427-0.388c-0.171-0.167-0.431-0.15-0.578,0.038L7.792,13.13 c-0.147,0.188-0.128,0.478,0.043,0.645l1.575,1.51c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C17.616,5.456,17.582,5.182,17.394,5.035z M12.502,5.035l-0.57-0.444c-0.188-0.147-0.462-0.113-0.609,0.076l-6.39,8.198 c-0.147,0.188-0.406,0.206-0.577,0.039l-2.614-2.556c-0.171-0.167-0.447-0.164-0.614,0.007l-0.505,0.516 c-0.167,0.171-0.164,0.447,0.007,0.614l3.887,3.8c0.171,0.167,0.43,0.149,0.577-0.039l7.483-9.602 C12.724,5.456,12.69,5.182,12.502,5.035z"></path>
              </svg>
              )}
            <p className="text-gray-500 text-sm mb-2.5 hover: ">{chat.lastMessage}</p>
            </div>
          </div>
        </div>
      ))}
    <div className='flex items-center justify-center text-gray-500 text-xs mt-2 mb-2'>
      <div className="flex items-center">
        <svg className="w-5 h-5 text-gray-400 ">
          <path fill="#3b4a54" d="M9.54004 3.4668C9.54004 2.87891 9.39421 2.33887 9.10254 1.84668C8.81543 1.34993 8.4235 0.958008 7.92676 0.670898C7.43457 0.379232 6.89681 0.233398 6.31348 0.233398C5.72559 0.233398 5.18327 0.379232 4.68652 0.670898C4.19434 0.958008 3.80241 1.34993 3.51074 1.84668C3.22363 2.33887 3.08008 2.87891 3.08008 3.4668V4.7041C3.05273 4.71322 2.99805 4.73828 2.91602 4.7793C2.61979 4.9388 2.39421 5.16439 2.23926 5.45605C2.15267 5.61556 2.09115 5.79102 2.05469 5.98242C2.01823 6.17383 2 6.45866 2 6.83691V9.25C2 9.62826 2.01823 9.91309 2.05469 10.1045C2.09115 10.2959 2.15267 10.4714 2.23926 10.6309C2.39421 10.9225 2.61979 11.1481 2.91602 11.3076C3.07096 11.3942 3.24414 11.4557 3.43555 11.4922C3.63151 11.5286 3.91634 11.5469 4.29004 11.5469H8.33008C8.70378 11.5469 8.98633 11.5286 9.17773 11.4922C9.3737 11.4557 9.54915 11.3942 9.7041 11.3076C9.99577 11.1527 10.2214 10.9271 10.3809 10.6309C10.4674 10.4714 10.529 10.2959 10.5654 10.1045C10.6019 9.91309 10.6201 9.62826 10.6201 9.25V6.83691C10.6201 6.45866 10.6019 6.17383 10.5654 5.98242C10.529 5.79102 10.4674 5.61556 10.3809 5.45605C10.2214 5.15983 9.99577 4.93424 9.7041 4.7793C9.62207 4.73828 9.56738 4.71322 9.54004 4.7041V3.4668ZM4.37207 3.4668C4.37207 3.11589 4.45866 2.79232 4.63184 2.49609C4.80501 2.19531 5.03971 1.95833 5.33594 1.78516C5.63672 1.61198 5.96257 1.52539 6.31348 1.52539C6.66439 1.52539 6.98796 1.61198 7.28418 1.78516C7.5804 1.95833 7.8151 2.19531 7.98828 2.49609C8.16146 2.79232 8.24805 3.11589 8.24805 3.4668V4.54004H4.37207V3.4668Z"></path>
        </svg>
        <span>Tus mensajes personales están&nbsp;</span>
        <a role="button" tabIndex="0" className="text-blue-400" rel="noreferrer noopener" target="_blank" data-tab="4">cifrados de extremo a extremo</a>
        .
      </div>
    </div>
    </div>
  );
};

export default ChatList;