import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Header } from './componentes/Header/Header';
import { routes } from './componentes/commons/route';
import { Main } from './componentes/Main/Main';
import { rutas } from './componentes/commons/route2';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element= { <Main/>}>
          {
            routes.map( ({path,name, component:Component }) => (
              <Route
              key={path}
              path={path}
              element={<Component/>}
              >
              {name}
              </Route>
                
            ))
          }
        </Route>
      </Routes>
      <Routes>
        <Route path='/' element= { <Main/>}>
          {
            rutas.map( ({path,name, component:Component }) => (
              <Route
              key={path}
              path={path}
              element={<Component/>}
              >
              {name}
              </Route>
                
            ))
          }
        </Route>
      </Routes>
    </>
  );
}

export default App;
