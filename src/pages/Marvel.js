import React, { useState, useEffect } from "react"; // eslint-disable-next-line
import { Link } from 'react-router-dom'; // eslint-disable-next-line
import axios from 'axios'; // eslint-disable-next-line

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://gateway.marvel.com/v1/public/characters?apikey=ee8ad3a5ac04f0932be8abe9084cddb8bb1900ac')
      .then((response) => setCharacters(response.data.results))
      .catch((error) => console.log(error));


    // Realiza una solicitud a la API de Marvel para obtener los personajes
    // Usa tu clave de API de Marvel y ajusta la URL de la solicitud según su documentación.
    // Ejemplo: https://gateway.marvel.com/v1/public/characters?apikey=ee8ad3a5ac04f0932be8abe9084cddb8bb1900ac
    //     axios.get('https://developer.marvel.com/docs#!/public/getCreatorCollection_get_0?apikey=ee8ad3a5ac04f0932be8abe9084cddb8bb1900ac')
    // ...
  }, []);
// eslint-disable-next-line
  const handleFilterChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCharacters(filtered);
  };

  return (
    <div>
      <h1>Personajes de Marvel</h1>
     {/* <input type="text" placeholder="Filtrar por nombre" onChange={handleFilterChange} /> */}
      <ul>
        {/* Mapea los personajes filtrados o todos los personajes si no hay filtro */}
        {filteredCharacters.length > 0
          ? filteredCharacters.map((character) => (
              <li key={character.id}>
                <Link to={`/character/${character.id}`}>{character.name}</Link>
              </li> 
            )) 
          : characters.map((character) => (
              <li key={character.id}>
                <Link to={`/character/${character.id}`}>{character.name}</Link>
              </li>
            ))}
            
      </ul>
    </div>
  );
};

export default Characters;
