// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CharactersList from './pages/CharactersList';
import CharacterDetails from './pages/CharacterDetails';
import DogBreedsList from './pages/DogBreedsList';
import CatBreedDetails from './pages/CatBreedDetails';
import CatInfoComponent from './pages/CatInfoComponent';
import Cats from './pages/Cats'; // Agrega esta importación
import ArtistList from './pages/ArtistList'; // Agrega esta importación
import ArtistSongs from './pages/ArtistSongs';
import ArtistDetails from './pages/ArtistDetails'; // Agrega esta importación
import Marvel from './pages/Marvel';
// const apikey = 'AIzaSyASihGT9_uGTtA5b44KxU0R0uGD330yXp0';


function App() {
  return (
    <Router>
      <div>
        <Header /> <Link className="to-home" to="/"> </Link>{ /* Componente del encabezado */} 
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/characters" component={CharactersList} />
          <Route path="/character/:id" component={CharacterDetails} />
          <Route exact path="/DogBreedsList" component={DogBreedsList} />
          <Route path="/Breeds/" component={CatBreedDetails} />
          <Route path="/Cats" component={Cats} /> {/* Agrega esta ruta */}
          <Route path="/Marvel" component={Marvel} /> {/* Agrega esta ruta */}
          <Route path="/Component" component={CatInfoComponent} />  {/*Agrega esta ruta */}
          <Route exact path="/ArtistSongs" component={ArtistSongs} /> {/* Agrega esta ruta */}
          <Route exact path="/Artist" component={ArtistList} /> {/* Agrega esta ruta */}
          <Route path="/artist/:artist.Id" component={ArtistDetails} />
        </main>
      </div>

    </Router>
  );
}

export default App;


/*
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import CharactersList from './pages/CharactersList';
import CharacterDetails from './pages/CharacterDetails';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link className="to-home" to="/">Página <br /> Inicial</Link>
            </li>
           
          </ul>
        </nav>

        <Route exact path="/" component={Home} />
        <Route exact path="/characters" component={CharactersList} />
        <Route path="/character/:id" component={CharacterDetails} />
      </div>
    </Router>
  );
}

export default App;

/*
// App.js
import React from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import CharactersList from './pages/CharactersList';
import CharacterDetails from './pages/CharacterDetails';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Página Principal</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={CharactersList} />
          <Route path="/character/:id" component={CharacterDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

/*
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CharactersList from './pages/CharactersList';
import CharacterDetails from './pages/CharacterDetails';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Página Principal</Link>
            </li>
          </ul>
        </nav>


          <Route exact path="/" component={CharactersList} />
          <Route path="/character/:id" component={CharacterDetails} />
       
      </div>
    </Router>
  );
}

export default App;

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/