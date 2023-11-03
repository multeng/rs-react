import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../Button';
import styles from './search.module.css';

export default function Search() {
  const [searchWord, setSearchWord] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value.toLowerCase().trim());
  }

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchParams.set('name', searchWord);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }

  return (
    <form className={styles.container} onSubmit={search}>
      <input
        className={styles.search}
        onChange={handleInput}
        type="search"
        placeholder="search..."
        ref={(input) => input && input.focus()}
      />
      <Button type="submit">search</Button>
      <Button>make error</Button>
    </form>
  );
}
