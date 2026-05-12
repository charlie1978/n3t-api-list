import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await axios.get(`/api-music/ws/2/artist/${artistId}?inc=aliases+tags+ratings&fmt=json`);
        console.log('Artist response:', response.data);
        setArtist(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artist details:', error);
        setLoading(false);
      }
    };

    if (artistId) {
      fetchArtistDetails();
    }
  }, [artistId]);

  if (loading) {
    return <div><h2>Cargando detalles del artista...</h2></div>;
  }

  if (!artist) {
    return <div><h2>Artista no encontrado</h2></div>;
  }

  return (
    <div>
      <h2>{artist.name || 'Nombre no disponible'}</h2>
      {artist.country && <p>País: {artist.country}</p>}
      {artist.type && <p>Tipo: {artist.type}</p>}
      {artist['life-span'] && artist['life-span'].begin && <p>Año de inicio: {artist['life-span'].begin}</p>}
      {artist.tags && artist.tags.length > 0 && (
        <div>
          <h3>Géneros:</h3>
          <ul>
            {artist.tags.slice(0, 5).map(tag => (
              <li key={tag.name}>{tag.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to={`/artist/${artistId}/songs`} style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Ver Lanzamientos
      </Link>
    </div>
  );
};

export default ArtistDetails;
