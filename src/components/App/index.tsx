import React, { useCallback, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import type { Pokemon } from '../../types';
import { getAllPokemons, getPokemonsByName } from '../../api';
import CardList from '../CardList';
import styles from './app.module.css';
import './global.css';
import Search from '../Search';

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getPokemons = useCallback(async (pokeName?: string) => {
    let newPokemons: Pokemon[] = [];
    if (pokeName?.length) {
      newPokemons = await getPokemonsByName(pokeName);
    } else {
      newPokemons = await getAllPokemons();
    }

    setPokemons(newPokemons);
    setIsLoaded(true);
  }, []);

  const makeError = () => {
    setIsError(true);
  };

  return (
    <div className={styles.container}>
      <Search setPokemons={getPokemons} makeError={makeError} />
      <ErrorBoundary>
        {isLoaded ? <CardList error={isError} cards={pokemons} /> : 'loading...'}
      </ErrorBoundary>
    </div>
  );
}
