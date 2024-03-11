import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./character.css"

function DogBreedsList() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios.get('https://api.thedogapi.com/v1/breeds?limit=80&page=0')
    .then((response) => setBreeds(response.data))
     .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="ttl-hm">Razas de Perros</h1>
      <li className="dog-card-grid">
        {breeds.map((breed) => (
          <li key={breed.id} >
            <Link to={`/breeds/${breed.name}`} target="_blank">
              {/* <img src={breed.id} alt={breed.name} /> 
              {breed.id.image} */}
              {breed.name}
            </Link>
          </li>
        ))}
      </li>
    </div>
  );
}

export default DogBreedsList;
