// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            {/* <Link to="/characters">Ver Lista de Personajes</Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
