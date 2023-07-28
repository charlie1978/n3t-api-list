// CharacterDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState({}); // eslint-disable-next-line
  const history = useHistory();

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => setCharacter(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleViewInNewPage = () => {
    // Abre una nueva pestaña o ventana con la página independiente del personaje
    const win = window.open(`/character/${id}`, '_blank');
    win.focus();
  };

  return (
    <div className="grid-per">
      <h1 className="tit-per">Detalles del Personaje</h1>
      <img className="img-per" src={character.image} alt={character.name} />
      <li className="dat-per">
      <p>Nombre: {character.name}</p>
      <p>Especie: {character.species}</p>
      <p>Estado: {character.status}</p>
      <p>Creado: {character.created}</p>
      {/*<p>Episodios: map({character.episode}<br/>)</p>*/}
      </li>
      <button onClick={handleViewInNewPage}>Ver en otra pestaña</button>
      <button onClick={handleViewInNewPage}>listar capitulos</button>
    </div>
  );
}

export default CharacterDetails;

/*
// CharacterDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => setCharacter(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <h1>Detalles del Personaje</h1>
      <img src={character.image} alt={character.name} />
      <p>Nombre: {character.name}</p>
      <p>Especie: {character.species}</p>
      <p>Estado: {character.status}</p>
    </div>
  );
}

export default CharacterDetails;


/*

// CharacterDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const history = useHistory();

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => setCharacter(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleViewInNewPage = () => {
    // Abre una nueva pestaña o ventana con la página independiente del personaje
    const win = window.open(`/character/${id}`, '_blank');
    win.focus();
  };

  return (
    <div>
      <h1>Detalles del Personaje</h1>
      <img src={character.image} alt={character.name} />
      <p>Nombre: {character.name}</p>
      <p>Especie: {character.species}</p>
      <p>Estado: {character.status}</p>
      <button onClick={handleViewInNewPage}>Ver en otra página independiente</button>
    </div>
  );
}

export default CharacterDetails;


/*
// CharacterDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => setCharacter(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <h1>Detalles del Personaje</h1>
      <img src={character.image} alt={character.name} />
      <p>Nombre: {character.name}</p>
      <p>Especie: {character.species}</p>
      <p>Estado: {character.status}</p>
    </div>
  );
}

export default CharacterDetails;
*/