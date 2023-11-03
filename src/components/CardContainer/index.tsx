import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pokemon } from '../../types';
import { getPokemons } from '../../api';
import CardList from '../CardList';
import Pagination from '../Pagination';

export default function CardContainer() {
  const [cards, setCards] = useState<Pokemon[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pokeName = searchParams.get('name');
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const getData = useCallback(async () => {
    if (pokeName && pokeName.length) {
      return getPokemons(pokeName, parseFloat(limit || '5'));
    }
    return getPokemons('', parseFloat(limit || '5'));
  }, [pokeName, getPokemons]);

  const checkParams = useCallback(() => {
    if (!page) searchParams.set('page', '1');
    if (!pokeName) searchParams.set('name', '');
    if (!limit) searchParams.set('limit', '5');
    if (page && parseFloat(page) > cards.length) searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [page, pokeName, limit]);

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

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <>
      <CardList
        cards={cards[parseFloat(page || '1') - 1 < cards.length ? parseFloat(page || '1') - 1 : 0]}
      />
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
