import { PokemonCard } from '../components/PokemonCard';
import { PokemonGrid } from '../components/PokemonGrid';
import { PageContainer } from '../components/PageContainer';
import { PageHero } from '../components/PageHero';
import { PokeballLoader } from '../components/PokeballLoader';
import { Box } from '@chakra-ui/react';

export default function Home({ pokemonTeam }) {
  return (
    <PageContainer className='pb-24'>
      <PageHero
        title='Team'
      />

      <Box className='pt-12'>
        {pokemonTeam ?
          <PokemonGrid>
            {pokemonTeam.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
              />
            ))}
          </PokemonGrid>
        : <PokeballLoader />}
      </Box>
    </PageContainer>
  );
}
