export default Cats;
// components/Cats.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cats() {
    const url = `https://api.thecatapi.com/v1/images/search?limit=20`;
    const api_key = "live_F4QTP30bqcYE3JWeC6t8CtcJb0Qmq6N19rtsTM8CXbUBMmmNKfyfj61amUbK9DC0"
    const [catImage, setCatImage] = useState('');

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/images/search?limit=20?x-api-key={"api-key"}')
      .then((response) => setCatImage(response.data[0]?.url&.x-api-key='api_key'))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Imagen de Gato</h1>
      {catImage ? <img src={catImage} alt="Gato" /> : <p>Cargando...</p>}
    </div>
  );
}

/*

var Cats = {
    "url": "https://api.thecatapi.com/v1/images/search?&limit=10",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "x-api-key": "example-api-key"
    },
  };
  
  axios.ajax(Cats).done(function (response) {
    console.log(response);
  });
/*
*/