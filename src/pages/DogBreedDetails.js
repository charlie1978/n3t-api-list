import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DogBreedDetails() {
  const { name } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const decodedName = decodeURIComponent(name);
    const parts = decodedName.split('/');
    const displayName = parts.length > 1 ? `${parts[1]} ${parts[0]}` : parts[0];
    // Buscar imágenes de la raza
    axios.get(`/api-dog/api/breed/${decodedName}/images/random/5`)
      .then((response) => {
        setBreedDetails({ name: displayName });
        setImages(response.data.message.map(url => ({ id: url, url })));
      })
      .catch((error) => {
        console.log('Error fetching images:', error);
        setBreedDetails({ name: displayName });
        setImages([]);
      });
  }, [name]);

  if (!breedDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{breedDetails.name}</h1>
      <h2>Imágenes</h2>
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.url} alt={breedDetails.name} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
}

export default DogBreedDetails;
