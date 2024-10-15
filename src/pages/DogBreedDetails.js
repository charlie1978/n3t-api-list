import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DogBreedDetails() {
  const { name } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://api.thedogapi.com/breed/${name}`).then((response) => {
      setBreedDetails(response.name);
    });
  }, [name]);

  if (!breedDetails) {
    return <div>Cargando...
      <h1>{breedDetails.name}</h1>                             {/* Aca hay algo que no esta funcionando */}
      <img src={breedDetails.image} alt={breedDetails.name} /> {/* Aca hay algo que no esta funcionando */}
      <p>{breedDetails.description}</p>                        {/* Aca hay algo que no esta funcionando */}
      {/*   {breeds.map((breed) => (
          <li key={breed.id} >
            <Link className="dog-card-breed" to={`/breeds/${breed.name}`} target="_blank">
              {/* <img src={breed.id} alt={breed.name} /> 
              {breed.id.image} 
              {breed.name}
            </Link> */}
    </div>;
  }

  return (
    <div>
      <h1>{breedDetails.name}</h1>                             {/* Aca hay algo que no esta funcionando */}
      <img src={breedDetails.image} alt={breedDetails.name} /> {/* Aca hay algo que no esta funcionando */}
      <p>{breedDetails.description}</p>                        {/* Aca hay algo que no esta funcionando */}
      {/*   {breeds.map((breed) => (
          <li key={breed.id} >
            <Link className="dog-card-breed" to={`/breeds/${breed.name}`} target="_blank">
              {/* <img src={breed.id} alt={breed.name} /> 
              {breed.id.image} 
              {breed.name}
            </Link> */}
    </div>
  );
}

export default DogBreedDetails;
