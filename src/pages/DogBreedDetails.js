import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DogBreedDetails() {
  const { name } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://api.thedogapi.com/breeds/${name}`).then((response) => {
      setBreedDetails(response.data);
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

export default DogBreedDetails;
