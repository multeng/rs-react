import { RawPokemonData } from './types';

export async function getPokemonByLink(link: string) {
  const data = await fetch(link);
  const pokemon = await data.json();
  return pokemon;
}

export async function getAllPokemons() {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=50');
  const pokemonLists: RawPokemonData = await data.json();
  const allPokemonsData = pokemonLists.results.map((pokemon) => {
    return getPokemonByLink(pokemon.url);
  });
  return Promise.all(allPokemonsData);
}

export async function getPokemonByName(name: string) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemonLists: RawPokemonData = await data.json();
  return pokemonLists;
}
