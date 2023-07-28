// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
  return (
    <div className="bdy">
      <h1 className="ttl-hm">Bienvenido a la Página Inicial</h1>
      <p>Esta es la página de inicio de la aplicación.</p>
      <p className="btns">
      <button className="btnm">
      <Link to="/characters">Api Rick and Morthy</Link>
      </button>
      <button className="btncat">
      <Link to="/cats" target="_blank">Api de Gatos</Link>
      </button>
      <button className="btndog">
      <Link to="/dogs" target="_blank">Api Perros</Link>
      </button>
      <button className="btnmrvl">
      <Link to="/Marvel" target="_blank">Api Marvel</Link>
      </button>
      </p>
      <h5>CHARLIE.NET</h5>
       <div class="col-md">
          <div class="card-body">
          <div class="cards">
          <div class="card">
            <h3 class="card-title">COMPUTADORES</h3>
            <img src='./imagenes/mantenimiento-y-soporte.jpg' alt="" />
            <p class="card-desc">Actualizacion, Mantenimiento y soporte tecnico especializado, bajo plataformas Windows, Linux, Mac / OS.</p>
          </div>
          <div class="card">
            <h3 class="card-title">IMPRESORAS</h3>
            <img src="./imagenes/laser.jpg" alt="" />
            <p class="card-desc">Mantenimiento, soporte para impresoras de inyeccion de tinta y laser, de cartuchos o sistema continuo de tinta.</p>
          </div>
          <div class="card">
            <h3 class="card-title">REDES</h3>
            <img src="./imagenes/redes.jpg" alt="" />
            <p class="card-desc">Mantenimiento, soporte, Ofrecemos servicios de mantenimiento preventivo, correctivo y de soluciones para sus redes domiciliarias e industriales, instalacion de puntos LAN-WAN-ETHERNET-WIFI.</p>
          </div>
          <div class="card">
            <h3 class="card-title">SERVIDORES</h3>
            <img src="./imagenes/servrs.jpg" alt="" />
            <p class="card-desc">Configuracion, mantnimiento y soporte a servidores web, de aplicaciones y de Base de Datos, en cualquier plataforma.</p>
          </div> 
          <div class="card">
            <h3 class="card-title">WEB-SERVICES</h3>
            <img src="./imagenes/webdbp1.jpg" alt="" />
            <p class="card-desc">Desarrollo web, de aplicaciones y de Base de Datos, para cualquier plataforma.</p>
          </div>
            </div>
            <div></div> <div></div> </div>
          </div>  
        <footer className="ftr">
            MADE BY CHARLIE.N3T

        </footer>
      
    </div>
  );
}

export default Home;
