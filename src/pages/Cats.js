import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./cats.css"

function CatBreedsList() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/breeds?limit=80&page=0')
    .then((response) => setBreeds(response.data))
    .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="ttl-hm">Razas de Gatos</h1>
      <ul className="cat-card-grid">
        {breeds.map((breed) => (
          <li key={breed.id}>
            <Link to={`./Breeds/${breed.name}`}>
              {breed.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CatBreedsList;
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios.get('https://api.apicat.com/v1/breeds?limit=80&page=0')
      .then((response) => {
        setBreeds(response.data.results);
  });
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul className="grid-char">
             {breeds.map((breed) => (
          <li key={breed.id}>
            <Link to={`/Breeds/${breed.name}`}>
              {breed.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;


/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./character.css"


function CatBreedsList() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/breeds?limit=80&page=0')
      .then((response) => { 
        setBreeds(response.data); 
  });
}, []);

return (
  <div>
    <h1>Razas de gatos</h1>
    <ul classname="card-grid">
      {breeds.map((breeds) => (
        <li key={breeds.id}>
          <Link to={`/Breeds/${breeds.name}`}>
            {breeds.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
}

export default CatBreedsList;

/*

var Cats = {
    "url": "https://api.thecatapi.com/v1/images/search?&limit=10",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "x-api-key": "example-api-key"
    },
  };
  
  axios.ajax(Cats).done(function (response) {
    console.log(response);
  });
/*
*/