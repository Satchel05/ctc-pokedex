import { PokemonCard } from '../components/PokemonCard';
import { PokemonGrid } from '../components/PokemonGrid';
import { PageContainer } from '../components/PageContainer';
import { PageHero } from '../components/PageHero';
import { PokeballLoader } from '../components/PokeballLoader';
import { Box } from '@chakra-ui/react';

const pokemonList = [
  {
    id: 1,
    name: 'bulbasaur',
    sprite_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: [{ name: 'grass' }, { name: 'poison' }],
    stats: [
      { name: 'hp', base_stat: 45 },
      { name: 'attack', base_stat: 49 },
      { name: 'defense', base_stat: 49 },
      { name: 'special-attack', base_stat: 65 },
      { name: 'special-defense', base_stat: 65 },
      { name: 'speed', base_stat: 45 },
    ],
  },
  {
    id: 4,
    name: 'charmander',
    sprite_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: [{ name: 'fire' }],
    stats: [
      { name: 'hp', base_stat: 39 },
      { name: 'attack', base_stat: 52 },
      { name: 'defense', base_stat: 43 },
      { name: 'special-attack', base_stat: 60 },
      { name: 'special-defense', base_stat: 50 },
      { name: 'speed', base_stat: 65 },
    ],
  },
  {
    id: 7,
    name: 'squirtle',
    sprite_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    types: [{ name: 'water' }],
    stats: [
      { name: 'hp', base_stat: 44 },
      { name: 'attack', base_stat: 48 },
      { name: 'defense', base_stat: 65 },
      { name: 'special-attack', base_stat: 50 },
      { name: 'special-defense', base_stat: 64 },
      { name: 'speed', base_stat: 43 },
    ],
  },
  {
    id: 25,
    name: 'pikachu',
    sprite_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: [{ name: 'electric' }],
    stats: [
      { name: 'hp', base_stat: 35 },
      { name: 'attack', base_stat: 55 },
      { name: 'defense', base_stat: 40 },
      { name: 'special-attack', base_stat: 50 },
      { name: 'special-defense', base_stat: 50 },
      { name: 'speed', base_stat: 90 },
    ],
  },
  {
    id: 39,
    name: 'jigglypuff',
    sprite_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png',
    types: [{ name: 'normal' }, { name: 'fairy' }],
    stats: [
      { name: 'hp', base_stat: 115 },
      { name: 'attack', base_stat: 45 },
      { name: 'defense', base_stat: 20 },
      { name: 'special-attack', base_stat: 45 },
      { name: 'special-defense', base_stat: 25 },
      { name: 'speed', base_stat: 20 },
    ],
  },
  {
    id: 94,
    name: 'gengar',
    sprite_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    types: [{ name: 'ghost' }, { name: 'poison' }],
    stats: [
      { name: 'hp', base_stat: 60 },
      { name: 'attack', base_stat: 65 },
      { name: 'defense', base_stat: 60 },
      { name: 'special-attack', base_stat: 130 },
      { name: 'special-defense', base_stat: 75 },
      { name: 'speed', base_stat: 110 },
    ],
  },
  {
    id: 130,
    name: 'gyarados',
    sprite_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png',
    types: [{ name: 'water' }, { name: 'flying' }],
    stats: [
      { name: 'hp', base_stat: 95 },
      { name: 'attack', base_stat: 125 },
      { name: 'defense', base_stat: 79 },
      { name: 'special-attack', base_stat: 60 },
      { name: 'special-defense', base_stat: 100 },
      { name: 'speed', base_stat: 81 },
    ],
  },
  {
    id: 143,
    name: 'snorlax',
    sprite_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png',
    types: [{ name: 'normal' }],
    stats: [
      { name: 'hp', base_stat: 160 },
      { name: 'attack', base_stat: 110 },
      { name: 'defense', base_stat: 65 },
      { name: 'special-attack', base_stat: 65 },
      { name: 'special-defense', base_stat: 110 },
      { name: 'speed', base_stat: 30 },
    ],
  },
  {
    id: 149,
    name: 'dragonite',
    sprite_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
    types: [{ name: 'dragon' }, { name: 'flying' }],
    stats: [
      { name: 'hp', base_stat: 91 },
      { name: 'attack', base_stat: 134 },
      { name: 'defense', base_stat: 95 },
      { name: 'special-attack', base_stat: 100 },
      { name: 'special-defense', base_stat: 100 },
      { name: 'speed', base_stat: 80 },
    ],
  },
];

export default function Home() {
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
              />
            ))}
          </PokemonGrid>
        : <PokeballLoader />}
      </Box>
    </PageContainer>
  );
}
