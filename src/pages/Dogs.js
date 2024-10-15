import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dogs.css'// eslint-disable-next-line

function DogBreedsList() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios.get('https://api.theCatapi.com/v1/breeds?limit=80&page=0')
    .then((response) => {
      setBreeds(response.data);
    });
  }, []);

  return (
    <div>
      <h1 className="ttl-hm">  Razas de Gatos  </h1>
      <ul className="dog-card-grid" >
        {breeds.map((breed) => (
          <li key={breed.id}>
            <Link to={`/Breeds/${breed.name}`}>
              {breed.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogBreedsList;
