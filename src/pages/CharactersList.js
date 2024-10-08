
// CharactersList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './character.css'

function CharactersList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then((response) => setCharacters(response.data.results))
      .catch((error) => console.log(error));
      /*console.log(characters); */
}, []);

  return (
    <div>
      <h1 className="ttl-hm">Lista de Personajes</h1>
      <ul className="grid-char">
        {characters.map((character) => (
          <li key={character.id}>
            <Link to={`/character/${character.id}`} target="_blank">
              <img src={character.image} alt={character.name} />
              <p className="nme-char">{character.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharactersList;
/*
// CharactersList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CharactersList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then((response) => setCharacters(response.data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Lista de Personajes</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <Link to={`/character/${character.id}`}>
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharactersList;
*/