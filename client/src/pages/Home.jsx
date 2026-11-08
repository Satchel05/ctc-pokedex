import { PokemonCard } from '../components/PokemonCard';
import { useState, useEffect } from 'react';
import { Alert, CloseButton } from '@chakra-ui/react';
import { backend } from '../lib/backend';
import { useApiError } from '../lib/useApiError';

const fetchPokemon = async (callback) => {
  try {
    const response = await backend.get('/pokemon');
    console.log(response.data);
    callback(response.data);
  } catch {
    // The failure is already emitted by the backend interceptor and shown via useApiError.
  }
};

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [apiError, clearApiError] = useApiError();

  useEffect(() => {
    fetchPokemon(setPokemonList);
  }, []);

  return (
    <>
      <h1>This is the home page.</h1>

      {apiError && (
        <Alert.Root status='error'>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {apiError.status ?
                `Request failed (${apiError.status})`
              : 'Request failed'}
            </Alert.Title>
            <Alert.Description>{apiError.message}</Alert.Description>
          </Alert.Content>
          <CloseButton
            onClick={clearApiError}
            pos='relative'
            top='-2'
            insetEnd='-2'
          />
        </Alert.Root>
      )}

      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </>
  );
}
