import { Pokemon, RawPokemonData } from './types';

export async function getPokemonByLink(link: string) {
  const data = await fetch(link);
  const pokemon: Pokemon = await data.json();
  return pokemon;
}

export async function getAllPokemons() {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');
  const pokemonLists: RawPokemonData = await data.json();
  const allPokemonsData = pokemonLists.results.map((pokemon) => {
    return getPokemonByLink(pokemon.url);
  });
  return Promise.all(allPokemonsData);
}

export async function getPokemonsByName(name: string) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1292`);
  const pokemonLists: RawPokemonData = await data.json();
  const filteredPokemons = pokemonLists.results.filter((pokemon) => pokemon.name.includes(name));
  const allPokemonsData = filteredPokemons.map((pokemon) => {
    return getPokemonByLink(pokemon.url);
  });
  return Promise.all(allPokemonsData);
}
