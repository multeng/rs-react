import React, { useCallback, useState } from 'react';
import type { Pokemon } from '../../types';
import { getPokemonsByName, getAllPokemons } from '../../api';
import CardList from '../CardList';
import styles from './app.module.css';
import './global.css';
import Search from '../Search';

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getPokemons = useCallback(async (pokeName?: string) => {
    let newPokemons: Pokemon[];
    setIsLoaded(false);
    if (pokeName?.length) {
      newPokemons = await getPokemonsByName(pokeName);
    } else {
      newPokemons = await getAllPokemons();
    }

    setPokemons(newPokemons);
    setIsLoaded(true);
  }, []);

  return (
    <div className={styles.container}>
      <Search setPokemons={getPokemons} />
      {isLoaded ? <CardList cards={pokemons} /> : 'loading...'}
    </div>
  );
}
