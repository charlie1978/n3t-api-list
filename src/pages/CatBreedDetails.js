import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'live_xqsPSVceKiINlv3ON8JzufFjDBdKz8jYChXKqXelSumLsSd8pR9EKbS0nBSRvCeP';

function BreedDetails() { // eslint-disable-next-line
  const { name } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Primero buscar la raza por nombre
    axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${name}`)
      .then((response) => {
        if (response.data.length > 0) {
          const breed = response.data[0];
          setBreedDetails(breed);
          // Luego buscar imágenes por breed_id
          return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=5`);
        }
      })
      .then((response) => {
        if (response) {
          setImages(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, [name]);

  if (!breedDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{breedDetails.name}</h1>
      <p>{breedDetails.description || 'Descripción no disponible'}</p>
      <h2>Imágenes</h2>
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.url} alt={breedDetails.name} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
}

export default BreedDetails;
