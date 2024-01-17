"use client";
// components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Puedes realizar acciones adicionales según la entrada del usuario, como buscar en tiempo real.
  };

  return (
    <div className="flex items-center border-b border-whitesmoke  z-100">
      <div className="relative flex items-center border border-whitesmoke rounded-md m-2 w-full bg-whitesmoke">
        <div className="flex items-center mx-3">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="#54656f" d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z "></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Busca un chat o inicia uno nuevo"
          value={searchTerm}
          onChange={handleSearchChange}
          className="py-1 bg-whitesmoke w-64 h-8 border-none outline-none text-center text-gray-800" // Ajusta los valores según tu preferencia
        />
      </div>
      <svg width="24" height="24" viewBox="0 0 24 24" className="ml-2 mr-2">
        <path fill="#8696a0" d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z"></path>
      </svg>
    </div>
  );
};

export default SearchBar;
