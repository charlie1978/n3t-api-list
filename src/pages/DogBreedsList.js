import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./character.css"

function DogBreedsList() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios.get('/api-dog/api/breeds/list/all')
    .then((response) => {
      console.log('API response:', response.data);
      const breedsArray = [];
      Object.entries(response.data.message).forEach(([breed, subs]) => {
        if (subs.length === 0) {
          breedsArray.push({ display: breed, api: breed });
        } else {
          subs.forEach(sub => breedsArray.push({ display: `${sub} ${breed}`, api: `${breed}/${sub}` }));
        }
      });
      console.log('Breeds array:', breedsArray);
      setBreeds(breedsArray);
    })
     .catch((error) => {
       console.log('Error fetching breeds:', error);
       setBreeds([]); // Mostrar lista vacía si hay error
     });
  }, []);

  return (
    <div>
      <h1 className="ttl-hm">Razas de Perros</h1>
      {breeds.length === 0 ? (
        <p>Cargando razas...</p>
      ) : (
        <ul className="dog-card-grid">
          {breeds.map((breed) => (
            <li key={breed.api} >
              <Link to={`/breeds/${encodeURIComponent(breed.api)}`}>
                {breed.display}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DogBreedsList;
