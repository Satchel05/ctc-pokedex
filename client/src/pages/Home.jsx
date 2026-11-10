import { PokemonCard } from '../components/PokemonCard';
import { PokemonGrid } from '../components/PokemonGrid';
import { PageContainer } from '../components/PageContainer';
import { PageHero } from '../components/PageHero';
import { PokeballLoader } from '../components/PokeballLoader';
import { backend } from '../lib/backend';
import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function Home({ pokemonTeam, setPokemonTeam }) {
  const [pokemonList, setPokemonList] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      const response = await backend.get('/pokemon');
      setPokemonList(response.data);
    };

    getPokemon();
  }, []);

  return (
    <PageContainer className='pb-24'>
      <PageHero
        title='Find your next six.'
        subtitle='Compare base stats and build a team of six.'
      />

      <Box className='pt-12'>
        {pokemonList ?
          <PokemonGrid>
            {pokemonList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onToggleTeam={() => {
                  setPokemonTeam([...pokemonTeam, pokemon]);
                }}
              />
            ))}
          </PokemonGrid>
        : <PokeballLoader />}
      </Box>
    </PageContainer>
  );
}
