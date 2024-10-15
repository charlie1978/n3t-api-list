import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BreedDetails() { // eslint-disable-next-line
  const { breed } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);

  useEffect(() => {
    /* https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}  - api_key=live_F4QTP30bqcYE3JWeC6t8CtcJb0Qmq6N19rtsTM8CXbUBMmmNKfyfj61amUbK9DC0' 
              https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME- */
    axios.get(`https://api.thedogapi.com/v1/images/search?limit=5&breed_ids=${breed}&api_key=live_F4QTP30bqcYE3JWeC6t8CtcJb0Qmq6N19rtsTM8CXbUBMmmNKfyfj61amUbK9DC0`)
    .then((response) => {
      setBreedDetails(breed.data);
    });
  }, [breed]);

  if (!breedDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{breedDetails.name}</h1>
      <img src={breedDetails.image} alt={breedDetails.name} />
      <p>{breedDetails.description}</p>
    </div>
  );
}

export default BreedDetails;
