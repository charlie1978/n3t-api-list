// components/Dogs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dogs() {
  const [dogImage, setDogImage] = useState('');

  useEffect(() => {
    axios.get('https://thedogapi.com/v1/images/search')
      .then((response) => setDogImage(response.data[0]?.url || ''))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Imagen de Perro</h1>
      {dogImage ? <img src={dogImage} alt="Perro" /> : <p>Cargando...</p>}
    </div>
  );
}

export default Dogs;
