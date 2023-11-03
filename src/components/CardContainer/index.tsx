import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pokemon } from '../../types';
import { getPokemons } from '../../api';
import CardList from '../CardList';
import Pagination from '../Pagination';
import styles from './сardcontainer.module.css';
// import Detail from '../Detail';

export default function CardContainer() {
  const [cards, setCards] = useState<Pokemon[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const pokeName = searchParams.get('name');
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  // const details = searchParams.get('details');

  const getData = useCallback(async () => {
    const lastWord = localStorage.getItem('searchWord');
    if (pokeName && pokeName.length) {
      return getPokemons(pokeName, parseFloat(limit || '5'));
    }
    return getPokemons(lastWord || '', parseFloat(limit || '5'));
  }, [pokeName, getPokemons, limit]);

  const checkParams = useCallback(() => {
    const lastWord = localStorage.getItem('searchWord');
    if (!page) searchParams.set('page', '1');
    if (!pokeName) {
      if (lastWord) {
        searchParams.set('name', lastWord);
      } else searchParams.set('name', '');
    }
    if (!limit) searchParams.set('limit', '5');
    if (page && parseFloat(page) > cards.length) searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [page, pokeName, limit, localStorage]);

  useEffect(() => {
    checkParams();
    setIsLoading(true);
    getData()
      .then((data) => setCards(data))
      .finally(() => setIsLoading(false));
  }, [getData, setIsLoading]);

  const setCurrentPage = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  // function findCard() {
  //   const idx = cards[
  //     parseFloat(page || '1') - 1 < cards.length ? parseFloat(page || '1') - 1 : 0
  //   ].findIndex((el) => el.id === parseFloat(details!));
  //   return cards[parseFloat(page || '1') - 1 < cards.length ? parseFloat(page || '1') - 1 : 0][idx];
  // }

  // function closeDetails() {
  //   searchParams.delete('details');
  //   setSearchParams(searchParams);
  // }

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <>
      <div className={styles.sides}>
        <CardList
          cards={
            cards[parseFloat(page || '1') - 1 < cards.length ? parseFloat(page || '1') - 1 : 0]
          }
        />
        {/* {details && <Detail card={findCard()} close={closeDetails} />} */}
      </div>
      {page && parseFloat(page) && cards.length > 1 && (
        <Pagination
          currentPage={parseFloat(page)}
          maxLength={7}
          lastPage={cards.length}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}
