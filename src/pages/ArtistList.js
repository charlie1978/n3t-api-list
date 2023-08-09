

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';





const ArtistList = () => {
  const [art, setArtists] = useState([]);

  useEffect(() => {
    axios.get('https://api.vagalume.com.br/rank.php?limit=20&apikey={5fd43634762119b27d7ffa221893114b}')
      .then((response) => setArtists(response.data))
      .catch((error) => console.log(error));
      console.log(setArtists);
       

    /* / eslint-disable-next-line       console.log(setArtists);*/
  },[]);

  return (
    <div>
      <h1>Top International Artists</h1>
      <ul>
        {art.map(artist => (
          <li key={artist.id}>
            <Link to={`/artistList/${art.url.id}`}  /* target="_blank" rel="noopener noreferrer" */ >
              <img src={art.id} alt={art.desc} />
              {art.mont.all.name}
              {art.desc}
              {art.id}
            </Link>
          </li>
        ))}
      </ul>
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