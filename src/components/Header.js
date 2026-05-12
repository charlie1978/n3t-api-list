// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // eslint-disable-next-line
import { GiHouse } from "react-icons/gi";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <h1>
            <Link to="/"> <GiHouse /> - HOME - <GiHouse /> </Link> 
          </h1>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
