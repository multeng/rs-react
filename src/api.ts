import { Pokemon, RawPokemonData } from './types';

export async function getPokemonByLink(link: string) {
  const data = await fetch(link);
  if (!data.ok) {
    throw new Error('failed fetch pokemon');
  }
  const pokemon: Pokemon = await data.json();
  return pokemon;
}

export async function getAllPokemons() {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1292');
  const pokemonLists: RawPokemonData = await data.json();
  const allPokemonsData = pokemonLists.results.map((pokemon) => {
    return getPokemonByLink(pokemon.url);
  });
  return Promise.all(allPokemonsData);
}

export async function getPokemonsByName(name: string) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1292`);
  const pokemonLists: RawPokemonData = await data.json();
  const filteredPokemons = pokemonLists.results.filter(
    (pokemon) => pokemon && pokemon.name.includes(name)
  );
  const allPokemonsData = filteredPokemons.map((pokemon) => {
    return getPokemonByLink(pokemon.url);
  });
  return Promise.all(allPokemonsData);
}

function chunkArray<T>(array: T[], limit: number = 5): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += limit) {
    result.push(array.slice(i, i + limit));
  }
  return result;
}

export async function getPokemons(name?: string, limit?: number) {
  let pokemons;
  if (name?.length) {
    pokemons = await getPokemonsByName(name);
  } else pokemons = await getAllPokemons();

  return chunkArray(pokemons, limit);
}
