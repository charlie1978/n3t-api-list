import React, { useState, useEffect } from 'react';

const ArtistSongs = ({ artistId }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch(
        `https://api.vagalume.com.br/{artistId}/rank.php?type=mus&period=day&scope=internacional&limit=5&apikey={key}`
      );
      const data = await response.json();
      setSongs(data.mus);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  return (
    <div>
      <h2>{artistId} Songs</h2>
      <ul>
        {songs.map(song => (
          <li key={song.id}>{song.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistSongs;
