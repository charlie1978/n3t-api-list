// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CharactersList from './components/CharactersList';
import CharacterDetails from './components/CharacterDetails';
// import Cats from './components/Cats'; // Agrega esta importación
// import Dogs from './components/Dogs'; // Agrega esta importación

function App() {
  return (
    <Router>
      <div>
        <Header /> <Link className="to-home" to="/"> </Link>{ /* Componente del encabezado */}
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/characters" component={CharactersList} />
          <Route path="/character/:id" component={CharacterDetails} />
          {/*<Route path="/cats" component={Cats} /> {/* Agrega esta ruta * /}
          <Route path="/dogs" component={Dogs} /> {/* Agrega esta ruta * /}*/}
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
import Header from './components/Header';
import Home from './components/Home';
import CharactersList from './components/CharactersList';
import CharacterDetails from './components/CharacterDetails';

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
import Home from './components/Home';
import CharactersList from './components/CharactersList';
import CharacterDetails from './components/CharacterDetails';

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
import CharactersList from './components/CharactersList';
import CharacterDetails from './components/CharacterDetails';

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