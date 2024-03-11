import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BreedDetails() { // eslint-disable-next-line
  const { name } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);

  useEffect(() => {
    /* https://api.thecatapi.com/v1/images/search?breed_ids={breed.id} */
    axios.get(`https://api.thedogapi.com/v1/images/search?breed_ids=${name}`)
    .then((response) => {
      setBreedDetails(name.data);
    });
  }, [name]);

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
