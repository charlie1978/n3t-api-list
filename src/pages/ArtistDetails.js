// ArtistDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


  const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await axios.get(`https://api.vagalume.com.br/search.artmus&apikey={5fd43634762119b27d7ffa221893114b}?musid=${artistId}`);
        if (response.data.art && response.data.art.mus && response.data.art.mus[0]) {
          setArtist(response.data.art.mus[0].art);
        }
      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{artist.name}</h2>
      <img src={artist.pic_medium} alt={artist.name} />
      <p>{artist.desc}</p>
    </div>
  );
};

export default ArtistDetails;
