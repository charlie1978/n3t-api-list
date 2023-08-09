// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'// eslint-disable-next-line
import { GiCat, GiDogBowl, Gi3DGlasses, GiMusicalNotes } from "react-icons/gi";
// import { PiDogFill } from "react-icons/pi";
// import Map from './Map'  */

function Home() {
  return (

    <div className="bdy">
      <h1 className="ttl-hm">Bienvenido a la Página Inicial</h1>
      <p className="text" >T3N3M0$ 4CC3SO5 A 3ST@S API'S <br/>
      <img className="text-img" src="./imagenes/indice.jpg" alt="Descripción de la imagen" />
    </p>
        <p className="btns">
          <button className="btnm">
        {/*<Link to="/characters" target="_blank"> <Gi3DGlasses /> - Api Rick and Morthy - <Gi3DGlasses /> </Link>*/}
             <Link to="/characters" > <Gi3DGlasses /> - Api Rick and Morthy - <Gi3DGlasses /> </Link>
          </button>
          <button className="btndog">
              <Link to="/DogBreedsList" target="_blank"> <GiDogBowl /> - Api Perros - <GiDogBowl /> </Link>
          </button>
          <button className="btncat">
              <Link to="/Cats" target="_blank"> <GiCat /> - Api de Gatos - <GiCat /> </Link>
          </button>
          <button className="btnmsk">
              <Link to="/artists" > <GiMusicalNotes /> - Api Musica - <GiMusicalNotes /> </Link>
          </button>

          <button className="btnmsk2">
              <Link to="/CatInfoComponent" > <GiMusicalNotes /> - Componente cats - <GiMusicalNotes /> </Link>
          </button>
          <button className="btnmsk2">
              <Link to="/artistsList" > <GiMusicalNotes /> - Api Musica 2- <GiMusicalNotes /> </Link>
          </button>

          <button className="btnmrvl">
              <Link to="/Marvel" target="_blank"> - Api Marvel - </Link>
          </button>
        </p>
        <div>


      </div>

    </div>
    
  );
  
}

export default Home;
