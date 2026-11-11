import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import { NavBar } from './components/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useState } from 'react';

function App() {
  const [pokemonTeam, setPokemonTeam] = useState([]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              pokemonTeam={pokemonTeam}
              setPokemonTeam={setPokemonTeam}
            />
          }
        />
        <Route
          path='/team'
          element={
            <ProtectedRoute>
              <Team pokemonTeam={pokemonTeam} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
