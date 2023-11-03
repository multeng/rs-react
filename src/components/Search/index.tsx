import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../Button';
import styles from './search.module.css';

export default function Search() {
  const [searchWord, setSearchWord] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const lastWord = localStorage.getItem('searchWord');
    if (lastWord) setSearchWord(lastWord);
  }, []);

  const limit = searchParams.get('limit');

  const perPage = ['5', '10', '15', '50'];

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value.toLowerCase().trim());
  }

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchParams.set('name', searchWord);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    localStorage.setItem('searchWord', searchWord);
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('limit', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <form className={styles.container} onSubmit={search}>
        <input
          value={searchWord}
          className={styles.search}
          onChange={handleInput}
          type="search"
          placeholder="search..."
          ref={(input) => input && input.focus()}
        />
        <Button type="submit">search</Button>
        <Button>make error</Button>
      </form>
      <div className={styles.select}>
        Elements per page:
        <select defaultValue={limit || '5'} onChange={handleSelect}>
          <option value="" disabled>
            -- Choose one --
          </option>
          {perPage.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
