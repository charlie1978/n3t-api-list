

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    filterArtists();
  }, [artists, searchTerm, selectedGenre]);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('/api-music/ws/2/artist?query=type:group&limit=50&fmt=json');
      console.log('Artists response:', response.data);
      const artistData = response.data.artists || [];
      setArtists(artistData);

      // Extraer géneros únicos
      const allGenres = new Set();
      artistData.forEach(artist => {
        if (artist.tags) {
          artist.tags.forEach(tag => allGenres.add(tag.name));
        }
      });
      setGenres(Array.from(allGenres).sort());

      setLoading(false);
    } catch (error) {
      console.log('Error fetching artists:', error);
      setLoading(false);
    }
  };

  const filterArtists = () => {
    let filtered = artists;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por género
    if (selectedGenre) {
      filtered = filtered.filter(artist =>
        artist.tags && artist.tags.some(tag => tag.name === selectedGenre)
      );
    }

    setFilteredArtists(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  if (loading) {
    return <div><h1>Cargando artistas...</h1></div>;
  }

  return (
    <div>
      <h1>Artistas Musicales</h1>

      {/* Filtros */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />

        <select value={selectedGenre} onChange={handleGenreChange} style={{ padding: '5px' }}>
          <option value="">Todos los géneros</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Lista de artistas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredArtists.length > 0 ? filteredArtists.map(artist => (
          <div key={artist.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <Link to={`/artist/${artist.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{artist.name}</h3>
              {artist.country && <p><strong>País:</strong> {artist.country}</p>}
              {artist.type && <p><strong>Tipo:</strong> {artist.type}</p>}
              {artist['life-span'] && artist['life-span'].begin && (
                <p><strong>Año inicio:</strong> {artist['life-span'].begin}</p>
              )}
              {artist.tags && artist.tags.length > 0 && (
                <div>
                  <strong>Géneros:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                    {artist.tags.slice(0, 3).map(tag => (
                      <span key={tag.name} style={{
                        background: '#f0f0f0',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Link>
          </div>
        )) : (
          <p>No se encontraron artistas con los filtros aplicados.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistList;
/*/

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // eslint-disable-next-line

function ArtistList() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get('https://api.vagalume.com.br/rank.php?apikey=660a4395f992ff67786584e238f501aa&type=art&period=day&scope=internacional&limit=50')
    .then((response) => setArtists(response.data.results))
    .catch((error) => console.log(error)); 
   /* console.log((artists));
    .then(response => response.json())
      .then(data => setArtists(data.art.rank)); * /
      
}, []);

  return (
    <div>
      <h2>Lista de Artistas</h2>
      <ul>
      <ul className="grid-char">
        {artists.map((artist) => (
          <li key={artists.id}>
            <Link to={`/artists/${artist.id}`} target="_blank">
              <img src={artist.image} alt={artists.name} />

              <p>{artist.name}</p>
            </Link>
          </li>
        ))}
      </ul>
     {/* <li>
          {artists.map(artist => (
          <li key={artist.id}>
            <Link to={`/Artist/${artist.id}`}>
            {artist.name}
            </Link>
          </li>
        ))}
        </li>* /}
      </ul>
    </div>
  );
}

export default ArtistList;
*/


/*
// ArtistList.js -- const response = await axios.get('http://api.vagalume.com.br/hotspots.php?titl=*&apikey={5fd43634762119b27d7ffa221893114b}');
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./character.css"

const ArtistList = () => {
  const [title, setArtists] = useState([]); // eslint-disable-next-line
  const [hotspots, {id}] = useParams([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        
        const response = await axios.get('https://api.vagalume.com.br/search.php?apikey=660a4395f992ff67786584e238f501aa&musid=3ade68b6g4946fda3&extra=relmus,relart');
        if (response.data.artists) {
          setArtists(response.data.artists);
          console.log(fetchArtists);
          console.log(setArtists);

        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div>
      <h1 className="ttl-hm">Lista de Artistas</h1>
      <div className="grid-container">
        {title.map((artist) => (
          <div key={artist.id} className="grid-item">
            <Link to={`./artist/${artist.id}`}>
              <img src={artist.pic_medium} alt={artist.desc} />
              <p>{artist.desc}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
*/


/*

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './character.css'

function ArtistList () {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Función para cargar la lista de artistas desde la API
    const fetchArtists = async () => {
      try {
        const response = await axios.get('https://api.vagalume.com.br/rank.php?type=art&period=month');
        if (response.data.artists) {
          setArtists(response.data.artists);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };
  
  
  return (
    <div>
    <h1>Lista de Artistas</h1>
    <div className="grid-container">
      {artists.map((artist) => (
        <div key={artist.id} className="grid-item">
          <Link to={`/artist/${artist.id}`}>
            <img src={artist.pic_medium} alt={artist.desc} />
            <p>{artist.desc}</p>
          </Link>
        </div>
      ))}
    </div>
  </div>
  )
      };
/*


// axios.get('api.vagalume.com.br/hotspots.php?apikey={5fd43634762119b27d7ffa221893114b}')
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ArtistList() {
  const [artist, SetArtists] = useState([]);

  useEffect(() => {
    // axios.get('https://www.theaudiodb.com/api/v1/json/2/search.php?limit=80&page=0') // https://www.theaudiodb.com/chart_artists.php
    axios.get('api.vagalume.com.br/hotspots.php?apikey={5fd43634762119b27d7ffa221893114b}')
    // axios.get('https://api.thedogapi.com/v1/breeds?limit=80&page=0')
    .then((response) => {
      SetArtists(response.data)
    });
    
  }, []);

  return (
    <div>
      <h1>Artistas</h1>
      <ul classname="artist-grid">
        {artist.map((artist) => (
          <li key={artist.id}>
            <Link to={`/Artist/${artist.id}`}>
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistList; */

/*  import React, { useState, useEffect } from 'react';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await fetch(
        'https://api.vagalume.com.br/rank.php?type=art&period=day&scope=internacional&limit=2&apikey={660a4395f992ff67786584e238f501aa}'
      );
      const data = await response.json();
      setArtists(data.art.rank);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  return (
    <div>
      <h2>Top Artists</h2>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            <a
              href={`/artist/${artist.id}`}  // Link to artist's songs page
              target="_blank"
              rel="noopener noreferrer"
            >
              {artist.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistList;
 */