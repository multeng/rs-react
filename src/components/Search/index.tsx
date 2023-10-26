import React, { useEffect, useState } from 'react';
import Button from '../Button';
import styles from './search.module.css';
import type { SearchProps } from '../../types';

export default function Search({ setPokemons, makeError }: SearchProps) {
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    async function getData() {
      const savedSearchWord = localStorage.getItem('searchWord');
      if (savedSearchWord) {
        setSearchWord(savedSearchWord);
        await setPokemons(savedSearchWord);
      } else await setPokemons();
    }

    getData();
  }, [setPokemons]);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value.toLowerCase());
  }

  async function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem('searchWord', searchWord);
    await setPokemons(searchWord);
  }

  return (
    <form className={styles.container} onSubmit={search}>
      <input
        className={styles.search}
        onChange={handleInput}
        type="search"
        placeholder="search..."
        ref={(input) => input && input.focus()}
        value={searchWord}
      />
      <Button type="submit">search</Button>
      <Button func={makeError}>make error</Button>
    </form>
  );
}
