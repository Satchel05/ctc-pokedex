import { PokemonCard } from '../components/PokemonCard';

const pokemonList = [
  {
    name: 'Bulbasaur',
    spriteURL:
      'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/0001.png',
    types: ['Grass', 'Poison'],
    numeral: 1,
    abilities: ['Overgrow', 'Chlorophyll'],
    hp: 45,
    attack: 49,
    defense: 49,
  },
  {
    name: 'Charmander',
    spriteURL:
      'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/0004.png',
    types: ['Fire'],
    numeral: 4,
    abilities: ['Blaze', 'Solar Power'],
    hp: 39,
    attack: 52,
    defense: 43,
  },
  {
    name: 'Squirtle',
    spriteURL:
      'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/0007.png',
    types: ['Water'],
    numeral: 7,
    abilities: ['Rain Dish', 'Torrent'],
    hp: 44,
    attack: 48,
    defense: 65,
  },
];

export default function Home() {
  return (
    <>
      <h1>This is the home page.</h1>

      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.numeral}
          pokemon={pokemon}
        />
      ))}
    </>
  );
}
